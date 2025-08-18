import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Product from "../Products/Product";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import products from "../Products/ProductList";
import OrderSummary from "../orderSummary/orderSummary";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderSummary, setOrderSummary] = useState(false);

  // Total Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const shippingFee = totalItems * 2;
  const orderTotal = subtotal + shippingFee;

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

  // QuantityIncrement
  const quantityIncrement = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // QuantityDecrement
  const quantityDecrement = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // AddToCart Funtion
  const addToCart = (product) => {
    const alreadyAdded = cart.find((item) => item.id === product.id);
    if (alreadyAdded) {
      alert("Itme is already in the cart");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  // Remove Items
  const removeItems = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return (
    <div>
      {/* NavBar */}
      <Navbar
        handleScroll={handleScroll}
        setSearchTerm={setSearchTerm}
        isScrolled={isScrolled}
        handlePanel={handlePanel}
        totalItems={totalItems}
      />

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Product searchTerm={searchTerm} addToCart={addToCart} />

      {/* Cart  */}

      <Cart
        activePanel={activePanel}
        handleClose={handleClose}
        cart={cart}
        removeItems={removeItems}
        quantityIncrement={quantityIncrement}
        quantityDecrement={quantityDecrement}
        subtotal={subtotal}
        shippingFee={shippingFee}
        orderTotal={orderTotal}
        setOrderSummary={setOrderSummary}
      />

      {/* Wishlist Tab */}
      <Wishlist activePanel={activePanel} handleClose={handleClose} />

      {/* OrderSummary */}
     {orderSummary &&  <OrderSummary
        cart={cart}
        subtotal={subtotal}
        shippingFee={shippingFee}
        orderTotal={orderTotal}
      />}
    </div>
  );
};

export default Home;
