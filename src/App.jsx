import React from "react";
import { Route, Routes } from "react-router-dom";
import Reproductor from "./components/Reproductor";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reproductor" element={<Reproductor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
