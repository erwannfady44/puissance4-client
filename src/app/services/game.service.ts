import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import axios from "axios";
import {UserModel} from "../models/User.model";
import {GameModel} from "../models/Game.model";
import {WebSocketService} from "./web-socket.service";
import {BehaviorSubject, Observable} from "rxjs";
import {PawnModel} from "../models/Pawn.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: GameModel = new GameModel();
  private selectedColumn!: BehaviorSubject<number>;
  private status!: BehaviorSubject<number>;
  private winner!: BehaviorSubject<number>;

  constructor(private ws: WebSocketService) {
    this.selectedColumn = new BehaviorSubject<number>(-1)
    this.status = new BehaviorSubject<number>(0)
    this.winner = new BehaviorSubject<number>(-1)
  }

  isInGame(pseudo: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      axios.get(`${environment.URL}/user/${pseudo}/isInGame`)
        .then((res: any) => {
          resolve(res.inGame)
        }).catch(err => reject(err))
    });
  }

  createGame(user: UserModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      axios.put(`${environment.URL}/game/create`, {
        idUser: user.id
      }, {
        headers: {
          Authorization: 'Bearer ' + user.token
        },
      })
        .then((res: any) => {
          this._game = new GameModel();
          this._game.player0 = res.data.player0;
          this._game.player0Connected = res.data.player0Connected;
          this._game.setCurrentPlayer(res.data.currentPlayer);
          this._game.id = res.data._id;
          sessionStorage.setItem('game', JSON.stringify(this.game))
          this.connect(user.id, user.token);
          resolve()
        }).catch(err => reject(err))
    });
  }

  joinGame(user: UserModel, idGame: string): Promise<void> {
    return new Promise((resolve, reject) => {
      axios.post(`${environment.URL}/game/${idGame}/join`, {
        idUser: user.id
      }, {
        headers: {
          Authorization: 'Bearer ' + user.token
        },
      })
        .then((res: any) => {
          this._game = new GameModel();
          this._game.player0 = res.data.player0;
          this._game.player1 = res.data.player1;
          this._game.player0Connected = res.data.player0Connected;
          this._game.player1Connected = true;
          this._game.setCurrentPlayer(res.data.currentPlayer);
          this._game.id = idGame;
          sessionStorage.setItem('game', JSON.stringify(this.game))
          this.connect(user.id, user.token);
          resolve()
        }).catch(err => reject(err))
    });
  }

  sendPawn() {
    this.ws.send({column: this.selectedColumn.getValue()})
  }

  get game(): GameModel {
    return this._game;
  }

  connect(idUser: string, token: string) {
    return this.ws.connect(this.game.id, idUser, token).subscribe({
      next: res => {
        this.dataReceived(JSON.parse(res.data))
      }, error: err => {
        console.log(err.data)
      }, complete() {
        console.log("complete")
      }
    })
  }

  private dataReceived(data: any) {
    if (data.status) {
      this.setStatus(data.status);
      if (data.status == 2)
        this.setWinner(data.winner ? data.winner : -1);
    } else if (data.newPawn) {
      const newPawn = new PawnModel();
      newPawn.column = data.newPawn.column;
      newPawn.row = data.newPawn.row;
      newPawn.color = data.newPawn.color;
      this.game.grid[newPawn.row][newPawn.column] = newPawn;
      this.game.nextPlayer();
    }
  }

  loadData(user: UserModel) {
    this._game = JSON.parse(<string>sessionStorage.getItem('game'));
    if (this._game.id) {
      this.connect(user.id, user.token)
    }
  }

  setSelectedColumn(column: number): void {
    this.selectedColumn.next(column);
  }

  getSelectedColumn(): Observable<number> {
    return this.selectedColumn.asObservable();
  }

  setStatus(status: number) {
    this.status.next(status);
  }

  getStatus() {
    return this.status.asObservable();
  }

  setWinner(winner: number) {
    this.winner.next(winner);
  }


  getWinner() {
    return this.winner.asObservable();
  }

  leave(): Promise<any> {
    this.setStatus(0);
    return this.ws.close();
  }
}
