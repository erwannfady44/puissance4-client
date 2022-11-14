import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import axios from "axios";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {GameModel} from "../models/Game.model";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: GameModel
  status!: number;
  winner!: number;
  endDialog!:MatDialogRef<any>

  constructor(private gameService: GameService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.userService.user.token) {
      this.router.navigate(['login']);
    }
    if (!this.gameService.game.id) {
      this.gameService.loadData(this.userService.user);
    }
    this.game = this.gameService.game;
    this.gameService.getStatus().subscribe((status: number) => {
      this.status = status;
      if (status === 2) {
        /*this.endDialog = this.dialog.open(EndDialog, {data: {
            win : true
          }});
        this.endDialog.afterClosed().subscribe(async (playAgain:any) => {
          if (playAgain) {
            this.gameService.playAgain();
          } else {
            this.gameService.leave();
            this.router.navigate([''])
          }
        })*/
      }
      else if (status === 3) {
        //this.endDialog.close();
        this.toastr.info('Votre adversaire a quitté la partie');
        this.gameService.leave();
        this.router.navigate([''])
      }
    })
    this.gameService.getWinner().subscribe((winner: number) => this.winner = winner);
  }

  onLeave() {
    this.gameService.leave()
      .then(() => this.router.navigate(['']))
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './end.dialog.html',
  styleUrls: ['./game.component.scss']
})
export class EndDialog {
  playAgain = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
