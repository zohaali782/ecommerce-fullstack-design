import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaRegCommentDots,
  FaClipboardList,
  FaShoppingCart,
} from "react-icons/fa";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

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

const PROJECTS = [
  {
    id: 1,
    title: "Office Supplies Bundle",
    category: "B2B · Stationery",
    description:
      "Bulk procurement of office stationery, furniture, and consumables for corporate clients.",
    minOrder: 100,
    unit: "units",
    priceRange: "$2 – $15",
    deadline: "Aug 2026",
    fulfilled: 72,
    total: 500,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Office", "Corporate", "Bulk"],
  },
  {
    id: 2,
    title: "Branded Merch Pack",
    category: "Corporate · Apparel",
    description:
      "Custom-printed T-shirts, hoodies, and caps with company logos for corporate gifting.",
    minOrder: 50,
    unit: "pcs",
    priceRange: "$8 – $25",
    deadline: "Jul 2026",
    fulfilled: 45,
    total: 200,
    status: "In progress",
    statusColor: "bg-blue-100 text-blue-700",
    tags: ["Apparel", "Branding", "Custom"],
  },
  {
    id: 3,
    title: "IT Equipment Tender",
    category: "Enterprise · Tech",
    description:
      "Laptops, monitors, keyboards, and accessories for a government department tender.",
    minOrder: 10,
    unit: "units",
    priceRange: "$200 – $1,200",
    deadline: "Sep 2026",
    fulfilled: 20,
    total: 50,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Electronics", "Tender", "Government"],
  },
  {
    id: 4,
    title: "Medical Supply Kit",
    category: "Healthcare · Supplies",
    description:
      "First-aid kits, PPE, and medical consumables for hospital and clinic procurement.",
    minOrder: 200,
    unit: "kits",
    priceRange: "$5 – $40",
    deadline: "Oct 2026",
    fulfilled: 88,
    total: 1000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Healthcare", "Bulk", "Urgent"],
  },
  {
    id: 5,
    title: "Restaurant Kitchen Set",
    category: "Hospitality · Equipment",
    description:
      "Commercial kitchen equipment including cookware, utensils, and storage for new restaurant openings.",
    minOrder: 1,
    unit: "set",
    priceRange: "$500 – $3,000",
    deadline: "Dec 2026",
    fulfilled: 5,
    total: 30,
    status: "Starting",
    statusColor: "bg-yellow-100 text-yellow-700",
    tags: ["Hospitality", "Equipment", "Custom"],
  },
  {
    id: 6,
    title: "School Uniform Program",
    category: "Education · Apparel",
    description:
      "Uniforms, shoes, and bags for a school district annual supply contract.",
    minOrder: 500,
    unit: "sets",
    priceRange: "$12 – $35",
    deadline: "Jun 2026",
    fulfilled: 95,
    total: 2000,
    status: "Near complete",
    statusColor: "bg-green-100 text-green-700",
    tags: ["Education", "Apparel", "Bulk"],
  },
];

const STATUS_FILTERS = ["All", "In progress", "Starting", "Near complete"];
const TAG_FILTERS = [
  "All",
  "Bulk",
  "Corporate",
  "Custom",
  "Electronics",
  "Healthcare",
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const { cartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [showInquiry, setShowInquiry] = useState(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    qty: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

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

  const filtered = PROJECTS.filter((p) => {
    const matchStatus = activeStatus === "All" || p.status === activeStatus;
    const matchTag = activeTag === "All" || p.tags.includes(activeTag);
    return matchStatus && matchTag;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/inquiries", {
        projectId: String(showInquiry.id),
        projectTitle: showInquiry.title,
        name: form.name,
        company: form.company,
        quantity: Number(form.qty),
        details: form.message,
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowInquiry(null);
        setSubmitted(false);
        setForm({ name: "", company: "", qty: "", message: "" });
      }, 2000);
    } catch (err) {
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
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
                className="text-sm text-blue-600 font-medium"
              >
                Projects
              </Link>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                Menu item
              </a>
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

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-white/70 text-xs mb-2">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>›</span>
            <span className="text-white">Projects</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">📋 Projects</h1>
          <p className="text-white/80 text-sm">
            Bulk & business orders — join an active project or submit a new
            sourcing request.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              label: "Active projects",
              value: PROJECTS.filter((p) => p.status !== "Completed").length,
            },
            {
              label: "Near completion",
              value: PROJECTS.filter((p) => p.status === "Near complete")
                .length,
            },
            {
              label: "Starting soon",
              value: PROJECTS.filter((p) => p.status === "Starting").length,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded p-3 text-center"
            >
              <p className="text-2xl font-bold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded border border-gray-200 p-3 mb-4">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500">
                Status:
              </span>
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeStatus === s
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500">Tag:</span>
              {TAG_FILTERS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeTag === t
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">
                      {project.category}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded shrink-0 ml-2 ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex gap-1 flex-wrap mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Fulfillment progress</span>
                    <span className="font-semibold text-gray-600">
                      {project.fulfilled}/{project.total} {project.unit}
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 w-full">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.round((project.fulfilled / project.total) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 text-right">
                    {Math.round((project.fulfilled / project.total) * 100)}%
                    fulfilled
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 mb-3">
                  <div>
                    <p className="text-[10px] text-gray-400">Min order</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.minOrder} {project.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Price range</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.priceRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Deadline</p>
                    <p className="text-xs font-semibold text-gray-700">
                      {project.deadline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInquiry(project)}
                  className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                >
                  Join this project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm font-medium">
              No projects match this filter.
            </p>
            <button
              onClick={() => {
                setActiveStatus("All");
                setActiveTag("All");
              }}
              className="mt-3 text-blue-600 text-xs hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* NEW PROJECT CTA */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">
              Have a bulk sourcing need?
            </h3>
            <p className="text-xs text-gray-500">
              Submit a new project and we'll match you with the right suppliers.
            </p>
          </div>
          <button
            onClick={() => setShowInquiry({ id: "new", title: "New Project" })}
            className="bg-blue-600 text-white text-xs font-semibold px-5 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit a project
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 mt-8">
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

      {/* INQUIRY MODAL */}
      {showInquiry && (
        <div
          className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4"
          onClick={() => setShowInquiry(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-3">✅</p>
                <p className="text-sm font-semibold text-gray-800">
                  Inquiry sent!
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-800">
                    Join: {showInquiry.title}
                  </h3>
                  <button
                    onClick={() => setShowInquiry(null)}
                    className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Full name"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Company name (optional)"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Quantity needed
                    </label>
                    <input
                      type="number"
                      required
                      value={form.qty}
                      onChange={(e) =>
                        setForm({ ...form, qty: e.target.value })
                      }
                      placeholder="e.g. 200"
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">
                      Additional details
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Specifications, timeline, delivery location..."
                      rows={3}
                      className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-blue-400 resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-500 text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white text-xs font-semibold py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send inquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
