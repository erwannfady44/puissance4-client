import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import axios from "axios";
import {UserModel} from "../models/User.model";
import {GameModel} from "../models/Game.model";
import {WebSocketService} from "./web-socket.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _game: GameModel = new GameModel();
  private selectedColumn!: BehaviorSubject<number>;

  constructor(private ws: WebSocketService) {
    this.selectedColumn = new BehaviorSubject<number>(-1)
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
          this.game.player0 = res.data.player0;
          this.game.player0Connected = res.data.player0Connected;
          this.game.currentPlayer = res.data.currentPlayer;
          this.game.id = res.data._id;
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
          this.game.player0 = res.data.player0;
          this.game.player1 = res.data.player1;
          this.game.player0Connected = res.data.player0Connected;
          this.game.player1Connected = true;
          this.game.currentPlayer = res.data.currentPlayer;
          this.game.id = idGame;
          sessionStorage.setItem('game', JSON.stringify(this.game))
          this.connect(user.id, user.token);
          resolve()
        }).catch(err => reject(err))
    });
  }

  get game(): GameModel {
    return this._game;
  }

  connect(idUser: string, token: string) {
    console.log(idUser);
    return this.ws.connect(this.game.id, idUser, token).subscribe({
      next: res => {
        this.dataReceived(res.data)
      }, error: err => {
        console.log(err.data)
      }, complete() {
        console.log("complete")
      }
    })

  }

  private dataReceived(res: any) {
    console.log(res);
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
}
