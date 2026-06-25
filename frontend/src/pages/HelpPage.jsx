import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

/* ── Icon helpers (inline SVGs, replacing emojis) ── */

function CartIconBig() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zM18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.18 7.65l-8.85-4.42a.67.67 0 00-.66 0L2.82 7.65a.68.68 0 00-.32.57v7.56c0 .23.13.45.32.57l8.85 4.42c.2.1.46.1.66 0l8.85-4.42c.2-.12.32-.34.32-.57V8.22a.68.68 0 00-.32-.57zM12 4.61l6.94 3.47L12 11.55 5.06 8.08 12 4.61zm-7.5 4.74l6.75 3.37v7.27l-6.75-3.37V9.35zm9 10.64v-7.27l6.75-3.37v7.27l-6.75 3.37z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function HelpCircleIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  );
}

function ReturnArrowIcon() {
  return (
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
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 015.5 5.5v0a5.5 5.5 0 01-5.5 5.5H11" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.93 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.81 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.07 16zm2.95-8H5.07a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.02 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function FlagUSIcon({ className = "w-4 h-3" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 60 30"
    >
      <rect width="60" height="30" fill="#B22234" />
      <rect y="2.3" width="60" height="2.3" fill="white" />
      <rect y="6.9" width="60" height="2.3" fill="white" />
      <rect y="11.5" width="60" height="2.3" fill="white" />
      <rect y="16.2" width="60" height="2.3" fill="white" />
      <rect y="20.8" width="60" height="2.3" fill="white" />
      <rect y="25.4" width="60" height="2.3" fill="white" />
      <rect width="24" height="16.2" fill="#3C3B6E" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-3 h-3" }) {
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

function MenuGridIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

const helpSections = [
  {
    id: "how-to-buy",
    icon: <CartIconBig />,
    title: "How to Buy",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100 text-blue-600",
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
    icon: <TruckIcon />,
    title: "Shipping & Delivery",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100 text-green-600",
    steps: [
      {
        icon: <PackageIcon />,
        text: "Standard Shipping: 7–14 business days — Free on orders over $100.",
      },
      {
        icon: <PlaneIcon />,
        text: "Express Shipping: 3–5 business days — Additional charges apply.",
      },
      {
        icon: <GlobeIcon />,
        text: "We ship to 50+ countries worldwide through trusted courier partners.",
      },
      {
        icon: <PinIcon />,
        text: "Track your order anytime from your profile under 'My Orders'.",
      },
    ],
  },
  {
    id: "returns",
    icon: <ReturnIcon />,
    title: "Returns & Refunds",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100 text-orange-600",
    steps: [
      {
        icon: <CheckIcon />,
        text: "Items eligible for return within 30 days of delivery.",
      },
      {
        icon: <PackageIcon />,
        text: "Product must be unused, undamaged, and in original packaging.",
      },
      {
        icon: <CardIcon />,
        text: "Refunds processed within 5–7 business days to original payment method.",
      },
      {
        icon: <CrossIcon />,
        text: "Customized or perishable items are not eligible for return.",
      },
    ],
  },
];

function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 left-4 sm:left-auto bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <CheckCircleIcon />
      {message}
    </div>
  );
}

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
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleSearch = () => {
    if (searchQuery.trim())
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSent(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setToast({ show: true, message: "Message sent successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 2500);
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
      <Toast show={toast.show} message={toast.message} />

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

            {/* Search bar — full width on mobile */}
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

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden text-gray-600 p-1"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
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
                <MenuGridIcon />
                All category
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

              {/* Help dropdown — hover-triggered, matches GiftBoxesPage */}
              <div className="relative group">
                <span className="text-sm text-blue-600 font-medium cursor-pointer flex items-center gap-0.5">
                  Help
                  <ChevronDownIcon />
                </span>
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px] hidden group-hover:block">
                  {[
                    { label: "Help Center", to: "/help" },
                    { label: "How to Buy", to: "/help#how-to-buy" },
                    { label: "Shipping & Delivery", to: "/help#shipping" },
                    { label: "Returns & Refunds", to: "/help#returns" },
                    { label: "Contact Us", to: "/help#contact" },
                    { label: "FAQs", to: "/help#faq" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <HelpCircleIcon />
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

              {/* Ship to — desktop */}
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
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
                  <ChevronDownIcon />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-7 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[140px]">
                    {countryOptions.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country.code);
                          setShowCountryDropdown(false);
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
                <MenuGridIcon />
                All category
              </Link>
              {[
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

              {/* Ship to — mobile */}
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

      <div className="max-w-7xl mx-auto px-4 pb-10 w-full flex-1">
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
            { icon: <CartIconBig />, label: "How to Buy", href: "#how-to-buy" },
            { icon: <TruckIcon />, label: "Shipping", href: "#shipping" },
            { icon: <ReturnIcon />, label: "Returns", href: "#returns" },
            { icon: <CardIcon />, label: "Payments", href: "#faq" },
            { icon: <PackageIcon />, label: "Track Order", href: "#faq" },
            { icon: <MailIcon />, label: "Contact Us", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-blue-400 hover:shadow-sm transition-all group"
            >
              <div className="text-blue-600 mb-1 flex items-center justify-center">
                {item.icon}
              </div>
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${section.iconBg}`}
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
                    {step.num ? (
                      <span className="text-sm font-bold text-blue-600 shrink-0 w-6 text-center">
                        {step.num}
                      </span>
                    ) : (
                      <span className="text-gray-500 shrink-0 w-6 flex items-center justify-center">
                        {step.icon}
                      </span>
                    )}
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
              <CheckCircleIcon />
              Message sent! We'll get back to you within 24 hours.
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
              icon: <MailIcon />,
              title: "Email Support",
              info: "support@nexmart.com",
              sub: "Response within 24 hours",
            },
            {
              icon: <ChatIcon />,
              title: "Live Chat",
              info: "Available 9AM – 6PM",
              sub: "Mon – Sat (PKT)",
            },
            {
              icon: <PhoneIcon />,
              title: "Phone Support",
              info: "+92 300 0000000",
              sub: "Business hours only",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center"
            >
              <div className="text-blue-600 mb-2 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-blue-600 font-medium">{card.info}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
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

            {/* Get app */}
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
