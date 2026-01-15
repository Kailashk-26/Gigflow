import { useEffect, useState } from "react";
import { LayoutDashboard, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = ({setIsSearchBar }) => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur shadow-md py-3"
          : "bg-red-500 py-5"
      }`}
    >
      {/* Logo */}
      <p
        className={`text-2xl font-semibold ${
          isScrolled ? "text-gray-800" : "text-white"
        }`}
      >
        GigFlow
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Search
          onClick={() => setIsSearchBar((prev) => !prev)}
          className={`h-6 w-6 cursor-pointer ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        />

        <button
          onClick={() =>
            !isAuthenticated ? navigate("/state") : navigate("/dashboard")
          }
          className={`px-6 py-2.5 rounded-full transition ${
            isScrolled
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          {isAuthenticated ? <LayoutDashboard /> : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
