import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const categories = [
  "All category",
  "Electronics",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools & equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
];

const navLinks = [
  { label: "All category", href: "/products" },
  { label: "Hot offers", href: "/hot-offers" },
  { label: "Gift boxes", href: "/gift-boxes" },
  { label: "Projects", href: "/projects" },
  { label: "Menu Item", href: "#" },
  {
    label: "Help",
    href: "#",
    dropdown: ["Help Center", "Contact Us", "FAQ", "Report a problem"],
  },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All category");
  const [catOpen, setCatOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const catRef = useRef(null);
  const helpRef = useRef(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target))
        setCatOpen(false);
      if (helpRef.current && !helpRef.current.contains(e.target))
        setHelpOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`,
      );
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-nav">
      {/* ── Top Bar ── */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-fit">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline
                  points="9 22 9 12 15 12 15 22"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">
              NexMart
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center max-w-2xl"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 h-10 px-4 border border-border border-r-0 rounded-l-md text-sm outline-none focus:border-primary transition-colors"
            />
            {/* Category Dropdown */}
            <div className="relative" ref={catRef}>
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                className="h-10 px-3 border border-border border-r-0 bg-gray-50 text-sm text-dark flex items-center gap-1 whitespace-nowrap hover:bg-gray-100 transition-colors"
              >
                <span className="max-w-[100px] truncate">
                  {selectedCategory}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-border rounded-lg shadow-dropdown z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCatOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-light transition-colors ${
                        selectedCategory === cat
                          ? "text-primary font-medium bg-blue-50"
                          : "text-dark"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Search Button */}
            <button
              type="submit"
              className="h-10 px-5 bg-primary text-white text-sm font-medium rounded-r-md hover:bg-primary-dark transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-5 ml-auto">
            {/* Profile */}
            <Link
              to={user ? "/account" : "/login"}
              className="flex flex-col items-center text-dark hover:text-primary transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-[10px] mt-0.5 text-muted">
                {user ? user.name.split(" ")[0] : "Profile"}
              </span>
            </Link>
            {/* Messages */}
            <Link
              to="/messages"
              className="flex flex-col items-center text-dark hover:text-primary transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span className="text-[10px] mt-0.5 text-muted">Message</span>
            </Link>
            {/* Orders */}
            <Link
              to="/orders"
              className="flex flex-col items-center text-dark hover:text-primary transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span className="text-[10px] mt-0.5 text-muted">Orders</span>
            </Link>
            {/* Cart */}
            <Link
              to="/cart"
              className="flex flex-col items-center text-dark hover:text-primary transition-colors relative"
            >
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 text-muted">My cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Nav Bar ── */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
          {/* Left Nav Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative" ref={helpRef}>
                  <button
                    onClick={() => setHelpOpen(!helpOpen)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-dark hover:text-primary transition-colors rounded"
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {helpOpen && (
                    <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-border rounded-lg shadow-dropdown z-50">
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-dark hover:bg-light hover:text-primary transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === "All category" ? (
                <button
                  key={link.label}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-dark hover:text-primary transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3 py-1.5 text-sm text-dark hover:text-primary transition-colors rounded"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right: Language + Ship to */}
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1 cursor-pointer hover:text-dark transition-colors">
              English, USD
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-dark transition-colors">
              Ship to
              <span className="text-base">🇩🇪</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
