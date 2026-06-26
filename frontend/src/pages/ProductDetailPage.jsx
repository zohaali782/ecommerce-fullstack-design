import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
];

// ✅ FIX: Yeh teeno arrays component ke BAHAR hain — JSX ke andar nahi
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["#1f2937", "#2563eb", "#ef4444", "#16a34a", "#eab308"];
const colorNames = ["Black", "Blue", "Red", "Green", "Yellow"];

function FlagUSIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="inline-block mr-1"
    >
      <rect width="16" height="12" fill="#B22234" />
      <rect y="0.923" width="16" height="0.923" fill="white" />
      <rect y="2.769" width="16" height="0.923" fill="white" />
      <rect y="4.615" width="16" height="0.923" fill="white" />
      <rect y="6.461" width="16" height="0.923" fill="white" />
      <rect y="8.307" width="16" height="0.923" fill="white" />
      <rect y="10.153" width="16" height="0.923" fill="white" />
      <rect width="7" height="5.538" fill="#3C3B6E" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-3 h-3 inline-block" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {count && (
        <span className="text-xs text-gray-500 ml-1">{count} reviews</span>
      )}
    </div>
  );
}

/* ---------- Saare emoji ki jagah SVG icons ---------- */

function GlobeIcon({ className = "w-3 h-3 text-blue-500 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 010 18M12 3a13.5 13.5 0 000 18" />
    </svg>
  );
}

function TruckIcon({ className = "w-3 h-3 text-gray-600 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function PlaneIcon({ className = "w-3 h-3 text-gray-600 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V18l-2.5 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5l8 2.5z" />
    </svg>
  );
}

function PackageIcon({ className = "w-3 h-3 text-gray-600 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2L3 6.5v11L12 22l9-4.5v-11L12 2zm0 2.2l6.3 3.15L12 10.5 5.7 7.35 12 4.2zM5 9.2l6 3v7.4l-6-3V9.2zm14 0v7.4l-6 3V12.2l6-3z" />
    </svg>
  );
}

