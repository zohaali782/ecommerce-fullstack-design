import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import {
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
} from "react-icons/fa";

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

const statusConfig = {
  delivered: {
    label: "Delivered",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: <FaCheckCircle />,
  },
  shipped: {
    label: "Shipped",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    icon: <FaTruck />,
  },
  processing: {
    label: "Processing",
    color: "text-orange-600 bg-orange-50 border-orange-200",
    icon: <FaClock />,
  },
  pending: {
    label: "Pending",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: <FaClock />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-500 bg-red-50 border-red-200",
    icon: <FaTimesCircle />,
  },
};

/* ── NAVBAR ── */
function Navbar() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);

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

  return (
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
                <Link
                  to="/help"
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
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
                  Help Center
                </Link>
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

            {/* Ship to — desktop */}
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
                  {countryOptions.find((c) => c.code === selectedCountry)?.name}
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

            {/* Ship to — mobile */}
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
  );
}
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

/* ── FOOTER ── */
function Footer() {
  return (
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
  );
}

// ─── Add Address Modal ───────────────────────────────────────────────
function AddAddressModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
    isDefault: false,
  });

  const handleSubmit = () => {
    if (!form.name || !form.address || !form.phone)
      return alert("Please fill required fields");
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md shadow-lg">
        <h3 className="text-sm font-bold text-gray-800 mb-4">
          Add New Address
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Address Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400"
            >
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>
          {[
            { label: "Full Name *", key: "name" },
            { label: "Phone *", key: "phone" },
            { label: "Address *", key: "address" },
            { label: "City", key: "city" },
            { label: "Country", key: "country" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs text-gray-400 mb-1">
                {f.label}
              </label>
              <input
                type="text"
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400"
              />
            </div>
          ))}
          <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm({ ...form, isDefault: e.target.checked })
              }
            />
            Set as default address
          </label>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded transition-colors"
          >
            Save Address
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-xs py-2 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [realOrders, setRealOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || "User",
    email: user?.email || "",
    phone: "+92 300 0000000",
    city: "Karachi",
    country: "Pakistan",
    address: "House 12, Street 5, Karachi",
  });

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("nexmart_token");
    if (!token) {
      logout();
      navigate("/login");
      return;
    }

    const authFetch = async (url, setter) => {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        const err = await res.json();
        if (err.expired) {
          logout();
          navigate("/login");
        }
        return;
      }

      const data = await res.json();
      setter(Array.isArray(data) ? data : []);
    };

    authFetch(
      `http://localhost:5000/api/orders/user/${user.id || user._id}`,
      setRealOrders,
    );
    authFetch("http://localhost:5000/api/wishlist", setWishlist);
    authFetch("http://localhost:5000/api/address", setAddresses);
  }, [user, logout, navigate]);

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem("nexmart_token");
    await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setWishlist((prev) => prev.filter((i) => i.productId !== productId));
  };

  const handleAddAddress = async (form) => {
    const token = localStorage.getItem("nexmart_token");
    const res = await fetch("http://localhost:5000/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setAddresses(Array.isArray(data) ? data : []);
    setShowAddModal(false);
  };

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("nexmart_token");
    await fetch(`http://localhost:5000/api/address/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setAddresses((prev) => prev.filter((a) => a._id !== id));
  };

  const sidebarLinks = [
    { key: "orders", icon: <FaBoxOpen />, label: "My Orders" },
    { key: "wishlist", icon: <FaHeart />, label: "Wishlist" },
    { key: "address", icon: <FaMapMarkerAlt />, label: "Addresses" },
    { key: "settings", icon: <FaCog />, label: "Account Settings" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Navbar />

      {showAddModal && (
        <AddAddressModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-5 flex-1 w-full">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">My Account</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* SIDEBAR */}
          <aside className="w-full md:w-52 shrink-0">
            <div className="bg-white rounded border border-gray-200 p-4 text-center mb-3">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 text-2xl text-blue-600 font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <p className="text-sm font-bold text-gray-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {user?.email || ""}
              </p>
              <span className="inline-block mt-2 bg-green-100 text-green-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <div className="bg-white rounded border border-gray-200 overflow-hidden mb-3">
              {sidebarLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setActiveTab(link.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-medium transition-colors border-b border-gray-50 last:border-0 ${
                    activeTab === link.key
                      ? "bg-blue-50 text-blue-600 border-l-2 border-l-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-medium text-red-500 bg-white rounded border border-gray-200 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1">
            {/* MY ORDERS */}
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">My Orders</h2>
                </div>
                <div className="space-y-3">
                  {realOrders.length > 0 ? (
                    realOrders.map((order) => {
                      const s =
                        statusConfig[order.status] || statusConfig["pending"];
                      return (
                        <div
                          key={order._id}
                          className="bg-white rounded border border-gray-200 p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <p className="text-xs font-bold text-gray-800">
                                #{order._id.slice(-6).toUpperCase()}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`flex items-center gap-1 text-xs font-medium border rounded-full px-2.5 py-0.5 ${s.color}`}
                              >
                                <span className="text-[10px]">{s.icon}</span>{" "}
                                {s.label}
                              </span>
                              <p className="text-sm font-bold text-gray-800">
                                ${order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 mb-3">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center gap-3">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 object-cover rounded border border-gray-100 shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-100 rounded border border-gray-100 shrink-0 flex items-center justify-center text-xs text-gray-400">
                                    #{i + 1}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-xs text-gray-700 line-clamp-1">
                                    {item.name || `Item ${i + 1}`}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Qty: {item.quantity} × ${item.price}
                                  </p>
                                </div>
                                <p className="text-xs font-semibold text-gray-800">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <button
                              onClick={() => {
                                const orderData = {
                                  items: order.items.map((item) => ({
                                    id: item.product,
                                    name: item.name,
                                    image: item.image,
                                    price: item.price,
                                    qty: item.quantity,
                                  })),
                                  shipping: order.shipping || {},
                                  paymentMethod: order.paymentMethod || "card",
                                  subtotal:
                                    order.subtotal ||
                                    order.total - (order.tax || 14),
                                  tax: order.tax || 14,
                                  total: order.total,
                                };
                                localStorage.setItem(
                                  "lastOrder",
                                  JSON.stringify(orderData),
                                );
                                navigate("/order-confirmation", {
                                  state: orderData,
                                });
                              }}
                              className="text-xs text-blue-600 border border-blue-200 rounded px-3 py-1 hover:bg-blue-50 transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-white rounded border border-gray-200 p-8 text-center">
                      <FaBoxOpen className="text-gray-300 text-4xl mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">No orders yet!</p>
                      <Link
                        to="/"
                        className="text-blue-600 text-xs hover:underline mt-1 inline-block"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WISHLIST */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-sm font-bold text-gray-800 mb-3">
                  My Wishlist ({wishlist.length})
                </h2>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {wishlist.map((item) => (
                      <div
                        key={item.productId}
                        className="bg-white rounded border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <button
                            onClick={() => removeFromWishlist(item.productId)}
                            className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 transition-colors"
                          >
                            <FaHeart className="text-xs" />
                          </button>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-bold text-gray-800 mb-0.5">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-tight">
                            {item.name}
                          </p>
                          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded border border-gray-200 p-8 text-center">
                    <FaHeart className="text-gray-300 text-4xl mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Your wishlist is empty!
                    </p>
                    <Link
                      to="/"
                      className="text-blue-600 text-xs hover:underline mt-1 inline-block"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === "address" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">
                    My Addresses
                  </h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                  >
                    + Add New Address
                  </button>
                </div>
                {addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className="bg-white rounded border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-500 text-sm" />
                            <span className="text-xs font-bold text-gray-800">
                              {addr.type}
                            </span>
                            {addr.isDefault && (
                              <span className="bg-blue-100 text-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          {addr.name}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-1">
                          {addr.address}, {addr.city}, {addr.country}
                        </p>
                        <p className="text-xs text-gray-500">{addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded border border-gray-200 p-8 text-center">
                    <FaMapMarkerAlt className="text-gray-300 text-4xl mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      No saved addresses yet!
                    </p>
                    <p className="text-gray-300 text-xs mt-1">
                      Click "+ Add New Address" to save one.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ACCOUNT SETTINGS */}
            {activeTab === "settings" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">
                    Account Settings
                  </h2>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded transition-colors ${
                      editMode
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {editMode ? <FaCheckCircle /> : <FaEdit />}
                    {editMode ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>

                <div className="bg-white rounded border border-gray-200 p-5 mb-3">
                  <h3 className="text-xs font-bold text-gray-700 mb-4 uppercase tracking-wide">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", key: "name" },
                      { label: "Email Address", key: "email" },
                      { label: "Phone Number", key: "phone" },
                      { label: "City", key: "city" },
                      { label: "Country", key: "country" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-gray-400 mb-1">
                          {f.label}
                        </label>
                        {editMode ? (
                          <input
                            type="text"
                            value={profile[f.key]}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                [f.key]: e.target.value,
                              })
                            }
                            className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                          />
                        ) : (
                          <p className="text-xs font-medium text-gray-700 py-2">
                            {profile[f.key]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded border border-gray-200 p-5">
                  <h3 className="text-xs font-bold text-gray-700 mb-4 uppercase tracking-wide">
                    Change Password
                  </h3>
                  <div className="space-y-3 max-w-sm">
                    {[
                      "Current Password",
                      "New Password",
                      "Confirm New Password",
                    ].map((label) => (
                      <div key={label}>
                        <label className="block text-xs text-gray-400 mb-1">
                          {label}
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    ))}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
