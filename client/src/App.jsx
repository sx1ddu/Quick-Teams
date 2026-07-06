import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Matchmaking from "./Pages/Matchmaking";
import Teams from "./Pages/Teams";
import Community from "./Pages/Community";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProfileForm from "./Pages/ProfileInput"; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<ProfileForm />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
