import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import './Char.less'
// import  {log} from ''
interface Props {
  style: React.CSSProperties;
}

const Char: React.FC<React.PropsWithChildren<Props>> = ({
  style,
  children,
}) => {
  // const [loading, setLoading] = useState(false)
  return (
    <div className="char" style={style}>
      {children}
    </div>
  );
};

export default React.memo(Char);
