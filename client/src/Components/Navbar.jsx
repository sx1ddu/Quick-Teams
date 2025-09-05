import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react"; // ✅ make sure lucide-react is installed

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check login status
    fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.uid || data._id)) {
          setIsAuthenticated(true);
          setUser(data);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center">
          <img
            src="/amb-svgrepo-com.svg"
            alt="Logo"
            className="inline-block w-8 h-8 mr-2"
          />
          TeamO
        </Link>

        {/* Nav links */}
        <div className="space-x-6 flex items-center">
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/matchmaking" className="hover:text-blue-500">Matchmaking</Link>
          <Link to="/teams" className="hover:text-blue-500">Teams</Link>
          <Link to="/community" className="hover:text-blue-500">Community</Link>

          {!isAuthenticated ? (
            // ✅ If NOT logged in → show Login / Signup
            <>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border text-blue-600 px-4 py-2 rounded-lg hover:bg-indigo-100"
              >
                Sign Up
              </Link>
            </>
          ) : (
            // ✅ If logged in → show User icon & dropdown
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <User className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
