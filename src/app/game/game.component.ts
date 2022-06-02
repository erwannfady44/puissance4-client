import {AfterViewInit, Component, OnInit} from '@angular/core';
import axios from "axios";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {GameModel} from "../models/Game.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: GameModel
  status!: number;
  winner!: number;

  constructor(private gameService: GameService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
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
      this.checkLeave();
    })
    this.gameService.getWinner().subscribe((winner: number) => this.winner = winner);
  }

  onLeave() {
    this.gameService.leave()
      .then(() => this.router.navigate(['']))
  }

  checkLeave() {
    if (this.status === 3) {
      this.toastr.info('Votre adversaire a quitté la partie');
      this.gameService.leave();
      this.router.navigate([''])
    }
  }
}
