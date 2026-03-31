// controllers/teamMemberController.js
import cloudinary from "../config/cloudinary.js";
import teamMemberModel from "../models/teamMember.js";
import {
  addTeamMemberService,
  getAllTeamMembersService,
  getTeamMemberByIdService,
  updateTeamMemberService,
  deleteTeamMemberService,
} from "../services/teamMemberService.js";

export const addTeamMember = async (req, res) => {
  try {
    const { name, designation, department } = req.body;
    let imageUrl = "";
    let imagePublicId = "";

    if (!name || !designation || !department) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const departmentEnum = teamMemberModel.schema.path("department").enumValues;
    if (!departmentEnum.includes(department)) {
      return res.status(400).json({ msg: "Invalid department" });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "team_members",
      });
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const member = await addTeamMemberService(
      name,
      designation,
      department, // NEW
      imageUrl,
      imagePublicId
    );

    res.status(201).json({ success: true, data: member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding member" });
  }
};

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await getAllTeamMembersService();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching members" });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const member = await getTeamMemberByIdService(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching member" });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const existingMember = await getTeamMemberByIdService(req.params.id);
    if (!existingMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    let updates = { ...req.body }; // department can be updated here automatically

    if (updates.department) {
      const departmentEnum =
        teamMemberModel.schema.path("department").enumValues;
      if (!departmentEnum.includes(updates.department)) {
        return res.status(400).json({ msg: "Invalid department" });
      }
    }

    if (req.file) {
      if (existingMember.imagePublicId) {
        try {
          const destroyResult = await cloudinary.uploader.destroy(
            existingMember.imagePublicId
          );
          if (destroyResult.result !== "ok") {
            console.warn(`Cloudinary deletion failed:`, destroyResult);
          }
        } catch (err) {
          console.error("Cloudinary deletion error:", err);
        }
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "team_members",
      });

      updates.image = result.secure_url;
      updates.imagePublicId = result.public_id;
    }

    const member = await updateTeamMemberService(req.params.id, updates);
    res.json({ success: true, data: member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating member" });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await getTeamMemberByIdService(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });

    if (member.imagePublicId) {
      await cloudinary.uploader.destroy(member.imagePublicId);
    }

    await deleteTeamMemberService(req.params.id);

    res.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting member" });
  }
};
