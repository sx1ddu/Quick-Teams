import { Link } from "react-router-dom";
import Card from "../Components/Card";

export default function Landing() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-blue-400 text-white">
        <h1 className="text-5xl font-bold mb-4">Team Up Smarter</h1>
        <p className="text-lg mb-6">Find the best teammates for your skills, time, and goals.</p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 ">
            Get Started
          </Link>
          <Link to="/login" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600">
            Login
          </Link>
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <Card title="Smart Matchmaking">Find teammates who match your skills.</Card>
        <Card title="Show Your Skills">Create profiles with your expertise & goals.</Card>
        <Card title="Match on Time">Set availability and get matched instantly.</Card>
      </section>
    </div>
  );
}
