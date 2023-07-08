async function logFontData() {
  try {
    const availableFonts = await window.queryLocalFonts();
    for (const fontData of availableFonts) {
      console.log(fontData.postscriptName);
      console.log(fontData.fullName);
      console.log(fontData.family);
      console.log(fontData.style);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Picker } from "antd-mobile";
import { log } from "../../../common/utils/debug";
import DebugPanel from "../../../common/components/DebugPanel";
// import './FontPicker.less'
// import  {log} from ''
interface Props {}

const FontPicker: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)

  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const getFonts = async () => {
      try {
        if ("queryLocalFonts" in window) {
          let fonts = await window.queryLocalFonts?.();
          log("fonts", fonts);
          setFonts(
            fonts.map((f) => {
              const name = f?.fullName;
              return { label: name, value: name, key: name };
            })
          );
        } else {
          setFonts([]);
        }
      } catch (e) {
        log(e);
        setFonts([]);
      }
    };
    getFonts();
  }, []);
  return (
    <div className="FontPicker">
      <h3>FontPicker</h3>
      <Picker columns={fonts}></Picker>
      <DebugPanel>{fonts}</DebugPanel>
    </div>
  );
};

export default FontPicker;
