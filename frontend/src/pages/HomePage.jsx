import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const extraServices = [
  {
    title: "Source from Industry Hubs",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80",
  },
  {
    title: "Customize Your Products",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&q=80",
  },
  {
    title: "Fast, reliable shipping by ocean or air",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
  },
  {
    title: "Product monitoring and inspection",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
];

const suppliers = [
  { country: "Arabic Emirates", domain: "shopname.ae", flag: "🇦🇪" },
  { country: "Australia", domain: "shopname.au", flag: "🇦🇺" },
  { country: "United States", domain: "shopname.us", flag: "🇺🇸" },
  { country: "Russia", domain: "shopname.ru", flag: "🇷🇺" },
  { country: "Italy", domain: "shopname.it", flag: "🇮🇹" },
  { country: "Denmark", domain: "shopname.dk", flag: "🇩🇰" },
  { country: "France", domain: "shopname.fr", flag: "🇫🇷" },
  { country: "China", domain: "shopname.cn", flag: "🇨🇳" },
  { country: "Great Britain", domain: "shopname.co.uk", flag: "🇬🇧" },
  { country: "Pakistan", domain: "shopname.pk", flag: "🇵🇰" },
];

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

function CountdownTimer() {
  const [time, setTime] = useState({ d: 4, h: 13, m: 34, s: 56 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 23;
          d--;
        }
        if (d < 0) return { d: 4, h: 13, m: 34, s: 56 };
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 ml-3">
      {[
        { label: "Days", val: pad(time.d) },
        { label: "Hour", val: pad(time.h) },
        { label: "Min", val: pad(time.m) },
        { label: "Sec", val: pad(time.s) },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="bg-red-500 text-white font-bold text-xs px-2 py-1 rounded min-w-[28px] text-center">
            {item.val}
          </span>
          <span className="text-gray-400 text-[9px] mt-0.5">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

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
      <div className="bg-gray-200 h-36"></div>
      <div className="p-2">
        <div className="bg-gray-200 h-3 rounded mb-2"></div>
        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

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

  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [inquiry, setInquiry] = useState({ item: "", details: "", qty: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} cart mein add ho gaya!`);
  };

  const hotProducts = products.filter((p) => p.isHot).slice(0, 5);
  const homeProducts = products
    .filter((p) => p.category === "Home interiors")
    .slice(0, 8);
  const electronicsProducts = products
    .filter(
      (p) => p.category === "Electronics" || p.category === "Computer and tech",
    )
    .slice(0, 8);
  const recommendedProducts = products.slice(0, 10);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

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
              {[
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
                { label: "Menu item", to: "#" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  {item.label}
                </Link>
              ))}
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

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* HERO */}
        <div className="flex gap-3 mb-4">
          <aside className="w-44 shrink-0">
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              {[...categories, "More category"].map((cat, i) => (
                <Link
                  key={cat}
                  to={
                    cat === "More category"
                      ? "/products"
                      : `/products?category=${encodeURIComponent(cat)}`
                  }
                  className={`flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-50 ${i === 0 ? "bg-blue-50 text-blue-600 font-medium" : ""}`}
                >
                  {cat}
                  <span className="text-gray-300">›</span>
                </Link>
              ))}
            </div>
          </aside>

          <div className="flex-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded overflow-hidden relative min-h-[200px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                alt="hero"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="relative z-10 p-8">
              <p className="text-white/90 text-sm mb-1">Latest trending</p>
              <h1 className="text-white text-3xl font-bold mb-4">
                Electronic
                <br />
                items
              </h1>
              <Link
                to="/products?category=Electronics"
                className="bg-white text-gray-800 text-sm font-medium px-5 py-2 rounded hover:bg-gray-100 inline-block"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="w-44 shrink-0 flex flex-col gap-2">
            <div className="bg-white rounded border border-gray-200 p-3 text-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-700">Hi, user</p>
                  <p className="text-xs text-gray-400">let's get started</p>
                </div>
              </div>
              <Link
                to="/login"
                className="block w-full bg-blue-600 text-white text-xs py-1.5 rounded mb-1 hover:bg-blue-700 text-center"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="block w-full border border-blue-600 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-50 text-center"
              >
                Log in
              </Link>
            </div>
            <div className="bg-orange-400 rounded p-3 text-white">
              <p className="text-xs font-semibold">Get US $10 off</p>
              <p className="text-xs opacity-80">with a new supplier</p>
            </div>
            <div className="bg-blue-500 rounded p-3 text-white">
              <p className="text-xs font-semibold">Send quotes with</p>
              <p className="text-xs opacity-80">supplier preferences</p>
            </div>
          </div>
        </div>

        {/* DEALS & OFFERS */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-3">
          <div className="flex items-center mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-800">
                Deals and offers
              </h2>
              <p className="text-xs text-gray-400">Hot products</p>
            </div>
            <CountdownTimer />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {loading
              ? [...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse text-center">
                    <div className="bg-gray-200 h-28 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded mb-1 mx-4"></div>
                    <div className="bg-gray-200 h-3 rounded w-12 mx-auto"></div>
                  </div>
                ))
              : hotProducts.map((p) => (
                  <Link
                    key={p._id}
                    to={`/product/${p._id}`}
                    className="text-center cursor-pointer group"
                  >
                    <div className="border border-gray-100 rounded overflow-hidden mb-1.5 group-hover:border-blue-300 transition-colors relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[10px] py-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium"
                      >
                        + Add to Cart
                      </button>
                    </div>
                    <p className="text-xs text-gray-700 font-medium line-clamp-1">
                      {p.name}
                    </p>
                    <span className="inline-block bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded mt-0.5">
                      -{p.discount}%
                    </span>
                  </Link>
                ))}
          </div>
        </div>

        {/* HOME & OUTDOOR */}
        <div className="bg-white rounded border border-gray-200 mb-3 overflow-hidden">
          <div className="flex">
            <div className="w-40 shrink-0 bg-gradient-to-b from-green-100 to-green-200 p-4 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-gray-800">
                Home and outdoor
              </h3>
              <Link
                to="/products?category=Home interiors"
                className="border border-gray-400 text-gray-700 text-xs px-3 py-1.5 rounded hover:bg-gray-100 text-center block"
              >
                Source now
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-4 divide-x divide-y divide-gray-100">
              {loading
                ? [...Array(8)].map((_, i) => (
                    <div key={i} className="p-3 flex gap-2 animate-pulse">
                      <div className="bg-gray-200 w-16 h-16 rounded shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 h-3 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
                : homeProducts.map((item) => (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex gap-2 group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-600 leading-tight group-hover:text-blue-600 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          From
                          <br />
                          <span className="text-gray-600 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {/* CONSUMER ELECTRONICS */}
        <div className="bg-white rounded border border-gray-200 mb-4 overflow-hidden">
          <div className="flex">
            <div className="w-40 shrink-0 bg-gradient-to-b from-blue-100 to-indigo-200 p-4 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-gray-800">
                Consumer electronics and gadgets
              </h3>
              <Link
                to="/products?category=Electronics"
                className="border border-gray-400 text-gray-700 text-xs px-3 py-1.5 rounded hover:bg-gray-100 text-center block"
              >
                Source now
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-4 divide-x divide-y divide-gray-100">
              {loading
                ? [...Array(8)].map((_, i) => (
                    <div key={i} className="p-3 flex gap-2 animate-pulse">
                      <div className="bg-gray-200 w-16 h-16 rounded shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-gray-200 h-3 rounded mb-2"></div>
                        <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))
                : electronicsProducts.map((item) => (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex gap-2 group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-600 leading-tight group-hover:text-blue-600 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          From
                          <br />
                          <span className="text-gray-600 font-medium">
                            {formatPrice(item.price)}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>

        {/* INQUIRY BANNER */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded mb-4 overflow-hidden relative">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
              alt="bg"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 flex items-center p-6 gap-8">
            <div className="flex-1 text-white">
              <h2 className="text-xl font-bold mb-2">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-sm text-white/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 w-72 shrink-0">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Send quote to suppliers
              </h3>
              <input
                type="text"
                placeholder="What item you need?"
                className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs mb-2 focus:outline-none focus:border-blue-400"
                value={inquiry.item}
                onChange={(e) =>
                  setInquiry({ ...inquiry, item: e.target.value })
                }
              />
              <textarea
                placeholder="Type more details"
                className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs mb-2 h-16 resize-none focus:outline-none focus:border-blue-400"
                value={inquiry.details}
                onChange={(e) =>
                  setInquiry({ ...inquiry, details: e.target.value })
                }
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="flex-1 border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none"
                />
                <select className="border border-gray-200 rounded px-2 text-xs text-gray-600">
                  <option>Pcs</option>
                  <option>Kg</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700">
                Send inquiry
              </button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Recommended items
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {loading
              ? [...Array(10)].map((_, i) => <SkeletonCard key={i} />)
              : recommendedProducts.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <Link to={`/product/${item._id}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="mt-2 w-full bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 transition-colors font-medium"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* EXTRA SERVICES */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Our extra services
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {extraServices.map((service, i) => (
              <div
                key={i}
                className="relative rounded overflow-hidden cursor-pointer group h-32"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-semibold leading-tight">
                    {service.title}
                  </p>
                </div>
                <div className="absolute top-2 right-2 bg-white/80 rounded-full w-7 h-7 flex items-center justify-center">
                  <span className="text-sm">{["🔍", "✏️", "✈️", "🌐"][i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPLIERS */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Suppliers by region
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {suppliers.map((s, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600"
              >
                <span className="text-base">{s.flag}</span>
                <div>
                  <p className="font-medium text-xs">{s.country}</p>
                  <p className="text-gray-400 text-[10px]">{s.domain}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="bg-gray-200 rounded p-6 text-center mb-4">
          <h3 className="text-base font-bold text-gray-800 mb-1">
            Subscribe on our newsletter
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Get daily news on upcoming offers from many suppliers all over the
            world
          </p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2 text-sm w-56 focus:outline-none focus:border-blue-400"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
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
