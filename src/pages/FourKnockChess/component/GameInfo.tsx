import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import FourKnockChess from "../FourKnockChess";
import { FourKnockChessGame } from "../model/FourKnockChess";
import { observer } from "mobx-react-lite";
// import {} from "antd";
// import './GameInfo.less'
// import  {log} from ''
interface Props {}

const GameInfo: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const scorePart = "scorePart";
  const nextMovePart = "nextMovePart";
  return (
    <div className="GameInfo">
      <h3>GameInfo</h3>
      <button>start</button>
      <p>{scorePart}</p>
      <p>{nextMovePart}</p>
    </div>
  );
};

export default observer(GameInfo);