function ShieldIcon({ className = "w-3 h-3 text-blue-500 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-3 h-3 text-green-500 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SingleStarIcon({ className = "w-3 h-3 text-yellow-400 shrink-0" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function MenuIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function MessageIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
  const [toast, setToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);

  // ✅ FIX: Send inquiry ke liye state
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [inquiryToast, setInquiryToast] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        fetch(
          `${import.meta.env.VITE_API_URL}/api/products?category=${encodeURIComponent(data.category)}`,
        )
          .then((res) => res.json())
          .then((related) =>
            setRelatedProducts(related.filter((p) => p._id !== id).slice(0, 6)),
          );
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem("nexmart_token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (wishlist) {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${product._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setWishlist(false);
    } else {
      await fetch("${import.meta.env.VITE_API_URL}/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
        }),
      });
      setWishlist(true);
    }
  };

  // ✅ FIX: Pehle button ka koi onClick hi nahi tha — isliye kaam nahi kar raha tha
  const handleOpenInquiry = () => {
    const token = localStorage.getItem("nexmart_token");
    if (!token) {
      navigate("/login");
      return;
    }
    setInquiryMessage(
      `Hi, I'm interested in "${product.name}". Could you share more details?`,
    );
    setShowInquiryModal(true);
  };

  const handleSendInquiry = async () => {
    if (!inquiryMessage.trim()) return;
    const token = localStorage.getItem("nexmart_token");
    setSendingInquiry(true);
    try {
      await fetch("${import.meta.env.VITE_API_URL}/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          productName: product.name,
          message: inquiryMessage,
        }),
      });
      setShowInquiryModal(false);
      setInquiryMessage("");
      setInquiryToast(true);
      setTimeout(() => setInquiryToast(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSendingInquiry(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim())
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-3">Product not found</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-5 py-2 rounded text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );

  const tabs = ["Description", "Reviews", "Shipping", "About seller"];
  const prices = [
    { qty: "1-39", price: formatPrice(product.originalPrice) },
    { qty: "40-100", price: formatPrice(product.price * 1.1) },
    { qty: "100+", price: formatPrice(product.price) },
  ];
  const productImages = product.images?.length
    ? product.images
    : [product.image];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {toast && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-white" />
          Added to cart!
        </div>
      )}

      {inquiryToast && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-white" />
          Inquiry sent to seller!
        </div>
      )}

      {/* ✅ FIX: Send inquiry modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <MessageIcon className="w-4 h-4 text-blue-600" />
                Send inquiry to {product.brand || "seller"}
              </h3>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <textarea
              value={inquiryMessage}
              onChange={(e) => setInquiryMessage(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 mb-3"
              placeholder="Write your message to the seller..."
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 text-xs font-semibold py-2 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendInquiry}
                disabled={sendingInquiry || !inquiryMessage.trim()}
                className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {sendingInquiry ? "Sending..." : "Send"}
              </button>
            </div>
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
                <MessageIcon className="w-6 h-6 mb-0.5" />
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

          <nav className="hidden md:flex items-center justify-between py-1.5 border-t border-gray-100">
            <div className="flex items-center gap-5">
              <Link
                to="/products"
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600"
              >
                <MenuIcon className="w-3.5 h-3.5" /> All category
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
              <div className="relative group">
                <span className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer group-hover:text-blue-600">
                  Help <ChevronDownIcon className="w-3 h-3" />
                </span>
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px] hidden group-hover:block">
                  <Link
                    to="/help"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
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
                  <ChevronDownIcon className="w-3 h-3" />
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

          {mobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-full bg-white border-t border-b border-gray-200 shadow-lg z-40 px-4 py-2">
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-gray-700 font-medium py-2.5 border-b border-gray-100"
              >
                <MenuIcon className="w-3.5 h-3.5" /> All category
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
                  <ChevronDownIcon className="w-3 h-3 -rotate-90 text-gray-300" />
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
                    <ChevronDownIcon
                      className={`w-3 h-3 text-gray-400 transition-transform ${mobileCountryOpen ? "rotate-180" : ""}`}
                    />
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-blue-600"
          >
            {product.category}
          </Link>
          <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-700 line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Left - Images */}
          <div className="w-full md:w-72 shrink-0">
            <div className="flex items-center gap-1 mb-2">
              <span
                className={`w-2 h-2 rounded-full inline-block ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <span
                className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {product.stock > 0
                  ? `In stock (${product.stock})`
                  : "Out of stock"}
              </span>
            </div>
            <div className="border border-gray-200 rounded overflow-hidden mb-2 bg-white h-64 md:h-64">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-12 h-12 border-2 rounded overflow-hidden transition-colors ${selectedImage === i ? "border-blue-500" : "border-gray-200 hover:border-gray-400"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Middle - Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-800 mb-2 leading-snug">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-3">
              <StarRating rating={product.rating} count={product.reviews} />
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500">
                {product.orders} orders
              </span>
            </div>

            <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded p-3 mb-4 flex-wrap">
              {prices.map((p, i) => (
                <div key={i} className="text-center">
                  <p
                    className={`text-base font-bold ${i === 2 ? "text-red-500" : "text-gray-800"}`}
                  >
                    {p.price}
                  </p>
                  <p className="text-xs text-gray-400">{p.qty} items</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              {[
                { label: "Price", value: formatPrice(product.price) },
                { label: "Brand", value: product.brand },
                { label: "Type", value: product.type },
                { label: "Material", value: product.material },
                { label: "Design", value: product.design },
                { label: "Protection", value: product.protection },
                { label: "Warranty", value: product.warranty },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2 text-xs">
                  <span className="text-gray-400 w-28 shrink-0">{label}:</span>
                  <span className="text-gray-700">{value || "N/A"}</span>
                </div>
              ))}
            </div>

            {/* ✅ Size - Kaam karta hai */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1.5">Size:</p>
              <div className="flex gap-1.5 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded text-xs font-medium transition-colors ${selectedSize === size ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ✅ Color - Fixed: hex colors + name display */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1.5">
                Color:{" "}
                <span className="text-gray-800 font-medium">
                  {colorNames[selectedColor]}
                </span>
              </p>
              <div className="flex gap-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full transition-transform ${selectedColor === i ? "ring-2 ring-offset-1 ring-blue-500 scale-110" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile actions */}
            <div className="md:hidden mt-4 space-y-3">
              <div className="bg-white border border-gray-200 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      Supplier
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.brand || "NexMart"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <GlobeIcon /> {product.shipping}
                  </div>
                  {product.verified && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircleIcon /> Verified seller
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <TruckIcon className="w-3 h-3 text-blue-500 shrink-0" />{" "}
                    Fast delivery
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {/* ✅ FIX: onClick add kiya, pehle missing tha */}
                  <button
                    onClick={handleOpenInquiry}
                    className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700"
                  >
                    Send inquiry
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 text-xs font-semibold py-2 rounded hover:bg-blue-50">
                    Seller's profile
                  </button>
                </div>
                <button
                  onClick={handleWishlist}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 transition-colors mb-3"
                >
                  {wishlist ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 text-red-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
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
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  )}
                  Save for later
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-xs font-medium border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded mb-2 hover:bg-blue-700"
                >
                  Add to cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-orange-500 text-white text-xs font-semibold py-2 rounded hover:bg-orange-600"
                >
                  Buy now
                </button>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ShieldIcon className="w-3 h-3 text-green-500 shrink-0" />
                    Secure payment
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CheckCircleIcon />
                    Buyer protection
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Desktop Actions */}
          <div className="hidden md:block w-52 shrink-0">
            <div className="bg-white border border-gray-200 rounded p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  S
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Supplier
                  </p>
                  <p className="text-xs text-gray-400">
                    {product.brand || "NexMart"}
                  </p>
                </div>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <GlobeIcon /> {product.shipping}
                </div>
                {product.verified && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <CheckCircleIcon /> Verified seller
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <TruckIcon className="w-3 h-3 text-blue-500 shrink-0" /> Fast
                  delivery
                </div>
              </div>
              {/* ✅ FIX: onClick add kiya, pehle missing tha — isi liye button kaam nahi kar raha tha */}
              <button
                onClick={handleOpenInquiry}
                className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded mb-2 hover:bg-blue-700"
              >
                Send inquiry
              </button>
              <button className="w-full border border-blue-600 text-blue-600 text-xs font-semibold py-2 rounded hover:bg-blue-50">
                Seller's profile
              </button>
            </div>

            <button
              onClick={handleWishlist}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 transition-colors mb-3"
            >
              {wishlist ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
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
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              )}
              Save for later
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  −
                </button>
                <span className="px-3 py-1 text-xs font-medium border-x border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded mb-2 hover:bg-blue-700 flex items-center justify-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>{" "}
              Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-orange-500 text-white text-xs font-semibold py-2 rounded hover:bg-orange-600"
            >
              Buy now
            </button>

            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <ShieldIcon className="w-3 h-3 text-green-500 shrink-0" />
                Secure payment
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircleIcon />
                Buyer protection
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-xs font-medium transition-colors whitespace-nowrap ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4">
              {activeTab === "Description" && (
                <div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  {product.specs && (
                    <div className="border border-gray-100 rounded overflow-hidden mb-4">
                      {Object.entries(product.specs).map(([key, val], i) => (
                        <div
                          key={key}
                          className={`flex text-xs ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                        >
                          <span className="w-32 px-3 py-2 text-gray-500 font-medium border-r border-gray-100">
                            {key}
                          </span>
                          <span className="px-3 py-2 text-gray-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {product.features && (
                    <div className="space-y-1.5">
                      {product.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <CheckCircleIcon className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {activeTab === "Reviews" && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No reviews yet
                </div>
              )}
              {activeTab === "Shipping" && (
                <div className="text-xs text-gray-600 space-y-2">
                  <p className="flex items-center gap-1.5">
                    <TruckIcon /> Standard shipping: 7-14 business days
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PlaneIcon /> Express shipping: 3-5 business days
                  </p>
                  <p className="flex items-center gap-1.5">
                    <GlobeIcon /> {product.shipping}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PackageIcon /> Free shipping on orders over{" "}
                    {formatPrice(100)}
                  </p>
                </div>
              )}
              {activeTab === "About seller" && (
                <div className="text-xs text-gray-600 space-y-2">
                  <p className="font-medium text-gray-800">{product.brand}</p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircleIcon />{" "}
                    {product.verified ? "Verified seller" : "Seller"}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <SingleStarIcon /> {product.rating}/5 rating
                  </p>
                  <p className="flex items-center gap-1.5">
                    <PackageIcon /> {product.orders}+ orders
                  </p>
                  <p className="flex items-center gap-1.5">
                    <ShieldIcon /> {product.warranty} warranty
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-52 shrink-0">
            <div className="bg-white border border-gray-200 rounded p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                You may like
              </h3>
              <div className="space-y-3">
                {relatedProducts.slice(0, 5).map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item._id}`}
                    className="flex gap-2 cursor-pointer group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border border-gray-100 shrink-0 group-hover:border-blue-300"
                    />
                    <div>
                      <p className="text-xs text-gray-600 leading-tight line-clamp-2 group-hover:text-blue-600">
                        {item.name}
                      </p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Related products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-tight mb-1">
                    {item.name}
                  </p>
                  <p className="text-xs font-semibold text-gray-800">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-blue-600 rounded p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-white font-bold text-sm">
              Super discount on more than 100 USD
            </p>
            <p className="text-blue-200 text-xs mt-0.5">
              Have you ever tried just one suiting alimony day
            </p>
          </div>
          <Link
            to="/products"
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded shrink-0"
          >
            Shop now
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
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Get app
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
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
