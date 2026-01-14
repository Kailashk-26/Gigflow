import Gig from "../models/gig.js";

// /api/gigs/create
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({
        message: "Title, description and budget are required",
      });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json({
      message: "Gig created successfully",
      gig,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Failed to create gig",
    });
  }
};

// /api/gigs/all
export const getAllOpenGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ status: "open" })
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch gigs",
    });
  }
};

// /api/gigs/my-gigs
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({
      ownerId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch your gigs",
    });
  }
};

// /api/gigs/:gigId
export const getGigById = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId).populate(
      "ownerId",
      "name email"
    );

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found",
      });
    }

    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch gig details",
    });
  }
};
