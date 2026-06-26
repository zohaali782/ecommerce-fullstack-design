import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const extraServices = [
  {
    title: "Source from Industry Hubs",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80",
  },
  {
    title: "Customize Your Products",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&q=80",
  },
  {
    title: "Fast, reliable shipping by ocean or air",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
  },
  {
    title: "Product monitoring and inspection",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

const suppliers = [
  { country: "Arabic Emirates", domain: "shopname.ae", flag: "🇦🇪" },
  { country: "Australia", domain: "shopname.au", flag: "🇦🇺" },
  { country: "United States", domain: "shopname.us", flag: "🇺🇸" },
  { country: "Russia", domain: "shopname.ru", flag: "🇷🇺" },
  { country: "Italy", domain: "shopname.it", flag: "🇮🇹" },
  { country: "Denmark", domain: "shopname.dk", flag: "🇩🇰" },
  { country: "France", domain: "shopname.fr", flag: "🇫🇷" },
  { country: "China", domain: "shopname.cn", flag: "🇨🇳" },
  { country: "Great Britain", domain: "shopname.co.uk", flag: "🇬🇧" },
  { country: "Pakistan", domain: "shopname.pk", flag: "🇵🇰" },
];
function FlagUSIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="inline-block mr-1"
    >
      <rect width="16" height="12" fill="#B22234" />
      <rect y="0" width="16" height="0.923" fill="#B22234" />
      <rect y="0.923" width="16" height="0.923" fill="white" />
      <rect y="1.846" width="16" height="0.923" fill="#B22234" />
      <rect y="2.769" width="16" height="0.923" fill="white" />
      <rect y="3.692" width="16" height="0.923" fill="#B22234" />
      <rect y="4.615" width="16" height="0.923" fill="white" />
      <rect y="5.538" width="16" height="0.923" fill="#B22234" />
      <rect y="6.461" width="16" height="0.923" fill="white" />
      <rect y="7.384" width="16" height="0.923" fill="#B22234" />
      <rect y="8.307" width="16" height="0.923" fill="white" />
      <rect y="9.230" width="16" height="0.923" fill="#B22234" />
      <rect y="10.153" width="16" height="0.923" fill="white" />
      <rect y="11.076" width="16" height="0.923" fill="#B22234" />
      <rect width="7" height="5.538" fill="#3C3B6E" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-3 h-3 inline-block"
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

// UK removed — only 4 countries
const countryOptions = [
  { code: "pk", name: "Pakistan" },
  { code: "de", name: "Germany" },
  { code: "us", name: "USA" },
  { code: "ae", name: "UAE" },
];

function CountdownTimer() {
  const [time, setTime] = useState({ d: 4, h: 13, m: 34, s: 56 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 23;
          d--;
        }
        if (d < 0) return { d: 4, h: 13, m: 34, s: 56 };
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 ml-0 sm:ml-3 mt-2 sm:mt-0">
      {[
        { label: "Days", val: pad(time.d) },
        { label: "Hour", val: pad(time.h) },
        { label: "Min", val: pad(time.m) },
        { label: "Sec", val: pad(time.s) },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 rounded min-w-[28px] text-center">
            {item.val}
          </span>
          <span className="text-gray-400 text-[9px] mt-0.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
      {message}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded overflow-hidden">
      <div className="bg-gray-200 h-36"></div>
      <div className="p-2">
        <div className="bg-gray-200 h-3 rounded mb-2"></div>
        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

  // Ship to state
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [countryOpen, setCountryOpen] = useState(false); // desktop
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false); // mobile

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(searchCategory)}`,
      );
    } else if (searchCategory) {
      navigate(`/products?category=${encodeURIComponent(searchCategory)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [inquiry, setInquiry] = useState({ item: "", details: "", qty: "" });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} Product added in the cart`);
  };

  const hotProducts = products.filter((p) => p.isHot).slice(0, 5);
  const homeProducts = products
    .filter((p) => p.category === "Home interiors")
    .slice(0, 8);
  const electronicsProducts = products
    .filter(
      (p) => p.category === "Electronics" || p.category === "Computer and tech",
    )
    .slice(0, 8);
  const recommendedProducts = products.slice(0, 10);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Toast show={toast.show} message={toast.message} />

      {/* ── NAVBAR ── */}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 w-full border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="hidden sm:block border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50"
              >
                <option value="">All category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 rounded-r text-sm font-medium shrink-0"
              >
                Search
              </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
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
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors relative"
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

              {/* Hamburger - mobile only */}
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

          {/* ── Desktop secondary nav ── */}
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
                <span className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600">
                  Help ▾
                </span>
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px] hidden group-hover:block">
                  {[
                    {
                      label: "Help Center",
                      to: "/help",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                          <circle cx="12" cy="17" r=".5" fill="currentColor" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Currency */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm text-gray-600"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>

              {/* Ship to — desktop custom dropdown with flag + name */}
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
                  <svg
                    className="w-3 h-3"
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
                {countryOpen && (
                  <div className="absolute top-7 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[140px]">
                    {countryOptions.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country.code);
                          setCountryOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 text-gray-700 ${selectedCountry === country.code ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
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

          {/* ── Mobile dropdown menu ── */}
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

              {/* Currency */}
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

              {/* Ship to — mobile custom dropdown with flag + name */}
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
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 ${selectedCountry === c.code ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"}`}
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

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* HERO */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <aside className="w-full lg:w-44 shrink-0">
            <button
              onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
              className="lg:hidden w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs font-medium text-gray-700 flex items-center justify-between"
            >
              ☰ Browse categories
              <span>{mobileCategoryOpen ? "▴" : "▾"}</span>
            </button>
            <div
              className={`bg-white rounded border border-gray-200 overflow-hidden mt-1 lg:mt-0 ${mobileCategoryOpen ? "block" : "hidden lg:block"}`}
            >
              {[...categories, "More category"].map((cat, i) => (
                <Link
                  key={cat}
                  to={
                    cat === "More category"
                      ? "/products"
                      : `/products?category=${encodeURIComponent(cat)}`
                  }
                  className={`flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 ${i === 0 ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
                >
                  {cat}
                  <span className="text-gray-300">›</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="flex-1 bg-gradient-to-r from-teal-400 to-cyan-500 overflow-hidden relative min-h-[280px] sm:min-h-[320px]">
            <div className="absolute inset-0">
              <img
                src="/images/hero-headphones.png"
                alt="hero"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="relative z-10 p-5 sm:p-8">
              <p className="text-gray-700 text-sm mb-1 font-normal">
                Latest trending
              </p>
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold mb-4">
                Electronic
                <br />
                items
              </h1>
              <Link
                to="/products?category=Electronics"
                className="bg-white text-gray-800 text-sm font-medium px-5 py-2 rounded hover:bg-gray-100 inline-block"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-44 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            <div className="bg-white rounded border border-gray-200 p-3 text-center min-w-[180px] lg:min-w-0 lg:w-full shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm shrink-0">
                  👤
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-700">Hi, user</p>
                  <p className="text-xs text-gray-400">let's get started</p>
                </div>
              </div>
              <Link
                to="/login"
                className="block w-full bg-blue-600 text-white text-xs py-1.5 rounded mb-1 hover:bg-blue-700 text-center"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="block w-full border border-blue-600 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-50 text-center"
              >
                Log in
              </Link>
            </div>
            <div className="bg-orange-400 rounded p-3 text-white min-w-[160px] lg:min-w-0 shrink-0">
              <p className="text-xs font-semibold">Get US $10 off</p>
              <p className="text-xs opacity-80">with a new supplier</p>
            </div>
            <div className="bg-blue-500 rounded p-3 text-white min-w-[160px] lg:min-w-0 shrink-0">
              <p className="text-xs font-semibold">Send quotes with</p>
              <p className="text-xs opacity-80">supplier preferences</p>
            </div>
          </div>
        </div>

        {/* DEALS & OFFERS */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-800">
                Deals and offers
              </h2>
              <p className="text-xs text-gray-400">Hot products</p>
            </div>
            <CountdownTimer />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse text-center">
                    <div className="bg-gray-200 h-28 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded mb-1 mx-4"></div>
                    <div className="bg-gray-200 h-3 rounded w-12 mx-auto"></div>
                  </div>
                ))
              : hotProducts.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p._id}`}
                    className="text-center cursor-pointer group"
                  >
                    <div className="border border-gray-100 rounded overflow-hidden mb-1.5 group-hover:border-blue-300 transition-colors relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/products/placeholder.jpg";
                        }}
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[10px] py-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                      >
                        + Add to Cart
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 font-medium line-clamp-1">
                      {p.name}
                    </p>
                    <span className="inline-block bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded mt-0.5">
                      -{p.discount}%
                    </span>
                  </Link>
                ))}
          </div>
        </div>

        {/* HOME & OUTDOOR */}
        <div className="bg-white rounded border border-gray-200 mb-3 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-40 shrink-0 bg-gradient-to-b from-green-100 to-green-200 p-4 flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-800">
                Home and outdoor
              </h3>
              <Link
                to="/products?category=Home interiors"
                className="border border-gray-400 text-gray-700 text-xs px-3 py-1.5 rounded hover:bg-gray-100 text-center block shrink-0"
              >
                Source now
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-100">
              {loading
                ? [...Array(8)].map((_, i) => (
                    <div key={i} className="p-3 flex gap-2 animate-pulse">
                      <div className="bg-gray-200 w-16 h-16 rounded shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 h-3 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
                : homeProducts.map((item) => (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex gap-2 group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/products/placeholder.jpg";
                        }}
                        className="w-16 h-16 object-cover rounded shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-600 leading-tight group-hover:text-blue-600 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          From
                          <br />
                          <span className="text-gray-600 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {/* CONSUMER ELECTRONICS */}
        <div className="bg-white rounded border border-gray-200 mb-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-40 shrink-0 bg-gradient-to-b from-blue-100 to-indigo-200 p-4 flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-800">
                Consumer electronics and gadgets
              </h3>
              <Link
                to="/products?category=Electronics"
                className="border border-gray-400 text-gray-700 text-xs px-3 py-1.5 rounded hover:bg-gray-100 text-center block shrink-0"
              >
                Source now
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-100">
              {loading
                ? [...Array(8)].map((_, i) => (
                    <div key={i} className="p-3 flex gap-2 animate-pulse">
                      <div className="bg-gray-200 w-16 h-16 rounded shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 h-3 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
                : electronicsProducts.map((item) => (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex gap-2 group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/products/placeholder.jpg";
                        }}
                        className="w-16 h-16 object-cover rounded shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-600 leading-tight group-hover:text-blue-600 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          From
                          <br />
                          <span className="text-gray-600 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {/* INQUIRY BANNER */}
        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded mb-4">
          <div className="flex flex-col md:flex-row items-center p-6 gap-6 md:gap-8">
            <div className="flex-1 text-white text-center md:text-left">
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-sm text-white/80">
                Get the best deals from verified suppliers worldwide. Fast,
                easy, and reliable.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 w-full md:w-72 shrink-0">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Send quote to suppliers
              </h3>
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs mb-2 focus:outline-none focus:border-blue-400"
                value={inquiry.item}
                onChange={(e) =>
                  setInquiry({ ...inquiry, item: e.target.value })
                }
              />
              <textarea
                placeholder="Type more details"
                className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs mb-2 h-16 resize-none focus:outline-none focus:border-blue-400"
                value={inquiry.details}
                onChange={(e) =>
                  setInquiry({ ...inquiry, details: e.target.value })
                }
              />

              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none"
                  value={inquiry.qty}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || parseInt(val) > 0) {
                      setInquiry({ ...inquiry, qty: val });
                    }
                  }}
                />

                <select className="border border-gray-200 rounded px-2 text-xs text-gray-600">
                  <option>Pcs</option>
                  <option>Kg</option>
                </select>
              </div>
              <button
                onClick={async () => {
                  if (!inquiry.item.trim())
                    return showToast("Please enter item name!");
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/inquiries/general`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          item: inquiry.item,
                          details: inquiry.details,
                          quantity: inquiry.qty,
                        }),
                      },
                    );
                    const data = await res.json();
                    if (res.ok) {
                      showToast("Inquiry sent successfully!");
                      setInquiry({ item: "", details: "", qty: "" });
                    } else showToast(data.message || "Failed to send inquiry");
                  } catch {
                    showToast("Server error!");
                  }
                }}
                className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700"
              >
                Send inquiry
              </button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Recommended items
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {loading
              ? [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
              : recommendedProducts.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <Link to={`/product/${item._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/products/placeholder.jpg";
                          }}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 transition-colors font-medium"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* EXTRA SERVICES */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Our extra services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {extraServices.map((service, i) => {
              const icons = [
                <svg
                  key="search"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="7" strokeWidth="2" />
                  <line
                    x1="16.5"
                    y1="16.5"
                    x2="22"
                    y2="22"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>,
                <svg
                  key="box"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L4 7h16l-4-4z"
                  />
                </svg>,
                <svg
                  key="send"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                  />
                </svg>,
                <svg
                  key="globe"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeWidth="2"
                    d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
                  />
                </svg>,
              ];
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/products/placeholder.jpg";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full w-7 h-7 flex items-center justify-center shadow">
                      {icons[i]}
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-700 leading-tight">
                      {service.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SUPPLIERS */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Suppliers by region
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {suppliers.map((s, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600"
              >
                <img
                  src={`/flags/${["ae", "au", "us", "ru", "it", "dk", "fr", "cn", "gb", "pk"][i]}.svg`}
                  alt={s.country}
                  className="w-6 h-4 object-cover rounded-sm shrink-0"
                />
                <div>
                  <p className="font-medium text-xs">{s.country}</p>
                  <p className="text-gray-400 text-[10px]">{s.domain}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-gray-200 rounded p-6 text-center mb-4">
          <h3 className="text-base font-bold text-gray-800 mb-1">
            Subscribe on our newsletter
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Get daily news on upcoming offers from many suppliers all over the
            world
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <input
              type="email"
              placeholder="Email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-56 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={async () => {
                if (newsletterEmail.includes("@")) {
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: newsletterEmail }),
                      },
                    );
                    const data = await res.json();
                    if (data.success) {
                      showToast("Successfully subscribed!");
                      setNewsletterEmail("");
                    } else showToast(data.message);
                  } catch {
                    showToast("Server error!");
                  }
                } else showToast("Please enter a valid email!");
              }}
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
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

            {/* Get App */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
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
