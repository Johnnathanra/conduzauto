const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
      required: true,
    },
    courseLesson: {
      type: String,
      required: true,
      description: 'Nome da aula/lição avaliada',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    concept: {
      type: String,
      enum: ['Excelente', 'Bom', 'Satisfatório', 'Insuficiente'],
      required: true,
    },
    feedback: {
      type: String,
      default: '',
    },
    improvementSuggestions: {
      type: String,
      default: '',
    },
    evaluatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evaluation', EvaluationSchema);