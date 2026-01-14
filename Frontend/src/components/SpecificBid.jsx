import { useNavigate, useParams } from "react-router-dom";
import { bids, gigs } from "../constant";

const BidListModal = () => {
  const navigate = useNavigate();
  const {gigId}=useParams()
  const specificBidList=bids.filter((bid)=>bid.gigId===gigId)
  const gig=gigs.find((g)=>g.id===gigId)


  const handleHire = (bidId) => {
    console.log("Hire bid:", bidId);

    // 1. update bid status -> hired
    // 2. update gig status -> assigned
    // 3. reject other bids
  };

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Bids
        </h2>

        {gig && (
          <p className="text-sm text-gray-500 mb-6">
            {gig.title}
          </p>
        )}

        {specificBidList.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Nobody bid yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {specificBidList.map((bid) => (
              <div
                key={bid.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3"
              >
                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Bid
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bid.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : bid.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {bid.status.toUpperCase()}
                  </span>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">
                    Message:
                  </span>{" "}
                  {bid.message}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Bid ID: {bid.id}
                  </span>

                  {bid.status === "pending" && (
                    <button
                      onClick={()=>handleHire(bid.id)}
                      className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 active:scale-95"
                    >
                      Hire
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BidListModal;
