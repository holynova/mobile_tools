import { useState } from "react";
import HomePage from "./pages/HomePage";
import "./App.css";
import SecondHandHouse from "./pages/secondHandHouse/SecondHandHousePage";

function App() {
  return (
    <div className="App">
      <SecondHandHouse></SecondHandHouse>
      {/* <HomePage></HomePage>; */}
    </div>
  );
}

export default App;
