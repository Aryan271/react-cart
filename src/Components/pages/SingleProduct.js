import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const history = useNavigate();

  const { cart, setCart } = useContext(CartContext);
  const [addBtn, toggleAddBtn] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pizza-rest-api.onrender.com/api/products/${params._id}`)
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      )
      .then((product) => {
        setProduct(product);
      });
  }, [params._id]);

  const addToCart = (productId) => {
    let _cart = { ...cart };

    if (!_cart.items) {
      _cart.items = {};
    }

    if (!_cart.items[productId]) {
      _cart.items[productId] = 0;
    }

    _cart.items[productId] += 1;
    _cart.totalItems += 1;

    toggleAddBtn(true);

    setCart(_cart);

    setTimeout(() => {
      toggleAddBtn(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-12">
      <button className="mb-12 font-bold" onClick={() => history(-1)}>
        Back
      </button>
      <div className="flex">
        <img src="\images\peproni.jpg" alt="" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">Rs {product.price}</div>
          <button
            disabled={addBtn}
            onClick={() => {
              addToCart(product._id);
            }}
            className={`${
              addBtn ? "bg-green-500" : "bg-yellow-500"
            } py-1 px-8 rounded-full font-bold mt-4`}
          >
            {`${addBtn ? "Added" : "Add"} to Cart`}
          </button>
        </div>
      </div>
    </div>
  );
}
