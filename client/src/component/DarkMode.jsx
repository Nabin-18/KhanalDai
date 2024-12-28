import { useState } from "react";

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      className="h-8 w-8 dark:bg-white rounded-full dark:text-black font-semibold"
      onClick={toggleDarkMode}
    >
      {darkMode ? "🌞" : "🌚"}
    </button>
  );
}

export default DarkMode;
