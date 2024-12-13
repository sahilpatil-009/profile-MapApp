import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

const App = () => {
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem("profiles");
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });
  

  const addProfile = (newProfile) => {
    setProfiles((prevProfiles) => {
      const updatedProfiles = [newProfile, ...prevProfiles]; // Add new profile to the beginning
      // Save updated profiles to localStorage
      localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      return updatedProfiles;
    });
  };

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]); // The state `profiles` will trigger this effect when it changes

  console.log(profiles);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home profiles={profiles} />} />
          <Route
            path="/admin"
            element={<Admin addProfile={addProfile} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
