import { useEffect, useState } from "react";
import Card from "../Components/Card";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/teams`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ teamName, description }),
    });
    setTeamName("");
    setDescription("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Teams</h2>
      <Card title="Create Team">
        <form className="space-y-3 mt-3" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create
          </button>
        </form>
      </Card>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Card key={team._id} title={team.name}>
            <p>{team.description}</p>

            {/* ✅ Show team members */}
            <div className="mt-2">
              <strong>Members:</strong>
              <ul className="list-disc list-inside text-gray-700">
                {team.members.map((member) => (
                  <li key={member._id}>{member.name}</li>
                ))}
              </ul>
            </div>

            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Join Team
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
