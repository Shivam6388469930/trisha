import queryModel from "../models/query.js";

export const createQuery = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    if (!name || !email || !phoneNumber || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "Required field missing" });
    }

    const query = new queryModel({
      name,
      email,
      phoneNumber,
      message,
    });

    await query.save();
    res
      .status(200)
      .json({ success: true, msg: "Query submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to post a query" });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await queryModel.find().sort({ createdAt: -1 });
    if (!queries.length) {
      return res.status(200).json({ success: true, queries: [] });
    }

    res.status(200).json({ success: true, queries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to fetch queries" });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res.status(400).json({ success: false, msg: "No ID found" });
    }
    await queryModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "Query Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Unable to delete query" });
  }
};
