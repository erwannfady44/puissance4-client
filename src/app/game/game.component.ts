import {Component, OnInit} from '@angular/core';
import axios from "axios";
import {GameService} from "../services/game.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {GameModel} from "../models/Game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: GameModel

  constructor(private gameService: GameService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.userService.user.token) {
      this.router.navigate(['login']);
    }
    if (!this.gameService.game.id) {
      this.gameService.loadData(this.userService.user);
    }
    this.game = this.gameService.game;
  }

  onDeleteAllGames() {
    axios.delete('http://localhost:3000/api/game/deleteAllGames');
    this.router.navigate(['']);
  }
}
