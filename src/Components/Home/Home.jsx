import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Product from "../Products/Product";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import products from "../Products/ProductList";
import OrderSummary from "../orderSummary/orderSummary";
import OrderPlace from "../OrderPlace/OrderPlace";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isScrolled, setIsScrolled] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [cart, setCart] = useState(() => {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : [];
  });
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [wishlist, setWishlist] = useState(()=>{
    const storeWishlist = localStorage.getItem('wishlist');
    return storeWishlist ? JSON.parse(storeWishlist) :
[]  });

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

  // Save Items to local Storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [cart,wishlist]);

  // // get Item Local storage
  // const getCart= ()=>{
  //   const storeCart = localStorage.getItem('cart')
  //   return storeCart ? JSON.parse(storeCart) :[]
  // }

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

  // Wishlist Function

  const addToWishlist = (product) => {
    const isInwishlist = wishlist.some((item) => item.id == product.id);
    if (isInwishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      const addDate = new Date().toLocaleDateString("en-GB");
      setWishlist([...wishlist, { ...product, addDate }]);
    }
  };

  // Remove Items
  const removeItems = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
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
        wishlist={wishlist}
      />

      {/* Banner */}
      <Banner />

      {/* Product */}
      <Product
        searchTerm={searchTerm}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
      />

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
      <Wishlist
        activePanel={activePanel}
        handleClose={handleClose}
        wishlist={wishlist}
        addToCart={addToCart}
        clearWishlist={clearWishlist}
      />

      {/* OrderSummary */}
      {orderSummary && (
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shippingFee={shippingFee}
          orderTotal={orderTotal}
          setOrderPlaced={setOrderPlaced}
          setOrderSummary={setOrderSummary}
          setCart={setCart}
        />
      )}

      {/* Order Placed */}
      {orderPlaced && <OrderPlace setOrderPlaced={setOrderPlaced} />}
    </div>
  );
};

export default Home;
