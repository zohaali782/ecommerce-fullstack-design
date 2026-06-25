import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

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

const PROJECTS = [
  {
    id: 1,
    title: "Office Supplies Bundle",
    category: "B2B · Stationery",
    description:
      "Bulk procurement of office stationery, furniture, and consumables for corporate clients.",
    minOrder: 100,
    unit: "units",
    priceRange: "$2 – $15",
    deadline: "Aug 2026",
    fulfilled: 72,
    total: 500,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Office", "Corporate", "Bulk"],
  },
  {
    id: 2,
    title: "Branded Merch Pack",
    category: "Corporate · Apparel",
    description:
      "Custom-printed T-shirts, hoodies, and caps with company logos for corporate gifting.",
    minOrder: 50,
    unit: "pcs",
    priceRange: "$8 – $25",
    deadline: "Jul 2026",
    fulfilled: 45,
    total: 200,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Apparel", "Branding", "Custom"],
  },
  {
    id: 3,
    title: "IT Equipment Tender",
    category: "Enterprise · Tech",
    description:
      "Laptops, monitors, keyboards, and accessories for a government department tender.",
    minOrder: 10,
    unit: "units",
    priceRange: "$200 – $1,200",
    deadline: "Sep 2026",
    fulfilled: 20,
    total: 50,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Electronics", "Tender", "Government"],
  },
  {
    id: 4,
    title: "Medical Supply Kit",
    category: "Healthcare · Supplies",
    description:
      "First-aid kits, PPE, and medical consumables for hospital and clinic procurement.",
    minOrder: 200,
    unit: "kits",
    priceRange: "$5 – $40",
    deadline: "Oct 2026",
    fulfilled: 88,
    total: 1000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Healthcare", "Bulk", "Urgent"],
  },
  {
    id: 5,
    title: "Restaurant Kitchen Set",
    category: "Hospitality · Equipment",
    description:
      "Commercial kitchen equipment including cookware, utensils, and storage for new restaurant openings.",
    minOrder: 1,
    unit: "set",
    priceRange: "$500 – $3,000",
    deadline: "Dec 2026",
    fulfilled: 5,
    total: 30,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Hospitality", "Equipment", "Custom"],
  },
  {
    id: 6,
    title: "School Uniform Program",
    category: "Education · Apparel",
    description:
      "Uniforms, shoes, and bags for a school district annual supply contract.",
    minOrder: 500,
    unit: "sets",
    priceRange: "$12 – $35",
    deadline: "Jun 2026",
    fulfilled: 95,
    total: 2000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Education", "Apparel", "Bulk"],
  },
];

const STATUS_FILTERS = ["All", "In progress", "Starting", "Near complete"];
const TAG_FILTERS = [
  "All",
  "Bulk",
  "Corporate",
  "Custom",
  "Electronics",
  "Healthcare",
];

