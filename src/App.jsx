import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PredictionProvider } from "./context/PredictionContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Predictions from "./pages/Predictions";
import Premium from "./pages/Premium";
import AuthPage from "./pages/AuthPage";
import Account from "./pages/Account";

import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <PredictionProvider>
        <BrowserRouter>

          <div className="min-h-screen bg-[#0A0D0B] text-[#E9F0EC] font-sans">

            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/premium" element={<Premium />} />
              <Route
                path="/login"
                element={<AuthPage mode="login" />}
              />
              <Route
                path="/register"
                element={<AuthPage mode="register" />}
              />
              <Route path="/account" element={<Account />} />
              <Route
                path="/admin"
                element={<AdminDashboard />}
              />
            </Routes>

            <Footer />

          </div>

        </BrowserRouter>
      </PredictionProvider>
    </AuthProvider>
  );
}