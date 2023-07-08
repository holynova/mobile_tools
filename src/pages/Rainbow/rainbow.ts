import { isValidArray } from "../../common/utils";

export const getSteps = (
  start = 0,
  end = 100,
  steps = 100,
  format?: (v: number) => any
) => {
  const step = (end - start) / steps;
  const res = [];
  for (let i = 0; i < steps; i++) {
    res.push(i * step);
  }
  if (typeof format === "function") {
    return res.map((x) => format(x));
  }
  return res;
};

function gradientColors(startColor, endColor, steps) {
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);

  const rStep = (endRGB.r - startRGB.r) / steps;
  const gStep = (endRGB.g - startRGB.g) / steps;
  const bStep = (endRGB.b - startRGB.b) / steps;

  const gradient = [];

  for (let i = 0; i <= steps; i++) {
    const r = Math.round(startRGB.r + rStep * i);
    const g = Math.round(startRGB.g + gStep * i);
    const b = Math.round(startRGB.b + bStep * i);

    const color = rgbToHex(r, g, b);
    gradient.push(color);
  }

  return gradient;
}

function hexToRGB(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}

// 示例用法
const startColor = "#FF0000"; // 红色
const endColor = "#0000FF"; // 蓝色
const steps = 10; // 渐变步数

const gradient = gradientColors(startColor, endColor, steps);
console.log(gradient);

export const rainbowColors = [
  "#FF0000", // 红色
  "#FF7F00", // 橙色
  "#FFFF00", // 黄色
  "#00FF00", // 绿色
  "#0000FF", // 蓝色
  "#4B0082", // 靛蓝色
  "#8B00FF", // 紫色
];

function hslToRgb(hue, saturation, lightness) {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// // 示例用法
// const hue = 200; // 色相（0-360）
// const saturation = 50; // 饱和度（0-100）
// const lightness = 70; // 亮度（0-100）

// const rgb = hslToRgb(hue, saturation, lightness);
// console.log(rgb);

export const getGradientFromColorList = (
  colors: string[],
  steps = 100
): string[] => {
  const res: string[][] = [];
  if (!isValidArray(colors)) {
    return [];
  }
  colors.forEach((c, i) => {
    const isLast = i === colors.length - 1;
    if (isLast) {
      return res;
    }
    const start = c;
    const end = colors[i + 1];
    res.push(gradientColors(start, end, steps));
  });
  return res.flat(1);
};

export const getHSLGradient = (
  startHue = 0,
  endHue = 360,
  saturation = 100,
  lightness = 50,
  steps = 100
): string[] => {
  return getSteps(
    startHue,
    endHue,
    steps,
    (v) => `hsl(${v}, ${saturation}%, ${lightness}%)`
  );
};