function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 left-4 sm:left-auto bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      {message}
    </div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [showInquiry, setShowInquiry] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    qty: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

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

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const filtered = PROJECTS.filter((p) => {
    const matchStatus = activeStatus === "All" || p.status === activeStatus;
    const matchTag = activeTag === "All" || p.tags.includes(activeTag);
    return matchStatus && matchTag;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: String(showInquiry.id),
          projectTitle: showInquiry.title,
          name: form.name,
          company: form.company,
          quantity: Number(form.qty),
          details: form.message,
        }),
      });
      setSubmitted(true);
      showToast("Inquiry sent successfully!");
      setTimeout(() => {
        setShowInquiry(null);
        setSubmitted(false);
        setForm({ name: "", company: "", qty: "", message: "" });
      }, 2000);
    } catch {
      setFormError("Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const pct = (p) => Math.round((p.fulfilled / p.total) * 100);

  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Toast show={toast.show} message={toast.message} />

      {/* ── NAVBAR ── */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-3 py-2.5">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-gray-800 text-lg">NexMart</span>
            </Link>

            {/* Search bar */}
            <div className="flex flex-1 min-w-full sm:min-w-0 order-3 sm:order-none">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
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

              {/* Cart */}
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

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-gray-600 p-1"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
                All category
              </Link>
              <Link
                to="/hot-offers"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Hot offers
              </Link>
              <Link
                to="/gift-boxes"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Gift boxes
              </Link>
              <Link
                to="/projects"
                className="text-sm text-blue-600 font-medium"
              >
                Projects
              </Link>
              <div className="relative group">
                <span className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600 flex items-center gap-0.5">
                  Help
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
                All category
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

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>›</span>
            <span className="text-white">Projects</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
            Projects
          </h1>
          <p className="text-white/80 text-sm">
            Bulk &amp; business orders — join an active project or submit a new
            sourcing request.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5 flex-1">
        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              label: "Active projects",
              value: PROJECTS.filter((p) => p.status !== "Completed").length,
            },
            {
              label: "Near completion",
              value: PROJECTS.filter((p) => p.status === "Near complete")
                .length,
            },
            {
              label: "Starting soon",
              value: PROJECTS.filter((p) => p.status === "Starting").length,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded p-3 text-center"
            >
              <p className="text-2xl font-bold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded border border-gray-200 p-3 mb-4">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500">
                Status:
              </span>
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeStatus === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500">Tag:</span>
              {TAG_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeTag === t
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p className="text-xs text-gray-500 mb-3">
          <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
          projects available
        </p>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      {project.category}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded shrink-0 ml-2 ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex gap-1 flex-wrap mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Fulfillment progress</span>
                    <span className="font-semibold text-gray-600">
                      {project.fulfilled}/{project.total} {project.unit}
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 w-full">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${pct(project)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 text-right">
                    {pct(project)}% fulfilled
                  </p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 mb-3">
                  <div>
                    <p className="text-[10px] text-gray-400">Min order</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.minOrder} {project.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Price range</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.priceRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Deadline</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.deadline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInquiry(project)}
                  className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Join this project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto mb-3 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <p className="text-sm font-medium">
              No projects match this filter.
            </p>
            <button
              onClick={() => {
                setActiveStatus("All");
                setActiveTag("All");
              }}
              className="mt-3 text-blue-600 text-xs hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* NEW PROJECT CTA */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Have a bulk sourcing need?
            </h3>
            <p className="text-xs text-gray-500">
              Submit a new project and we'll match you with the right suppliers.
            </p>
          </div>
          <button
            onClick={() => setShowInquiry({ id: "new", title: "New Project" })}
            className="bg-blue-600 text-white text-xs font-semibold px-5 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit a project
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
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
                title: "For users",
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-3"
                viewBox="0 0 60 30"
              >
                <rect width="60" height="30" fill="#B22234" />
                <rect y="2.3" width="60" height="2.3" fill="white" />
                <rect y="6.9" width="60" height="2.3" fill="white" />
                <rect y="11.5" width="60" height="2.3" fill="white" />
                <rect y="16.2" width="60" height="2.3" fill="white" />
                <rect y="20.8" width="60" height="2.3" fill="white" />
                <rect y="25.4" width="60" height="2.3" fill="white" />
                <rect width="24" height="16.2" fill="#3C3B6E" />
              </svg>
              English
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </footer>

      {/* ── INQUIRY MODAL ── */}
      {showInquiry && (
        <div
          className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4"
          onClick={() => setShowInquiry(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mx-auto mb-3 text-green-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <p className="text-sm font-semibold text-gray-800">
                  Inquiry sent!
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800">
                    Join: {showInquiry.title}
                  </h3>
                  <button
                    onClick={() => setShowInquiry(null)}
                    className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Full name"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Company name (optional)"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Quantity needed
                    </label>
                    <input
                      type="number"
                      required
                      value={form.qty}
                      onChange={(e) =>
                        setForm({ ...form, qty: e.target.value })
                      }
                      placeholder="e.g. 200"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Additional details
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Specifications, timeline, delivery location..."
                      rows={3}
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 resize-none"
                    />
                  </div>
                  {formError && (
                    <p className="text-xs text-red-500 text-center">
                      {formError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send inquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
