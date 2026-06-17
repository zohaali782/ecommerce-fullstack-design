import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1=email, 2=password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name) {
          setError("Please enter your name");
          setLoading(false);
          return;
        }
        await register(name, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep(1);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
            N
          </div>
          <span className="font-bold text-blue-600 text-xl">NexMart</span>
        </Link>
        <select className="border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none">
          <option>English</option>
          <option>Urdu</option>
          <option>Arabic</option>
        </select>
      </header>

      {/* Main */}
      <div className="flex flex-1">
        {/* Left — Promo */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 items-center justify-center relative overflow-hidden">
          {/* Background circles */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center px-12">
            {/* Illustration */}
            <div className="mb-8 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80"
                alt="Shopping"
                className="w-72 h-72 object-cover rounded-2xl shadow-2xl opacity-90"
              />
            </div>
            <h2 className="text-white text-2xl font-bold mb-3 leading-snug">
              Global shopping with
              <br />
              <span className="text-blue-200">
                order protection and great savings
              </span>
            </h2>
            <p className="text-blue-200 text-sm">
              Shop from thousands of verified suppliers
              <br />
              with secure payments and fast delivery
            </p>

            {/* Features */}
            <div className="flex justify-center gap-6 mt-8">
              {[
                { icon: "🛡️", text: "Secure payments" },
                { icon: "🚚", text: "Fast delivery" },
                { icon: "✅", text: "Verified sellers" },
              ].map((f) => (
                <div key={f.text} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-white/80 text-xs">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 lg:max-w-md flex items-center justify-center px-8 py-10 bg-white">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Sign in or create account" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {isLogin
                ? "Welcome back to NexMart"
                : "Join millions of shoppers on NexMart"}
            </p>

            {/* Social buttons */}
            {step === 1 && (
              <>
                <div className="space-y-3 mb-5">
                  {[
                    {
                      icon: "G",
                      label: "Continue with Google",
                      color: "text-red-500",
                      bg: "hover:bg-red-50",
                    },
                    {
                      icon: "f",
                      label: "Continue with Facebook",
                      color: "text-blue-600",
                      bg: "hover:bg-blue-50",
                    },
                    {
                      icon: "in",
                      label: "Continue with LinkedIn",
                      color: "text-blue-700",
                      bg: "hover:bg-blue-50",
                    },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      className={`w-full flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 ${btn.bg} transition-colors`}
                    >
                      <span
                        className={`font-bold text-base w-6 text-center ${btn.color}`}
                      >
                        {btn.icon}
                      </span>
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Email input */}
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                />
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                <button
                  onClick={handleContinue}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Continue
                </button>
              </>
            )}

            {/* Step 2 — Password */}
            {step === 2 && (
              <>
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 mb-4 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{email}</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-600 text-xs hover:underline"
                  >
                    Change
                  </button>
                </div>

                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}

                <input
                  type="password"
                  placeholder={
                    isLogin ? "Enter your password" : "Create a password"
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />

                {isLogin && (
                  <div className="text-right mb-3">
                    <a
                      href="#"
                      className="text-blue-600 text-xs hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </>
            )}

            {/* Switch mode */}
            <p className="text-center text-sm text-gray-500 mt-5">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-blue-600 font-semibold hover:underline"
              >
                {isLogin ? "Join now" : "Sign in"}
              </button>
            </p>

            <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
              By continuing, you agree to NexMart's{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white w-7 h-7 rounded flex items-center justify-center font-bold text-sm">
                  N
                </div>
                <span className="font-bold text-blue-600 text-lg">NexMart</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Best information about the company goes here but now lorem ipsum
                is
              </p>
              <div className="flex gap-2">
                {["f", "t", "in", "be", "yt"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="bg-gray-100 hover:bg-blue-600 hover:text-white w-6 h-6 rounded-full flex items-center justify-center text-xs text-gray-500 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            {[
              {
                title: "About",
                links: ["About Us", "Find store", "Categories", "Blogs"],
              },
              {
                title: "Partnership",
                links: ["About Us", "Find store", "Categories", "Blogs"],
              },
              {
                title: "Information",
                links: [
                  "Help Center",
                  "Money Refund",
                  "Shipping",
                  "Contact us",
                ],
              },
              {
                title: "For users",
                links: ["Login", "Register", "Settings", "My Orders"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              © 2026 NexMart. All rights reserved.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"
              >
                🍎 App Store
              </a>
              <a
                href="#"
                className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"
              >
                ▶ Google Play
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              🇺🇸 English ▾
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
