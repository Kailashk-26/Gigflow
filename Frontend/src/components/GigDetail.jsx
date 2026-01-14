import { useNavigate, useParams} from "react-router-dom";
import { gigs,bids} from '../constant'

const GigDetail = ({currentUserId }) => {
  const navigate = useNavigate();

  const { gigId } = useParams();

  const gig= gigs.find((g)=>g.id===gigId)

  const isCreator = gig.ownerId === currentUserId;

  const myBid = bids.find(
    (bid) =>
      bid.gigId === gig.id &&
      bid.freelancerId === currentUserId
  );

  return (
    <div onClick={()=>navigate(-1)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Gig Info */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {gig.title}
        </h2>

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
          {/* Creator View */}
          {isCreator && (
            <button
              onClick={() => navigate(`/dashboard/bids/${gig.id}`)}
              className="w-full border border-red-500 text-red-600 py-2.5 rounded-xl"
            >
              View Bids
            </button>
          )}

          {/* Freelancer View */}
          {!isCreator && !myBid && (
            <button
              onClick={() => navigate(`/dashboard/gigs/${gig.id}/place-bid`)}
              className="w-full bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600"
            >
              Place Bid
            </button>
          )}

          {/* Already Placed Bid */}
          {!isCreator && myBid && (
            <div className="w-full text-center py-3 rounded-xl border">
              <p className="text-sm text-gray-500 mb-1">Your Bid Status</p>
              <p
                className={`font-semibold ${
                  myBid.status === "pending"
                    ? "text-yellow-600"
                    : myBid.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {myBid.status.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigDetail;
