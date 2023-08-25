import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  Badge,
  HeartBroken,
  QuestionMark,
  Logout,
  ShoppingCart,
  Person,
  MenuOutlined,
  Close,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/Store/store";
import { logout } from "../../Features/authSlice";
import Search from "../Search/Search";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //dispatch
  const dispatch: AppDispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <>
      <div className="flex items-center flex-wrap md:flex-nowrap justify-between py-4 gap-4 sticky top-0 bg-white z-50">
        <a href="/" className="order-1 text-lg md:text-2xl font-bold">
          ShopCart
        </a>

        {/* features */}
        <div className="order-2 hidden md:flex gap-4 shrink-0">
          <a href="/" className="hover:bg-gray-200 hover:text-black">
            Categories
          </a>
          <a href="/" className="hover:bg-gray-200 hover:text-black">
            Deals
          </a>
          <a href="/" className="hover:bg-gray-200 hover:text-black">
            Whats new
          </a>
          <a href="/" className="hover:bg-gray-200 hover:text-black">
            Delivery
          </a>
        </div>

        {/* input section */}
        <Search />

        {/* Buttons */}
        <span className="flex items-center gap-3 order-2 md:order-4 relative">
          <button
            className="hover:bg-gray-200 hover:rounded-full w-10 h-10 flex items-center justify-center"
            // onBlur={() => setToggle(false)}
            onFocus={() => setToggle(true)}
          >
            <Tooltip title="profile">
              <Person />
            </Tooltip>
          </button>
          {toggle && (
            <div className="absolute top-12 -left-16 right-0   bg-gray-200 shadow-lg text-black  z-30 rounded-md overflow-hidden">
              <Link
                to="/"
                className="flex items-center gap-4 cursor-pointer  hover:bg-gray-700 hover:text-white px-2 py-2 z-30"
              >
                <span>
                  <Settings />
                </span>
                <p className="">Profile</p>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 cursor-pointer  hover:bg-gray-700 hover:text-white px-2 py-2 z-30"
              >
                <span>
                  <Badge />
                </span>
                <p className="">My order</p>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 cursor-pointer  hover:bg-gray-700 hover:text-white px-2 py-2 z-30"
              >
                <span>
                  <HeartBroken />
                </span>
                <p className="">Wishlist</p>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-4 cursor-pointer  hover:bg-gray-700 hover:text-white px-2 py-2 z-30"
              >
                <span>
                  <QuestionMark />
                </span>
                <p className="">Help</p>
              </Link>
              <Link
                to="/login"
                onClick={()=>dispatch(logout())}
                className="flex items-center gap-4 cursor-pointer  hover:bg-gray-700 hover:text-white px-2 py-2 z-30"
              >
                <span>
                  <Logout />
                </span>
                <p className="" onClick={() => dispatch(logout())}>
                  Logout
                </p>
              </Link>
            </div>
          )}
          <Link to="/cart">
            <button className="hover:bg-gray-200 hover:rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
              <Tooltip title="cart">
                <span className="material-symbols-outlined relative">
                  <ShoppingCart />
                  <span className="text-sm absolute -top-4 text-pink-600 ">
                    {items.length}
                  </span>
                </span>
              </Tooltip>
            </button>
          </Link>
        </span>

        {/* menu close and open */}
        <button
          className="md:hidden flex items-center"
          onFocus={() => setMenuOpen(true)}
        >
          <MenuOutlined />
        </button>
      </div>
      {/* menubar on mobile */}
      {isMenuOpen && (
        <>
          <div className="bg-black fixed top-0 bottom-0 left-0 right-32 z-50 text-white flex flex-col gap-3">
            <a
              href="/"
              className="hover:bg-gray-200 hover:text-black focus:bg-white px-3 py-3 mt-11"
            >
              Categories
            </a>
            <a
              href="/"
              className="hover:bg-gray-200 hover:text-black focus:bg-white px-3 py-3"
            >
              Deals
            </a>
            <a
              href="/"
              className="hover:bg-gray-200 hover:text-black focus:bg-white px-3 py-3"
            >
              Whats new
            </a>
            <a
              href="/"
              className="hover:bg-gray-200 hover:text-black focus:bg-white px-3 py-3"
            >
              Delivery
            </a>
          </div>
          {/* overlay */}
          <div
            className="bg-black/75 absolute inset-0 text-end z-50"
            // onClick={() => setMenuOpen(false)}
          >
            <Close
              className="text-gray-300 mr-24 mt-5"
              onClick={() => setMenuOpen(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
