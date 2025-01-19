import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {} from "antd";
import "./Position.scss";
import { TPosition, TPositionValue, game } from "../model/FourKnockChess";
import { observer } from "mobx-react-lite";
// import  {log} from ''
interface Props {
  info: TPosition;
  max: number;
  width: number;
}

const cellStyle: React.CSSProperties = {};

const Position: React.FC<Props> = ({ info, width, max }) => {
  const { x, y, value, selected } = info;
  // const [loading, setLoading] = useState(false)
  const [cnt, setCnt] = useState(0);
  // const cellWidth = width / 4;

  const cellStyle: React.CSSProperties = useMemo(() => {
    const borderWidth = 1;
    return {
      width: width / 2 - borderWidth * 2,
      height: width / 2 - borderWidth * 2,
    };
  }, [width]);

  if (!info) {
    return null;
  }
  return (
    <div
      className="Position"
      style={{
        left: x * width,
        top: y * width,
        background: selected ? "pink" : "#fff",
        width,
      }}
      onClick={() => {
        console.log(`selecte, x=${x} y=${y}`);
        game.select({ x, y });
      }}
    >
      <h3
        style={{ position: "absolute" }}
      >{`(${x},${y})\n${value} ${selected}`}</h3>
      {/* <div className="back"></div> */}
      {/* <h3>Position</h3> */}
      <h3 className="status">{value === "black" ? "⚫" : ""}</h3>
      <h3 className="status">{value === "white" ? "⚪" : ""}</h3>
      <div className="cell border-right border-bottom" style={cellStyle}></div>
      <div className="cell border-left border-bottom" style={cellStyle}></div>
      <div className="cell border-right border-top" style={cellStyle}></div>
      <div className="cell border-left border-top" style={cellStyle}></div>
    </div>
  );
};

export default observer(Position);
