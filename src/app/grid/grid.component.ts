import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {GameService} from "../services/game.service";
import {PawnModel, NullPawnModel} from "../models/Pawn.model";
import {UserModel} from "../models/User.model";
import {GameModel} from "../models/Game.model";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  game!: GameModel;
  user!: UserModel;
  nullPawn:NullPawnModel = new NullPawnModel();

  constructor(private userService: UserService,
              private gameService: GameService) {
  }

  ngOnInit(): void {
    this.game = this.gameService.game;
    this.user = this.userService.user;
  }

  counter(i: number) {
    return new Array(i);
  }

  createHeaderPawn(column:number): PawnModel {
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
      if (this.gameService.game.currentPlayer === 0) {
        this.gameService.sendPawn();
      }
    } else {
      if (this.gameService.game.currentPlayer === 1) {
        this.gameService.sendPawn();
      }
    }
  }
}
