import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserModel {
  private _id!: string
  private _pseudo!: string
  private _password!: string
  private _token!: string

  constructor() {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }


  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
