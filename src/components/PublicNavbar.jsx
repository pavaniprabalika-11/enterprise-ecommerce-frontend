import { Link } from "react-router-dom";
import logo from "../assets/ellora.jpeg";

function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFFDF8] shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ellora"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h1
              className="text-3xl font-bold"
              style={{
                color: "#C9A227",
                fontFamily: "Playfair Display",
              }}
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
          <Link to="/" className="hover:text-[#C9A227]">
            Home
          </Link>

          <a href="#categories" className="hover:text-[#C9A227]">
            Categories
          </a>

          <a href="#bestsellers" className="hover:text-[#C9A227]">
            Best Sellers
          </a>

          <a href="#contact" className="hover:text-[#C9A227]">
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="border border-[#C9A227] text-[#C9A227] px-5 py-2 rounded-full hover:bg-[#C9A227] hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#C9A227] text-white px-5 py-2 rounded-full hover:bg-black transition"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default PublicNavbar;