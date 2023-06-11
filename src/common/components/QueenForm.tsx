import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {} from "antd";
// import './QueenForm.less'
// import  {log} from ''
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

export interface ConfigItem {
  name: string;
  label: string;
  defaultValue?: boolean | string | number;
  isGroup?: boolean;
}

interface Props {
  config: ConfigItem[];
  onChange: (newValues: any) => void;
  initialValue: Record<string, any>;
}

const QueenForm: React.FC<Props> = ({ config, onChange, initialValue }) => {
  // const [loading, setLoading] = useState(false)

  const [myForm] = Form.useForm();

  const renderFormPart = useCallback(() => {
    return (
      <Form
        style={{ width: "100%", background: "#eee", padding: "10px 0" }}
        layout="horizontal"
        initialValues={initialValue}
        onValuesChange={(changed, newInput) => onChange(newInput)}
        // mode="card"
      >
        {config.map((x) => {
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

  return <div className="QueenForm">{renderFormPart()}</div>;
};

export default QueenForm;
