import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {} from "antd";
import "./OverTimeResult.scss";
import { formatNumber } from "../overTimeUtils";
// import  {log} from ''
interface Props {
  data: Item[];
}

export interface Item {
  label: string;
  desc: string;
  standard: number;
  current: number;
  unit: string;
}
const OverTimeResult: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)

  return (
    <div className="OverTimeResult">
      <div className="row header">
        <span>项目</span>
        <span>理论值</span>
        <span>实际值</span>
      </div>
      {props.data.map((x) => {
        return (
          <div className="row" key={x.label}>
            <span>{`${x.label}(${x.unit})`}</span>
            <span>{formatNumber(x.standard)}</span>
            <span>{formatNumber(x.current)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OverTimeResult;
