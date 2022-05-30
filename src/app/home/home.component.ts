import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {UserModel} from "../models/User.model";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              public dialog: MatDialog) {
  }

  async ngOnInit() {
    if (!this.userService.user.token) {
      this.router.navigate(['login']);
    }
  }

  isInGame(): boolean {
    return this.gameService.game.id != null;
  }

  onJoinGame() {
    const loginDialog = this.dialog.open(JoinDialog);
    loginDialog.afterClosed().subscribe(async idGame => {
      if (idGame) {
        try {
          await this.gameService.joinGame(this.userService.user, idGame.value.idGame);
          this.router.navigate(['game']);
        } catch (e: any) {
          this.toastr.error(e.response.data.error, 'Erreur')
        }
      }
    })
  }

  async onCreateGame() {
    try {
      await this.gameService.createGame(this.userService.user);
      this.router.navigate(['game']);
    } catch (e: any) {
      this.toastr.error(e.message, 'Erreur')
    }
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './login.dialog.html',
  styleUrls: ['./home.component.scss']
})
export class JoinDialog implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private joinDialog: MatDialogRef<JoinDialog>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idGame: [null, [Validators.required, Validators.pattern(/[0-9a-f]{24}/
      )]]
    });
  }

  onCancel() {
    this.joinDialog.close();
  }
}
