import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSimulados } from '../contexts/SimuladosContext';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';

export const SimuladoPlayer = ({ simulado, onBack }) => {
  const { isDark } = useTheme();
  const { simuladoQuestions } = useSimulados();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(simulado.timeLimit * 60);
  const [finished, setFinished] = useState(false);

  const questions = simuladoQuestions[simulado.id] || [];

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || finished) {
      setShowResults(true);
      setFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  const handleAnswerSelect = (optionIndex) => {
    if (!finished) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestion]: optionIndex
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      setFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!questions.length) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Simulado não disponível</p>
      </div>
    );
  }

  const score = calculateScore();
  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isAnswered = selectedAnswer !== undefined;

  if (showResults) {
    const passed = score >= 70;

    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`rounded-2xl max-w-2xl w-full p-12 text-center ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-2xl`}>
          
          {/* Result Icon */}
          <div className="mb-6">
            {passed ? (
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100">
                <XCircle className="w-16 h-16 text-red-600" />
              </div>
            )}
          </div>

          {/* Result Title */}
          <h2 className={`text-3xl font-bold mb-2 ${
            passed
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {passed ? 'Parabéns! 🎉' : 'Tente Novamente'}
          </h2>

          {/* Score */}
          <div className="mb-6">
            <p className={`text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {score}%
            </p>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Você acertou {Object.values(selectedAnswers).filter((ans, idx) => ans === questions[idx].correct).length} de {questions.length} questões
            </p>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 gap-4 mb-8 p-4 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Acertos</p>
              <p className="text-2xl font-bold text-green-600">
                {Object.values(selectedAnswers).filter((ans, idx) => ans === questions[idx].correct).length}
              </p>
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Erros</p>
              <p className="text-2xl font-bold text-red-600">
                {questions.length - Object.values(selectedAnswers).filter((ans, idx) => ans === questions[idx].correct).length}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Voltar
            </button>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setShowResults(false);
                setFinished(false);
                setTimeLeft(simulado.timeLimit * 60);
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              Repetir Simulado
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 font-bold transition-colors ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="text-center">
            <h2 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {simulado.name}
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Questão {currentQuestion + 1} de {questions.length}
            </p>
          </div>

          <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg ${
            timeLeft < 60
              ? 'bg-red-100 text-red-700'
              : isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`h-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Question */}
        <div className={`rounded-xl p-8 mb-8 ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}>
          
          {/* Question Text */}
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {question.question}
          </h3>

          {/* Question Image */}
          {question.image && (
            <div className="text-6xl text-center mb-6">
              {question.image}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={finished}
                className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                  selectedAnswer === index
                    ? 'border-2 border-orange-500 bg-orange-50 dark:bg-gray-700'
                    : isDark
                    ? 'border-2 border-gray-600 bg-gray-700 hover:border-orange-500'
                    : 'border-2 border-gray-200 bg-gray-50 hover:border-orange-500'
                } ${finished && index === question.correct ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : ''} ${
                  finished && selectedAnswer === index && index !== question.correct ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation (after answer selected) */}
          {isAnswered && finished === false && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswer === question.correct
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-orange-100 text-orange-700 border border-orange-300'
            }`}>
              <p className="font-medium mb-2">
                {selectedAnswer === question.correct ? '✓ Correto!' : 'Resposta:'}
              </p>
              <p>{question.explanation}</p>
            </div>
          )}

          {/* Explanation (finished) */}
          {finished && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswer === question.correct
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              <p className="font-medium mb-2">
                {selectedAnswer === question.correct ? '✓ Você acertou!' : '✗ Resposta incorreta'}
              </p>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors ${
              currentQuestion === 0
                ? isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            ← Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-colors ${
              !isAnswered
                ? isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  );
};