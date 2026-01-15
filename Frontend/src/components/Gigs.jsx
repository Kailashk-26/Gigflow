import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuth from "../hooks/useAuth";
import api from "../config/api";
import toast from "react-hot-toast";

const Gigs = ({ isSearchBar,onDashboard }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const {user}=useAuth();
  const [gigList, setGigList] = useState([]);

  useEffect(()=>{
    const getGigs = async () => {
      try {
        if (onDashboard) {
          const { data } = await api.get("/api/gigs/my-gigs", {
            withCredentials: true,
          });
          setGigList(data);
        } else {
          const { data } = await api.get("/api/gigs/all");
          setGigList(data);
        }
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };
    getGigs();
  },[onDashboard])
  if (searchTerm) {
    setGigList(gigList.filter(g =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }
  
  return (
    <div className="flex flex-col m-4">
      {/* Search bar */}
      <div className="flex items-center justify-between mb-4">
        {isSearchBar && (
        <div>
          <input
            type="text"
            placeholder="Search your gigs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      )}
      {user && onDashboard &&
        <div onClick={()=>navigate('gigs/create')} 
        className=
          "flex gap-2 p-2 border-red-500 text-red-500 font-medium text-sm text-center rounded-xl cursor-pointer transition hover:bg-red-50 hover:border-red-600 active:scale-95"
        >
          <Plus/> Create a New Gig
        </div>
      }
      </div>
      
      {/* Gigs */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gigList.map(gig => (
          <div
            key={gig._id}
            className="bg-white p-4 rounded-lg border"
          >
            <h2 className="text-lg font-medium text-gray-800">
              {gig.title}
            </h2>

            <p
              className="mt-2 text-sm text-gray-600"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "4.5rem",
              }}
            >
              {gig.description}
            </p>

            <div className="flex justify-between items-center ">
              <span>ID: {gig._id.slice(-5)}</span>
              <button
                onClick={() => navigate(`/dashboard/gigs/${gig._id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {user?._id===gig.ownerId ?"Show Bids":"More Info"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
