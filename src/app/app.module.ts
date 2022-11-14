import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GridComponent} from './grid/grid.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PawnComponent} from './pawn/pawn.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {JoinDialog} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {GameService} from "./services/game.service";
import {UserService} from "./services/user.service";
import { UserComponent } from './user/user.component';
import {EndDialog, GameComponent} from './game/game.component';
import {MatDialogModule} from "@angular/material/dialog";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'game', component: GameComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    LoginComponent,
    SignupComponent,
    PawnComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    UserComponent,
    GameComponent,
    JoinDialog,
    EndDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3500,
      tapToDismiss: true
    }),
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [UserService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
