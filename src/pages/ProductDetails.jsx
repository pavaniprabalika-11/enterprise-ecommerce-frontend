import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { getUserEmail } from "../utils/auth";

const FALLBACK_IMAGES = {
  Dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
  Sarees: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
  Kurtis: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
  Tops: "https://images.unsplash.com/photo-1562572159-4efd90078499?w=600",
  Jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  Handbags: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
  Footwear: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
  Jewellery: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
};
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600";

function getProductImage(product) {
  if (product.imageUrl && product.imageUrl.startsWith("http")) return product.imageUrl;
  return FALLBACK_IMAGES[product.category] || DEFAULT_IMAGE;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => { fetchProduct(); }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://enterprise-ecommerce-backend.onrender.com/api/Product/${id}`);
      setProduct(res.data);
    } catch (err) { console.log(err); }
  };

  const addToCart = async () => {
    setCartLoading(true);
    try {
      await axios.post("https://enterprise-ecommerce-backend.onrender.com/api/Cart/add", {
        userEmail: getUserEmail(), productId: product.id, quantity,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch { alert("Failed to add to Cart ❌"); }
    finally { setCartLoading(false); }
  };

  const addToWishlist = async () => {
    setWishLoading(true);
    try {
      await axios.post("https://enterprise-ecommerce-backend.onrender.com/api/Wishlist/add", {
        userEmail: getUserEmail(), productId: product.id,
      });
      alert("Added to Wishlist ❤️");
    } catch { alert("Failed to add to Wishlist"); }
    finally { setWishLoading(false); }
  };

  if (!product) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f0e8" }}>
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500 tracking-widest text-sm">Loading product...</p>
        </div>
      </div>
    </>
  );

  const originalPrice = product.discount > 0
    ? Math.round(product.price / (1 - product.discount / 100))
    : null;

  const savings = originalPrice ? originalPrice - product.price : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>

        {/* Breadcrumb */}
        <div className="px-6 py-4 max-w-7xl mx-auto">
          <p className="text-sm text-gray-500">
            <span className="cursor-pointer hover:text-yellow-700" onClick={() => navigate("/")}>Home</span>
            <span className="mx-2">›</span>
            <span className="cursor-pointer hover:text-yellow-700" onClick={() => navigate("/products")}>Products</span>
            <span className="mx-2">›</span>
            <span style={{ color: "#8B6914" }}>{product.name}</span>
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* ── LEFT: IMAGE ── */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
                style={{ background: "#f9f5ee" }}>
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full object-cover"
                  style={{ height: "580px" }}
                />
                {product.discount > 0 && (
                  <span className="absolute top-6 left-6 text-white text-sm font-bold px-4 py-2 rounded-full"
                    style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                    {product.discount}% OFF
                  </span>
                )}
                {product.rating >= 4.5 && (
                  <span className="absolute top-6 right-6 bg-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
                    style={{ color: "#8B6914" }}>
                    ✦ BESTSELLER
                  </span>
                )}
              </motion.div>

              {/* ── RIGHT: DETAILS ── */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="p-10 flex flex-col justify-center">

                {product.brand && (
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">{product.brand}</p>
                )}

                <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-3"
                  style={{ fontFamily: "Georgia, serif" }}>
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.round(product.rating || 0) ? "#B8860B" : "#ddd" }}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.rating || 0} rating)</span>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 mb-6" />

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold" style={{ color: "#8B6914" }}>₹{product.price}</span>
                    {originalPrice && (
                      <span className="text-xl text-gray-400 line-through">₹{originalPrice}</span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-green-600 text-sm font-semibold mt-1">
                      You save ₹{savings} ({product.discount}% off)
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">🚚 Free delivery on this order</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                {/* Category */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs text-gray-400 tracking-widest uppercase">Category</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#f5f0e8", color: "#8B6914", border: "1px solid #B8860B" }}>
                    {product.category}
                  </span>
                </div>

                {/* Stock */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <p className="text-green-600 text-sm font-semibold">✓ In Stock ({product.stock} left)</p>
                  ) : (
                    <p className="text-red-500 text-sm font-semibold">✗ Out of Stock</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-sm text-gray-500 tracking-widest uppercase">Qty</span>
                  <div className="flex items-center border-2 rounded-xl overflow-hidden" style={{ borderColor: "#B8860B" }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 text-lg font-bold transition hover:bg-yellow-50"
                      style={{ color: "#8B6914" }}>−</button>
                    <span className="px-5 py-2 font-bold text-gray-800 border-x" style={{ borderColor: "#B8860B" }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="px-4 py-2 text-lg font-bold transition hover:bg-yellow-50"
                      style={{ color: "#8B6914" }}>+</button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={addToCart}
                    disabled={cartLoading || product.stock === 0}
                    className="flex-1 py-4 rounded-xl font-bold tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                    {cartLoading ? "Adding..." : added ? "Added! ✓" : "ADD TO CART ✦"}
                  </button>
                  <button
                    onClick={addToWishlist}
                    disabled={wishLoading}
                    className="px-6 py-4 rounded-xl border-2 font-bold transition-all duration-300 hover:bg-red-50"
                    style={{ borderColor: "#B8860B", color: "#8B6914" }}>
                    {wishLoading ? "..." : "❤️"}
                  </button>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
                  {[["🔒", "Secure Payment"], ["↩️", "Easy Returns"], ["✦", "Authentic"]].map(([icon, label]) => (
                    <div key={label} className="text-center">
                      <p className="text-lg">{icon}</p>
                      <p className="text-xs text-gray-400 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center mt-8">
            <button onClick={() => navigate("/products")}
              className="px-8 py-3 rounded-xl border-2 font-semibold tracking-widest transition-all duration-300 hover:text-white"
              style={{ borderColor: "#8B6914", color: "#8B6914" }}
              onMouseEnter={e => { e.target.style.background = "#8B6914"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#8B6914"; }}>
              ← BACK TO PRODUCTS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
