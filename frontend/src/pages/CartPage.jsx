import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
  FaArrowLeft,
  FaLock,
  FaHeadset,
  FaTruck,
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

const savedItems = [
  {
    id: 1,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80",
  },
  {
    id: 2,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&q=80",
  },
  {
    id: 3,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
  },
  {
    id: 4,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.5,
    image:
      "https://images.unsplash.com/photo-1611186871525-9b3e3a9e6dd2?w=200&q=80",
  },
];

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = couponApplied ? 60.0 : 0;
  const tax = 14.0;
  const total = subtotal - discount + tax;

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
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-r text-sm font-medium transition-colors">
                Search
              </button>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              {[
                { icon: <FaUserAlt />, label: "Profile" },
                { icon: <FaRegCommentDots />, label: "Message" },
                { icon: <FaClipboardList />, label: "Orders" },
                { icon: <FaShoppingCart />, label: "My cart" },
              ].map((item) =>
                item.label === "Orders" ? (
                  <Link
                    to="/profile"
                    key={item.label}
                    className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-[10px]">{item.label}</span>
                  </Link>
                ) : item.label === "My cart" ? (
                  <Link
                    to="/cart"
                    key={item.label}
                    className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-[10px]">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                ),
              )}
            </div>
          </div>
          <nav className="flex items-center justify-between py-1.5 border-t border-gray-100">
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600">
                <span>☰</span> <span>All category</span>
              </button>
              {["Hot offers", "Gift boxes", "Projects", "Menu item"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </a>
                ),
              )}
              <div className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
                Help <span>▾</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>English, USD</option>
                <option>English, PKR</option>
              </select>
              <select className="bg-transparent border-none outline-none cursor-pointer">
                <option>🇩🇪 Germany</option>
                <option>🇺🇸 USA</option>
                <option>🇵🇰 Pakistan</option>
              </select>
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <h1 className="text-lg font-bold text-gray-800 mb-4">
          My cart ({cartItems.length})
        </h1>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="bg-white rounded border border-gray-200 overflow-hidden mb-3">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <FaShoppingCart className="text-4xl mx-auto mb-2" />
                  <p>Your cart is empty!</p>
                  <Link
                    to="/"
                    className="text-blue-600 text-sm hover:underline mt-1 inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-4 p-4">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 accent-blue-600"
                      />
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-500 border border-red-300 rounded px-2 py-0.5 hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                          <button className="text-xs text-green-600 border border-green-300 rounded px-2 py-0.5 hover:bg-green-50 transition-colors">
                            Save for later
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className="text-base font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="text-gray-400 hover:text-gray-600 w-5 text-center font-bold"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium text-gray-800 w-6 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="text-gray-400 hover:text-gray-600 w-5 text-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    {i < cartItems.length - 1 && (
                      <hr className="border-gray-100" />
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-blue-600 border border-blue-600 rounded px-4 py-1.5 text-sm hover:bg-blue-50 transition-colors"
              >
                <FaArrowLeft className="text-xs" /> Back to shop
              </Link>
              <button
                onClick={() => clearCart()}
                className="text-sm text-blue-600 hover:underline"
              >
                Remove all
              </button>
            </div>

            <div className="bg-white rounded border border-gray-200 p-4 mb-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: <FaLock className="text-gray-400 text-lg" />,
                    title: "Secure payment",
                    desc: "Have you ever finally just",
                  },
                  {
                    icon: <FaHeadset className="text-gray-400 text-lg" />,
                    title: "Customer support",
                    desc: "Have you ever finally just",
                  },
                  {
                    icon: <FaTruck className="text-gray-400 text-lg" />,
                    title: "Free delivery",
                    desc: "Have you ever finally just",
                  },
                ].map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">
                        {b.title}
                      </p>
                      <p className="text-xs text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded border border-gray-200 p-4">
              <h2 className="text-sm font-bold text-gray-800 mb-3">
                Saved for later
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-100 rounded overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm font-bold text-gray-800 mb-0.5">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-tight">
                        {item.name}
                      </p>
                      <button className="flex items-center gap-1 text-blue-600 text-xs hover:underline">
                        <FaShoppingCart className="text-xs" /> Move to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-64 shrink-0">
            <div className="bg-white rounded border border-gray-200 p-4 sticky top-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Have a coupon?
              </h3>
              <div className="flex gap-1 mb-4">
                <input
                  type="text"
                  placeholder="Add coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-l px-2 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={() => coupon && setCouponApplied(true)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-r text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal:</span>
                  <span className="text-gray-800 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Discount:</span>
                  <span className="text-red-500 font-medium">
                    {discount > 0 ? `-$${discount.toFixed(2)}` : "-$0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tax:</span>
                  <span className="text-green-600 font-medium">
                    +${tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-gray-800">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded text-sm transition-colors mb-3 block text-center"
              >
                Checkout
              </Link>
              <div className="flex items-center justify-center gap-1.5">
                {["VISA", "MC", "PP", "AE", "AP"].map((p) => (
                  <div
                    key={p}
                    className="bg-gray-100 rounded px-1.5 py-0.5 text-[9px] font-bold text-gray-500"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROMO BANNER */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="bg-blue-600 rounded flex items-center justify-between px-6 py-4">
          <div className="text-white">
            <p className="font-bold text-base">
              Super discount on more than 100 USD
            </p>
            <p className="text-xs text-white/80">
              Have you ever finally just write dummy info
            </p>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
            Shop now
          </button>
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
                Best information about the company goes here but now lorem ipsum
                is
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
                    className="block text-xs text-gray-500 hover:text-blue-600 mb-1.5 transition-colors"
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
                <span>🍎</span> App Store
              </a>
              <a
                href="#"
                className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1"
              >
                <span>▶</span> Google Play
              </a>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              🇺🇸 English <span>▾</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
