import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  Form,
  Input,
  SafeArea,
  Switch,
  List,
  Divider,
  CapsuleTabs,
  NavBar,
  Checkbox,
} from "antd-mobile";
import DebugPanel from "../../common/components/DebugPanel";
import {
  HouseCalculator,
  Params,
  PriceNode,
} from "./utils/SecondHandHouseCalculator";
import { isValidArray } from "../../common/utils";
import ResultTree from "./components/ResultTree";
import "./SecondHandHouse.scss";
import ResultList from "./components/ResultList";
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
  { isGroup: true, label: "价格" },
  { name: "totalPrice", label: "总价(万)", defaultValue: 450 },
  {
    name: "tradeCenterVerifiedPrice",
    label: "交易中心评估价(万)",
    defaultValue: 400,
  },
  { isGroup: true, label: "房子情况" },

  { name: "area", label: "面积(平方米)", defaultValue: 55 },
  { name: "isNormalHouse", label: "普通住宅", defaultValue: false },

  { isGroup: true, label: "卖家相关" },

  { name: "isOverFiveYears", label: "上次交易满五年", defaultValue: true },
  { name: "isSellersOnlyHouse", label: "卖家唯一房屋", defaultValue: false },
  { name: "buyPrice", label: "卖家买入价格(万)", defaultValue: 50 },
  {
    name: "isPublicHouseFirstTrade",
    label: "售后公房首次交易",
    defaultValue: true,
  },

  { isGroup: true, label: "买家相关" },
  { name: "agencyFeeRate", label: "中介费费率(%)", defaultValue: 2 },
  { name: "downPaymentPercentage", label: "贷款首付比例(%)", defaultValue: 35 },
  { name: "isBuyerOnlyHouse", label: "买家首套住房", defaultValue: true },
];

const SecondHandHouse: React.FC<Props> = (props) => {
  const [result, setResult] = useState<PriceNode>();
  const [input, setInput] = useState<Params>();

  useEffect(() => {
    setResult(c.go(initialValue));
  }, []);

  const onChange = useCallback((changed, newInput) => {
    setInput(newInput);
    setResult(c.go(newInput));
  }, []);

  const [myForm] = Form.useForm();

  const renderFormPart = useCallback(() => {
    return (
      <Form
        style={{ width: "100%", background: "#eee", padding: "10px 0" }}
        layout="horizontal"
        initialValues={initialValue}
        onValuesChange={onChange}
        // mode="card"
      >
        {formConfig.map((x) => {
          if ("isGroup" in x) {
            if (x.isGroup) {
              return <Form.Header key={x.label}>{x.label}</Form.Header>;
            }
          }

          if (x.name.startsWith("is")) {
            return (
              <Form.Item
                name={x.name}
                label={x.label}
                key={x.label}
                valuePropName="checked"
              >
                <Checkbox></Checkbox>
                {/* <Switch></Switch> */}
              </Form.Item>
            );
          } else {
            return (
              <Form.Item
                name={x.name}
                label={x.label}
                key={x.label}
                // childElementPosition="right"
              >
                <Input type={"number"} placeholder="请输入数字"></Input>
              </Form.Item>
            );
          }
        })}
      </Form>
    );
  }, []);

  const renderGraph = useCallback(() => {
    return <ResultTree data={result}></ResultTree>;
  }, [result]);

  return (
    <div className="SecondHandHouse">
      <NavBar back="返回" onBack={null}>
        二手房计算
      </NavBar>
      {renderFormPart()}
      <CapsuleTabs>
        <CapsuleTabs.Tab title="结果" key="number">
          <ResultList data={result}></ResultList>
        </CapsuleTabs.Tab>

        <CapsuleTabs.Tab title="图表" key="grape">
          {renderGraph()}
        </CapsuleTabs.Tab>

        {/* <CapsuleTabs.Tab title="debug" key="debug">
          <DebugPanel data={{ input, result }}></DebugPanel>
        </CapsuleTabs.Tab> */}
      </CapsuleTabs>
    </div>
  );
};

export default SecondHandHouse;
