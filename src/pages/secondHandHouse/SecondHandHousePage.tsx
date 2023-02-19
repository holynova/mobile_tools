import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Form, Input, SafeArea, Switch } from "antd-mobile";
import DebugPanel from "../../common/components/DebugPanel";
import {
  HouseCalculator,
  Params,
  Unit,
} from "./utils/SecondHandHouseCalculator";
import { useForm } from "_rc-field-form@1.27.4@rc-field-form";
// import './SecondHandHouse.less'
// import  {log} from ''

interface Props {}
const c = new HouseCalculator();
const initialValue: Params = {
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

const formConfig = [
  { name: "totalPrice", label: "总价(万)", defaultValue: 450 },
  {
    name: "tradeCenterVerifiedPrice",
    label: "交易中心评估价(万)",
    defaultValue: 400,
  },
  { name: "isOverFiveYears", label: "满五年", defaultValue: true },
  { name: "isSellersOnlyHouse", label: "卖家唯一房屋", defaultValue: false },
  { name: "agencyFeeRate", label: "中介费费率(%)", defaultValue: 2 },
  { name: "area", label: "面积(平方米)", defaultValue: 55 },
  { name: "isNormalHouse", label: "普通住宅", defaultValue: false },
  {
    name: "isPublicHouseFirstTrade",
    label: "售后公房首次交易",
    defaultValue: true,
  },
  { name: "buyPrice", label: "卖家买入价格(万)", defaultValue: 50 },
  { name: "downPaymentPercentage", label: "首付比例(%)", defaultValue: 35 },
  { name: "isBuyerOnlyHouse", label: "买家首套住房", defaultValue: true },
];
const SecondHandHouse: React.FC<Props> = (props) => {
  const [result, setResult] = useState<Unit>();
  const [input, setInput] = useState<Params>();
  const onChange = useCallback((changed, newInput) => {
    setInput(newInput);
    setResult(c.go(newInput));
  }, []);

  const [myForm] = Form.useForm();
  const renderInputPart = useCallback(() => {
    return (
      <Form
        layout="horizontal"
        initialValues={initialValue}
        onValuesChange={onChange}
      >
        {formConfig.map((x) => {
          if (x.name.startsWith("is")) {
            return (
              <Form.Item
                name={x.name}
                label={x.label}
                key={x.label}
                valuePropName="checked"
              >
                <Switch></Switch>
              </Form.Item>
            );
          } else {
            return (
              <Form.Item name={x.name} label={x.label} key={x.label}>
                <Input type={"number"} placeholder="请输入数字"></Input>
              </Form.Item>
            );
          }
        })}
      </Form>
    );
  }, []);

  const resultPart = <DebugPanel data={{ input, result }}></DebugPanel>;
  const settingPart = 3;
  return (
    // <SafeArea position="top">
    <div className="SecondHandHouse">
      <h3>SecondHandHouse</h3>
      {renderInputPart()}
      {resultPart}
    </div>
    // </SafeArea>
  );
};

export default SecondHandHouse;
