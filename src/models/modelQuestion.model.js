import mongoose from 'mongoose';
import { secondaryDB } from '../db/connection.js';

const modelSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true, 
    trim: true 
  },
  
  content: { 
    type: [String], 
    required: true,
  },
  category: { 
    type: String, 
    required: true
  },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Helper function to dynamically get/create a model for a category
export const ModelQuestion = (category) => {
  const collectionName = `${category.toLowerCase()}`;

  return secondaryDB.model('MODEL QUESTIONS', modelSchema, collectionName);
};