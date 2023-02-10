import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);

  const [products, setProducts] = useState([]);

  let totalAmt = 0;

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
      return;
    }

    axios
      .post("http://localhost:5000/api/products/cart-items", {
        ids: Object.keys(cart.items),
      })
      .then(function (response) {
        togglePriceFetched(true);
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cart, priceFetched]);

  const incrementProduct = (productId) => {
    const oldQty = cart.items[productId];
    let _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrementProduct = (productId) => {
    const oldQty = cart.items[productId];

    let _cart = { ...cart };

    if (oldQty === 1) {
      deleteProduct(productId);
    } else {
      _cart.items[productId] -= 1;
    }

    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const deleteProduct = (productId) => {
    let _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= qty;

    setCart(_cart);
    setProducts(
      products.filter((curProduct) => {
        return curProduct._id !== productId;
      })
    );
  };

  const handleOrderNow = () => {
    setProducts([]);
    setCart({});
    window.alert("Order placed Successfully");
  };

  const getSum = (productId, price) => {
    const sum = cart.items[productId] * price;
    totalAmt += sum;
    return sum;
  };

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      {products.length === 0 ? (
        <img src="\images\empty-cart.png" alt="" />
      ) : (
        <>
          <h1 className="my-12 font-bold">Cart items</h1>
          <ul>
            {products.map((curProduct) => {
              let productId = curProduct._id;

              return (
                <li key={productId}>
                  <div className="flex items-center justify-between my-3">
                    <div className="flex items-center">
                      <img className="h-16" src={curProduct.image} alt="" />
                      <span className="font-bold ml-4 w-48">
                        {curProduct.name}
                      </span>
                    </div>
                    <div className="font-bold">
                      <button
                        onClick={() => {
                          decrementProduct(productId);
                        }}
                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                      >
                        -
                      </button>
                      <span className="px-4">{cart.items[productId]}</span>
                      <button
                        onClick={() => {
                          incrementProduct(productId);
                        }}
                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                      >
                        +
                      </button>
                    </div>
                    <span>Rs {getSum(productId, curProduct.price)}</span>
                    <button
                      onClick={() => {
                        deleteProduct(productId);
                      }}
                      className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <hr className="my-6" />
          <div className="text-right">
            <b>Grand Total:</b> Rs {totalAmt}
          </div>
          <div className="text-right mt-6">
            <button
              onClick={handleOrderNow}
              className="bg-yellow-500 rounded-full font-bold px-4 py-2 leading-none"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
