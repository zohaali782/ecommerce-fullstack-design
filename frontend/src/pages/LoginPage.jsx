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
    if (loading) return; // hard guard against any double-invoke
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
      setLoading(false);
    }
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
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm shrink-0">
            N
          </div>
          <span className="font-bold text-blue-600 text-lg sm:text-xl">
            NexMart
          </span>
        </Link>
        <select className="border border-gray-200 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 focus:outline-none">
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
            {/* Illustration — abstract shopping bag + sparkle, no stock photo */}
            <div className="mb-8 flex justify-center">
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* soft glow circle behind */}
                <circle cx="110" cy="110" r="95" fill="white" opacity="0.07" />
                {/* shopping bag body */}
                <rect
                  x="58"
                  y="86"
                  width="104"
                  height="92"
                  rx="10"
                  fill="white"
                  opacity="0.95"
                />
                {/* bag handle */}
                <path
                  d="M82 86 V68 a28 28 0 0 1 56 0 V86"
                  stroke="#1d4ed8"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* fold line on bag */}
                <line
                  x1="58"
                  y1="108"
                  x2="162"
                  y2="108"
                  stroke="#bfdbfe"
                  strokeWidth="3"
                />
                {/* price tag check */}
                <circle cx="110" cy="142" r="20" fill="#fb923c" />
                <path
                  d="M101 142 l6 6 12 -14"
                  stroke="white"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* floating sparkles */}
                <circle cx="44" cy="56" r="5" fill="white" opacity="0.8" />
                <circle cx="178" cy="64" r="3.5" fill="white" opacity="0.6" />
                <circle cx="184" cy="146" r="4.5" fill="white" opacity="0.7" />
                <circle cx="36" cy="158" r="3" fill="white" opacity="0.5" />
              </svg>
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
                {
                  text: "Secure payments",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.5l7.5 3v6c0 5-3.2 8-7.5 9.5-4.3-1.5-7.5-4.5-7.5-9.5v-6l7.5-3z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        fill="white"
                        fillOpacity="0.15"
                      />
                      <path
                        d="M9 12l2.2 2.2L15.5 9.5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  text: "Fast delivery",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 7h10v8H3z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        fill="white"
                        fillOpacity="0.15"
                      />
                      <path
                        d="M13 10h4l3 3v2h-7z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        fill="white"
                        fillOpacity="0.15"
                      />
                      <circle
                        cx="7"
                        cy="17.5"
                        r="1.6"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="#1d4ed8"
                      />
                      <circle
                        cx="17"
                        cy="17.5"
                        r="1.6"
                        stroke="white"
                        strokeWidth="1.5"
                        fill="#1d4ed8"
                      />
                    </svg>
                  ),
                },
                {
                  text: "Verified sellers",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2.5l2.4 1.4 2.8-.3 1.1 2.6 2.6 1.1-.3 2.8 1.4 2.4-1.4 2.4.3 2.8-2.6 1.1-1.1 2.6-2.8-.3L12 22.9l-2.4-1.4-2.8.3-1.1-2.6-2.6-1.1.3-2.8L2 12l1.4-2.4-.3-2.8 2.6-1.1L6.8 3.1l2.8.3z"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                        fill="white"
                        fillOpacity="0.15"
                      />
                      <path
                        d="M8.5 12l2.3 2.3L15.8 9"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((f) => (
                <div
                  key={f.text}
                  className="flex flex-col items-center gap-1.5"
                >
                  {f.icon}
                  <span className="text-white/80 text-xs">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 lg:max-w-md flex items-center justify-center px-4 sm:px-8 py-8 sm:py-10 bg-white">
          <div className="w-full max-w-sm">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {isLogin
                ? "Welcome back to NexMart"
                : "Join millions of shoppers on NexMart"}
            </p>

            {/* Step 1 — Email */}
            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  autoFocus
                  autoComplete="off"
                  name="login-email-field"
                />
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                <button
                  type="button"
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
                  <span className="text-sm text-gray-700 truncate">
                    {email}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-blue-600 text-xs hover:underline shrink-0 ml-2"
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
                    autoFocus
                    autoComplete="off"
                    name="signup-name-field"
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
                  autoFocus={isLogin}
                  autoComplete="new-password"
                  name="account-password-field"
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
                  type="button"
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
                type="button"
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

      {/* FOOTER — matches HomePage.jsx */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white w-7 h-7 rounded flex items-center justify-center font-bold text-sm">
                  N
                </div>
                <span className="font-bold text-blue-600 text-lg">NexMart</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Best information about the company goes here.
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

            {/* Nav Columns */}
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
                    className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}

            {/* Get App */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Get app
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] opacity-75 leading-tight">
                      Download on the
                    </span>
                    <span className="text-xs font-semibold leading-tight">
                      App Store
                    </span>
                  </div>
                </a>
                <a
                  href="#"
                  className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.18 23.76c.3.17.64.24.99.2l13.29-7.67-2.83-2.83-11.45 10.3zM.54 1.18C.2 1.56 0 2.14 0 2.89v18.22c0 .75.2 1.33.54 1.71l.09.08 10.21-10.21v-.24L.63 1.1l-.09.08zM20.94 10.8l-2.82-1.63-3.17 3.17 3.17 3.17 2.85-1.65c.81-.47.81-1.23-.03-1.7v.04zM4.17.24L17.46 7.9l-2.83 2.83L3.18.47c.35-.38.71-.41.99-.23z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-[9px] opacity-75 leading-tight">
                      GET IT ON
                    </span>
                    <span className="text-xs font-semibold leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 NexMart.</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              🇺🇸 English ▾
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
