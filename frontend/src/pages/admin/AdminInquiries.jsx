import { useEffect, useState } from "react";
import { adminGet, adminPatch, adminDelete } from "../../utils/adminApi";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-600",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await adminGet("/inquiries");
      setInquiries(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await adminPatch(`/inquiries/${id}`, { status });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status } : inq)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry from "${name}"?`)) return;
    try {
      await adminDelete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Inquiries</h1>
      <p className="text-sm text-gray-500 mb-6">
        {loading ? "Loading..." : `${inquiries.length} inquiries`}
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs text-gray-500 border-b border-gray-200">
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Company</th>
              <th className="px-4 py-2.5 font-medium">Project</th>
              <th className="px-4 py-2.5 font-medium">Qty</th>
              <th className="px-4 py-2.5 font-medium">Details</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Loading inquiries...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No inquiries yet.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr
                  key={inq._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2.5 text-gray-800 font-medium">
                    {inq.name}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {inq.company || "—"}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 max-w-[160px] truncate">
                    {inq.projectTitle || inq.projectId}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">{inq.quantity}</td>
                  <td className="px-4 py-2.5 text-gray-500 max-w-[200px] truncate">
                    {inq.details || "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleStatusChange(inq._id, e.target.value)
                      }
                      className={`text-xs font-medium rounded px-2 py-1 border-none outline-none cursor-pointer ${
                        statusColors[inq.status] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => handleDelete(inq._id, inq.name)}
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
    </div>
  );
}
