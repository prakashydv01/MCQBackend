import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema({
  question: { 
    type: String,
    required: true, 
    trim: true 
  },
  
  options: { 
    type: [String], 
    required: true,
    validate: {
      validator: options => options.length === 4,
      message: 'There must be exactly 4 options'
    }
  },
  correctAnswer: { 
    type: String, 
    required: true,
    validate: {
      validator: function(correctAnswer) {
        return this.options.includes(correctAnswer);
      },
      message: 'Correct answer must be one of the options'
    }
  },
  category: { 
    type: String, 
    required: true,
    
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Medium' 
  },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Helper function to dynamically get/create a model for a category
export const getMCQModel = (category) => {
  const collectionName = `${category.toLowerCase()}`;

  return mongoose.model('MCQ', mcqSchema, collectionName);
};