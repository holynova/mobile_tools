import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import "./MagicHourInput.scss";
import DebugPanel from "../../../common/components/DebugPanel";
import { Radio, Space } from "antd-mobile";
interface Props {
  onChange: (value: number[]) => void;
}
const getOptions = (input: string) => {
  // 965,  10105, 007, 1095
  let len = input.length;
  let options = [];
  if (len === 3) {
    options.push(input.split(""));
  } else if (len === 4) {
    options.push([input.slice(0, 1), input.slice(1, 3), input.slice(3, 4)]);
    options.push([input.slice(0, 2), input.slice(2, 3), input.slice(3, 4)]);
  } else if (len === 5) {
    options.push([input.slice(0, 2), input.slice(2, 4), input.slice(4, 5)]);
  }
  const isValidBit = (bit: string, min = 0, max = 12) => {
    if (
      bit &&
      bit.length > 0 &&
      bit.length <= 2 &&
      !bit?.startsWith("0") &&
      Number(bit) >= min &&
      Number(bit) <= max
    ) {
      return true;
    }
    return false;
  };
  const isValidGroup = (group: string[]) => {
    if (group.length === 3) {
      const [start, end, dayCount] = group;
      return (
        isValidBit(start, 0, 12) &&
        isValidBit(end, 0, 12) &&
        isValidBit(dayCount, 0, 7)
      );
    }
    return false;
  };

  return options
    .filter((option) => isValidGroup(option))
    .map((option) => {
      return option.map((bit) => Number(bit));
    });
};

// inputText -> options -> selectedOptionIndex

const MagicHourInput: React.FC<Props> = (props) => {
  const [inputText, setInputText] = useState("996");
  const options = useMemo(() => getOptions(inputText), [inputText]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  useEffect(() => {
    if (options.length <= 0) {
      setSelectedOptionIndex(-1);
      props?.onChange([]);
    } else {
      setSelectedOptionIndex(0);
      props?.onChange(options[0]);
    }
  }, [options]);

  const renderRadio = useCallback(() => {
    return (
      <Radio.Group
        value={selectedOptionIndex}
        onChange={(index) => {
          setSelectedOptionIndex(index);
          props?.onChange(options[index]);
        }}
      >
        <Space direction="vertical" className="magic-hour-input-radio-part">
          {options.map((option, index) => {
            return (
              <Radio
                key={option.join(",")}
                value={index}
                className="magic-hour-input-radio"
              >
                {`上午${option[0]}点上班, 下午${option[1]}点下班, 每周${option[2]}天`}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );
  }, [options, selectedOptionIndex, props?.onChange]);

  return (
    <div className="MagicHourInput">
      <div className="tip">请输入你的工作时间, 如 965, 996, 10105, 1095</div>
      <input
        autoFocus
        className="main-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="请输入"
      />
      {renderRadio()}
    </div>
  );
};

export default MagicHourInput;
