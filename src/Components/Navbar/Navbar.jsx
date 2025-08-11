import React from "react";
import Logo from "../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { RiShoppingBag4Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <header className="bg-red-400">
      <nav className="max-w[1300px] px-12 mx-auto h-[14vh] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex w-15 h-15 bg-zinc-100 rounded-full">
          <img src={Logo} className="w-full h-full object-contain p-2" />
        </a>

        {/* { Nav Actions } */}
        <div className="flex items-center gap-x-5">
          {/* { search bar} */}
          <div className="flex items-center p-1 rounded-full border-2 border-blue-600" >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="search..."
              autoComplete="off"
              className=" h-[5vh] pl-4 "
            />
            <button className= " flex justify-center items-center w-8 h-8 rounded-full bg-blue-600 text-white">
              <IoSearch />
            </button>
          </div>

          {/* {Icons} */}

          <button className="text-[1.6rem] text-zinc-800">
            <GoHeartFill />
          </button>
          <button className="text-[1.6rem] text-zinc-800">
            <RiShoppingBag4Fill />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
