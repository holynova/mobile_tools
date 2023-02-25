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
} from "antd-mobile";
import DebugPanel from "../../common/components/DebugPanel";
import {
  HouseCalculator,
  Params,
  PriceNode,
} from "./utils/SecondHandHouseCalculator";
import { isValidArray } from "../../common/utils";
import ResultTree from "./components/ResultTree";
import mockTreeData from "./model/mockTreeData";
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

  const renderResultPart = useCallback(() => {
    interface Row extends PriceNode {
      level: number;
    }
    const flat = (input?: PriceNode): Row[] => {
      const res: Row[] = [];
      const loop = (node?: PriceNode, level?: number) => {
        if (node) {
          res.push({
            name: node.name,
            base: node?.base,
            rate: node?.rate,
            result: node.result,
            level,
          });
          if (isValidArray(node.children)) {
            node.children?.forEach((child) => {
              loop(child, level + 1);
            });
          }
        }
      };
      loop(input, 0);
      return res;
    };
    let res = flat(result);
    return (
      <List>
        {res.map((x) => {
          let desc = `${x.base}万 x ${x.rate}% = ${x.result}万`;
          if (typeof x.base === "undefined" || typeof x.rate === "undefined") {
            desc = "";
          }
          return (
            <List.Item key={x.name} extra={x.result} description={desc}>
              <span>{`${"----".repeat(x.level * 2)}${x.name}`}</span>
            </List.Item>
          );
        })}
      </List>
    );
  }, [result]);

  const renderGraph = useCallback(() => {
    return <ResultTree data={result}></ResultTree>;
  }, [result]);

  return (
    <div className="SecondHandHouse">
      <h3>SecondHandHouse</h3>
      {renderInputPart()}
      <Divider>结果</Divider>
      <CapsuleTabs>
        <CapsuleTabs.Tab title="数值" key="number">
          {renderResultPart()}
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="图形" key="grape">
          {renderGraph()}
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="debug" key="debug">
          <DebugPanel data={{ input, result }}></DebugPanel>
        </CapsuleTabs.Tab>
      </CapsuleTabs>
    </div>
  );
};

export default SecondHandHouse;
