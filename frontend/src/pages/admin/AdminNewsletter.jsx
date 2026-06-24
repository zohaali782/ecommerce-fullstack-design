import { useEffect, useState } from "react";
import { adminGet, adminDelete } from "../../utils/adminApi";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const data = await adminGet("/newsletter");
      setSubscribers(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Remove "${email}" from subscribers?`)) return;
    try {
      await adminDelete(`/newsletter/${id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExportCsv = () => {
    const rows = ["Email,Subscribed At"];
    subscribers.forEach((s) => {
      rows.push(`${s.email},${new Date(s.createdAt).toLocaleDateString()}`);
    });
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter_subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : `${subscribers.length} subscribers`}
          </p>
        </div>
        {subscribers.length > 0 && (
          <button
            onClick={handleExportCsv}
            className="border border-gray-300 text-gray-600 text-sm font-medium px-4 py-2 rounded hover:bg-gray-50"
          >
            Export CSV
          </button>
        )}
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
              <th className="px-4 py-2.5 font-medium">Email</th>
              <th className="px-4 py-2.5 font-medium">Subscribed at</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  Loading subscribers...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-2.5 text-gray-800">{s.email}</td>
                  <td className="px-4 py-2.5 text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => handleDelete(s._id, s.email)}
                      className="text-red-500 hover:underline text-xs font-medium"
                    >
                      Remove
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
