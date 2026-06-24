import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const navCategories = [
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
  { code: "gb", name: "UK" },
];

export default function FindStorePage() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleSearch = () => {
    if (searchQuery.trim())
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* NAVBAR */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 py-2.5">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-gray-800 text-lg">NexMart</span>
            </Link>

            <div className="flex flex-1 min-w-full sm:min-w-0 order-3 sm:order-none">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="hidden sm:block border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50">
                <option value="">All category</option>
                {navCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
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

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
                <span className="text-[10px]">Profile</span>
              </Link>
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-1"
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
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mb-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-[10px]">Orders</span>
              </Link>
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600 relative"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mb-1"
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
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-gray-600 p-1"
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

          {/* Desktop nav */}
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
              <div className="relative">
                <button
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-0.5"
                >
                  Help
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showHelpDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px]">
                    {[
                      { label: "Help Center", to: "/help" },
                      { label: "How to Buy", to: "/help#how-to-buy" },
                      { label: "Shipping & Delivery", to: "/help#shipping" },
                      { label: "Returns & Refunds", to: "/help#returns" },
                      { label: "Contact Us", to: "/contact" },
                      { label: "FAQs", to: "/help#faq" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setShowHelpDropdown(false)}
                        className="block px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>
              <div className="relative flex items-center gap-1.5">
                <span className="text-sm text-gray-500">Ship to</span>
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-1 focus:outline-none"
                >
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry}.png`}
                    alt="flag"
                    className="w-5 h-3.5 object-cover rounded-sm"
                  />
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 py-1 min-w-[130px]">
                    {countryOptions.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c.code);
                          setShowCountryDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 ${selectedCountry === c.code ? "bg-blue-50 text-blue-600" : ""}`}
                      >
                        <img
                          src={`https://flagcdn.com/w20/${c.code}.png`}
                          alt={c.name}
                          className="w-5 h-3.5 object-cover rounded-sm"
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-full bg-white border-t border-b border-gray-200 shadow-lg z-40 px-4 py-2">
              {[
                { label: "All category", to: "/products" },
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
                { label: "Help Center", to: "/help" },
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
            </div>
          )}
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 py-2 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Find Store</span>
        </div>
      </div>

      {/* COMING SOON CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md w-full">
          {/* SVG Illustration — store / map pin themed */}
          <div className="flex justify-center mb-8">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Map background */}
              <rect
                x="8"
                y="30"
                width="104"
                height="75"
                rx="6"
                fill="#EFF6FF"
                stroke="#BFDBFE"
                strokeWidth="1.5"
              />
              {/* Map grid lines */}
              <line
                x1="8"
                y1="55"
                x2="112"
                y2="55"
                stroke="#DBEAFE"
                strokeWidth="1"
              />
              <line
                x1="8"
                y1="75"
                x2="112"
                y2="75"
                stroke="#DBEAFE"
                strokeWidth="1"
              />
              <line
                x1="38"
                y1="30"
                x2="38"
                y2="105"
                stroke="#DBEAFE"
                strokeWidth="1"
              />
              <line
                x1="68"
                y1="30"
                x2="68"
                y2="105"
                stroke="#DBEAFE"
                strokeWidth="1"
              />
              <line
                x1="98"
                y1="30"
                x2="98"
                y2="105"
                stroke="#DBEAFE"
                strokeWidth="1"
              />
              {/* Road horizontal */}
              <rect
                x="8"
                y="62"
                width="104"
                height="8"
                rx="0"
                fill="#BFDBFE"
                opacity="0.5"
              />
              {/* Road vertical */}
              <rect
                x="58"
                y="30"
                width="8"
                height="75"
                rx="0"
                fill="#BFDBFE"
                opacity="0.5"
              />
              {/* Small building 1 */}
              <rect
                x="18"
                y="70"
                width="14"
                height="18"
                rx="2"
                fill="#93C5FD"
                stroke="#3B82F6"
                strokeWidth="1"
              />
              <rect
                x="21"
                y="73"
                width="4"
                height="4"
                rx="0.5"
                fill="white"
                opacity="0.8"
              />
              <rect
                x="26"
                y="73"
                width="4"
                height="4"
                rx="0.5"
                fill="white"
                opacity="0.8"
              />
              {/* Small building 2 */}
              <rect
                x="78"
                y="75"
                width="12"
                height="13"
                rx="2"
                fill="#BFDBFE"
                stroke="#93C5FD"
                strokeWidth="1"
              />
              <rect
                x="81"
                y="78"
                width="3"
                height="3"
                rx="0.5"
                fill="white"
                opacity="0.8"
              />
              <rect
                x="85"
                y="78"
                width="3"
                height="3"
                rx="0.5"
                fill="white"
                opacity="0.8"
              />
              {/* Main map pin */}
              <ellipse
                cx="62"
                cy="108"
                rx="8"
                ry="3"
                fill="#BFDBFE"
                opacity="0.6"
              />
              <path
                d="M62 42 C53 42 46 49 46 57 C46 68 62 82 62 82 C62 82 78 68 78 57 C78 49 71 42 62 42Z"
                fill="#3B82F6"
                stroke="#2563EB"
                strokeWidth="1.5"
              />
              <circle cx="62" cy="57" r="6" fill="white" />
              <circle cx="62" cy="57" r="3" fill="#3B82F6" />
            </svg>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-blue-600 tracking-wide uppercase">
              Coming Soon
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Store locator is on its way
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            We are setting up NexMart pickup points and partner stores near you.
            Check back soon to find the nearest location.
          </p>

          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
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
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                About
              </h4>
              <Link
                to="/about"
                className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5"
              >
                About Us
              </Link>
              <Link
                to="/find-store"
                className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5"
              >
                Find store
              </Link>
              <Link
                to="/categories"
                className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5"
              >
                Categories
              </Link>
              <Link
                to="/blogs"
                className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5"
              >
                Blogs
              </Link>
            </div>
            {[
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
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
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
              🇺🇸 English ▾
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
