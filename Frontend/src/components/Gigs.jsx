import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gigs } from "../constant";
import { Plus } from "lucide-react";

const Gigs = ({ isSearchBar, OwnGigsId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  let gigList = OwnGigsId
    ? gigs.filter(g => g.ownerId === OwnGigsId)
    : gigs;

  if (searchTerm) {
    gigList = gigList.filter(g =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
      {OwnGigsId && 
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
            key={gig.id}
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
              <span>ID: {gig.id}</span>
              <button
                onClick={() => navigate(`/dashboard/gigs/${gig.id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                {OwnGigsId?"Show Bids":"More Info"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
