import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import UserProfilePage from "./pages/UserProfilePage";
import HotOffersPage from "./pages/HotOffersPage";
import GiftBoxesPage from "./pages/GiftBoxesPage";
import ProjectsPage from "./pages/ProjectsPage";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import HelpPage from "./pages/HelpPage";
import AboutPage from "./pages/AboutPage";
import CategoriesPage from "./pages/CategoriesPage";
import BlogsPage from "./pages/BlogsPage";
import FindStorePage from "./pages/FindStorePage";
import MoneyRefundPage from "./pages/MoneyRefundPage";
import ShippingPage from "./pages/ShippingPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/hot-offers" element={<HotOffersPage />} />
              <Route path="/gift-boxes" element={<GiftBoxesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/find-store" element={<FindStorePage />} />
              <Route path="/money-refund" element={<MoneyRefundPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />

              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
              </Route>
            </Routes>
          </Router>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
