import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import useAuth from "../hooks/useAuth";

const GigDetail = () => {
  const navigate = useNavigate();
  const { gigId } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await api.get(`/api/gigs/${gigId}`);
        setGig(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch gig");
      }
    };

    fetchGig();
  }, [gigId]);

  if (!gig) return null;

  const ownerId =
    typeof gig.ownerId === "object"
      ? gig.ownerId._id
      : gig.ownerId;

  const isOwner = ownerId === user?._id;

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Gig Info */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {gig.title}
        </h2>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          Created By {gig.ownerId.name}
        </h3>

        <p className="text-gray-600 mb-4">{gig.description}</p>

        <div className="flex justify-between items-center mb-6">
          <p className="text-lg font-medium text-gray-800">
            ₹ {gig.budget}
          </p>
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            {gig.status}
          </span>
        </div>

        {/* ACTION SECTION */}
        <div className="mt-6">
          {isOwner ? (
            gig.status === "open" ? (
              <button
                onClick={() =>
                  navigate(`/dashboard/bids/${gig._id}`)
                }
                className="w-full border border-red-500 text-red-600 py-2.5 rounded-xl"
              >
                Show Bids
              </button>
            ) : (
              <div className="w-full text-center py-3 rounded-xl border font-semibold text-gray-600">
                Assigned
              </div>
            )
          ) : (
            <button
              onClick={() =>
                navigate(`/dashboard/bids/${gig._id}/place`)
              }
              className="w-full bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600"
            >
              Place Bid
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
