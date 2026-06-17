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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <Router>
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
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />
            </Routes>
          </Router>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
