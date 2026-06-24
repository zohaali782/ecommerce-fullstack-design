import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminGet } from "../../utils/adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: null,
    projects: null,
    inquiries: null,
    subscribers: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const [products, projects, inquiries, subscribers] = await Promise.all([
          fetch("http://localhost:5000/api/products").then((r) => r.json()),
          fetch("http://localhost:5000/api/projects").then((r) => r.json()),
          adminGet("/inquiries"),
          adminGet("/newsletter"),
        ]);
        setStats({
          products: products.length,
          projects: projects.length,
          inquiries: inquiries.length,
          subscribers: subscribers.length,
        });
      } catch (err) {
        setError(err.message);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: "Products", value: stats.products, to: "/admin/products" },
    { label: "Projects", value: stats.projects, to: "/admin/projects" },
    { label: "Inquiries", value: stats.inquiries, to: "/admin/inquiries" },
    {
      label: "Newsletter Subscribers",
      value: stats.subscribers,
      to: "/admin/newsletter",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Quick overview of your store</p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-gray-400 mb-1">{c.label}</p>
            <p className="text-2xl font-bold text-gray-800">
              {c.value === null ? "—" : c.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
