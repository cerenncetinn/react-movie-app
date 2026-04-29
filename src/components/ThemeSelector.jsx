import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector pointer">
      <i
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`ms-2 bi bi-moon-stars${theme === "dark" ? " text-white" : "-fill"}`}
      ></i>
    </div>
  );
}
