import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaHome,
  FaShoppingCart,
  FaClipboardList,
} from "react-icons/fa";

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

// Same 4 countries used on the homepage
const countryOptions = [
  { code: "pk", name: "Pakistan" },
  { code: "de", name: "Germany" },
  { code: "us", name: "USA" },
  { code: "ae", name: "UAE" },
];

const orderNumber = "ORD-" + Math.floor(10000 + Math.random() * 90000);
const orderDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const estimatedDelivery = new Date(
  Date.now() + 5 * 24 * 60 * 60 * 1000,
).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const steps = [
  { icon: <FaCheckCircle />, label: "Order Placed", done: true },
  { icon: <FaBoxOpen />, label: "Processing", done: false },
  { icon: <FaTruck />, label: "Shipped", done: false },
  { icon: <FaHome />, label: "Delivered", done: false },
];

function FlagUSIcon() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      className="inline-block mr-1"
    >
      <rect width="16" height="12" fill="#B22234" />
      <rect y="0" width="16" height="0.923" fill="#B22234" />
      <rect y="0.923" width="16" height="0.923" fill="white" />
      <rect y="1.846" width="16" height="0.923" fill="#B22234" />
      <rect y="2.769" width="16" height="0.923" fill="white" />
      <rect y="3.692" width="16" height="0.923" fill="#B22234" />
      <rect y="4.615" width="16" height="0.923" fill="white" />
      <rect y="5.538" width="16" height="0.923" fill="#B22234" />
      <rect y="6.461" width="16" height="0.923" fill="white" />
      <rect y="7.384" width="16" height="0.923" fill="#B22234" />
      <rect y="8.307" width="16" height="0.923" fill="white" />
      <rect y="9.230" width="16" height="0.923" fill="#B22234" />
      <rect y="10.153" width="16" height="0.923" fill="white" />
      <rect y="11.076" width="16" height="0.923" fill="#B22234" />
      <rect width="7" height="5.538" fill="#3C3B6E" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-3 h-3 inline-block"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [countryOpen, setCountryOpen] = useState(false); // desktop
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false); // mobile

  const savedOrder = localStorage.getItem("lastOrder");
  const orderState =
    state?.items?.length > 0
      ? state
      : savedOrder
        ? JSON.parse(savedOrder)
        : null;

  const items = orderState?.items || [];
  const shipping = orderState?.shipping || {};
  const paymentMethod = orderState?.paymentMethod || "card";
  const subtotal = orderState?.subtotal || 0;
  const tax = orderState?.tax || 14;
  const total = orderState?.total || subtotal + tax;

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* ── NAVBAR ── */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-3 py-2.5">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-gray-800 text-lg">NexMart</span>
            </Link>

            {/* Search */}
            <div className="flex flex-1 min-w-full sm:min-w-0 order-3 sm:order-none">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 w-full border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="hidden sm:block border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50">
                <option value="">All category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 rounded-r text-sm font-medium shrink-0 flex items-center"
              >
                Search
              </Link>
            </div>

            {/* Right icons */}
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

              {/* Hamburger - mobile only */}
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

          {/* ── Desktop secondary nav ── */}
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
              <div className="relative group">
                <span className="text-sm text-gray-600 cursor-pointer group-hover:text-blue-600">
                  Help ▾
                </span>
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px] hidden group-hover:block">
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
                          <circle cx="12" cy="17" r=".5" fill="currentColor" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Currency */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm text-gray-600"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>

              {/* Ship to — desktop custom dropdown with flag + name */}
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
                <span>☰</span> All category
              </Link>
              {[
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
                { label: "Profile", to: "/profile" },
                { label: "Help Center", to: "/help" },
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

              {/* Ship to — mobile custom dropdown with flag + name */}
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

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Success Banner */}
        <div className="bg-white rounded border border-gray-200 p-6 text-center mb-4">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-800 mb-1">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-gray-500 mb-1">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-xs text-gray-400">
            A confirmation email has been sent to{" "}
            {shipping.email || "your email address"}.
          </p>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Order Number", value: orderNumber },
            { label: "Order Date", value: orderDate },
            { label: "Estimated Delivery", value: estimatedDelivery },
          ].map((info) => (
            <div
              key={info.label}
              className="bg-white rounded border border-gray-200 p-4 text-center"
            >
              <p className="text-xs text-gray-400 mb-1">{info.label}</p>
              <p className="text-sm font-bold text-gray-800">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded border border-gray-200 p-5 mb-4">
          <h2 className="text-sm font-bold text-gray-800 mb-5">Order Status</h2>
          <div className="relative flex items-center justify-between">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            <div className="absolute top-4 left-0 w-1/4 h-0.5 bg-green-500 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${step.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs font-medium ${step.done ? "text-green-600" : "text-gray-400"}`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Order Items */}
          <div className="flex-1 bg-white rounded border border-gray-200 p-5 min-w-0">
            <h2 className="text-sm font-bold text-gray-800 mb-4">
              Order Items
            </h2>

            {items.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                No items found
              </p>
            ) : (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={item.id || i} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 shrink-0">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <hr className="border-gray-100 my-3" />
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Tax</span>
                <span>+${tax.toFixed(2)}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between text-sm font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping + Payment */}
          <div className="w-full md:w-56 shrink-0 space-y-3">
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Shipping To
              </h3>
              <p className="text-xs text-gray-700 font-medium">
                {shipping.firstName || "Customer"} {shipping.lastName || ""}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {shipping.address || "N/A"}
                <br />
                {shipping.city || ""}
                {shipping.state ? `, ${shipping.state}` : ""}{" "}
                {shipping.zip || ""}
                <br />
                {shipping.country || "Pakistan"}
              </p>
              {shipping.phone && (
                <p className="text-xs text-gray-500 mt-1">{shipping.phone}</p>
              )}
            </div>

            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Payment</h3>
              {paymentMethod === "cod" ? (
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                    COD
                  </div>
                  <p className="text-xs text-gray-500">Cash on Delivery</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded">
                    VISA
                  </div>
                  <p className="text-xs text-gray-500">•••• •••• •••• 3456</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                Need Help?
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                Issues with your order?
              </p>
              <Link
                to="/help"
                className="block w-full text-center border border-blue-600 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-50"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-medium"
          >
            <FaShoppingCart className="text-xs" /> Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 px-6 py-2.5 rounded text-sm font-medium"
          >
            <FaClipboardList className="text-xs" /> View My Orders
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-200">
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
                title: "For Users",
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

            {/* Get App */}
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
