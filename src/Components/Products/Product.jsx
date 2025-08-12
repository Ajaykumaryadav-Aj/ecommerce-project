import React, { useState } from "react";

const Product = () => {
  const categories = [
    "All",
    "Mens",
    "Womans",
    "Kids",
    "New Arrival",
    "On Sale",
  ];
  const [activeTab, setActiveTab] = useState("All");
  return (
    <section className="max-w-[1300px] mx-auto px-12 py-10">
      {/* Tabs */}
      <div className="flex justify-center items-center mt-8 gap-3">
        {categories.map((category) => {
          return (
            <button
              key={category}
              className={` py-2 px-8 rounded-full text-lg
          ${activeTab === category ? "bg-blue-600 text-white" : "bg-zinc-100"}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Product;
