import { RouteObject } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SecondHandHouse from "./pages/secondHandHouse/SecondHandHousePage";
import StringAlchemyPage from "./pages/stringAlchemy/StringAlchemyPage";
import OverTimeWorkPage from "./pages/overTimeWork/OverTimeWorkPage";

const routes: RouteObject[] = [
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
