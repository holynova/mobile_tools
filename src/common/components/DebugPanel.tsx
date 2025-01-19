import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import {} from "antd";
// import './DebugPanel.less'
// import  {log} from ''
interface Props {
  data?: any;
}
const style = {
  fontSize: "12px",
  background: "#ffe",
  overflow: "auto",
  maxHeight: "300px",
};

const DebugPanel: React.FC<React.PropsWithChildren<Props>> = ({
  data,
  children,
}) => {
  // const [loading, setLoading] = useState(false)
  const value = children || data;
  return (
    <pre style={style} className="DebugPanel">
      {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
    </pre>
  );
};

export default DebugPanel;
