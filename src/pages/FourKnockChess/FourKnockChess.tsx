import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import GameInfo from "./component/GameInfo";
import ChessBoard from "./component/ChessBoard";
import { FourKnockChessGame, game } from "./model/FourKnockChess";
// import {} from "antd";
import "./FourKnockChess.scss";
import { observer } from "mobx-react-lite";
// import  {log} from ''
interface Props {}

// const game = new FourKnockChessGame();
// game.startGame();
// const positions = game.generatePositions();

const FourKnockChess: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  return (
    <>
      <h3>FourKnockChess</h3>
      <div className="FourKnockChess">
        <div className="left">
          <ChessBoard game={game}></ChessBoard>
        </div>
        <div className="right">
          <GameInfo></GameInfo>
        </div>
      </div>
    </>
  );
};

export default observer(FourKnockChess);
