import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";

import { Picker } from "antd-mobile";
import { log } from "../../../common/utils/debug";

export const useFontPicker = () => {
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

  const show = useCallback(() => {
    return Picker.prompt(fonts ?? []);
  }, [fonts]);

  return { show } as const;
};
