import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import QueenForm, { ConfigItem } from "../../common/components/QueenForm";
import DebugPanel from "../../common/components/DebugPanel";
import { calculateOverTimePerWeek, getResult } from "./overTimeUtils";
import OverTimeResult from "./components/OverTimeResult";
import MagicHourInput from "./components/MagicHourInput";
import { isValidArray } from "../../common/utils";
// import {} from "antd";
// import './OverTimeWorkPage.less'
// import  {log} from ''
interface Props {}

const formConfig: ConfigItem[] = [
  // {
  //   isGroup: true,
  //   label: "工作时间",
  // },
  // {
  //   label: "上班时间",
  //   defaultValue: 9,
  //   name: "startTime",
  // },
  // {
  //   label: "下班时间",
  //   defaultValue: 6,
  //   name: "endTime",
  // },
  // {
  //   label: "每周工作天数",
  //   defaultValue: 5,
  //   name: "workDays",
  //   isGroup: false,
  // },
  {
    label: "午休时长(小时)",
    defaultValue: 1,
    name: "restTimePerDay",
    isGroup: false,
  },
  {
    label: "月薪",
    defaultValue: 10000,
    name: "monthSalary",
    isGroup: false,
  },
  {
    label: "大小周",
    defaultValue: false,
    name: "isBigSmallWeek",
    isGroup: false,
  },
];

const getInitialValue = (configs: ConfigItem[]) => {
  let res = {};
  configs.forEach((config) => {
    if (config?.name) {
      res[config.name] = config.defaultValue;
    }
  });
  return res;
};

const initialValue = getInitialValue(formConfig);

const OverTimeWorkPage: React.FC<Props> = (props) => {
  const [values, setValues] = useState(initialValue);

  useEffect(() => {}, []);
  return (
    <div className="OverTimeWorkPage">
      <h3>996计算器</h3>
      <MagicHourInput
        onChange={(value) => {
          if (isValidArray(value)) {
            setValues((prev) => {
              return {
                ...prev,
                startTime: value[0],
                endTime: value[1],
                workDays: value[2],
              };
            });
          }
        }}
      />
      <QueenForm
        config={formConfig}
        initialValue={initialValue}
        onChange={(values) =>
          setValues((prev) => {
            return { ...prev, ...values };
          })
        }
      />
      <OverTimeResult data={getResult(values, values)}></OverTimeResult>
    </div>
  );
};

export default OverTimeWorkPage;
