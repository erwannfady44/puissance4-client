import {Component, Input, OnInit} from '@angular/core';
import {NullPawnModel, PawnModel} from "../models/Pawn.model";
import {GameService} from "../services/game.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent implements OnInit {
  @Input() pawn!: PawnModel;
  @Input() header!: boolean;
  @Input() color!: string;
  @Input() column!: number;
  selectedColumn!: number;
  private currentPlayer!: number;


  constructor(private gameService: GameService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.gameService.getSelectedColumn().subscribe((value) => {
      this.selectedColumn = value;
    });
    this.gameService.game.getCurrentPlayer().subscribe((currentPlayer: number) => this.currentPlayer = currentPlayer)
  }

  getColor(): string {
    if (this.header) {
      if (this.gameService.game.player0 === this.userService.user.id) {
        if (this.currentPlayer === 0) {
          return this.pawn.column == this.selectedColumn ? this.color : 'white';
        } else
          return 'white'
      } else {
        if (this.currentPlayer === 1) {
          return this.pawn.column == this.selectedColumn ? this.color : 'white';
        } else return 'white'
      }
    } else {
      if (this.pawn instanceof NullPawnModel)
        return "white";
      else if (this.pawn.win) {
        return "win " + this.pawn.color;
      } else
        return this.pawn.color;
    }
  }
}
