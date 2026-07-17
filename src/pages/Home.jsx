import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PublicNavbar from "../components/PublicNavbar";

const categories = [
  { name: "Dresses", icon: "👗", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
  { name: "Sarees", icon: "🥻", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
  { name: "Kurtis", icon: "🌸", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { name: "Tops", icon: "👚", image: "https://images.pexels.com/photos/6936766/pexels-photo-6936766.jpeg" },
  { name: "Jeans", icon: "👖", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
  { name: "Handbags", icon: "👜", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { name: "Footwear", icon: "👠", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
  { name: "Jewellery", icon: "💍", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
];

const newArrivals = [
  { name: "Floral Wrap Dress", price: "₹2,499", original: "₹3,999", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400", tag: "NEW" },
  { name: "Banarasi Silk Saree", price: "₹8,999", original: "₹12,999", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400", tag: "HOT" },
  { name: "Embroidered Kurti", price: "₹1,299", original: "₹1,999", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", tag: "NEW" },
  { name: "Leather Tote Bag", price: "₹3,499", original: "₹5,499", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", tag: "TRENDING" },
];

const bestSellers = [
  { name: "Royal Chanderi Saree", price: "₹6,999", original: "₹9,999", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400", rating: 5, sold: "2.3k sold" },
  { name: "Anarkali Suit Set", price: "₹3,799", original: "₹5,500", image: "https://images.pexels.com/photos/8575238/pexels-photo-8575238.jpeg", rating: 5, sold: "1.8k sold" },
  { name: "Block Print Kurti", price: "₹999", original: "₹1,799", image: "https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg", rating: 4, sold: "3.1k sold" },
  { name: "Pearl Drop Earrings", price: "₹799", original: "₹1,299", image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400", rating: 5, sold: "4.5k sold" },
];

const reviews = [
  { name: "Priya S.", city: "Mumbai", text: "Absolutely love the quality! The saree I ordered was stunning and delivery was super fast.", rating: 5, avatar: "P" },
  { name: "Ananya R.", city: "Delhi", text: "Ellora has the best kurtas I've ever worn. The fabric is so soft and the designs are unique!", rating: 5, avatar: "A" },
  { name: "Meera K.", city: "Bangalore", text: "The jewellery collection is breathtaking. Got so many compliments at the wedding!", rating: 5, avatar: "M" },
  { name: "Divya T.", city: "Chennai", text: "My go-to store for all ethnic wear. The prices are great for such premium quality.", rating: 4, avatar: "D" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <MainLayout>
      <div className="overflow-x-hidden">

        {/* ── HERO SECTION ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}>

          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #B8860B, transparent)" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #B8860B, transparent)" }} />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">

            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-sm tracking-widest mb-4" style={{ color: "#B8860B" }}>
                ✦ NEW COLLECTION 2025 ✦
              </motion.p>
              <motion.h1 variants={fadeUp}
                className="text-6xl md:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: "Georgia, serif" }}>
                Wear<br />
                <span style={{ color: "#B8860B" }}>The</span><br />
                Glow
              </motion.h1>
              <motion.p variants={fadeUp} className="text-gray-300 text-lg mt-6 leading-relaxed max-w-md">
                Discover India's finest women's fashion — from handcrafted sarees to contemporary dresses. Luxury that speaks your language.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-4 mt-8">
                <Link to="/products">
                  <button className="px-8 py-4 rounded-xl font-semibold tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                    SHOP NOW ✦
                  </button>
                </Link>
                <button className="px-8 py-4 rounded-xl font-semibold tracking-widest border-2 text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  style={{ borderColor: "#B8860B" }}>
                  EXPLORE
                </button>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-8 mt-12">
                {[["500+", "Products"], ["50K+", "Happy Customers"], ["4.9★", "Rating"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold" style={{ color: "#B8860B" }}>{num}</p>
                    <p className="text-gray-400 text-xs tracking-widest">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                  style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }} />
                <img
                  src="https://images.pexels.com/photos/12942612/pexels-photo-12942612.jpeg"
                  alt="Ellora Fashion"
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                  style={{ height: "560px" }}
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4">
                  <p className="text-xs text-gray-500 tracking-widest">THIS WEEK</p>
                  <p className="text-lg font-bold text-gray-800">Upto 50% OFF</p>
                  <p className="text-xs" style={{ color: "#B8860B" }}>✦ Limited Time</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm flex flex-col items-center gap-2">
            <span className="tracking-widest text-xs">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent" />
          </motion.div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="py-20 px-6" style={{ background: "#f5f0e8" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs tracking-widest mb-2" style={{ color: "#B8860B" }}>✦ BROWSE ✦</p>
              <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Shop by Category</h2>
              <div className="w-20 h-0.5 mx-auto mt-4" style={{ background: "#B8860B" }} />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <motion.div key={cat.name} variants={fadeUp}>
                  <Link to={`/products?category=${cat.name}`}>
                    <div className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                      <img src={cat.image} alt={cat.name}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ height: "220px" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="text-xl">{cat.icon}</p>
                        <p className="font-bold tracking-widest text-sm">{cat.name.toUpperCase()}</p>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-600 rounded-2xl transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── BANNER STRIP ── */}
        <section className="py-12 px-6" style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-center text-white">
            {[
              ["🚚", "Free Delivery", "On orders above ₹999"],
              ["↩️", "Easy Returns", "7-day hassle free returns"],
              ["🔒", "Secure Payment", "100% safe & encrypted"],
            ].map(([icon, title, sub]) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="flex items-center justify-center gap-4 p-4 rounded-xl"
                style={{ border: "1px solid rgba(184,134,11,0.3)" }}>
                <span className="text-3xl">{icon}</span>
                <div className="text-left">
                  <p className="font-bold tracking-widest text-sm">{title}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── NEW ARRIVALS ── */}
        <section className="py-20 px-6 bg-white">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs tracking-widest mb-2" style={{ color: "#B8860B" }}>✦ JUST IN ✦</p>
              <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>New Arrivals</h2>
              <div className="w-20 h-0.5 mx-auto mt-4" style={{ background: "#B8860B" }} />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <motion.div key={product.name} variants={fadeUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ height: "280px" }} />
                    <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "#B8860B" }}>
                      {product.tag}
                    </span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    <Link to="/products">
                      <button className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-xs font-bold px-6 py-2 rounded-full"
                        style={{ background: "#8B6914" }}>
                        QUICK VIEW
                      </button>
                    </Link>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold" style={{ color: "#8B6914" }}>{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">{product.original}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link to="/products">
                <button
                  className="px-10 py-4 rounded-xl font-semibold tracking-widest border-2 transition-all duration-300"
                  style={{ borderColor: "#8B6914", color: "#8B6914", background: "transparent" }}
                  onMouseEnter={e => { e.target.style.background = "#8B6914"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#8B6914"; }}>
                  VIEW ALL NEW ARRIVALS ✦
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── BEST SELLERS ── */}
        <section className="py-20 px-6" style={{ background: "#f5f0e8" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs tracking-widest mb-2" style={{ color: "#B8860B" }}>✦ CUSTOMER FAVOURITES ✦</p>
              <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>Best Sellers</h2>
              <div className="w-20 h-0.5 mx-auto mt-4" style={{ background: "#B8860B" }} />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <motion.div key={product.name} variants={fadeUp}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ height: "280px" }} />
                    <span className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                      🔥 BESTSELLER
                    </span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    <Link to="/products">
                      <button className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-xs font-bold px-6 py-2 rounded-full"
                        style={{ background: "#8B6914" }}>
                        QUICK VIEW
                      </button>
                    </Link>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(product.rating)].map((_, i) => (
                        <span key={i} className="text-xs" style={{ color: "#B8860B" }}>★</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: "#8B6914" }}>{product.price}</span>
                        <span className="text-xs text-gray-400 line-through">{product.original}</span>
                      </div>
                      <span className="text-xs text-gray-400">{product.sold}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link to="/products">
                <button
                  className="px-10 py-4 rounded-xl font-semibold tracking-widest border-2 transition-all duration-300"
                  style={{ borderColor: "#8B6914", color: "#8B6914", background: "transparent" }}
                  onMouseEnter={e => { e.target.style.background = "#8B6914"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#8B6914"; }}>
                  VIEW ALL BEST SELLERS ✦
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── FULL WIDTH BANNER ── */}
        <section className="relative py-24 px-6 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 text-center text-white max-w-2xl mx-auto">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#B8860B" }}>✦ LIMITED OFFER ✦</p>
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>End of Season Sale</h2>
            <p className="text-gray-300 mb-8">Up to 60% off on selected items. Don't miss out!</p>
            <Link to="/products">
              <button className="px-10 py-4 rounded-xl font-bold tracking-widest text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                SHOP THE SALE ✦
              </button>
            </Link>
          </motion.div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="py-20 px-6" style={{ background: "#f5f0e8" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs tracking-widest mb-2" style={{ color: "#B8860B" }}>✦ TESTIMONIALS ✦</p>
              <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: "Georgia, serif" }}>What Our Customers Say</h2>
              <div className="w-20 h-0.5 mx-auto mt-4" style={{ background: "#B8860B" }} />
            </motion.div>
            <motion.div variants={stagger} className="grid md:grid-cols-4 gap-6">
              {reviews.map((r) => (
                <motion.div key={r.name} variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex mb-3">
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} style={{ color: "#B8860B" }}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed mb-4">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                      {r.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.city}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-widest mb-3" style={{ color: "#B8860B" }}>✦ STAY UPDATED ✦</p>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "Georgia, serif" }}>Join the Ellora Circle</h2>
            <p className="text-gray-400 mb-8">Get exclusive offers, new arrivals, and style tips delivered to your inbox.</p>
            {subscribed ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-lg font-semibold">
                🌸 Thank you for subscribing!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
                />
                <button type="submit"
                  className="px-6 py-4 rounded-xl font-bold text-white whitespace-nowrap transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
                  SUBSCRIBE
                </button>
              </form>
            )}
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-16 px-6" style={{ background: "#0d0d1a" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-gray-400">
            <div>
              <h3 className="text-2xl font-bold tracking-widest mb-1"
                style={{ fontFamily: "Georgia, serif", color: "#B8860B" }}>
                ELLORA
              </h3>
              <p className="text-xs tracking-widest mb-4 text-gray-500">✦ LUXURY WOMEN'S FASHION ✦</p>
              <p className="text-sm leading-relaxed">
                Curating the finest women's fashion from across India. Luxury, elegance, and style — delivered to your door.
              </p>
            </div>
            {[
              { title: "SHOP", links: ["Dresses", "Sarees", "Kurtis", "Tops", "Jeans", "Handbags"] },
              { title: "HELP", links: ["About Us", "Contact Us", "FAQs", "Shipping Policy", "Return Policy"] },
              { title: "CONNECT", links: ["Instagram", "Pinterest", "Facebook", "YouTube"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold tracking-widest text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-yellow-600 transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2025 Ellora. All rights reserved.</p>
            <p style={{ color: "#B8860B" }}>✦ Crafted with love for Indian women ✦</p>
          </div>
        </footer>

      </div>
    </MainLayout>
  );
}
