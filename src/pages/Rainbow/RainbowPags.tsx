import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import {
  getGradientFromColorList,
  getHSLGradient,
  getSteps,
  rainbowColors,
} from "./rainbow";
import "./RainbowPage.scss";
import DebugPanel from "../../common/components/DebugPanel";
import { shuffle } from "../../common/utils/rand";
import { log } from "../../common/utils/debug";
// import  {log} from ''
interface Props {}
const allColors = getGradientFromColorList(rainbowColors, 100);
const RainbowPage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const debugPart = <DebugPanel>{allColors.length}</DebugPanel>;

  const renderColors = useCallback((colors: string[]) => {
    return (
      <div className="color-group">
        {colors?.map((c) => {
          return (
            <div
              key={c}
              className="color-item"
              style={{ backgroundColor: c }}
            ></div>
          );
        })}
      </div>
    );
  }, []);

  const renderShuffle = useCallback(() => {
    const baseColors = shuffle(rainbowColors);
    return [1, 2, 3, 5, 10, 20, 50, 100].map((step) => {
      return renderColors(getGradientFromColorList(baseColors, step));
    });
  }, []);

  const renderHSL = useCallback(() => {
    return getSteps(0, 100, 5).map((lightness) => {
      return renderColors(getHSLGradient(0, 360, 100, lightness, 1000));
    });
  }, []);

  return (
    <div className="RainbowPage">
      <h3>RainbowPage</h3>
      {/* {renderShuffle()} */}
      {renderHSL()}
      {debugPart}
    </div>
  );
};

export default RainbowPage;
