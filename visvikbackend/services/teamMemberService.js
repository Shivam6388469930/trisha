import teamMemberModel from "../models/teamMember.js";

export const addTeamMemberService = async (
  name,
  designation,
  department,
  imageUrl,
  imagePublicId
) => {
  const member = new teamMemberModel({
    name,
    designation,
    department, // NEW
    image: imageUrl,
    imagePublicId,
  });
  return await member.save();
};

export const getAllTeamMembersService = async () => {
  return await teamMemberModel.find().sort({ createdAt: -1 });
};

export const getTeamMemberByIdService = async (id) => {
  return await teamMemberModel.findById(id);
};

export const updateTeamMemberService = async (id, updates) => {
  return await teamMemberModel.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteTeamMemberService = async (id) => {
  return await teamMemberModel.findByIdAndDelete(id);
};
