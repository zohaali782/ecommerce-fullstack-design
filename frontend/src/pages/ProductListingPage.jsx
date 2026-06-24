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

function FilterPanel({
  selectedCategory,
  handleCategoryChange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  setAppliedMin,
  setAppliedMax,
  setCurrentPage,
  selectedCondition,
  setSelectedCondition,
  showRating,
  setShowRating,
}) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded p-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Category</h3>
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
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Condition</h3>
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
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Ratings</h3>
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
    </>
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
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const itemsPerPage = 8;

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const countryOptions = [
    { code: "pk", name: "Pakistan" },
    { code: "de", name: "Germany" },
    { code: "us", name: "USA" },
    { code: "ae", name: "UAE" },
    { code: "gb", name: "UK" },
  ];

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
  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);
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

  const filterProps = {
    selectedCategory,
    handleCategoryChange,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setAppliedMin,
    setAppliedMax,
    setCurrentPage,
    selectedCondition,
    setSelectedCondition,
    showRating,
    setShowRating,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {toast.show && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50">
          ✅ {toast.msg}
        </div>
      )}

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-40 flex"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-50 w-72 max-w-[85vw] bg-gray-50 h-full overflow-y-auto p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none p-1"
              >
                ×
              </button>
            </div>
            <FilterPanel {...filterProps} />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchKey}
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="hidden sm:block border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50"
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
                <FaUserAlt className="text-xl mb-1" />
                <span className="text-[10px]">Profile</span>
              </Link>
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaRegCommentDots className="text-xl mb-1" />
                <span className="text-[10px]">Message</span>
              </Link>
              <Link
                to="/profile"
                className="hidden sm:flex flex-col items-center text-gray-400 hover:text-gray-600"
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

          {/* Desktop nav row — now using real Links so they navigate */}
          <nav className="hidden md:flex items-center justify-between py-1.5 border-t border-gray-100">
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
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Gift boxes
              </Link>
              <Link
                to="/projects"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Projects
              </Link>
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
              <div className="flex items-center gap-1">
                <span>Ship to</span>
                <img
                  src={`https://flagcdn.com/w20/${selectedCountry}.png`}
                  alt="flag"
                  className="w-5 h-3.5 object-cover rounded-sm"
                />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </nav>

          {/* Mobile dropdown menu — now includes Ship to / country */}
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
                <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 bg-white">
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry}.png`}
                    alt="flag"
                    className="w-5 h-3.5 object-cover rounded-sm shrink-0"
                  />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="flex-1 text-sm text-gray-700 bg-white outline-none"
                  >
                    {countryOptions.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
          <span className="text-gray-700 font-medium">
            {selectedCategory || "All Products"}
          </span>
        </div>
      </div>

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden max-w-7xl mx-auto px-4 pb-2 w-full">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded px-4 py-2 text-sm text-gray-700 font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M7 12h10M11 20h2"
            />
          </svg>
          Filters
          {(appliedMin ||
            appliedMax ||
            selectedCondition !== "Any" ||
            showRating > 0) && (
            <span className="bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              !
            </span>
          )}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-8 w-full flex gap-4">
        <aside className="hidden md:block w-48 shrink-0">
          <FilterPanel {...filterProps} />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded px-3 sm:px-4 py-2.5 mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">
                {filtered.length}
              </span>{" "}
              items in{" "}
              <span className="font-semibold text-gray-800">
                {selectedCategory || "All Products"}
              </span>
            </p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <label className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
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
                  <div className="bg-gray-200 w-28 sm:w-44 h-28 sm:h-44 rounded shrink-0"></div>
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
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                    <div className="w-24 h-24 sm:w-44 sm:h-44 shrink-0 overflow-hidden rounded border border-gray-100">
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
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-500">
                          {product.rating}
                        </span>
                        <span className="text-gray-300 hidden sm:inline">
                          |
                        </span>
                        <span className="text-xs text-gray-500 hidden sm:inline">
                          {product.orders} orders
                        </span>
                        <span className="text-gray-300 hidden sm:inline">
                          |
                        </span>
                        <span className="text-xs text-green-600 font-medium hidden sm:inline">
                          {product.shipping}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2 hidden sm:block">
                        {product.description}
                      </p>
                      {product.verified && (
                        <span className="text-xs text-blue-600 border border-blue-200 rounded px-2 py-0.5">
                          ✓ Verified
                        </span>
                      )}
                      <div className="mt-2 sm:hidden">
                        <p className="text-base font-bold text-gray-800">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 text-right hidden sm:flex flex-col items-end justify-between">
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
                  <div className="sm:hidden px-3 pb-3">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paginated.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="bg-white border border-gray-200 rounded hover:shadow-md transition-all group overflow-hidden block"
                >
                  <div className="relative h-36 sm:h-44 overflow-hidden">
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
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
              🇺🇸 English ▾
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
