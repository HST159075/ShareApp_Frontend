import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import FileSharer from "./pages/FileSharer";
import ReceiveData from "./pages/ReceiveData";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { authClient } from "./api/auth-client";

const App: React.FC = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-slate-500">
        Loading ShareApp...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            ShareApp
          </Link>
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/share" className="hover:text-blue-600 transition-colors">Share</Link>

            {session ? (
              <>
                <Link to="/dashboard" className="text-blue-600 font-bold">Dashboard</Link>
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs border border-blue-200 uppercase">
                  {session.user.name.charAt(0)}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-md">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* 🌟 Dedicated Receive Route - Mobile QR Scan er jonno */}
          {/* Ekhon QR scan korle raw JSON er bodole eii page load hobe */}
          <Route path="/receive/:code" element={<ReceiveData />} />
          <Route path="/receive" element={<ReceiveData />} />

          <Route
            path="/share"
            element={
              <main className="max-w-4xl mx-auto py-12 px-6">
                <div className="text-center mb-10">
                  <h1 className="text-4xl font-extrabold text-slate-900 mb-2">PC to Mobile Share</h1>
                  <p className="text-slate-500">Fast, Secure, and Real-time File Transfer</p>
                </div>
                <div className="space-y-8">
                  {/* File Upload Section */}
                  <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
                    <FileSharer />
                  </div>
                  {/* Receive Section (Inline for PC use) */}
                  <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
                    <ReceiveData />
                  </div>
                </div>
              </main>
            }
          />

          {/* Auth & Protected Routes */}
          <Route path="/login" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!session ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/dashboard" />} />
          
          {/* Fixed Dashboard Route */}
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/signup" replace />} />

          <Route
            path="*"
            element={
              <div className="text-center py-20 text-slate-500">
                Page Not Found. <Link to="/" className="text-blue-600 underline">Back Home</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;