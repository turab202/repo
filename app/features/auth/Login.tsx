import { useState } from "react";
import { useNavigate } from "react-router";
import { LeftHero } from "../auth/components/LeftHero";

// Mock user data - in a real app, this would come from your backend
const MOCK_USERS = [
  { email: "employee@example.com", password: "password123", role: "employee", name: "John Employee" },
  { email: "employer@example.com", password: "password123", role: "employer", name: "Jane Employer" },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - find user in our mock data
      const user = MOCK_USERS.find(u => 
        u.email === email.trim() && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Store user data in localStorage (simulating auth tokens)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to appropriate dashboard based on user role
      if (user.role === "employer") {
        navigate("/employer-dashboard", { replace: true });
      } else {
        navigate("/employee-dashboard", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left visual panel */}
      <LeftHero />

      {/* Right form panel */}
      <div className="flex items-start justify-center py-16 px-4 md:px-10 bg-white">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-semibold text-black mb-8">
            Welcome Back
          </h1>

          <p className="text-gray-600 mb-8">
            Please log in to access your account.
          </p>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-6 py-3 outline-none bg-white focus:bg-light-gray focus:border-base focus:border-[2px] focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm text-black mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-6 py-3 outline-none bg-white focus:bg-light-gray focus:border-base focus:border-[2px] focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border border-gray-300 bg-light-gray accent-base [color-scheme:light] focus:ring-0"
                />
                <span>Remember me</span>
              </label>
              
              <a className="text-sm text-base hover:underline" href="#">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-base text-white rounded-lg py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-70 transition-colors"
            >
              {loading ? "Signing In..." : "Log in"}
            </button>

            <div className="flex items-center gap-3 text-[11px] tracking-wide text-gray-400 select-none">
              <div className="h-px bg-gray-200 flex-1" />
              <span>OR</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-light-gray rounded-md py-3"
            >
              <img
                src="/icons/auth/google.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-black font-medium text-sm">
                Sign In With Google
              </span>
            </button>

            <p className="text-sm text-black text-center">
              Don't have an account?{" "}
              <a href="/register" className="text-[#1E73BE] hover:underline">
                Register
              </a>
            </p>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Demo Credentials:</h3>
            <p className="text-xs text-gray-600 mb-1">
              Employee: employee@example.com / password123
            </p>
            <p className="text-xs text-gray-600">
              Employer: employer@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}