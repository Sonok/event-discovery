import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark class exists on document element
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label={isDark ? "Switch to sunset mode" : "Switch to night mode"}
    >
      {/* Track */}
      <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-sunset-orange via-sunset-pink to-sunset-purple dark:from-space-deep dark:via-space-purple dark:to-space-blue transition-all duration-300" />

      {/* Slider */}
      <div
        className={`absolute top-0.5 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-300 transform ${
          isDark ? "translate-x-8" : "translate-x-0.5"
        } flex items-center justify-center`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-space-purple" />
        ) : (
          <Sun className="w-4 h-4 text-sunset-orange" />
        )}
      </div>

      {/* Background Stars for dark mode */}
      {isDark && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-space-cyan rounded-full animate-pulse" />
          <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-space-gold rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-space-silver rounded-full animate-pulse delay-500" />
        </div>
      )}
    </button>
  );
}
