import getInTouchModel from "../models/getInTouch.js";

export const createGetInTouch = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      companyName,
      country,
      category,
      budget,
      message,
    } = req.body;

    // Required field check
    if (!firstName || !email || !mobileNumber || !companyName || !country || !category || !budget) {
      return res.status(400).json({ success: false, msg: "Required fields missing" });
    }

    const entry = new getInTouchModel({
      firstName,
      lastName,
      email,
      mobileNumber,
      companyName,
      country,
      category,
      budget,
      message,
    });

    await entry.save();
    res.status(201).json({ success: true, msg: "Form submitted successfully", data: entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to submit form" });
  }
};

export const getGetInTouchEntries = async (req, res) => {
  try {
    const entries = await getInTouchModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to fetch entries" });
  }
};

export const deleteGetInTouchEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "No ID provided" });
    }

    const deleted = await getInTouchModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Entry not found" });
    }

    res.status(200).json({ success: true, msg: "Entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to delete entry" });
  }
};
