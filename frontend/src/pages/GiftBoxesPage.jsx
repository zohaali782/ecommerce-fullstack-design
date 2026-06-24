import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
      ✅ {message}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded overflow-hidden">
      <div className="bg-gray-200 h-48"></div>
      <div className="p-3">
        <div className="bg-gray-200 h-3 rounded mb-2"></div>
        <div className="bg-gray-200 h-3 rounded w-2/3 mb-2"></div>
        <div className="bg-gray-200 h-4 rounded w-1/3"></div>
      </div>
    </div>
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

function getTag(box) {
  if (box.isHot) return { label: "Hot", color: "bg-red-100 text-red-700" };
  if (box.rating >= 4.8)
    return { label: "Best seller", color: "bg-green-100 text-green-700" };
  if (box.discount >= 30)
    return { label: "Popular", color: "bg-orange-100 text-orange-700" };
  return null;
}

function getItemsCount(box) {
  const match = box.specs?.Size?.match(/\d+/);
  return match ? match[0] : box.features?.length || "-";
}

export default function GiftBoxesPage() {
  const navigate = useNavigate();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const { addToCart, cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "" });

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

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/products?category=${encodeURIComponent("Gift boxes")}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setGiftBoxes(Array.isArray(data) ? data : []);
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

  const handleAddToCart = (e, box) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(box, 1);
    showToast(`${box.name} cart mein add ho gaya!`);
  };

  const availableCategories = [
    "All",
    ...new Set(giftBoxes.map((b) => b.subcategory).filter(Boolean)),
  ];

  const filtered = giftBoxes.filter(
    (b) => activeCategory === "All" || b.subcategory === activeCategory,
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Toast show={toast.show} message={toast.message} />

      {/* NAVBAR */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-2.5">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-gray-800 text-lg">NexMart</span>
            </Link>
            <div className="flex flex-1 max-w-xl">
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
                className="border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-r text-sm font-medium"
              >
                Search
              </button>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Link
                to="/profile"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaUserAlt className="text-xl mb-1" />
                <span className="text-[10px]">Profile</span>
              </Link>
              <Link
                to="/profile"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaRegCommentDots className="text-xl mb-1" />
                <span className="text-[10px]">Message</span>
              </Link>
              <Link
                to="/profile"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaClipboardList className="text-xl mb-1" />
                <span className="text-[10px]">Orders</span>
              </Link>
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600 relative"
              >
                <div className="relative">
                  <FaShoppingCart className="text-xl mb-1" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">My cart</span>
              </Link>
            </div>
          </div>
          <nav className="flex items-center justify-between py-1.5 border-t border-gray-100">
            <div className="flex items-center gap-5">
              <Link
                to="/products"
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
              >
                ☰ All category
              </Link>
              <Link
                to="/hot-offers"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Hot offers
              </Link>
              <Link
                to="/gift-boxes"
                className="text-sm text-blue-600 font-medium"
              >
                Gift boxes
              </Link>
              <Link
                to="/projects"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Projects
              </Link>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Menu item
              </a>
              <span className="text-sm text-gray-600 cursor-pointer">
                Help ▾
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>
              <div className="flex items-center gap-1">
                <span>🇵🇰</span>
                <select className="bg-transparent border-none outline-none cursor-pointer">
                  <option>Pakistan</option>
                  <option>Germany</option>
                  <option>USA</option>
                  <option>UAE</option>
                  <option>UK</option>
                </select>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>›</span>
            <span className="text-white">Gift boxes</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">🎁 Gift Boxes</h1>
          <p className="text-white/80 text-sm">
            Curated gift sets for every occasion. Thoughtfully packaged and
            ready to delight.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* FILTER BAR */}
        <div className="bg-white rounded border border-gray-200 p-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-500">
              Category:
            </span>
            {availableCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === c
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        {!loading && (
          <p className="text-xs text-gray-500 mb-3">
            <span className="font-semibold text-gray-700">
              {filtered.length}
            </span>{" "}
            gift boxes available
          </p>
        )}

        {/* GIFT BOX GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((box) => {
                const tag = getTag(box);
                return (
                  <Link
                    key={box._id}
                    to={`/product/${box._id}`}
                    className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow group block"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={box.image}
                        alt={box.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {tag && (
                        <span
                          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {box.subcategory}
                        </span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          {getItemsCount(box)} items
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-800 leading-tight mb-1 group-hover:text-blue-600">
                        {box.name}
                      </p>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight mb-2">
                        {box.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800">
                          {formatPrice(box.price)}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, box)}
                          className="bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded hover:bg-blue-700 transition-colors font-medium"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>

        {/* EMPTY STATE */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🎁</p>
            <p className="text-sm font-medium">
              No gift boxes match this filter.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 text-blue-600 text-xs hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CUSTOM GIFT CTA */}
        <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Need a custom gift box?
            </h3>
            <p className="text-xs text-gray-500">
              Tell us the occasion and budget — we'll curate the perfect set.
            </p>
          </div>
          <Link
            to="/"
            className="bg-pink-500 text-white text-xs font-semibold px-5 py-2 rounded hover:bg-pink-600 transition-colors"
          >
            Send inquiry
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-6 gap-6">
            {/* Brand */}
            <div>
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
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Get app
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors"
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
                  className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors"
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
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
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
