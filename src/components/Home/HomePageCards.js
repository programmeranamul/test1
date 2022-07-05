import React, { useState } from "react";
import style from "../../styles/home/home_page_card.module.css";
import ProductsCard from "./ProductsCard";


const HomePageCards = ({ products, loading }) => {
  const [cart, setCart] = useState([]);


  const handleClick = (product) => {
    if (cart.indexOf(product) !== -1) return;
    setCart([...cart, product]);

  };

  return (
    <section className={style.section}>
      <div className="container">
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          products.map((product, index) => (
            <ProductsCard
              product={product}
              key={index}
              handleClick={handleClick}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HomePageCards;
