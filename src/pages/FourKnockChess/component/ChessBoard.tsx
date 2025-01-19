import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { FourKnockChessGame } from "../model/FourKnockChess";
import Position from "./Position";
import { observer } from "mobx-react-lite";
// import {} from "antd";
// import './ChessBoard.less'
// import  {log} from ''
interface Props {
  colCount?: number;
  rowCount?: number;
  game: FourKnockChessGame;
}

const width = 100;

const ChessBoard: React.FC<Props> = ({ game }) => {
  // const positions = game.generatePositions();

  // const [loading, setLoading] = useState(false)
  console.log("kkk1", game.getChessBoard());
  return (
    <div className="ChessBoard" style={{ position: "relative" }}>
      {/* <h3>ChessBoard</h3> */}
      {game
        .getChessBoard()
        .flat(2)
        ?.map((pos) => {
          return (
            <Position
              info={pos}
              key={`${pos.x}_${pos.y}`}
              max={4}
              width={width}
            ></Position>
          );
        })}
    </div>
  );
};

ChessBoard.defaultProps = {
  colCount: 4,
  rowCount: 4,
};

export default observer(ChessBoard);
