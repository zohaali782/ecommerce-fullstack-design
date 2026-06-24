import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
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

const countryOptions = [
  { code: "pk", name: "Pakistan" },
  { code: "de", name: "Germany" },
  { code: "us", name: "USA" },
  { code: "ae", name: "UAE" },
  { code: "gb", name: "UK" },
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse products, add them to your cart, and proceed to checkout. You'll need to enter your shipping details and payment information to complete the order.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be cancelled or modified within 24 hours of placement. After that, the order may already be processed for shipping.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept credit/debit cards, bank transfers, and popular digital wallets. All transactions are secured with SSL encryption.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 7–14 business days. Express shipping is available for 3–5 business days at an additional cost.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive a tracking number via email. Use it on our order tracking page or the courier's website.",
  },
  {
    q: "What is the return policy?",
    a: "Items can be returned within 30 days of delivery if they are unused and in original packaging. Refunds are processed within 5–7 business days.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. We use industry-standard encryption and never share your personal data with third parties without your consent.",
  },
  {
    q: "How do I contact a seller?",
    a: "Go to the product page and click 'Send inquiry' or 'Seller's profile' to message the supplier directly.",
  },
];

const helpSections = [
  {
    id: "how-to-buy",
    icon: "🛒",
    title: "How to Buy",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    steps: [
      {
        num: "1",
        text: "Search for the product using the search bar or browse categories.",
      },
      {
        num: "2",
        text: "Click on the product to view details, select size/color, and set quantity.",
      },
      { num: "3", text: "Click 'Add to cart' or 'Buy now' to proceed." },
      {
        num: "4",
        text: "Go to cart, review your items, and click 'Checkout'.",
      },
      {
        num: "5",
        text: "Enter your shipping address and payment details to place the order.",
      },
    ],
  },
  {
    id: "shipping",
    icon: "🚚",
    title: "Shipping & Delivery",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    steps: [
      {
        num: "📦",
        text: "Standard Shipping: 7–14 business days — Free on orders over $100.",
      },
      {
        num: "✈️",
        text: "Express Shipping: 3–5 business days — Additional charges apply.",
      },
      {
        num: "🌍",
        text: "We ship to 50+ countries worldwide through trusted courier partners.",
      },
      {
        num: "📍",
        text: "Track your order anytime from your profile under 'My Orders'.",
      },
    ],
  },
  {
    id: "returns",
    icon: "↩️",
    title: "Returns & Refunds",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    steps: [
      {
        num: "✅",
        text: "Items eligible for return within 30 days of delivery.",
      },
      {
        num: "📦",
        text: "Product must be unused, undamaged, and in original packaging.",
      },
      {
        num: "💳",
        text: "Refunds processed within 5–7 business days to original payment method.",
      },
      {
        num: "❌",
        text: "Customized or perishable items are not eligible for return.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span>{q}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ml-2 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-3 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
          {a}
        </div>
      )}
    </div>
  );
}

