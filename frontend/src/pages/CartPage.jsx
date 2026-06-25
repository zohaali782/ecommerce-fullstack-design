import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaLock,
  FaHeadset,
  FaTruck,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";

// ── Shared helpers ──────────────────────────────────────────────────────────

function FlagUSIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="inline-block mr-1"
    >
      <rect width="16" height="12" fill="#B22234" />
      <rect y="0.923" width="16" height="0.923" fill="white" />
      <rect y="2.769" width="16" height="0.923" fill="white" />
      <rect y="4.615" width="16" height="0.923" fill="white" />
      <rect y="6.461" width="16" height="0.923" fill="white" />
      <rect y="8.307" width="16" height="0.923" fill="white" />
      <rect y="10.153" width="16" height="0.923" fill="white" />
      <rect width="7" height="5.538" fill="#3C3B6E" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-3 h-3" }) {
  return (
    <svg
      className={`${className} inline-block`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
];

const countryOptions = [
  { code: "pk", name: "Pakistan" },
  { code: "de", name: "Germany" },
  { code: "us", name: "USA" },
  { code: "ae", name: "UAE" },
];

const initialSavedItems = [
  {
    id: 1,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80",
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&q=80",
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
  },
  {
    id: 4,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1611186871525-9b3e3a9e6dd2?w=200&q=80",
  },
];

// ── CartPage ────────────────────────────────────────────────────────────────

export default function CartPage() {
  // ✅ addToCart added here
  const { cartItems, removeFromCart, updateQty, clearCart, addToCart } =
    useCart();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // ✅ savedItems ab state mein hai taake Move to cart ke baad remove ho sake
  const [savedItems, setSavedItems] = useState(initialSavedItems);

  // ✅ Toast notification state
  const [toast, setToast] = useState(null);

  // navbar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = couponApplied ? 60.0 : 0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // ✅ Move to cart handler
  const handleMoveToCart = (item) => {
    addToCart({ ...item, _id: item.id }); // ✅ _id manually set karo
    setSavedItems((prev) => prev.filter((s) => s.id !== item.id));
    setToast("Item added to cart!");
    setTimeout(() => setToast(null), 3000);
  };
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white text-sm px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-fade-in">
          <FaShoppingCart />
          {toast}
        </div>
      )}

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-3 py-2.5">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-gray-800 text-lg">NexMart</span>
            </Link>

            {/* Search */}
            <div className="flex flex-1 min-w-full sm:min-w-0 order-3 sm:order-none">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 w-full border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="hidden sm:block border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50">
                <option value="">All category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 rounded-r text-sm font-medium shrink-0 transition-colors">
                Search
              </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              {/* Profile */}
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
                <span className="text-[10px]">Profile</span>
              </Link>

              {/* Message */}
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
                  <path
                    d="M7 9h10M7 13h7"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span className="text-[10px]">Message</span>
              </Link>

              {/* Orders */}
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-[10px]">Orders</span>
              </Link>

              {/* Cart with badge */}
              <Link
                to="/cart"
                className="flex flex-col items-center text-blue-600 transition-colors relative"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mb-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">My cart</span>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-gray-600 p-1"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop secondary nav */}
          <nav className="hidden md:flex items-center justify-between py-1.5 border-t border-gray-100">
            <div className="flex items-center gap-5">
              <Link
                to="/products"
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
              >
                ☰ All category
              </Link>
              {[
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative group">
                <span className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600 flex items-center gap-0.5">
                  Help <ChevronDownIcon />
                </span>
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px] hidden group-hover:block">
                  <Link
                    to="/help"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm text-gray-600"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>

              <div className="relative">
                <button
                  onClick={() => setCountryOpen(!countryOpen)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span>Ship to</span>
                  <img
                    src={`/flags/${selectedCountry}.svg`}
                    alt={selectedCountry}
                    className="w-5 h-3.5 object-cover rounded-sm"
                  />
                  <span className="text-xs">
                    {
                      countryOptions.find((c) => c.code === selectedCountry)
                        ?.name
                    }
                  </span>
                  <ChevronDownIcon />
                </button>
                {countryOpen && (
                  <div className="absolute top-7 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[140px]">
                    {countryOptions.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country.code);
                          setCountryOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 text-gray-700 ${
                          selectedCountry === country.code
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : ""
                        }`}
                      >
                        <img
                          src={`/flags/${country.code}.svg`}
                          alt={country.name}
                          className="w-5 h-3.5 object-cover rounded-sm"
                        />
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-full bg-white border-t border-b border-gray-200 shadow-lg z-40 px-4 py-2">
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-700 font-medium py-2.5 border-b border-gray-100"
              >
                <span>☰</span> All category
              </Link>
              {[
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
                { label: "Profile", to: "/profile" },
                { label: "Help Center", to: "/help" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm text-gray-600 py-2.5 border-b border-gray-100 hover:text-blue-600"
                >
                  {item.label}
                  <span className="text-gray-300">›</span>
                </Link>
              ))}

              <div className="py-3 border-b border-gray-100">
                <label className="text-xs text-gray-400 block mb-1">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 bg-white"
                >
                  <option value="USD">English, USD</option>
                  <option value="PKR">English, PKR</option>
                  <option value="EUR">English, EUR</option>
                </select>
              </div>

              <div className="py-3">
                <label className="text-xs text-gray-400 block mb-1">
                  Ship to
                </label>
                <div className="relative">
                  <button
                    onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
                    className="w-full flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white text-left"
                  >
                    <img
                      src={`/flags/${selectedCountry}.svg`}
                      alt={selectedCountry}
                      className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                    />
                    <span className="flex-1 text-sm text-gray-700">
                      {
                        countryOptions.find((c) => c.code === selectedCountry)
                          ?.name
                      }
                    </span>
                    <svg
                      className={`w-3 h-3 text-gray-400 transition-transform ${mobileCountryOpen ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {mobileCountryOpen && (
                    <div className="absolute left-0 right-0 top-full mt-0.5 bg-white border border-gray-200 rounded shadow-lg z-50">
                      {countryOptions.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSelectedCountry(c.code);
                            setMobileCountryOpen(false);
                          }}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 ${
                            selectedCountry === c.code
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <img
                            src={`/flags/${c.code}.svg`}
                            alt={c.name}
                            className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                          />
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <h1 className="text-lg font-bold text-gray-800 mb-4">
          My cart ({cartItems.length})
        </h1>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Cart items */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden mb-3">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <FaShoppingCart className="text-4xl mx-auto mb-2" />
                  <p>Your cart is empty!</p>
                  <Link
                    to="/"
                    className="text-blue-600 text-sm hover:underline mt-1 inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-3 sm:gap-4 p-4">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 accent-blue-600 shrink-0"
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 border border-red-300 rounded px-2 py-0.5 hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                          <button className="text-xs text-green-600 border border-green-300 rounded px-2 py-0.5 hover:bg-green-50 transition-colors">
                            Save for later
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-base font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="text-gray-400 hover:text-gray-600 w-5 text-center font-bold"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium text-gray-800 w-6 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="text-gray-400 hover:text-gray-600 w-5 text-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {i < cartItems.length - 1 && (
                      <hr className="border-gray-100" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Back / Remove all */}
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-blue-600 border border-blue-600 rounded px-4 py-1.5 text-sm hover:bg-blue-50 transition-colors"
              >
                <FaArrowLeft className="text-xs" /> Back to shop
              </Link>
              <button
                onClick={() => clearCart()}
                className="text-sm text-blue-600 hover:underline"
              >
                Remove all
              </button>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded border border-gray-200 p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: <FaLock className="text-gray-400 text-lg" />,
                    title: "Secure payment",
                    desc: "100% secure transactions",
                  },
                  {
                    icon: <FaHeadset className="text-gray-400 text-lg" />,
                    title: "Customer support",
                    desc: "24/7 dedicated support",
                  },
                  {
                    icon: <FaTruck className="text-gray-400 text-lg" />,
                    title: "Free delivery",
                    desc: "On orders over $100",
                  },
                ].map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">
                        {b.title}
                      </p>
                      <p className="text-xs text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Saved for later — ab fully functional */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded border border-gray-200 p-4">
                <h2 className="text-sm font-bold text-gray-800 mb-3">
                  Saved for later ({savedItems.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-100 rounded overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-28 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-bold text-gray-800 mb-0.5">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-tight">
                          {item.name}
                        </p>
                        {/* ✅ onClick handler added */}
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="flex items-center gap-1 text-blue-600 text-xs hover:underline hover:text-blue-800 transition-colors"
                        >
                          <FaShoppingCart className="text-xs" /> Move to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agar sab items move ho jayein */}
            {savedItems.length === 0 && (
              <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-400 text-sm">
                Saved for later mein koi item nahi hai.
              </div>
            )}
          </div>

          {/* ── Order Summary (sticky) ── */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded border border-gray-200 p-4 lg:sticky lg:top-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Have a coupon?
              </h3>
              <div className="flex gap-1 mb-4">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-l px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={() => coupon && setCouponApplied(true)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-r text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal:</span>
                  <span className="text-gray-800 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Discount:</span>
                  <span className="text-red-500 font-medium">
                    {discount > 0 ? `-$${discount.toFixed(2)}` : "-$0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tax:</span>
                  <span className="text-green-600 font-medium">
                    +${tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-gray-800">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded text-sm transition-colors mb-3 block text-center"
              >
                Checkout
              </Link>
              <div className="flex items-center justify-center gap-1.5">
                {["VISA", "MC", "PP", "AE", "AP"].map((p) => (
                  <div
                    key={p}
                    className="bg-gray-100 rounded px-1.5 py-0.5 text-[9px] font-bold text-gray-500"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROMO BANNER ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-blue-600 rounded flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-3">
          <div className="text-white text-center sm:text-left">
            <p className="font-bold text-base">
              Super discount on more than 100 USD
            </p>
            <p className="text-xs text-white/80">
              Have you ever finally just write dummy info
            </p>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded transition-colors shrink-0">
            Shop now
          </button>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
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
                {[
                  { key: "f", label: "Facebook" },
                  { key: "t", label: "Twitter" },
                  { key: "in", label: "LinkedIn" },
                  { key: "be", label: "Behance" },
                  { key: "yt", label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.key}
                    href="#"
                    aria-label={s.label}
                    className="bg-gray-100 hover:bg-blue-600 hover:text-white w-7 h-7 rounded-full flex items-center justify-center text-xs text-gray-500 transition-colors"
                  >
                    {s.key}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "About",
                links: [
                  { text: "About Us", path: "/about" },
                  { text: "Find Store", path: "/find-store" },
                  { text: "Categories", path: "/products" },
                  { text: "Blogs", path: "/blogs" },
                ],
              },
              {
                title: "Partnership",
                links: [
                  { text: "About Us", path: "/about" },
                  { text: "Find Store", path: "/find-store" },
                  { text: "Categories", path: "/products" },
                  { text: "Blogs", path: "/blogs" },
                ],
              },
              {
                title: "Information",
                links: [
                  { text: "Help Center", path: "/help" },
                  { text: "Money Refund", path: "/money-refund" },
                  { text: "Shipping", path: "/shipping" },
                  { text: "Contact Us", path: "/contact" },
                ],
              },
              {
                title: "For Users",
                links: [
                  { text: "Login", path: "/login" },
                  { text: "Register", path: "/login" },
                  { text: "Settings", path: "/profile" },
                  { text: "My Orders", path: "/profile" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <Link
                    key={link.text}
                    to={link.path}
                    className="block text-xs text-gray-500 hover:text-blue-600 mb-2"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            ))}

            {/* Get app */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Get app
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  {
                    store: "App Store",
                    sub: "Download on the",
                    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
                  },
                  {
                    store: "Google Play",
                    sub: "GET IT ON",
                    path: "M3.18 23.76c.3.17.64.24.99.2l13.29-7.67-2.83-2.83-11.45 10.3zM.54 1.18C.2 1.56 0 2.14 0 2.89v18.22c0 .75.2 1.33.54 1.71l.09.08 10.21-10.21v-.24L.63 1.1l-.09.08zM20.94 10.8l-2.82-1.63-3.17 3.17 3.17 3.17 2.85-1.65c.81-.47.81-1.23-.03-1.7v.04zM4.17.24L17.46 7.9l-2.83 2.83L3.18.47c.35-.38.71-.41.99-.23z",
                  },
                ].map((app) => (
                  <a
                    key={app.store}
                    href="#"
                    className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d={app.path} />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[9px] opacity-75 leading-tight">
                        {app.sub}
                      </span>
                      <span className="text-xs font-semibold leading-tight">
                        {app.store}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">© 2026 NexMart.</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FlagUSIcon />
              English
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
