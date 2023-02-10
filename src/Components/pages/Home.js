import React from "react";
import Products from "../Products";

export default function Home() {
  return (
    <>
      <div className="hero py-16">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-1/2">
            <h6 className="text-lg">Are you Hungry?</h6>
            <h1 className="text-3xl md:text-6xl font-bold">Don't wait</h1>
            <button className="px-6 py-2 mt-4 rounded-full text-white bg-yellow-500 font-bold hover:bg-yellow-600">
              Order now
            </button>
          </div>
          <div className="w-1/2">
            <img className="w-100" src="\images\pizza.png" alt="hero-img" />
          </div>
        </div>
      </div>
      <div className="pb-24">
        <Products />
      </div>
    </>
  );
}
