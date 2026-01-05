import { useState } from "react";
import { authClient } from "../api/auth-client";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false); // Email sent status tracking

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    });

    if (data) {
      console.log("Signup successful for user:", data.user.name);
      setIsSent(true); // Form hide kore success message dekhabe
    }

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  if (isSent) {
    return (
      <div className="max-w-md mx-auto mt-10 p-10 bg-white rounded-3xl shadow-xl border border-blue-50 text-center animate-in fade-in zoom-in duration-300">
        <div className="text-5xl mb-4">📧</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Check Your Email</h2>
        <p className="text-slate-500">We've sent a verification link to <br/><strong>{email}</strong></p>
        <button 
          onClick={() => setIsSent(false)} 
          className="mt-6 text-blue-600 font-semibold hover:underline"
        >
          Back to Signup
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
      <p className="text-slate-500 text-sm mb-6">Join us to get 50GB cloud storage instantly.</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          required
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100"
          }`}
        >
          {loading ? "Sending Verification..." : "Sign Up & Get 50GB"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t w-full border-slate-100"></div>
          <span className="bg-white px-3 text-xs text-slate-400 absolute">OR</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-slate-50 transition-all"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
          Continue with Google
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account? <a href="/login" className="text-blue-600 font-bold hover:underline">Login</a>
      </p>
    </div>
  );
};