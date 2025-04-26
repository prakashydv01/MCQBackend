import router from 'express'
import { createMCQ } from '../controllers/medicalMcq.controller.js';
import {getMCQsByCategory,updateMCQ, deleteMCQ} from '../controllers/medicalMcq.controller.js';

const medicalMcqRouter = router();

// Create a new MCQ
medicalMcqRouter.post('/createmcqs', createMCQ);
medicalMcqRouter.post('/getmcqs', getMCQsByCategory);


export default medicalMcqRouter;