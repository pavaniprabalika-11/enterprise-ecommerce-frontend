import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserEmail } from "../utils/auth";
import logo from "../assets/ellora.jpeg";

import {
  FaHeart,
  FaShoppingBag,
  FaBoxOpen,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [search, setSearch] = useState("");

const handleSearch = (e) => {
  if (e.key === "Enter" && search.trim() !== "") {
    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  }
};

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartCount();
    }
  }, [isLoggedIn]);

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5234/api/Cart/${getUserEmail()}`
      );
      setCartCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setCartCount(0);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFDF8] shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to={isLoggedIn ? "/products" : "/"} className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ellora"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "#C9A227", fontFamily: "Playfair Display" }}
            >
              Ellora
            </h1>
            <p className="text-xs tracking-[4px] text-gray-600">
              WEAR THE GLOW
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          <Link to={isLoggedIn ? "/products" : "/"} className="hover:text-[#C9A227]">
            Home
          </Link>
          <Link to="/products?filter=new" className="hover:text-[#C9A227]">
            New Arrivals
          </Link>
          <Link to="/products?category=Dresses" className="hover:text-[#C9A227]">
            Dresses
          </Link>
          <Link to="/products?category=Beauty" className="hover:text-[#C9A227]">
            Beauty
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
          <FaSearch className="text-gray-500 mr-2" />
          <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={handleSearch}
  className="bg-transparent outline-none w-full"
/>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <Link to="/wishlist" className="flex items-center gap-2 hover:text-[#C9A227]">
                <FaHeart size={20} />
                <span className="hidden md:block">Wishlist</span>
              </Link>

              <Link to="/cart" className="flex items-center gap-2 hover:text-[#C9A227]">
                <FaShoppingBag size={20} />
                <span className="hidden md:block">Cart ({cartCount})</span>
              </Link>

              <Link to="/orders" className="flex items-center gap-2 hover:text-[#C9A227]">
                <FaBoxOpen size={20} />
                <span className="hidden md:block">Orders</span>
              </Link>

              <Link
  to="/profile"
  className="hover:text-[#C9A227]"
>
  <FaUserCircle size={24} />
</Link>

              <button
                onClick={logout}
                className="bg-[#C9A227] hover:bg-black text-white px-5 py-2 rounded-full transition flex items-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-medium text-[#C9A227] border-2 border-[#C9A227] hover:bg-[#C9A227] hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#C9A227] hover:bg-black text-white px-5 py-2 rounded-full transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;