export default function HelpPage() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [helpSearch, setHelpSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("pk");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleSearch = () => {
    if (searchQuery.trim())
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSent(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setContactSent(false), 4000);
    }
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      helpSearch === "" ||
      f.q.toLowerCase().includes(helpSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(helpSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

          {/* Desktop nav */}
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
              <Link
                to="/help"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Help Center
              </Link>
              {/* Help dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-0.5"
                >
                  Help
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showHelpDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px]">
                    {[
                      { label: "Help Center", to: "/help", icon: "❓" },
                      {
                        label: "How to Buy",
                        to: "/help#how-to-buy",
                        icon: "🛒",
                      },
                      {
                        label: "Shipping & Delivery",
                        to: "/help#shipping",
                        icon: "🚚",
                      },
                      {
                        label: "Returns & Refunds",
                        to: "/help#returns",
                        icon: "↩️",
                      },
                      { label: "Contact Us", to: "/help#contact", icon: "📩" },
                      { label: "FAQs", to: "/help#faq", icon: "💬" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setShowHelpDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-sm"
              >
                <option value="USD">English, USD</option>
                <option value="PKR">English, PKR</option>
                <option value="EUR">English, EUR</option>
              </select>
              <div className="relative flex items-center gap-1.5">
                <span className="text-sm text-gray-500">Ship to</span>
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-1 focus:outline-none"
                >
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry}.png`}
                    alt="flag"
                    className="w-5 h-3.5 object-cover rounded-sm"
                  />
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 py-1 min-w-[130px]">
                    {countryOptions.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setSelectedCountry(c.code);
                          setShowCountryDropdown(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 ${selectedCountry === c.code ? "bg-blue-50 text-blue-600" : ""}`}
                      >
                        <img
                          src={`https://flagcdn.com/w20/${c.code}.png`}
                          alt={c.name}
                          className="w-5 h-3.5 object-cover rounded-sm"
                        />
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden absolute left-0 right-0 top-full bg-white border-t border-b border-gray-200 shadow-lg z-40 px-4 py-2">
              {[
                { label: "All category", to: "/products" },
                { label: "Hot offers", to: "/hot-offers" },
                { label: "Gift boxes", to: "/gift-boxes" },
                { label: "Projects", to: "/projects" },
                { label: "Help Center", to: "/help" },
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
              <div className="py-3">
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
          <span className="text-gray-700 font-medium">Help Center</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10 w-full">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 mb-6 text-center">
          <h1 className="text-white text-2xl font-bold mb-2">
            How can we help you?
          </h1>
          <p className="text-blue-100 text-sm mb-5">
            Search our help articles or browse the topics below
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for help..."
              value={helpSearch}
              onChange={(e) => setHelpSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l text-sm focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-r text-sm font-medium">
              Search
            </button>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {[
            { icon: "🛒", label: "How to Buy", href: "#how-to-buy" },
            { icon: "🚚", label: "Shipping", href: "#shipping" },
            { icon: "↩️", label: "Returns", href: "#returns" },
            { icon: "💳", label: "Payments", href: "#faq" },
            { icon: "📦", label: "Track Order", href: "#faq" },
            { icon: "📩", label: "Contact Us", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xs font-medium text-gray-700 group-hover:text-blue-600">
                {item.label}
              </p>
            </a>
          ))}
        </div>

        {/* HELP SECTIONS */}
        <div className="space-y-4 mb-6">
          {helpSections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className={`border rounded-xl p-5 ${section.color}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${section.iconBg}`}
                >
                  {section.icon}
                </div>
                <h2 className="text-base font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-2">
                {section.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white rounded-lg px-4 py-3 border border-white/80"
                  >
                    <span className="text-sm font-bold text-blue-600 shrink-0 w-6 text-center">
                      {step.num}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Frequently Asked Questions
          </h2>
          {filteredFaqs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded p-8 text-center text-gray-400 text-sm">
              No results found for "{helpSearch}"
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFaqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          )}
        </div>

        {/* CONTACT FORM */}
        <div
          id="contact"
          className="bg-white border border-gray-200 rounded-xl p-6 mb-6"
        >
          <h2 className="text-base font-bold text-gray-800 mb-1">Contact Us</h2>
          <p className="text-xs text-gray-500 mb-4">
            Can't find what you need? Send us a message and we'll get back to
            you within 24 hours.
          </p>
          {contactSent && (
            <div className="bg-green-50 border border-green-200 rounded p-3 mb-4 text-green-700 text-sm flex items-center gap-2">
              ✅ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-500 block mb-1">Subject</label>
            <select
              value={contactForm.subject}
              onChange={(e) =>
                setContactForm({ ...contactForm, subject: e.target.value })
              }
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 text-gray-700"
            >
              <option value="">Select a topic</option>
              <option>Order Issue</option>
              <option>Payment Problem</option>
              <option>Shipping Query</option>
              <option>Return & Refund</option>
              <option>Product Inquiry</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-500 block mb-1">Message</label>
            <textarea
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              placeholder="Describe your issue in detail..."
              rows={4}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>
          <button
            onClick={handleContactSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium"
          >
            Send Message
          </button>
        </div>

        {/* CONTACT INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "📧",
              title: "Email Support",
              info: "support@nexmart.com",
              sub: "Response within 24 hours",
            },
            {
              icon: "💬",
              title: "Live Chat",
              info: "Available 9AM – 6PM",
              sub: "Mon – Sat (PKT)",
            },
            {
              icon: "📞",
              title: "Phone Support",
              info: "+92 300 0000000",
              sub: "Business hours only",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center"
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-blue-600 font-medium">{card.info}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
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
                {[
                  {
                    store: "App Store",
                    sub: "Download on the",
                    path: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
                  },
                  {
                    store: "Google Play",
                    sub: "GET IT ON",
                    path: "M3.18 23.76c.3.17.64.24.99.2l13.29-7.67-2.83-2.83-11.45 10.3zM.54 1.18C.2 1.56 0 2.14 0 2.89v18.22c0 .75.2 1.33.54 1.71l.09.08 10.21-10.21v-.24L.63 1.1l-.09.08zM20.94 10.8l-2.82-1.63-3.17 3.17 3.17 3.17 2.85-1.65c.81-.47.81-1.23-.03-1.7v.04zM4.17.24L17.46 7.9l-2.83 2.83L3.18.47c.35-.38.71-.41.99-.23z",
                  },
                ].map((app) => (
                  <a
                    key={app.store}
                    href="#"
                    className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d={app.path} />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[9px] opacity-75 leading-tight">
                        {app.sub}
                      </span>
                      <span className="text-xs font-semibold leading-tight">
                        {app.store}
                      </span>
                    </div>
                  </a>
                ))}
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
