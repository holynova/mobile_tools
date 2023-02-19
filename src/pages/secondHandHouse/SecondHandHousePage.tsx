import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Form } from "antd-mobile";
import DebugPanel from "../../common/components/DebugPanel";
import { HouseCalculator, Params } from "./utils/SecondHandHouseCalculator";
// import './SecondHandHouse.less'
// import  {log} from ''

interface Props {}
const c = new HouseCalculator();
const input: Params = {
  totalPrice: 450,
  tradeCenterVerifiedPrice: 400,
  isOverFiveYears: true,
  isSellersOnlyHouse: false,
  agencyFeeRate: 2,
  area: 55,
  isNormalHouse: false,
  isPublicHouseFirstTrade: true,
  buyPrice: 50,
  downPaymentPercentage: 35,
  isBuyerOnlyHouse: true,
};
const SecondHandHouse: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const inputPart = <Form></Form>;
  const resultPart = 2;
  const settingPart = 3;
  return (
    <div className="SecondHandHouse">
      <h3>SecondHandHouse</h3>
      {inputPart}
      <DebugPanel data={{ input, result: c.go(input) }}></DebugPanel>
    </div>
  );
};

export default SecondHandHouse;
