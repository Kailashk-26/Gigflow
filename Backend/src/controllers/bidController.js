import Bid from "../models/bid.js";
import Gig from "../models/gig.js";

export const placeBid = async (req, res) => {
  try {
    const { gigId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Bid message is required",
      });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({
        message: "This gig is already assigned",
      });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(403).json({
        message: "You cannot bid on your own gig",
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
    });

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "You have already placed a bid for this gig",
      });
    }

    res.status(500).json({
      message: "Failed to place bid",
    });
  }
};

export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      freelancerId: req.user._id,
    })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch your bids",
    });
  }
};

export const getBidsForMyGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to view bids for this gig",
      });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bids",
    });
  }
};

export const hireBidder = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);

    if (!bid) {
      return res.status(404).json({
        message: "Bid not found",
      });
    }

    const gig = await Gig.findById(bid.gigId);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to hire for this gig",
      });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({
        message: "This gig is already assigned",
      });
    }

    bid.status = "hired";
    await bid.save();

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    gig.status = "assigned";
    await gig.save();

    res.status(200).json({
      message: "Freelancer hired successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to hire bidder",
    });
  }
};
