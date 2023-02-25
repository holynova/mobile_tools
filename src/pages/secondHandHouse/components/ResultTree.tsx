import F6 from "@antv/f6";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import DebugPanel from "../../../common/components/DebugPanel";
import {
  DecompositionTreeGraph,
  G6TreeGraphData,
  TreeGraphData,
} from "@ant-design/graphs";
import { PriceNode } from "../utils/SecondHandHouseCalculator";

// import './ResultTree.less'
// import  {log} from ''
interface Props {
  data: any;
}

interface Data {
  id: string;
  value: {
    title: string;
    items: Array<{
      text: string;
      value: string;
      icon: string;
    }>;
  };
  children: Data[];
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    background: "pink",
  },
};

const formatData = (data: PriceNode): Data => {
  const loop = (node: PriceNode): Data => {
    if (!node) {
      return null;
    }
    // let x = node;
    // let desc = `${x.base}万 x ${x.rate}% = ${x.result}万`;
    // if (typeof x.base === "undefined" || typeof x.rate === "undefined") {
    //   desc = "";
    // }
    const items = [{ text: "总价", value: `${node.result}万`, icon: "" }];
    if (typeof node.base !== "undefined") {
      items.push({ text: "基数", value: `${node.base}万`, icon: "" });
    }
    if (typeof node.rate !== "undefined") {
      items.push({ text: "费率", value: `${node.rate}%`, icon: "" });
    }
    const res: Data = {
      id: node.name,
      value: {
        title: `${node.name}: ${node.result} 万`,
        items,
      },
      children: (node?.children ?? []).map((x) => loop(x)).filter((x) => x),
    };
    return res;
  };
  return loop(data);
};

const ResultTree: React.FC<Props> = (props) => {
  const config = useMemo(() => {
    const res = {
      data: formatData(props?.data) as TreeGraphData,
      markerCfg: (cfg: any) => {
        const { children } = cfg;
        return {
          show: children?.length,
        };
      },
      behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
    };
    return res;
  }, [props.data]);

  return (
    <div className="ResultTree" style={styles.wrapper}>
      <DecompositionTreeGraph {...config}></DecompositionTreeGraph>;
    </div>
  );
};

export default ResultTree;
