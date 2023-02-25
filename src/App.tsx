import { useState } from "react";
import HomePage from "./pages/HomePage";
import "./App.css";
import SecondHandHouse from "./pages/secondHandHouse/SecondHandHousePage";
import ResultTree from "./pages/secondHandHouse/components/ResultTree";
import {
  mockTreeData,
  mockTreeData2,
} from "./pages/secondHandHouse/model/mockTreeData";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

interface Props {}

const router = createBrowserRouter(routes);

const App: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)r
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
