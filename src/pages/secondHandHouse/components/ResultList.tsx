import { List } from "antd-mobile";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { isValidArray } from "../../../common/utils";
import { PriceNode } from "../utils/SecondHandHouseCalculator";
// import './ResultList.less'
// import  {log} from ''
interface Props {
  data: PriceNode;
}

interface Row extends PriceNode {
  level: number;
}

const flat = (input?: PriceNode): Row[] => {
  if (!input) {
    return [];
  }
  const res: Row[] = [];
  const loop = (node: PriceNode, level: number) => {
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

const ResultList: React.FC<Props> = (props) => {
  const renderResultPart = useCallback((result: PriceNode) => {
    let res = flat(result);
    return (
      <List>
        {res.map((x) => {
          let desc = `${x.base}万 x ${x.rate}% = ${x.result}万`;
          if (typeof x.base === "undefined" || typeof x.rate === "undefined") {
            desc = "";
          }
          return (
            <List.Item key={x.name} extra={`${x.result}万`} description={desc}>
              <span>{`${"----".repeat(x.level * 2)}${x.name}`}</span>
            </List.Item>
          );
        })}
      </List>
    );
  }, []);
  return <div className="ResultList">{renderResultPart(props?.data)}</div>;
};

export default ResultList;
