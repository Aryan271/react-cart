import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import ProductsPage from "./Components/pages/ProductsPage";
import Navigation from "./Components/Navigation";
import Cart from "./Components/pages/Cart";
import SingleProduct from "./Components/pages/SingleProduct";
import { CartContext } from "./Components/CartContext";
import { getCart, storeCart } from "./helpers";

export default function App() {
  const [cart, setCart] = useState({});

  // fetch cart from local storage to persist data using useEffect
  useEffect(() => {
    // fetch cart from window local storage
    getCart().then((cart) => setCart(JSON.parse(cart)));
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/products" element={<ProductsPage />}></Route>
            <Route
              exact
              path="/products/:_id"
              element={<SingleProduct />}
            ></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
          </Routes>
        </CartContext.Provider>
      </Router>
    </>
  );
}
