import { useEffect, useState } from "react";
import { adminPost, adminPut, adminDelete } from "../../utils/adminApi";

const statusOptions = ["Starting", "In progress", "Near complete", "Completed"];

const statusBadge = {
  Starting: "bg-gray-100 text-gray-600",
  "In progress": "bg-blue-100 text-blue-600",
  "Near complete": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-600",
};

const emptyForm = {
  title: "",
  category: "",
  description: "",
  minOrder: "",
  unit: "",
  priceRange: "",
  deadline: "",
  fulfilled: "",
  total: "",
  status: "Starting",
  tags: "",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProjects = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      minOrder: project.minOrder ?? "",
      unit: project.unit || "",
      priceRange: project.priceRange || "",
      deadline: project.deadline || "",
      fulfilled: project.fulfilled ?? "",
      total: project.total ?? "",
      status: project.status || "Starting",
      tags: (project.tags || []).join(", "),
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        minOrder: Number(form.minOrder),
        fulfilled: form.fulfilled ? Number(form.fulfilled) : 0,
        total: Number(form.total),
        statusColor: statusBadge[form.status] || "bg-gray-100 text-gray-600",
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await adminPut(`/projects/${editingId}`, payload);
      } else {
        await adminPost("/projects", payload);
      }
      closeForm();
      loadProjects();
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    try {
      await adminDelete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Projects</h1>
          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : `${projects.length} projects`}
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded"
        >
          + Add Project
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs text-gray-500 border-b border-gray-200">
              <th className="px-4 py-2.5 font-medium">Title</th>
              <th className="px-4 py-2.5 font-medium">Category</th>
              <th className="px-4 py-2.5 font-medium">Price range</th>
              <th className="px-4 py-2.5 font-medium">Progress</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  Loading projects...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No projects yet. Click "Add Project" to create one.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-800 font-medium max-w-[200px] truncate">
                    {p.title}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">{p.category}</td>
                  <td className="px-4 py-2.5 text-gray-700">{p.priceRange}</td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {p.fulfilled} / {p.total} {p.unit}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        statusBadge[p.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => openEditForm(p)}
                      className="text-blue-600 hover:underline text-xs font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id, p.title)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Title *
                </label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Category *
                </label>
                <input
                  required
                  type="text"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Min order *
                  </label>
                  <input
                    required
                    type="number"
                    value={form.minOrder}
                    onChange={(e) => handleChange("minOrder", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Unit *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="pcs, kg, etc"
                    value={form.unit}
                    onChange={(e) => handleChange("unit", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Price range *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. $2 - $5 per unit"
                  value={form.priceRange}
                  onChange={(e) => handleChange("priceRange", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Deadline *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 30 days"
                  value={form.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Fulfilled
                  </label>
                  <input
                    type="number"
                    value={form.fulfilled}
                    onChange={(e) => handleChange("fulfilled", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Total *
                  </label>
                  <input
                    required
                    type="number"
                    value={form.total}
                    onChange={(e) => handleChange("total", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="electronics, bulk, wholesale"
                  value={form.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium py-2 rounded"
                >
                  {saving ? "Saving..." : editingId ? "Save changes" : "Add project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}