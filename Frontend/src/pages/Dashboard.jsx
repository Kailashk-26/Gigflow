import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Outlet, useNavigate} from "react-router-dom";
import Gigs from "../components/Gigs";
import Bids from "../components/Bids";
import toast from "react-hot-toast";
import api from "../config/api";

const Dashboard = () => {
  const [tab, setTab] = useState("Gigs");
  const [showGigSearch, setShowGigSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate=useNavigate();

  const handleLogout=async()=>{
    try{
      const {data}=await api.post('/api/users/logout',{},{withCredentials:true})
      toast.success(data.message)
      navigate('/')
    }catch(err){
      toast.error(err.response?.data?.message)
    }
  }
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-20 flex justify-between px-4 md:px-8 transition ${
          isScrolled
            ? "bg-white/80 backdrop-blur shadow-md py-3"
            : "bg-red-500 py-5"
        }`}
      >
        <p className={`text-2xl font-semibold ${isScrolled ? "text-gray-800" : "text-white"}`}>
          Dashboard
        </p>

        <div className="flex items-center gap-4">
            <Search
              onClick={() => setShowGigSearch(prev => !prev)}
              className={`cursor-pointer ${isScrolled ? "text-gray-700" : "text-white"}`}
            />
          <button
            onClick={() => handleLogout()}
            className={`px-6 py-2 rounded-full ${
              isScrolled ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tabs */}
      <div className="flex bg-gray-500/5 text-lg">
        {["Gigs", "Bids"].map(item => (
          <label key={item} className="flex-1">
            <input
              type="radio"
              className="hidden peer"
              checked={tab === item}
              onChange={() => setTab(item)}
            />
            <span className="block text-center py-3 border border-gray-300 text-gray-500 peer-checked:bg-white peer-checked:text-red-600 peer-checked:border-b-red-500">
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === "Gigs" ? (
          <Gigs isSearchBar={showGigSearch} onDashboard={true} />
        ) : (
          <Bids isSearchBar={showGigSearch} OwnBidId="u3"/>
        )}
      </div>
      <Outlet/>
    </div>
  );
};

export default Dashboard;
