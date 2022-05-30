import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PawnModel  {
  private _color!: string;
  private _column!: number;
  private _row!: number;
  private _player!:number;

  constructor() {
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get column(): number {
    return this._column;
  }

  set column(value: number) {
    this._column = value;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }


  get player(): number {
    return this._player;
  }

  set player(value: number) {
    this._player = value;
  }
}

export class NullPawnModel extends PawnModel {
  constructor() {
    super();
  }
}
