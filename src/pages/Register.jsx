import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://enterprise-ecommerce-backend.onrender.com/api/Auth/register", form);
      alert("Account Created Successfully 🌸");
      navigate("/login");
    } catch {
      alert("Registration Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center p-10"
          style={{ background: "linear-gradient(135deg, #f5f0e8 0%, #ede8dc 100%)" }}>

          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold tracking-widest"
              style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
              ELLORA
            </h1>
            <p className="text-sm tracking-widest mt-1" style={{ color: "#B8860B" }}>
              ✦ LUXURY WOMEN'S FASHION ✦
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500"
            alt="Fashion"
            className="rounded-2xl shadow-xl w-full object-cover"
            style={{ height: "320px" }}
          />

          <p className="text-center mt-6 text-gray-600 italic text-sm leading-relaxed">
            "Style is a way to say who you are<br />without having to speak."
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center">

          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-4xl font-bold tracking-widest"
              style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
              ELLORA
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-1"
            style={{ fontFamily: "Georgia, serif" }}>
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join Ellora and explore luxury fashion
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-3 px-1 mt-1 focus:outline-none focus:border-yellow-600 transition-colors text-gray-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                Email Address
              </label>
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-3 px-1 mt-1 focus:outline-none focus:border-yellow-600 transition-colors text-gray-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-3 px-1 mt-1 focus:outline-none focus:border-yellow-600 transition-colors text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold tracking-widest text-white mt-4 transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT ✦"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline"
              style={{ color: "#8B6914" }}>
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
