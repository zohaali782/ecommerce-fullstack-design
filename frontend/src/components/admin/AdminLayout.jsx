import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const navItems = [
  { label: "Dashboard", to: "/admin", exact: true },
  { label: "Products", to: "/admin/products" },
  { label: "Projects", to: "/admin/projects" },
  { label: "Inquiries", to: "/admin/inquiries" },
  { label: "Newsletter", to: "/admin/newsletter" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
              N
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm leading-tight">
                NexMart
              </p>
              <p className="text-[10px] text-gray-400 leading-tight">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="px-3 mb-2">
            <p className="text-xs text-gray-700 font-medium truncate">
              {user?.name}
            </p>
            <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
          <Link
            to="/"
            className="block px-3 py-2 rounded text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors mt-1"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
