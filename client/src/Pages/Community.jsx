// src/pages/Community.jsx
import { useEffect, useState } from "react";
import Card from "../Components/Card";

export default function Community() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch events (hackathons, tech meetups, workshops, etc.)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events`, {
          credentials: "include",
        });
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ✅ Join event
  const joinEvent = async (eventId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId }),
      });

      if (!res.ok) throw new Error("Failed to join event");

      const result = await res.json();
      alert(`✅ ${result.message || "Joined event successfully!"}`);
    } catch (err) {
      console.error("❌ Error joining event:", err);
      alert("❌ Could not join event.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Community Events</h2>

      {loading && <p className="text-gray-500">Loading events...</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {!loading && events.length > 0 ? (
          events.map((event) => (
            <Card key={event._id} title={event.name}>
              <p>{event.desc}</p>
              <p className="text-sm text-gray-500">
                📍 {event.location} | 📅 {event.date}
              </p>
              <button
                onClick={() => joinEvent(event._id)}
                className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Join Event
              </button>
            </Card>
          ))
        ) : (
          !loading && <p className="text-gray-500">No upcoming events.</p>
        )}
      </div>
    </div>
  );
}
