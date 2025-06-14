import router from "express"
import { createModelQuestion, getModelQuestions } from "../controllers/modelQuestion.controller.js";



const  modelQuestionRoute = router();

// Create a new model question
modelQuestionRoute.post('/createmodelquestion', createModelQuestion);
// Get model questions by category
modelQuestionRoute.post('/getmodelquestions', getModelQuestions);


export default modelQuestionRoute;