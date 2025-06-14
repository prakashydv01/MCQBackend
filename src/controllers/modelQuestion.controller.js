import { apierror } from "../utils/apiError.js";
import { apiresponse } from "../utils/apiResponse.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ModelQuestion } from "../models/modelQuestion.model.js";

// Create a new model question
const createModelQuestion = asynchandler(async (req, res) => {
  const { category, title, content } = req.body;

  if (!category || !title || !content) {
    throw new apierror(400, "Category, title, and content are required");
  }

  const ModelQuestionModel = ModelQuestion(category);

  const modelTocreate = Array.isArray(content) ? content : [req.body];

const createdQuestions = await ModelQuestionModel.insertMany(modelTocreate);

  res.status(201).json(
    new apiresponse(201, createdQuestions, "Model question created successfully")
  );
});

const getModelQuestions = asynchandler(async (req, res) => {
  console.log("Request body:", req.body);
  const { category } = req.body;

  if (!category) {
    throw new apierror(400, "Category is required");
  }

  const ModelQuestionModel = ModelQuestion(category.toLowerCase());

  const questions = await ModelQuestionModel.find({});
  if (!questions || questions.length === 0) {
    throw new apierror(404, "No model questions found for this category");
  }

  res.status(200).json(
    new apiresponse(200, questions, "Model questions retrieved successfully")
  );
});


export { 
  createModelQuestion ,
  getModelQuestions
};
