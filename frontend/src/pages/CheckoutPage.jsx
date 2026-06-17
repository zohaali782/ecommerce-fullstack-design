import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/CartContext";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
  FaArrowLeft,
  FaCreditCard,
  FaMoneyBillWave,
  FaLock,
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

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Pakistan",
  });

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = 14;
  const orderTotal = subtotal + tax;

  const formatCardNumber = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    const orderData = {
      items: cartItems,
      shipping: shipping,
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      tax: tax,
      total: orderTotal,
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    try {
      const token = localStorage.getItem("nexmart_token");
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: user?._id || user?.id,
          // ===== Items mein name aur image bhi save karo =====
          items: cartItems.map((item) => ({
            product: item.id,
            name: item.name,
            image: item.image,
            quantity: item.qty,
            price: item.price,
          })),
          total: orderTotal,
          subtotal: subtotal,
          tax: tax,
          status: "pending",
          address: `${shipping.address}, ${shipping.city}, ${shipping.country}`,
          shipping: shipping,
          paymentMethod: paymentMethod,
        }),
      });
      await res.json();
      navigate("/order-confirmation", { state: orderData });
      setTimeout(() => clearCart(), 100);
    } catch (err) {
      console.error("Order error:", err);
      navigate("/order-confirmation", { state: orderData });
      setTimeout(() => clearCart(), 100);
    }
    setLoading(false);
  };

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

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>›</span>
          <Link to="/cart" className="hover:text-blue-600">
            Cart
          </Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">Checkout</span>
        </div>

        <div className="flex gap-5">
          {/* LEFT */}
          <div className="flex-1 space-y-4">
            {/* Shipping Address */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "First Name",
                    key: "firstName",
                    placeholder: "John",
                  },
                  { label: "Last Name", key: "lastName", placeholder: "Doe" },
                  {
                    label: "Email Address",
                    key: "email",
                    placeholder: "john@example.com",
                    full: true,
                  },
                  {
                    label: "Phone Number",
                    key: "phone",
                    placeholder: "+92 300 0000000",
                  },
                  { label: "Country", key: "country", placeholder: "Pakistan" },
                  { label: "City", key: "city", placeholder: "Karachi" },
                  {
                    label: "State / Province",
                    key: "state",
                    placeholder: "Sindh",
                  },
                  {
                    label: "ZIP / Postal Code",
                    key: "zip",
                    placeholder: "75500",
                  },
                ].map((f) => (
                  <div key={f.key} className={f.full ? "col-span-2" : ""}>
                    <label className="block text-xs text-gray-500 mb-1">
                      {f.label}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={shipping[f.key]}
                      onChange={(e) =>
                        setShipping({ ...shipping, [f.key]: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="House No., Street, Area"
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-2 flex-1 border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${paymentMethod === "card" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  <FaCreditCard /> Credit / Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-2 flex-1 border-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${paymentMethod === "cod" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                >
                  <FaMoneyBillWave /> Cash on Delivery
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded px-3 py-2 mb-3">
                    <FaLock className="text-blue-400 text-xs" />
                    <p className="text-xs text-blue-600">
                      Your payment is secured with 256-bit SSL encryption via
                      Stripe.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={card.number}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            number: formatCardNumber(e.target.value),
                          })
                        }
                        className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400 pr-16"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        {["VISA", "MC"].map((b) => (
                          <span
                            key={b}
                            className="bg-gray-100 text-[9px] font-bold text-gray-400 px-1 py-0.5 rounded"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={card.name}
                      onChange={(e) =>
                        setCard({ ...card, name: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            cvv: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="bg-orange-50 border border-orange-100 rounded p-4 flex items-start gap-3">
                  <FaMoneyBillWave className="text-orange-400 text-lg mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      Pay with cash when your order is delivered.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
            >
              <FaArrowLeft className="text-xs" /> Back to cart
            </Link>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-72 shrink-0">
            <div className="bg-white rounded border border-gray-200 p-4 sticky top-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-2">
                    No items in cart
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <div className="relative shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded border border-gray-100"
                        />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {item.qty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 flex-1 line-clamp-2 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs font-semibold text-gray-800 shrink-0">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <hr className="border-gray-100 mb-3" />
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tax</span>
                  <span className="text-gray-700">+${tax.toFixed(2)}</span>
                </div>
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-800">Total</span>
                <span className="text-lg font-bold text-gray-800">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="text-xs" />
                    {paymentMethod === "card" ? "Pay Now" : "Place Order"}
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                🔒 Secure checkout powered by Stripe
              </p>
            </div>
          </div>
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
