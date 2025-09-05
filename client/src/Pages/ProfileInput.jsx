import { useState, useEffect } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    experience: "",
    availability: "Offline",
    goals: "",
    socials: { linkedin: "", github: "", twitter: "", portfolio: "" },
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["linkedin", "github", "twitter", "portfolio"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socials: { ...prev.socials, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, skills: selected }));
  };

  useEffect(() => {
    const updateAvailability = () => {
      setFormData((prev) => ({
        ...prev,
        availability: navigator.onLine ? "Online" : "Offline",
      }));
    };
    updateAvailability();
    window.addEventListener("online", updateAvailability);
    window.addEventListener("offline", updateAvailability);
    return () => {
      window.removeEventListener("online", updateAvailability);
      window.removeEventListener("offline", updateAvailability);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedData(data);
        alert("Profile saved!");
      } else {
        alert(data.message || "Profile save failed");
      }
    } catch (err) {
      console.error("Profile save error:", err);
    }
  };

  const skillOptions = ["React.js", "Node.js", "Python", "Machine Learning", "Data Science", "Java", "UI/UX Design", "Cloud Computing", "Cybersecurity", "DevOps"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Profile</h2>
        {!submittedData ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <select multiple name="skills" value={formData.skills} onChange={handleSkillsChange} className="w-full px-4 py-2 border rounded-lg h-32">
              {skillOptions.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
            <select name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
              <option value="">Select level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <textarea name="goals" placeholder="Your Goals" value={formData.goals} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <input type="url" name="linkedin" placeholder="LinkedIn URL" value={formData.socials.linkedin} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <input type="url" name="github" placeholder="GitHub URL" value={formData.socials.github} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <input type="url" name="twitter" placeholder="Twitter URL" value={formData.socials.twitter} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <input type="url" name="portfolio" placeholder="Portfolio/Website URL" value={formData.socials.portfolio} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg"/>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">Save Profile</button>
          </form>
        ) : (
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">Your Profile</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Skills:</strong> {submittedData.skills.join(", ")}</p>
            <p><strong>Experience:</strong> {submittedData.experience}</p>
            <p><strong>Goals:</strong> {submittedData.goals}</p>
            <p><strong>Availability:</strong> {submittedData.availability}</p>
            <p><strong>LinkedIn:</strong> {submittedData.socials.linkedin}</p>
            <p><strong>GitHub:</strong> {submittedData.socials.github}</p>
            <p><strong>Twitter:</strong> {submittedData.socials.twitter}</p>
            <p><strong>Portfolio:</strong> {submittedData.socials.portfolio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
