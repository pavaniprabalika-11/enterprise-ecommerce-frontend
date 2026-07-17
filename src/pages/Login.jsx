import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://enterprise-ecommerce-backend.onrender.com/api/Auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", form.email);
      alert("Welcome back to Ellora 🌸");
      navigate("/products");
    } catch {
      alert("Login Failed. Check your credentials.");
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
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500"
            alt="Fashion"
            className="rounded-2xl shadow-xl w-full object-cover"
            style={{ height: "320px" }}
          />

          <p className="text-center mt-6 text-gray-600 italic text-sm leading-relaxed">
            "Elegance is not about being noticed,<br />it's about being remembered."
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
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to continue your luxury experience
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                placeholder="Enter your password"
                value={form.password}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-3 px-1 mt-1 focus:outline-none focus:border-yellow-600 transition-colors text-gray-800"
              />
            </div>

            <div className="flex justify-end">
              <span className="text-xs hover:underline cursor-pointer"
                style={{ color: "#8B6914" }}>
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold tracking-widest text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #B8860B, #8B6914)" }}>
              {loading ? "Signing In..." : "SIGN IN ✦"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-4 text-xs text-gray-400 tracking-widest">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login placeholder */}
          <button className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-yellow-600 hover:text-yellow-700 transition-all duration-300 flex items-center justify-center gap-3">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-500">
  New here?{" "}
  <Link
    to="/"
    className="text-[#C9A227] font-semibold hover:underline"
  >
    Explore Ellora
  </Link>
</p>

          <p className="text-center mt-6 text-gray-500 text-sm">
            New to Ellora?{" "}
            <Link to="/register" className="font-semibold hover:underline"
              style={{ color: "#8B6914" }}>
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
