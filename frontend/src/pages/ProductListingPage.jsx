import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";

const sidebarCategories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
];
const conditions = ["Any", "Brand new", "Refurbished"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "";
  const urlSearch = searchParams.get("search") || "";
  const { addToCart, cartItems } = useCart();
  const { currency, setCurrency, formatPrice, rates } = useCurrency();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchInput, setSearchInput] = useState(urlSearch || "");
  const [selectedCondition, setSelectedCondition] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState("");
  const [appliedMax, setAppliedMax] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [viewMode, setViewMode] = useState("list");
  const [showRating, setShowRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const itemsPerPage = 8;

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // Products fetch
  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    const url = urlCategory
      ? `http://localhost:5000/api/products?category=${encodeURIComponent(urlCategory)}`
      : `http://localhost:5000/api/products`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [urlCategory]);

  // Filter
  useEffect(() => {
    let result = [...products];
    if (urlSearch)
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(urlSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(urlSearch.toLowerCase()) ||
          (p.description &&
            p.description.toLowerCase().includes(urlSearch.toLowerCase())),
      );
    if (selectedCondition !== "Any")
      result = result.filter((p) => p.condition === selectedCondition);
    if (appliedMin) {
      const rate = rates?.[currency] || 1;
      result = result.filter((p) => p.price >= parseFloat(appliedMin) / rate);
    }
    if (appliedMax) {
      const rate = rates?.[currency] || 1;
      result = result.filter((p) => p.price <= parseFloat(appliedMax) / rate);
    }
    if (verifiedOnly) result = result.filter((p) => p.verified);
    if (showRating > 0) result = result.filter((p) => p.rating >= showRating);
    if (sortBy === "Price low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "Rating") result.sort((a, b) => b.rating - a.rating);
    setFiltered(result);
  }, [
    products,
    urlSearch,
    selectedCondition,
    appliedMin,
    appliedMax,
    verifiedOnly,
    sortBy,
    showRating,
    currency,
    rates,
  ]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchParams({ category: cat });
    setCurrentPage(1);
  };
  const handleSearch = () => {
    const params = {};
    if (searchInput.trim()) params.search = searchInput.trim();
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params);
    setCurrentPage(1);
  };
  const handleSearchKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {toast.show && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50">
          ✅ {toast.msg}
        </div>
      )}

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchKey}
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50"
              >
                <option value="">All category</option>
                {sidebarCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
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
                to="/"
                className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
              >
                ☰ All category
              </Link>
              {["Hot offers", "Gift boxes", "Projects", "Menu item"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {item}
                  </a>
                ),
              )}
              <span className="text-sm text-gray-600 cursor-pointer">
                Help ▾
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setMinPrice("");
                  setMaxPrice("");
                  setAppliedMin("");
                  setAppliedMax("");
                }}
                className="bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>🇵🇰 Pakistan</option>
              </select>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-2 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">
            {selectedCategory || "All Products"}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 w-full flex gap-4">
        <aside className="w-48 shrink-0">
          <div className="bg-white border border-gray-200 rounded p-3 mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Category
            </h3>
            <button
              onClick={() => handleCategoryChange("")}
              className={`block w-full text-left text-xs py-1 px-1 rounded ${selectedCategory === "" ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"}`}
            >
              All Products
            </button>
            {sidebarCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`block w-full text-left text-xs py-1 px-1 rounded ${selectedCategory === cat ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded p-3 mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Price range
            </h3>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
              />
              <input
                type="number"
                placeholder="Max"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
              />
            </div>
            <button
              onClick={() => {
                setAppliedMin(minPrice);
                setAppliedMax(maxPrice);
                setCurrentPage(1);
              }}
              className="w-full border border-blue-600 text-blue-600 text-xs py-1 rounded hover:bg-blue-50"
            >
              Apply
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded p-3 mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Condition
            </h3>
            {conditions.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 text-xs text-gray-600 py-0.5 cursor-pointer hover:text-blue-600"
              >
                <input
                  type="radio"
                  name="condition"
                  checked={selectedCondition === c}
                  onChange={() => {
                    setSelectedCondition(c);
                    setCurrentPage(1);
                  }}
                  className="text-blue-600"
                />
                {c}
              </label>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Ratings
            </h3>
            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setShowRating(showRating === r ? 0 : r);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1 w-full py-0.5 rounded ${showRating === r ? "bg-blue-50" : "hover:bg-gray-50"}`}
              >
                <StarRating rating={r} />
                <span className="text-xs text-gray-500 ml-1">& up</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded px-4 py-2.5 mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">
                {filtered.length}
              </span>{" "}
              items in{" "}
              <span className="font-semibold text-gray-800">
                {selectedCategory || "All Products"}
              </span>
            </p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => {
                    setVerifiedOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="text-blue-600 font-medium">
                  ✓ Verified only
                </span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 focus:outline-none"
              >
                <option>Featured</option>
                <option>Price low</option>
                <option>Price high</option>
                <option>Rating</option>
              </select>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded p-4 flex gap-4 animate-pulse"
                >
                  <div className="bg-gray-200 w-44 h-44 rounded shrink-0"></div>
                  <div className="flex-1">
                    <div className="bg-gray-200 h-4 rounded mb-2 w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded mb-2 w-1/2"></div>
                    <div className="bg-gray-200 h-3 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="bg-white border border-gray-200 rounded p-12 text-center">
              <p className="text-gray-400 text-lg mb-2">No products found</p>
              <p className="text-gray-400 text-sm mb-4">
                Try changing filters or category
              </p>
              <button
                onClick={() => {
                  handleCategoryChange("");
                  setAppliedMin("");
                  setAppliedMax("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="bg-blue-600 text-white px-5 py-2 rounded text-sm hover:bg-blue-700"
              >
                View All Products
              </button>
            </div>
          )}

          {!loading && viewMode === "list" && (
            <div className="space-y-3">
              {paginated.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white border border-gray-200 rounded hover:border-blue-300 hover:shadow-sm transition-all group block"
                >
                  <div className="flex gap-4 p-4">
                    <div className="w-44 h-44 shrink-0 overflow-hidden rounded border border-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-600 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-1.5">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">
                          {product.rating}
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-gray-500">
                          {product.orders} orders
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs text-green-600 font-medium">
                          {product.shipping}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      {product.verified && (
                        <span className="text-xs text-blue-600 border border-blue-200 rounded px-2 py-0.5">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-right flex flex-col items-end justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-800">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded hover:bg-blue-700 transition-colors"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-3 gap-3">
              {paginated.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white border border-gray-200 rounded hover:shadow-md transition-all group overflow-hidden block"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-gray-800 mb-0.5">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-400 line-through mb-1">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                    <h3 className="text-xs text-gray-600 line-clamp-2 mb-1 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <StarRating rating={product.rating} />
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 mt-4 bg-white border border-gray-200 rounded px-4 py-2.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 flex items-center justify-center border rounded text-xs ${currentPage === page ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-5 gap-6">
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
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">© 2026 NexMart.</p>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"
              >
                🍎 App Store
              </a>
              <a
                href="#"
                className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"
              >
                ▶ Google Play
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              🇺🇸 English ▾
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
