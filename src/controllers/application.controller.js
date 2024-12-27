import Application from "../models/application.model.js";

export const createApplication = async (req, res) => {
  const { userId } = req.user; // Authenticated user's ID from JWT
  try {
    const existingApplication = await Application.findOne({ userId });
    if (existingApplication) {
      return res.status(400).json({ message: "Application already exists" });
    }

    const newApplication = new Application({ userId });
    await newApplication.save();

    res.status(201).json({ message: "Application created successfully", application: newApplication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplication = async (req, res) => {
  const { userId } = req.user;
  try {
    const application = await Application.findOne({ userId });
    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body; // New status: "Pending", "Accepted", or "Rejected"
  const { userId } = req.user;

  try {
    const application = await Application.findOneAndUpdate(
      { userId },
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    res.status(200).json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
