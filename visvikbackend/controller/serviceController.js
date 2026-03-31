
// import Service from "../models/services.js"; // Fixed name
// import cloudinary from "../config/cloudinary.js";

// // Helper: Delete image from Cloudinary
// const deleteFromCloudinary = async (publicId) => {
//   if (!publicId) return;
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     if (result.result !== "ok" && result.result !== "not found") {
//       console.warn("Cloudinary delete failed:", result);
//     }
//   } catch (err) {
//     console.error("Cloudinary delete error:", err);
//   }
// };

// // GET all services
// export const getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       count: services.length,
//       services,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // CREATE new service
// export const createService = async (req, res) => {
//   try {
//     const {
//       title, category, description, price, icon = "Tool",
//       accentColor = "#00a8ff", timeline, revisions,
//       features, technologies
//     } = req.body;

//     let image = null;
//     let imagePublicId = null;

//     if (req.file) {
//       image = req.file.path;           // Cloudinary URL
//       imagePublicId = req.file.filename; // public_id
//     }

//     const newService = await Service.create({
//       title,
//       category,
//       description,
//       price: Number(price),
//       icon,
//       accentColor,
//       timeline,
//       revisions: Number(revisions),
//       features: features ? JSON.parse(features) : [],
//       technologies: technologies ? JSON.parse(technologies) : [],
//       image,
//       imagePublicId,
//     });

//     res.status(201).json({
//       success: true,
//       service: newService,
//     });
//   } catch (error) {
//     console.error("Create Service Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // UPDATE service
// export const updateService = async (req, res) => {
//   try {
//     const updates = { ...req.body };

//     if (updates.features) updates.features = JSON.parse(updates.features);
//     if (updates.technologies) updates.technologies = JSON.parse(updates.technologies);

//     // Handle image update
//     if (req.file) {
//       // Delete old image
//       const oldService = await Service.findById(req.params.id);
//       if (oldService?.imagePublicId) {
//         await deleteFromCloudinary(oldService.imagePublicId);
//       }

//       updates.image = req.file.path;
//       updates.imagePublicId = req.file.filename;
//     }

//     const service = await Service.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//       runValidators: true,
//     });

//     if (!service) {
//       return res.status(404).json({ success: false, message: "Service not found" });
//     }

//     res.status(200).json({ success: true, service });
//   } catch (error) {
//     console.error("Update Service Error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // DELETE service
// export const deleteService = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ success: false, message: "Service not found" });
//     }

//     // Delete image from Cloudinary
//     if (service.imagePublicId) {
//       await deleteFromCloudinary(service.imagePublicId);
//     }

//     await service.deleteOne();

//     res.status(200).json({ success: true, message: "Service deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // controllers/serviceController.js

// export const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     // Cloudinary already returns full URL → no need to modify
//     // Just return clean service object
//     res.status(200).json({
//       success: true,
//       service,
//     });
//   } catch (error) {
//     console.error("Get Service By ID Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };



// controllers/serviceController.js
import Service from "../models/services.js";
import cloudinary from "../config/cloudinary.js";

// Helper: Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok" && result.result !== "not found") {
      console.warn("Cloudinary delete failed:", result);
    }
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};

// GET all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// CREATE new service
export const createService = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      price,
     
      timeline,
      revisions,
      features,
      technologies,
    } = req.body;

    let image = null;
    let imagePublicId = null;

    // Upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      image = result.secure_url;
      imagePublicId = result.public_id;
    }

    const newService = await Service.create({
      title,
      category,
      description,
      price: Number(price),
      timeline,
      revisions: Number(revisions),
      features: features ? JSON.parse(features) : [],
      technologies: technologies ? JSON.parse(technologies) : [],
      image,
      imagePublicId,
    });

    res.status(201).json({
      success: true,
      service: newService,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE service
export const updateService = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.features) updates.features = JSON.parse(updates.features);
    if (updates.technologies) updates.technologies = JSON.parse(updates.technologies);

    // Handle image update
    if (req.file) {
      // Delete old image
      const oldService = await Service.findById(req.params.id);
      if (oldService?.imagePublicId) {
        await deleteFromCloudinary(oldService.imagePublicId);
      }

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "services",
      });
      updates.image = result.secure_url;
      updates.imagePublicId = result.public_id;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    // Delete image from Cloudinary
    if (service.imagePublicId) {
      await deleteFromCloudinary(service.imagePublicId);
    }

    await service.deleteOne();

    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
