import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Navigation() {
  const { cart } = useContext(CartContext);

  const cartLogoStyle = {
    background: "#F59E0D",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "40px",
  };

  return (
    <>
      <nav className="container py-4 mx-auto flex justify-between">
        <Link to="/">
          <img style={{ height: 45 }} src="\images\logo.png" alt="logo" />
        </Link>
        <ul className="flex items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="ml-6">
            <Link to="/about">About</Link>
          </li>
          <li className="ml-6">
            <Link to="/products">Products</Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div style={cartLogoStyle} className="flex">
                <span>{cart.totalItems ? cart.totalItems : ""}</span>
                <img className="ml-2" src="\images\cart.png" alt="cart" />
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
