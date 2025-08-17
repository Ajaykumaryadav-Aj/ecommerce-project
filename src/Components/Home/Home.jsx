import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Product from "../Products/Product";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import products from "../Products/ProductList";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const changeNavbar = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", changeNavbar);
  }, []);

  // Handle Scrolling
  const handleScroll = () => {
    const section = document.getElementById("product-section");

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Cart And Wishlist show Tab Function
  const handlePanel = (tabName) => {
    setActivePanel((prev) => (prev === tabName ? null : tabName));
  };

  // ClosePanel Tab Function
  const handleClose = () => setActivePanel(null);

  // AddToCart Funtion
  const addToCart = (product) => {
    const alreadyAdded = cart.find(item=> item.id === product.id);
    if (alreadyAdded) {
      alert("Itme is already in the cart")
      return;
    }
    setCart([...cart,product]);
  };

  // Remove Items
  const removeItems = (product ) =>{
    setCart(cart.filter(item=> item.id !== product.id))
  }


   
 

  return (
    <div>
      {/* NavBar */}
      <Navbar
        handleScroll={handleScroll}
        setSearchTerm={setSearchTerm}
        isScrolled={isScrolled}
        handlePanel={handlePanel}
      />

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Product searchTerm={searchTerm} addToCart={addToCart} />

      {/* Cart  */}

      <Cart activePanel={activePanel} handleClose={handleClose} cart={cart} removeItems={removeItems} />

      {/* Wishlist Tab */}
      <Wishlist activePanel={activePanel} handleClose={handleClose} />
    </div>
  );
};

export default Home;
