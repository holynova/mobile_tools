import { useState } from "react";
import HomePage from "./pages/HomePage";
import "./App.css";
import SecondHandHouse from "./pages/secondHandHouse/SecondHandHousePage";
import ResultTree from "./pages/secondHandHouse/components/ResultTree";
import {
  mockTreeData,
  mockTreeData2,
} from "./pages/secondHandHouse/model/mockTreeData";

function App() {
  return (
    <div className="App">
      <SecondHandHouse></SecondHandHouse>
      {/* <HomePage></HomePage>; */}
      {/* <ResultTree data={mockTreeData2}></ResultTree> */}
    </div>
  );
}

export default App;
