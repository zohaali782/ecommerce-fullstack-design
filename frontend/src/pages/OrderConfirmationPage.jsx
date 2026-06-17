import { Link, useLocation } from "react-router-dom";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
  FaCheckCircle,
  FaBoxOpen,
  FaTruck,
  FaHome,
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

export default function OrderConfirmationPage() {
  const { state } = useLocation();

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

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
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
                placeholder="Search"
                className="flex-1 border border-gray-300 rounded-l px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <select className="border-t border-b border-gray-300 px-2 text-xs text-gray-600 bg-gray-50">
                <option>All category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-r text-sm font-medium">
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
              <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                <FaRegCommentDots className="text-xl mb-1" />
                <span className="text-[10px]">Message</span>
              </button>
              <Link
                to="/profile"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaClipboardList className="text-xl mb-1" />
                <span className="text-[10px]">Orders</span>
              </Link>
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-400 hover:text-gray-600"
              >
                <FaShoppingCart className="text-xl mb-1" />
                <span className="text-[10px]">My cart</span>
              </Link>
            </div>
          </div>
          <nav className="flex items-center justify-between py-1.5 border-t border-gray-100">
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1 text-sm text-gray-700">
                ☰ All category
              </button>
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
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>English, USD</option>
              </select>
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>🇵🇰 Pakistan</option>
              </select>
            </div>
          </nav>
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

        <div className="flex gap-4">
          {/* Order Items */}
          <div className="flex-1 bg-white rounded border border-gray-200 p-5">
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
          <div className="w-56 shrink-0 space-y-3">
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
              <button className="w-full border border-blue-600 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-50">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-medium"
          >
            <FaShoppingCart className="text-xs" /> Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 px-6 py-2.5 rounded text-sm font-medium"
          >
            <FaClipboardList className="text-xs" /> View My Orders
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-6">
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
