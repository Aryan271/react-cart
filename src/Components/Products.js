import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Product from "./Product";
import { CartContext } from "./CartContext";

export default function Products() {
  const { name } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.log(error);
        }
      )
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products {name}</h1>
      <div className="grid grid-cols-5 my-8 gap-24">
        {products.map((curProd) => {
          return <Product product={curProd} key={curProd._id} />;
        })}
      </div>
    </div>
  );
}
