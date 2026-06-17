import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaCheck,
  FaStar,
  FaShippingFast,
  FaShieldAlt,
  FaChevronRight,
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

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          className={`w-3 h-3 ${s <= Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
        />
      ))}
      {count && (
        <span className="text-xs text-gray-500 ml-1">{count} reviews</span>
      )}
    </div>
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

  // ===== DATABASE SE FETCH =====
  useEffect(() => {
    setLoading(true);
    setSelectedImage(0);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        fetch(
          `http://localhost:5000/api/products?category=${encodeURIComponent(data.category)}`,
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  // ===== LOADING =====
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
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "bg-gray-800",
    "bg-blue-600",
    "bg-red-500",
    "bg-green-600",
    "bg-yellow-500",
  ];
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
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          ✅ Added to cart!
        </div>
      )}

      {/* ===== NAVBAR ===== */}
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
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50">
                <option value="">All category</option>
                {categories.map((c) => (
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
                to="/products"
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
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>
              <div className="flex items-center gap-1">
                <span id="flagDisplayDP">🇵🇰</span>
                <select
                  className="bg-transparent border-none outline-none cursor-pointer"
                  onChange={(e) => {
                    const flags = {
                      Pakistan: "🇵🇰",
                      Germany: "🇩🇪",
                      USA: "🇺🇸",
                      UAE: "🇦🇪",
                      UK: "🇬🇧",
                    };
                    document.getElementById("flagDisplayDP").textContent =
                      flags[e.target.value];
                  }}
                >
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2 w-full">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <FaChevronRight className="w-2 h-2" />
          <Link
            to={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-blue-600"
          >
            {product.category}
          </Link>
          <FaChevronRight className="w-2 h-2" />
          <span className="text-gray-700 line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
        {/* ===== MAIN PRODUCT ===== */}
        <div className="flex gap-4 mb-4">
          {/* Left — Images */}
          <div className="w-72 shrink-0">
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
            <div className="border border-gray-200 rounded overflow-hidden mb-2 bg-white h-64">
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

          {/* Middle — Info */}
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

            {/* Price tiers */}
            <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded p-3 mb-4">
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

            {/* Specs */}
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

            {/* Size */}
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

            {/* Color */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1.5">Color:</p>
              <div className="flex gap-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-6 h-6 rounded-full ${color} transition-transform ${selectedColor === i ? "ring-2 ring-offset-1 ring-blue-500 scale-110" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Actions */}
          <div className="w-52 shrink-0">
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
                  <span>🌍</span> {product.shipping}
                </div>
                {product.verified && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <FaCheck className="text-green-500 w-3 h-3" /> Verified
                    seller
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <FaShippingFast className="text-blue-500 w-3 h-3" /> Fast
                  delivery
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded mb-2 hover:bg-blue-700">
                Send inquiry
              </button>
              <button className="w-full border border-blue-600 text-blue-600 text-xs font-semibold py-2 rounded hover:bg-blue-50">
                Seller's profile
              </button>
            </div>

            <button
              onClick={() => setWishlist(!wishlist)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 transition-colors mb-3"
            >
              {wishlist ? (
                <FaHeart className="text-red-500 w-3.5 h-3.5" />
              ) : (
                <FaRegHeart className="w-3.5 h-3.5" />
              )}
              Save for later
            </button>

            {/* Quantity */}
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
              <FaShoppingCart className="w-3 h-3" /> Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-orange-500 text-white text-xs font-semibold py-2 rounded hover:bg-orange-600"
            >
              Buy now
            </button>

            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaShieldAlt className="text-green-500 w-3 h-3" /> Secure
                payment
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FaCheck className="text-blue-500 w-3 h-3" /> Buyer protection
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white border border-gray-200 rounded overflow-hidden">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs font-medium transition-colors ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"}`}
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
                          <FaCheck className="text-green-500 w-3 h-3 mt-0.5 shrink-0" />
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
                  <p>🚚 Standard shipping: 7-14 business days</p>
                  <p>✈️ Express shipping: 3-5 business days</p>
                  <p>🌍 {product.shipping}</p>
                  <p>📦 Free shipping on orders over {formatPrice(100)}</p>
                </div>
              )}
              {activeTab === "About seller" && (
                <div className="text-xs text-gray-600 space-y-2">
                  <p className="font-medium text-gray-800">{product.brand}</p>
                  <p>✅ {product.verified ? "Verified seller" : "Seller"}</p>
                  <p>⭐ {product.rating}/5 rating</p>
                  <p>📦 {product.orders}+ orders</p>
                  <p>🛡️ {product.warranty} warranty</p>
                </div>
              )}
            </div>
          </div>

          {/* You may like */}
          <div className="w-52 shrink-0">
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

        {/* ===== RELATED PRODUCTS ===== */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Related products
          </h2>
          <div className="grid grid-cols-6 gap-3">
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
        <div className="bg-blue-600 rounded p-4 flex items-center justify-between">
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
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2 rounded"
          >
            Shop now
          </Link>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
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
