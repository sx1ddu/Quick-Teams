import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [suggestedPlayers, setSuggestedPlayers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ✅ Fetch logged-in user profile
    fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    // ✅ Fetch suggested teammates
    fetch(`${import.meta.env.VITE_API_BASE_URL}/suggested-players`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSuggestedPlayers(data))
      .catch((err) => console.error(err));

    // ✅ Fetch notifications
    fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Send team request
  const handleRequest = async (playerId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ to: playerId }),
      });

      if (!res.ok) throw new Error("Failed to send request");

      const data = await res.json();
      alert(`✅ ${data.message || "Request sent!"}`);
    } catch (err) {
      console.error(err);
      alert("❌ Could not send request.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-gray-800">Dashboard</h2>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-600">
            Your Profile
          </h3>
          {profile ? (
            <div className="space-y-3 text-gray-700">
              <p><strong>UID:</strong> {profile.uid}</p>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Location:</strong> {profile.location || "Not set"}</p>
              <p><strong>Experience:</strong> {profile.experience}</p>
              <p><strong>Availability:</strong> {profile.availability}</p>
              <p>
                <strong>Skills:</strong>{" "}
                {Array.isArray(profile.skills)
                  ? profile.skills.join(", ")
                  : profile.skills}
              </p>
              <p><strong>Goals:</strong> {profile.goals}</p>

              {/* ✅ Joined Events Section */}
              {Array.isArray(profile?.joinedEvents) &&
                profile.joinedEvents.length > 0 && (
                  <div className="mt-4">
                    <strong>🎉 Joined Events:</strong>
                    <ul className="list-disc list-inside text-purple-600">
                      {profile.joinedEvents.map((event, idx) => (
                        <li key={event._id || idx}>
                          {event.name}{" "}
                          {event.date ? `— ${event.date}` : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* ✅ My Teams Link */}
              <div className="mt-6">
                <Link
                  to="/my-teams"
                  className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  👥 View My Teams
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

        {/* Suggested Players */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2">
          <h3 className="text-2xl font-semibold mb-4 text-green-600">
            Suggested Teammates
          </h3>
          <div className="space-y-4">
            {suggestedPlayers.length > 0 ? (
              suggestedPlayers.map((player) => (
                <div
                  key={player._id}
                  className="p-4 border rounded-xl shadow hover:shadow-md transition"
                >
                  <p className="font-bold text-lg text-gray-800">{player.name}</p>
                  <p className="text-sm text-gray-600">UID: {player.uid}</p>
                  <p className="text-sm text-gray-600">
                    Location: {player.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Skills: {player.skills.join(", ")}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    Match Score: {player.matchScore}%
                  </p>

                  {/* ✅ Request Button */}
                  <button
                    onClick={() => handleRequest(player._id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Request to Team Up
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No suggested teammates right now.</p>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-red-600">🔔 Notifications</h3>
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.map((note, idx) => (
              <li
                key={note._id || idx}
                className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
              >
                {note.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new notifications.</p>
        )}
      </div>
    </div>
  );
}
