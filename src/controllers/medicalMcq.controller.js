import { getMCQModel } from '../models/mcq.model.js';
import { apierror } from '../utils/apiError.js';
import { apiresponse } from '../utils/apiResponse.js';
import { asynchandler } from '../utils/asyncHandler.js';
// Create a new MCQ
const createMCQ = asynchandler(async (req, res) => {
  const { category, questions } = req.body;

  if (!category) {
    throw new apierror(400, "Category is required");
  }

  const MCQModel = getMCQModel(category);
  
  // Handle both single MCQ and array of MCQs
  const mcqsToCreate = Array.isArray(questions) ? questions : [req.body];
  
  const createdQuestions = await MCQModel.insertMany(mcqsToCreate);

  res.status(201).json(
    new apiresponse(201, createdQuestions, "MCQs created successfully")
  );
});
// Get all MCQs for a category
 const getMCQsByCategory = asynchandler(async (req, res) => {
  const { category } = req.body;
  if (!category) {
    throw new apierror(400, "Category is required");
  }
  const MCQModel = getMCQModel(category.toLowerCase());
  console.log(MCQModel.collection.name);

  const mcqs = await MCQModel.find();
  if (!mcqs || mcqs.length === 0) {
    throw new apierror(404, "No MCQs found for this category");
  }
  res
    .status(200)
    .json(new apiresponse(200, mcqs, "MCQs fetched successfully"));
});

// Update an MCQ
 const updateMCQ = asynchandler(async (req, res) => {
  const { category, id } = req.params;
  const MCQModel = getMCQModel(category);

  const updatedMCQ = await MCQModel.findByIdAndUpdate(id, req.body, { 
    new: true 
  });

  if (!updatedMCQ) {
    throw new apierror(404, "MCQ not found");
  }

  res
    .status(200)
    .json(new apiresponse(200, updatedMCQ, "MCQ updated successfully"));
});

// Delete an MCQ
 const deleteMCQ = asynchandler(async (req, res) => {
  const { category, id } = req.params;
  const MCQModel = getMCQModel(category);

  const deletedMCQ = await MCQModel.findByIdAndDelete(id);

  if (!deletedMCQ) {
    throw new apierror(404, "MCQ not found");
  }

  res
    .status(200)
    .json(new apiresponse(200, {}, "MCQ deleted successfully"));
});

export {
  createMCQ,
  getMCQsByCategory,
  updateMCQ,
  deleteMCQ
};