import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useAuth from "../hooks/useAuth";
import api from "../config/api";
import toast from "react-hot-toast";

const Gigs = ({ isSearchBar, onDashboard }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gigList, setGigList] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch gigs
  useEffect(() => {
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
        toast.error(err.response?.data?.message || "Failed to load gigs");
      }
    };

    getGigs();
  }, [onDashboard]);

  const filteredGigs = useMemo(() => {
    return gigList.filter((gig) =>
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig._id.slice(-5).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gigList, searchTerm]);

  return (
    <div className="flex flex-col m-4">
      <div className="flex items-center justify-between mb-4">
        {isSearchBar && (
          <input
            type="text"
            placeholder="Search your gigs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-red-400"
          />
        )}

        {user && onDashboard && (
          <button
            onClick={() => navigate("gigs/create")}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 font-medium text-sm rounded-xl cursor-pointer transition hover:bg-red-50 hover:border-red-600 active:scale-95"
          >
            <Plus size={18} />
            Create a New Gig
          </button>
        )}
      </div>

      {filteredGigs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No gigs found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white p-4 rounded-lg border flex flex-col justify-between"
            >
              <div>
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
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">
                  ID: {gig._id.slice(-5)}
                </span>

                <button
                  onClick={() =>
                    navigate(`/dashboard/gigs/${gig._id}`)
                  }
                  className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-700 active:scale-95"
                >
                  {user?._id === gig.ownerId
                    ? "Show Bids"
                    : "More Info"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gigs;
