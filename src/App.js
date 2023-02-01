import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import Products from "./Components/pages/Products";
import Navigation from "./Components/Navigation";

export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/products" element={<Products />}></Route>
        </Routes>
      </Router>
    </>
  );
}
