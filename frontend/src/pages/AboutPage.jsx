import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

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
  { code: "gb", name: "UK" },
];

const stats = [
  { value: "10M+", label: "Products Listed" },
  { value: "50+", label: "Countries Served" },
  { value: "500K+", label: "Happy Buyers" },
  { value: "20K+", label: "Verified Suppliers" },
];

const values = [
  {
    title: "Trust & Transparency",
    desc: "Every supplier is verified. Every transaction is secured. We believe business works best when both sides can rely on each other.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Global Reach",
    desc: "We connect buyers and suppliers across 50+ countries, making cross-border commerce as simple as shopping locally.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <circle cx="12" cy="12" r="10" />
        <path
          strokeLinecap="round"
          d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"
        />
      </svg>
    ),
  },
  {
    title: "Buyer Protection",
    desc: "Shop with confidence. Our buyer protection policy ensures your money is safe until you receive exactly what you ordered.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    title: "Fast Logistics",
    desc: "Partnered with top courier networks worldwide to deliver your orders quickly, reliably, and with full tracking visibility.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8h4l3 5v3h-7V8z"
        />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Quality Assurance",
    desc: "Products are reviewed and monitored. Suppliers who don't meet our standards are removed to keep your experience premium.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always available to help buyers and suppliers resolve any issue quickly and professionally.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

const team = [
  { name: "Ahmed Raza", role: "CEO & Co-founder", initials: "AR" },
  { name: "Sara Khan", role: "Head of Operations", initials: "SK" },
  { name: "Bilal Malik", role: "Chief Technology Officer", initials: "BM" },
  { name: "Nadia Farooq", role: "Head of Supplier Relations", initials: "NF" },
];

const timeline = [
  {
    year: "2020",
    text: "NexMart founded in Karachi with a vision to simplify B2B commerce.",
  },
  {
    year: "2021",
    text: "Launched with 500 verified suppliers across Pakistan and UAE.",
  },
  {
    year: "2022",
    text: "Expanded to 20 countries. Crossed 100,000 registered buyers.",
  },
  {
    year: "2023",
    text: "Introduced buyer protection program and express shipping network.",
  },
  {
    year: "2024",
    text: "Reached 500K+ buyers. Partnered with 20,000+ global suppliers.",
  },
  {
    year: "2025",
    text: "Launched mobile app. Expanded operations to 50+ countries.",
  },
];

export default function AboutPage() {
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
                {categories.map((c) => (
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
                            <circle
                              cx="12"
                              cy="17"
                              r=".5"
                              fill="currentColor"
                            />
                          </svg>
                        ),
                      },
                      {
                        label: "How to Buy",
                        to: "/help#how-to-buy",
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
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                          </svg>
                        ),
                      },
                      {
                        label: "Shipping & Delivery",
                        to: "/help#shipping",
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
                            <rect x="1" y="3" width="15" height="13" rx="1" />
                            <path d="M16 8h4l3 5v3h-7V8z" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                          </svg>
                        ),
                      },
                      {
                        label: "Returns & Refunds",
                        to: "/help#returns",
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
                            <path d="M3 9l4-4-4-4" />
                            <path d="M7 5H3a9 9 0 109 9" />
                          </svg>
                        ),
                      },
                      {
                        label: "Contact Us",
                        to: "/contact",
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
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        ),
                      },
                      {
                        label: "FAQs",
                        to: "/help#faq",
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
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            <line x1="9" y1="10" x2="15" y2="10" />
                            <line x1="12" y1="7" x2="12" y2="13" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setShowHelpDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item.icon}
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
          <span className="text-gray-700 font-medium">About Us</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 sm:p-12 mb-8 text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
            About NexMart
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We're building the world's most trusted B2B marketplace — connecting
            buyers and suppliers across borders with speed, safety, and
            simplicity.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center"
            >
              <p className="text-2xl font-bold text-blue-600 mb-1">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* MISSION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            NexMart was founded with a single goal: make global trade accessible
            to everyone. Whether you're a small business owner in Karachi
            sourcing materials, or a manufacturer in Guangzhou looking for
            international buyers — NexMart is built for you. We remove the
            complexity of cross-border commerce so you can focus on what
            matters: growing your business.
          </p>
        </div>

        {/* VALUES */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  {v.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                  {v.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-6">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-200"></div>
            <div className="space-y-6">
              {timeline.map((item) => (
                <div key={item.year} className="flex items-start gap-4">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded px-2 py-1 shrink-0 w-14 text-center">
                    {item.year}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 relative z-10"></div>
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TEAM */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Leadership Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center"
              >
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  {member.initials}
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  {member.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-center">
          <h2 className="text-white text-xl font-bold mb-2">
            Ready to start trading?
          </h2>
          <p className="text-blue-100 text-sm mb-5">
            Join millions of buyers and suppliers on NexMart today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="bg-white text-blue-600 font-semibold text-sm px-6 py-2.5 rounded hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/products"
              className="border border-white text-white font-semibold text-sm px-6 py-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
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
