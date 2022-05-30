import {Component, Input, OnInit} from '@angular/core';
import {PawnModel} from "../models/Pawn.model";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent implements OnInit {
  @Input() pawn!: PawnModel;
  @Input() header!: boolean;
  @Input() color!: string;
  @Input() column!:number;
  selectedColumn!: number;


  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
    this.gameService.getSelectedColumn().subscribe((value) => {
      this.selectedColumn = value;
    });
  }

  getColor(): string {
    if (this.header)
      return this.pawn.column == this.selectedColumn ? this.color : 'white';
    else {
      if (this.pawn.color) {
        if (this.pawn.color == 0)
          return "red";
        else
          return "yellow";
      } else
        return "white";
    }
  }
}