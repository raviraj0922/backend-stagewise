import mongoose from "mongoose";

const StageSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  stageNumber: {
    type: Number,
    required: true,
  },
  data: {
    type: Object, // Flexible to store stage-specific data
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Stage = mongoose.model("Stage", StageSchema);

export default Stage;
