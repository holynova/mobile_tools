import { action, makeAutoObservable } from "mobx";

export type TPosition = {
  x: number;
  y: number;
  value: TPositionValue;
  selected: boolean;
};

export type TCod = {
  x: number;
  y: number;
};

export type TPlayer = "white" | "black";

export type TChessBoard = TPosition[][];
const maxRow = 4;
const maxCol = 4;

export type TDirection = "up" | "down" | "left" | "right";
// const empty = 0;
export type TPositionValue = TPlayer | "empty" | "invalid";

// (0,0), (1,0), (2,0), (3,0)
// (0,1), (1,1), (2,1), (3,1)
// (0,2), (1,2), (2,2), (3,2)
// (0,3), (1,3), (2,3), (3,3)

export class FourKnockChessGame {
  private chessBoard: TChessBoard;
  private historyStack: TChessBoard[];
  private nextPlayer: TPlayer;
  private selected: TPosition;
  constructor() {
    makeAutoObservable(this);
    this.chessBoard = [];
    this.historyStack = [];
    this.nextPlayer = "white";
    this.initialChess();
  }

  public getChessBoard() {
    return this.chessBoard;
  }
  generatePositions(): TPosition[] {
    const res: TPosition[] = [];
    for (let i = 0; i < maxRow; i++) {
      for (let j = 0; j < maxCol; j++) {
        res.push({ x: j, y: i, value: "empty", selected: false });
      }
    }
    return res;
  }

  // history
  undo() {}
  redo() {}

  initialChessBoard() {
    this.chessBoard = new Array(maxRow).fill(undefined).map((row, rowIndex) => {
      return new Array(maxCol).fill({ value: "empty", selected: false });
    });

    let list = [];
    for (let row = 0; row < maxRow; row++) {
      const thisRow = [];
      for (let col = 0; col < maxCol; col++) {
        thisRow.push({
          x: col,
          y: row,
          value: "empty",
          selected: false,
        } as TPosition);
      }
      list.push([...thisRow]);
    }

    this.chessBoard = list;
  }

  initialChess() {
    this.initialChessBoard();
    this.setPositionValue({ x: 0, y: 0 }, "black");
    this.setPositionValue({ x: 0, y: 1 }, "black");
    this.setPositionValue({ x: 0, y: 2 }, "black");
    this.setPositionValue({ x: 0, y: 3 }, "black");

    this.setPositionValue({ x: 3, y: 0 }, "white");
    this.setPositionValue({ x: 3, y: 1 }, "white");
    this.setPositionValue({ x: 3, y: 2 }, "white");
    this.setPositionValue({ x: 3, y: 3 }, "white");
  }

  startGame() {
    this.initialChess();
    this.nextPlayer = "white";
  }

  isValidPosition(pos: TCod) {
    return !(pos?.x > maxCol || pos?.x < 0 || pos?.y > maxCol || pos?.y < 0);
  }

  getPositionValue(pos: TCod): TPositionValue {
    return this.getPosition(pos)?.value || "invalid";
  }

  getPosition(pos: TCod): TPosition | undefined {
    if (this.isValidPosition(pos)) {
      return this.chessBoard[pos.x][pos.y];
    }
  }

  setPositionValue(pos: TCod, newValue: TPositionValue) {
    if (this.isValidPosition(pos)) {
      this.chessBoard[pos.x][pos.y].value = newValue;
    }
  }

  // game rule
  canMove(player: TPlayer, from: TPosition, to: TPosition) {
    const fromStatus = this.getPositionValue(from);
    const toStatus = this.getPositionValue(to);
    const isNear = (from.x - to.x) ** 2 + (from.y - to.y) ** 2 < 2;
    return (
      player === this.nextPlayer &&
      fromStatus === player &&
      toStatus === "empty" &&
      isNear
    );
  }

  getNextPos(pos: TCod, direction: "up" | "down" | "left" | "right") {
    let nextPos: TCod = pos;

    switch (direction) {
      case "up":
        nextPos = { x: pos.x, y: pos.y - 1 };
        break;
      case "down":
        nextPos = { x: pos.x, y: pos.y + 1 };
        break;
      case "left":
        nextPos = { x: pos.x - 1, y: pos.y };
        break;
      case "right":
        nextPos = { x: pos.x + 1, y: pos.y };
        break;
      default:
        break;
    }
    return { pos: nextPos, value: this.getPositionValue(nextPos) };
    // if (direction === "up") {
    //   return this.getPosition({ x: pos.x, y: pos.y - 1 });
    // }
    // if (direction === "down") {
    //   return this.getPosition({ x: pos.x, y: pos.y + 1 });
    // }
    // if (direction === "left") {
    //   return this.getPosition({ x: pos.x - 1, y: pos.y });
    // }
    // if (direction === "right") {
    //   return this.getPosition({ x: pos.x + 1, y: pos.y });
    // }
  }

  getPositionAfterSteps(from: TPosition, steps: TDirection[]) {}

  getOpponent(player: TPlayer) {
    const opponentDict: Record<TPlayer, TPlayer> = {
      white: "black",
      black: "white",
    };
    return opponentDict[player];
  }

  checkWinner() {}

  kill(player: TPlayer, from: TPosition, to: TPosition) {
    //    w
    // w, w, w, b
    //    w
    // up
    // down
    const opponent: TPlayer = this.getOpponent(player);
    const up = this.getNextPos(to, "up");
    const upup = this.getNextPos(up.pos, "up");
    // if (up.status === player && upup.status === opponent) {
    //   this.setPosition(upup.pos, "empty");
    // }
  }

  move(player: TPlayer, from: TPosition, to: TPosition) {
    if (this.canMove(player, from, to)) {
      this.setPositionValue(from, "empty");
      this.setPositionValue(to, player);
      this.kill(player, from, to);
    }
    throw new Error("can not move to position");
  }

  // UI
  // @action.bound
  public select(pos: TCod) {
    if (this.isValidPosition(pos)) {
      this.deselectAll();
      this.chessBoard[pos.x][pos.y].selected = true;
    }
  }

  private deselectAll() {
    for (let row of this.chessBoard) {
      for (let x of row) {
        x.selected = false;
      }
    }
  }
}

export const game = new FourKnockChessGame();
