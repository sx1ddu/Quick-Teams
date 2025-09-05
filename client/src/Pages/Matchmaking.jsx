// src/pages/Matchmaking.jsx
import { useEffect, useState } from "react";
import Card from "../Components/Card";

export default function Matchmaking() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch AI recommended matches from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/matchmaking`, {
          credentials: "include", // if you’re using cookies/JWT in httpOnly cookies
        });
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        console.error(" Failed to fetch matchmaking data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Handle skill search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFiltered(users);
    } else {
      const results = users.filter((user) =>
        user.skills.some((skill) => skill.toLowerCase().includes(query))
      );
      setFiltered(results);
    }
  };

  // ✅ Send a team-up request to backend
  const sendRequest = async (userId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // keep session tokens/cookies
        body: JSON.stringify({ to: userId }),
      });

      if (!res.ok) throw new Error("Failed to send request");

      const result = await res.json();
      alert(` ${result.message || "Request sent successfully!"}`);
    } catch (err) {
      console.error(" Error sending request:", err);
      alert(" Failed to send request.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">AI Matchmaking</h2>

      {/* 🔍 Search box */}
      <input
        type="text"
        placeholder="Search by skill..."
        value={search}
        onChange={handleSearch}
        className="w-full md:w-1/2 border p-3 rounded-lg mb-8"
      />

      {/* Loader */}
      {loading && <p className="text-gray-500">Loading users...</p>}

      {/* User Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {!loading && filtered.length > 0 ? (
          filtered.map((user) => (
            <Card key={user._id} title={user.name}>
              <p>{user.skills.join(", ")}</p>
              <p className="text-sm text-gray-500">{user.status}</p>
              <button
                onClick={() => sendRequest(user._id)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Request to Team Up
              </button>
            </Card>
          ))
        ) : (
          !loading && <p className="text-gray-500">No users found with that skill.</p>
        )}
      </div>
    </div>
  );
}
