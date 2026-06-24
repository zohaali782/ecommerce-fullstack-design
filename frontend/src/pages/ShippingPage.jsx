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

const shippingOptions = [
  {
    name: "Standard Shipping",
    time: "7–14 Business Days",
    cost: "From $2.99",
    desc: "Reliable economy delivery for non-urgent orders. Tracked from warehouse to door.",
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
    name: "Express Shipping",
    time: "3–5 Business Days",
    cost: "From $9.99",
    desc: "Faster delivery for time-sensitive orders. Priority handling and expedited couriers.",
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    name: "Economy Air",
    time: "5–10 Business Days",
    cost: "From $4.99",
    desc: "Air-freight speed at ground prices. Great middle-ground for international orders.",
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
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    name: "Freight / Bulk",
    time: "14–30 Business Days",
    cost: "Custom quote",
    desc: "For large or heavy B2B orders. Sea freight with full customs documentation support.",
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
          d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
        />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

const trackingSteps = [
  {
    label: "Order Placed",
    desc: "Your order is confirmed and payment secured.",
  },
  { label: "Processing", desc: "Seller prepares and packs your item." },
  { label: "Dispatched", desc: "Handed to courier. Tracking number issued." },
  { label: "In Transit", desc: "Package is on its way to your destination." },
  { label: "Delivered", desc: "Package arrived at your delivery address." },
];

const faqs = [
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive a tracking number by email. Use it on our Order Tracking page or directly on the courier's website.",
  },
  {
    q: "Can I change my shipping address after ordering?",
    a: "Address changes are only possible within 1 hour of placing your order, before it enters processing. Contact support immediately.",
  },
  {
    q: "What happens if my package is lost?",
    a: "Lost packages are covered under NexMart Buyer Protection. Open a claim and we'll investigate and issue a refund or replacement within 7 business days.",
  },
  {
    q: "Are customs duties included?",
    a: "Import duties and taxes are not included in the listed price and vary by destination country. You are responsible for any applicable customs fees.",
  },
  {
    q: "Do you ship to PO Boxes?",
    a: "Most couriers do not deliver to PO Boxes for international orders. We recommend using a physical street address.",
  },
];

export default function ShippingPage() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
                  Help{" "}
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
                      { label: "Shipping & Delivery", to: "/shipping" },
                      { label: "Returns & Refunds", to: "/money-refund" },
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

          {mobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-full bg-white border-t border-b border-gray-200 shadow-lg z-40 px-4 py-2">
              {[
                { label: "All category", to: "/products" },
                { label: "Money Refund", to: "/money-refund" },
                { label: "Contact Us", to: "/contact" },
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
          <Link to="/help" className="hover:text-blue-600">
            Help Center
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Shipping & Delivery</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 sm:p-12 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">
              Shipping & Delivery
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-lg">
              Fast, reliable shipping to 50+ countries. Track every order from
              dispatch to your door with full visibility.
            </p>
          </div>
          <div className="shrink-0">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="white"
                fillOpacity="0.1"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
              />
              {/* Globe */}
              <circle
                cx="50"
                cy="50"
                r="28"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="14"
                ry="28"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <line
                x1="22"
                y1="50"
                x2="78"
                y2="50"
                stroke="white"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <line
                x1="26"
                y1="36"
                x2="74"
                y2="36"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              <line
                x1="26"
                y1="64"
                x2="74"
                y2="64"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              {/* Truck overlay */}
              <rect x="30" y="44" width="26" height="16" rx="2" fill="white" />
              <path
                d="M56 48 L56 57 L68 57 L68 52 L63 44 L56 44 Z"
                fill="white"
              />
              <circle
                cx="36"
                cy="62"
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle
                cx="62"
                cy="62"
                r="4"
                fill="#3B82F6"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* SHIPPING OPTIONS */}
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {shippingOptions.map((opt) => (
              <div
                key={opt.name}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  {opt.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {opt.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-blue-600 font-medium">
                    {opt.time}
                  </span>
                  <span className="text-[10px] text-gray-400">·</span>
                  <span className="text-xs text-gray-500">{opt.cost}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRACKING STEPS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-6">
            Order Tracking Journey
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-5 left-[10%] right-[10%] h-px bg-blue-100 z-0" />
            {trackingSteps.map((step, i) => (
              <div
                key={i}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 relative z-10 flex-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${i === 4 ? "bg-green-500 text-white" : "bg-blue-600 text-white"}`}
                >
                  {i + 1}
                </div>
                <div className="sm:text-center">
                  <p className="text-xs font-semibold text-gray-800">
                    {step.label}
                  </p>
                  <p className="text-[10px] text-gray-400 leading-relaxed max-w-[100px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY TIMES TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-800">
              Estimated Delivery by Region
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">
                    Region
                  </th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">
                    Standard
                  </th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">
                    Express
                  </th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">
                    Free Shipping Threshold
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    region: "🇵🇰 Pakistan",
                    std: "2–5 days",
                    exp: "1–2 days",
                    free: "Orders over $20",
                  },
                  {
                    region: "🇦🇪 Middle East",
                    std: "5–10 days",
                    exp: "3–5 days",
                    free: "Orders over $50",
                  },
                  {
                    region: "🇪🇺 Europe",
                    std: "10–15 days",
                    exp: "5–7 days",
                    free: "Orders over $80",
                  },
                  {
                    region: "🇺🇸 North America",
                    std: "12–18 days",
                    exp: "5–8 days",
                    free: "Orders over $100",
                  },
                  {
                    region: "🌍 Rest of World",
                    std: "14–25 days",
                    exp: "7–12 days",
                    free: "N/A",
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700 font-medium">
                      {row.region}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{row.std}</td>
                    <td className="px-6 py-3 text-blue-600 font-medium">
                      {row.exp}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${row.free === "N/A" ? "bg-gray-100 text-gray-400" : "bg-green-50 text-green-700"}`}
                      >
                        {row.free}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            Shipping FAQs
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
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
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-center">
          <h2 className="text-white text-xl font-bold mb-2">
            Track your order
          </h2>
          <p className="text-blue-100 text-sm mb-5">
            Enter your order number in My Orders to get real-time shipping
            updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/profile"
              className="bg-white text-blue-600 font-semibold text-sm px-6 py-2.5 rounded hover:bg-gray-100 transition-colors"
            >
              My Orders
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white font-semibold text-sm px-6 py-2.5 rounded hover:bg-blue-700 transition-colors"
            >
              Contact Support
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
