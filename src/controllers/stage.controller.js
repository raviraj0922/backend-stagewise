import Stage from "../models/stages.model.js";
import Application from "../models/application.model.js";
import Cloudinary from "../utils/cloudinary.js";

// Admin: Get all stages
export const getAllStages = async (req, res) => {
  try {
    const stages = await Stage.find();
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update a specific stage
export const updateStage = async (req, res) => {
  const { stageId } = req.params;
  const { data } = req.body;

  try {
    const stage = await Stage.findByIdAndUpdate(
      stageId,
      { data },
      { new: true }
    );

    if (!stage) return res.status(404).json({ message: "Stage not found" });

    res.status(200).json({ message: "Stage updated successfully", stage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete a specific stage
export const deleteStage = async (req, res) => {
  const { stageId } = req.params;

  try {
    const stage = await Stage.findByIdAndDelete(stageId);

    if (!stage) return res.status(404).json({ message: "Stage not found" });

    res.status(200).json({ message: "Stage deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitStage = async (req, res) => {
  const { stageNumber, data } = req.body;
  const { userId } = req.user;

  try {
    // Get the user's application
    const application = await Application.findOne({ userId });
    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    // Ensure the stage is in sequence
    if (stageNumber !== application.stage) {
      return res.status(400).json({ message: `You must complete stage ${application.stage} first` });
    }

    // Handle file uploads (for stages requiring snapshots)
    let uploadedFile = null;
    if (req.file) {
      const uploadResult = await Cloudinary.uploader.upload(req.file.path);
      uploadedFile = uploadResult.secure_url;
    }

    // Create a new stage entry
    const stage = new Stage({
      applicationId: application._id,
      stageNumber,
      data: { ...data, uploadedFile },
    });

    await stage.save();

    // Update the application to move to the next stage
    application.stage += 1;
    application.updatedAt = Date.now();
    await application.save();

    res.status(201).json({ message: "Stage submitted successfully", stage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStageData = async (req, res) => {
  const { stageNumber } = req.params;
  const { userId } = req.user;

  try {
    // Get the user's application
    const application = await Application.findOne({ userId });
    if (!application) {
      return res.status(404).json({ message: "No application found" });
    }

    // Fetch the specific stage data
    const stage = await Stage.findOne({ applicationId: application._id, stageNumber });
    if (!stage) {
      return res.status(404).json({ message: `No data found for stage ${stageNumber}` });
    }

    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
