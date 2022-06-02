import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {GameService} from "../services/game.service";
import {PawnModel, NullPawnModel} from "../models/Pawn.model";
import {UserModel} from "../models/User.model";
import {GameModel} from "../models/Game.model";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  game!: GameModel;
  user!: UserModel;
  nullPawn: NullPawnModel = new NullPawnModel();
  currentPlayer!: number;

  constructor(private userService: UserService,
              private gameService: GameService) {
  }

  ngOnInit(): void {
    this.game = this.gameService.game;
    this.user = this.userService.user;
    this.gameService.game.getCurrentPlayer().subscribe((currentPlayer: number) => this.currentPlayer = currentPlayer)
  }

  counter(n:number) {
    return new Array(n)
  }

  counterReverse(n: number) {
    let array = []
    for (let i = n - 1; i >= 0; i--)
      array.push(i)
    return array;
  }

  createHeaderPawn(column: number): PawnModel {
    let pawn = new PawnModel();
    pawn.column = column;
    return pawn;
  }

  onMouseEvent(column: number) {
    this.gameService.setSelectedColumn(column);
  }

  sendPawn() {
    //Si c'est notre tours
    if (this.gameService.game.player0 === this.userService.user.id) {
      if (this.currentPlayer === 0) {
        this.gameService.sendPawn();
      }
    } else {
      if (this.currentPlayer === 1) {
        this.gameService.sendPawn();
      }
    }
  }
}
