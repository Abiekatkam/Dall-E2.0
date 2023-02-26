import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

import { logo, logo_white } from "./assets";

import { Home, CreatePost } from "./pages";

const App = () => {
  const [darkMode, setDarkMode] = useState("light");

  useEffect(() => {
    if (darkMode === "light") {
      document.documentElement.classList.remove("dark");
      document.querySelector("link[rel='icon']").href = logo;
    } else {
      document.documentElement.classList.add("dark");
      document.querySelector("link[rel='icon']").href = logo_white;
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode === "light") {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  };

  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-white dark:bg-black sm:px-8 px-4 py-4 border-b border-b-black dark:border-b-[#fff]">
        <Link to="/">
          {darkMode === "light" ? (
            <img src={logo} alt="logo" className="w-28 object-contain" />
          ) : (
            <img src={logo_white} alt="logo" className="w-28 object-contain" />
          )}
        </Link>

        <div className="flex justify-between items-center gap-5">
          <button
            type="button"
            className="font-inter font-medium bg-[#fff] dark:bg-[#000] text-black dark:text-white py-4 px-4 rounded-md"
            onClick={toggleDarkMode}
          >
            {darkMode === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6464ff] text-white py-4 px-4 rounded-md"
          >
            Create
          </Link>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] dark:bg-black min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
