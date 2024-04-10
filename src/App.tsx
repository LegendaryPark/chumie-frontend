import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import Registration from "../src/components/Registration";
import Splash from "./components/Splash";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
