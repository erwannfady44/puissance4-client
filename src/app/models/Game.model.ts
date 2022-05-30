import {Injectable} from '@angular/core';
import {PawnModel} from "./Pawn.model";

@Injectable({providedIn: 'root'})
export class GameModel {
  private _id!: string
  private _player0!: string
  private _player0Connected: boolean = false;
  private _player1!: string;
  private _player1Connected: boolean = false;
  private _currentPlayer!: number;
  private _grid!: Array<Array<PawnModel>>

  constructor() {
  }

  public addPawn(pawn: PawnModel) {
    this._grid[pawn.row][pawn.column] = pawn;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get player0(): string {
    return this._player0;
  }

  set player0(value: string) {
    this._player0 = value;
  }

  get player0Connected(): boolean {
    return this._player0Connected;
  }

  set player0Connected(value: boolean) {
    this._player0Connected = value;
  }

  get player1(): string {
    return this._player1;
  }

  set player1(value: string) {
    this._player1 = value;
  }

  get player1Connected(): boolean {
    return this._player1Connected;
  }

  set player1Connected(value: boolean) {
    this._player1Connected = value;
  }

  get currentPlayer(): number {
    return this._currentPlayer;
  }

  set currentPlayer(value: number) {
    this._currentPlayer = value;
  }

  get grid(): Array<Array<PawnModel>> {
    return this._grid;
  }
}
