import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";

const Bids = ({ isSearchBar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bidList,setBidList]=useState([])

  useEffect(()=>{
    const fetchBids=async()=>{
      try{
        const {data}=await api.get("/api/bids/my-gigs",{withCredentials:true})
        setBidList(data)
      }catch(err){
        toast.error(err.response?.data?.message)
      }
    }
    fetchBids();
  },[])

  if (isSearchBar && searchTerm) {
    setBidList(bidList.filter(
      (bid) =>
        bid.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.status.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }

  return (
    <div>
      {/* Search */}
      {isSearchBar && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search your bids..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      )}

      {/* Bids List */}
      {bidList.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven't applied to any gigs yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bidList.map((bid) => (
            <div
              key={bid.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {bid.gigId.title}
              </h3>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Message:</span> {bid.message}
              </p>

              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-gray-500">Bid ID: {bid._id.slice(-5)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    bid.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : bid.status === "hired"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {bid.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bids;
