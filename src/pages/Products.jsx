import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { getUserEmail } from "../utils/auth";

const CATEGORIES = ["All", "Dresses", "Sarees", "Kurtis", "Tops", "Jeans", "Handbags", "Footwear", "Jewellery", "Beauty"];

const CATEGORY_ICONS = {
  All: "✦", Dresses: "👗", Sarees: "🥻", Kurtis: "🌸",
  Tops: "👚", Jeans: "👖", Handbags: "👜", Footwear: "👠",
  Jewellery: "💍", Beauty: "💄"
};

const FALLBACK_IMAGES = {
  Dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
  Sarees: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400",
  Kurtis: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400",
  Tops: "https://images.unsplash.com/photo-1562572159-4efd90078499?w=400",
  Jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
  Handbags: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  Footwear: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
  Jewellery: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
  Beauty: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400";

function getProductImage(product) {
  if (product.imageUrl && product.imageUrl.startsWith("http")) return product.imageUrl;
  return FALLBACK_IMAGES[product.category] || DEFAULT_IMAGE;
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const params = new URLSearchParams(location.search);

  const cat = params.get("category");
  const searchParam = params.get("search");

  if (cat) {
    setCategory(cat);
  } else {
    setCategory("All");
  }

  if (searchParam) {
    setSearch(searchParam);
  } else {
    setSearch("");
  }
}, [location.search]);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5234/api/Product");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5234/api/Cart/add", {
        userEmail: getUserEmail(), productId, quantity: 1,
      });
      alert("Added to Cart ✅");
    } catch { alert("Failed to add to Cart ❌"); }
  };

  const addToWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:5234/api/Wishlist/add", {
        userEmail: getUserEmail(), productId,
      });
      alert("Added to Wishlist ❤️");
    } catch { alert("Failed to add to Wishlist"); }
  };

  const filtered = products
    .filter(p => {
      const searchText = search.toLowerCase().trim();

const normalizedSearch =
  searchText.endsWith("es")
    ? searchText.slice(0, -2)
    : searchText.endsWith("s")
    ? searchText.slice(0, -1)
    : searchText;

const matchSearch =
  p.name?.toLowerCase().includes(normalizedSearch) ||
  p.category?.toLowerCase().includes(normalizedSearch) ||
  p.brand?.toLowerCase().includes(normalizedSearch) ||
  p.description?.toLowerCase().includes(normalizedSearch);
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: "#f5f0e8" }}>

        {/* ── PAGE HEADER ── */}
        <div className="py-12 px-6 text-center"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs tracking-widest mb-2" style={{ color: "#B8860B" }}>
            ✦ ELLORA COLLECTION ✦
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
            Our Collection
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}
            className="w-20 h-0.5 mx-auto mt-4" style={{ background: "#B8860B" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* ── SEARCH + SORT ── */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search sarees, kurtis, dresses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent focus:outline-none focus:border-yellow-600 bg-white shadow-sm text-gray-800"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-6 py-4 rounded-xl border-2 border-transparent focus:outline-none focus:border-yellow-600 bg-white shadow-sm text-gray-700 font-medium">
              <option value="default">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* ── CATEGORY FILTERS ── */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
                style={category === cat
                  ? { background: "linear-gradient(135deg, #B8860B, #8B6914)", color: "#fff", boxShadow: "0 4px 15px rgba(184,134,11,0.4)" }
                  : { background: "#fff", color: "#666", border: "1.5px solid #ddd" }
                }>
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>

          {/* ── RESULTS COUNT ── */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 font-medium">
              Showing <span className="font-bold" style={{ color: "#8B6914" }}>{filtered.length}</span> products
              {category !== "All" && <span> in <span className="font-bold" style={{ color: "#8B6914" }}>{category}</span></span>}
            </p>
            {category !== "All" && (
              <button onClick={() => setCategory("All")}
                className="text-sm underline" style={{ color: "#8B6914" }}>
                Clear filter
              </button>
            )}
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-500 tracking-widest text-sm">Loading collection...</p>
            </div>
          )}

          {/* ── PRODUCTS GRID ── */}
          {!loading && (
            <motion.div initial="hidden" animate="visible" variants={stagger}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(product => (
                <motion.div key={product.id} variants={fadeUp}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ height: "260px" }}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.rating >= 4.5 && (
                        <span className="text-white text-xs font-bold px-2 py-1 rounded-full"
                          style={{ background: "#B8860B" }}>
                          ✦ BESTSELLER
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={e => addToWishlist(e, product.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 text-lg">
                      ❤️
                    </button>

                    {/* Quick Add overlay */}
                    <button
                      onClick={e => addToCart(e, product.id)}
                      className="absolute bottom-0 left-0 right-0 py-3 text-white text-xs font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                      + ADD TO CART
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    {product.brand && (
                      <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">{product.brand}</p>
                    )}
                    <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{product.name}</h3>

                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs"
                          style={{ color: i < Math.round(product.rating || 0) ? "#B8860B" : "#ddd" }}>★</span>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({product.rating || 0})</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold" style={{ color: "#8B6914" }}>₹{product.price}</span>
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{Math.round(product.price / (1 - product.discount / 100))}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mt-1">🚚 Free delivery</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── EMPTY STATE ── */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🌸</p>
              <h3 className="text-xl font-bold text-gray-700" style={{ fontFamily: "Georgia, serif" }}>
                No products found
              </h3>
              <p className="text-gray-400 mt-2">Try a different category or search term</p>
              <button onClick={() => { setCategory("All"); setSearch(""); }}
                className="mt-6 px-8 py-3 rounded-xl text-white font-semibold tracking-widest"
                style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                VIEW ALL PRODUCTS
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
