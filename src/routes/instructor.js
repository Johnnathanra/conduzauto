const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const User = require('../models/User');
const Evaluation = require('../models/Evaluation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware de autenticação
const authenticateInstructor = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.instructorId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// Registrar Instrutor
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, specialty, bio } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não correspondem' });
    }

    const instructorExists = await Instructor.findOne({ email });
    if (instructorExists) {
      return res.status(400).json({ message: 'Instrutor já cadastrado' });
    }

    const instructor = new Instructor({
      name,
      email,
      password,
      specialty,
      bio,
    });

    await instructor.save();

    const token = jwt.sign(
      { id: instructor._id, email: instructor.email, role: 'instructor' },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    );

    res.status(201).json({
      message: 'Instrutor registrado com sucesso!',
      token,
      instructor: {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        specialty: instructor.specialty,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Instrutor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const instructor = await Instructor.findOne({ email }).select('+password');
    if (!instructor) {
      return res.status(404).json({ message: 'Instrutor não encontrado' });
    }

    const passwordMatch = await instructor.matchPassword(password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: instructor._id, email: instructor.email, role: 'instructor' },
      process.env.JWT_SECRET,
      { expiresIn: '72h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      instructor: {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        specialty: instructor.specialty,
        bio: instructor.bio,
        profileImage: instructor.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Listar todos os alunos
router.get('/students', authenticateInstructor, async (req, res) => {
  try {
    const students = await User.find().select('name email level totalXP');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter avaliações de um aluno específico
router.get('/student/:studentId/evaluations', authenticateInstructor, async (req, res) => {
  try {
    const { studentId } = req.params;
    const evaluations = await Evaluation.find({ student: studentId }).sort({ evaluatedAt: -1 });
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar avaliação
router.post('/evaluate', authenticateInstructor, async (req, res) => {
  try {
    const { studentId, courseLesson, rating, concept, feedback, improvementSuggestions } = req.body;

    const evaluation = new Evaluation({
      student: studentId,
      instructor: req.instructorId,
      courseLesson,
      rating,
      concept,
      feedback,
      improvementSuggestions,
    });

    await evaluation.save();

    res.status(201).json({
      message: 'Avaliação criada com sucesso!',
      evaluation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar avaliação
router.put('/evaluate/:evaluationId', authenticateInstructor, async (req, res) => {
  try {
    const { evaluationId } = req.params;
    const { rating, concept, feedback, improvementSuggestions } = req.body;

    const evaluation = await Evaluation.findByIdAndUpdate(
      evaluationId,
      { rating, concept, feedback, improvementSuggestions },
      { new: true }
    );

    res.status(200).json({
      message: 'Avaliação atualizada com sucesso!',
      evaluation,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter perfil do instrutor
router.get('/profile', authenticateInstructor, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.instructorId);
    res.status(200).json(instructor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;