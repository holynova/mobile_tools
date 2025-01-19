import { RouteObject } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SecondHandHouse from "./pages/secondHandHouse/SecondHandHousePage";
import StringAlchemyPage from "./pages/stringAlchemy/StringAlchemyPage";
import OverTimeWorkPage from "./pages/overTimeWork/OverTimeWorkPage";
import FourKnockChess from "./pages/FourKnockChess/FourKnockChess";
import CharStackPage from "./pages/CharStack/CharStack";
import RainbowPage from "./pages/Rainbow/RainbowPags";

const routes: RouteObject[] = [
  {
    name: "叠字",
    path: "/charStack",
    element: <CharStackPage></CharStackPage>,
  },
  {
    name: "彩虹",
    path: "/rainbow",
    element: <RainbowPage></RainbowPage>,
  },
  {
    name: "四顶",
    path: "/chess",
    element: <FourKnockChess />,
  },
  {
    name: "996加班计算器",
    path: "/overtime",
    element: <OverTimeWorkPage></OverTimeWorkPage>,
  },
  {
    name: "二手房计算器",
    path: "/house",
    element: <SecondHandHouse></SecondHandHouse>,
  },
  {
    name: "弹幕附魔",
    path: "/string",
    element: <StringAlchemyPage></StringAlchemyPage>,
  },
  {
    name: "home",
    path: "/",
    element: <HomePage></HomePage>,
  },
];

export default routes;
