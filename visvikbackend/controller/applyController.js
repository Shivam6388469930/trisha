import mongoose from "mongoose";
import jobModel from "../models/job.js";
import {
  addApplicationService,
  deleteApplicationService,
  getAllApplicationsService,
  getApplicationByIdService,
  updateApplicationService,
} from "../services/applyService.js";
import cloudinary from "../config/cloudinary.js";
import applyModel from "../models/applyModel.js";

const uploadPdfToCloudinary = async (localPath, folder) => {
  const res = await cloudinary.uploader.upload(localPath, {
    folder,
    resource_type: "raw",
    format: "pdf",
  });
  return { url: res.secure_url, public_id: res.public_id };
};

const destroyCloudinaryRaw = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
};

export const addApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      jobId,
      expectedSalary,
      experience,
      noticePeriod,
    } = req.body;

    if (
      !name ||
      !email ||
      !jobId ||
      !expectedSalary ||
      !experience ||
      !noticePeriod
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // ✅ Validate jobId exists in jobModel
    const jobExists = await jobModel.findOne({ jobId });
    if (!jobExists) {
      return res.status(404).json({ success: false, message: "Invalid jobId" });
    }

    if (!req.files?.resume?.[0]) {
      return res.status(400).json({
        success: false,
        message: "Resume (PDF) is required",
      });
    }

    const uploadedResume = await uploadPdfToCloudinary(
      req.files.resume[0].path,
      "resumes"
    );

    let uploadedAdditional = null;
    if (req.files?.additionalDocument?.[0]) {
      uploadedAdditional = await uploadPdfToCloudinary(
        req.files.additionalDocument[0].path,
        "documents"
      );
    }

    const application = await addApplicationService({
      name,
      email,
      phone,
      jobId, // <-- store string jobId
      expectedSalary,
      experience,
      noticePeriod,
      resume: uploadedResume.url,
      resumePublicId: uploadedResume.public_id,
      additionalDocument: uploadedAdditional?.url || null,
      additionalDocumentPublicId: uploadedAdditional?.public_id || null,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error(error);
    const message = error?.message?.includes("Only PDF files are allowed")
      ? "Only PDF files are allowed"
      : "Error submitting application";
    res.status(500).json({ success: false, message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const { jobId, status } = req.query;
    const applications = await getAllApplicationsService({ jobId, status });
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching applications" });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await getApplicationByIdService(req.params.id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching application" });
  }
};
export const updateApplication = async (req, res) => {
  try {
    const existing = await getApplicationByIdService(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    const updates = { ...req.body };

    // If new resume uploaded, delete old then upload new
    if (req.files?.resume?.[0]) {
      if (existing.resumePublicId) {
        await destroyCloudinaryRaw(existing.resumePublicId);
      }
      const newResume = await uploadPdfToCloudinary(
        req.files.resume[0].path,
        "resumes"
      );
      updates.resume = newResume.url;
      updates.resumePublicId = newResume.public_id;
    }

    // If new additional doc uploaded, delete old then upload new
    if (req.files?.additionalDocument?.[0]) {
      if (existing.additionalDocumentPublicId) {
        await destroyCloudinaryRaw(existing.additionalDocumentPublicId);
      }
      const newDoc = await uploadPdfToCloudinary(
        req.files.additionalDocument[0].path,
        "documents"
      );
      updates.additionalDocument = newDoc.url;
      updates.additionalDocumentPublicId = newDoc.public_id;
    }

    const application = await updateApplicationService(req.params.id, updates);
    res.json({ success: true, data: application });
  } catch (error) {
    console.error(error);
    const message = error?.message?.includes("Only PDF files are allowed")
      ? "Only PDF files are allowed"
      : "Error updating application";
    res.status(500).json({ success: false, message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const existing = await getApplicationByIdService(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    // Delete any stored files first (using resource_type: 'raw')
    await Promise.all([
      destroyCloudinaryRaw(existing.resumePublicId),
      destroyCloudinaryRaw(existing.additionalDocumentPublicId),
    ]);

    await deleteApplicationService(req.params.id);

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting application" });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    //added by shahanshah
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid application ID" });
    }
    //only yahi thak kiya
    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Interview Scheduled",
      "Rejected",
      "Hired",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }

    const updatedApp = await applyModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, data: updatedApp });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating application status" });
  }
};

