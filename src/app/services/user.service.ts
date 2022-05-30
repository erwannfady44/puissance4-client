import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserModel} from "../models/User.model";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user:UserModel =  new UserModel();

  constructor() {
  }

  signUp(pseudo: string, password: string): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      axios.post(`${environment.URL}/user/signup`, {
        pseudo: pseudo,
        password: password
      }).then((res:any) => {
        this._user.id = res.data.idUser;
        this._user.pseudo = pseudo;
        this._user.password = password;
        this._user.token = res.data.token;
        resolve(true);
      }).catch((err:any) => reject(err.message))
    }))
  }

  login(pseudo: string, password: string): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      axios.post(`${environment.URL}/user/login`, {
        pseudo: pseudo,
        password: password
      }).then((res:any) => {
        this._user.id = res.data.idUser;
        this._user.pseudo = pseudo;
        this._user.password = password;
        this._user.token = res.data.token;
        sessionStorage.setItem('user', JSON.stringify(this._user));
        resolve(true);
      }).catch((err:any) => reject(err.message))
    }))
  }

  logOut() {
    sessionStorage.removeItem('user');
  }

  getSessionData() {
    this._user = JSON.parse(<string>sessionStorage.getItem('user'));
  }

  get user(): UserModel {
    return this._user;
  }
}

