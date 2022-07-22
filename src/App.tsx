import type { Component } from "solid-js";
import Nav from "./Components/Nav";
import { Route, Routes } from "solid-app-router";
import AddUser from "./Components/AddUser";
import DisplayUser from "./Components/DisplayUser";

const App: Component = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/display" element={<DisplayUser />} />
      </Routes>
    </div>
  );
};

export default App;
