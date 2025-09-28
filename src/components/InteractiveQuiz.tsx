"use client";

import { useState, useEffect } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in' | 'equation';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  onComplete?: (score: number, total: number) => void;
}

export default function InteractiveQuiz({ questions, title, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | number)[]>(new Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [fillInAnswer, setFillInAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleAnswerSelect = (answer: string | number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    setSelectedOption(answer.toString());
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
      setFillInAnswer('');
      setShowExplanation(false);
    } else {
      // Quiz completed
      setShowResults(true);
      const score = answers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption('');
      setFillInAnswer('');
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(''));
    setShowResults(false);
    setSelectedOption('');
    setFillInAnswer('');
    setShowExplanation(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = answers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 glow-border">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6 glow-text">Quiz Complete!</h3>
          
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, questions.length)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor(score, questions.length)}`}>
              {percentage}%
            </div>
          </div>

          <div className="mb-6">
            {percentage >= 80 && (
              <div className="text-green-400 text-xl mb-2">🎉 Excellent work!</div>
            )}
            {percentage >= 60 && percentage < 80 && (
              <div className="text-yellow-400 text-xl mb-2">👍 Good job!</div>
            )}
            {percentage < 60 && (
              <div className="text-red-400 text-xl mb-2">📚 Keep practicing!</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {questions.map((q, index) => (
              <div key={q.id} className={`p-4 rounded-lg ${
                answers[index] === q.correctAnswer 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Question {index + 1}</span>
                  <span className={`text-2xl ${
                    answers[index] === q.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {answers[index] === q.correctAnswer ? '✓' : '✗'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{q.question}</p>
                <p className="text-gray-400 text-xs">
                  Your answer: <span className="text-white">{answers[index]}</span>
                </p>
                <p className="text-gray-400 text-xs">
                  Correct answer: <span className="text-green-400">{q.correctAnswer}</span>
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="btn-glow bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 glow-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white glow-text">{title}</h3>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-gray-400">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-xl text-white mb-4">{question.question}</h4>
        
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                  selectedOption === option
                    ? 'bg-blue-600 border-2 border-blue-400 text-white'
                    : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                }`}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-3">
            <button
              onClick={() => handleAnswerSelect(true)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                selectedOption === 'true'
                  ? 'bg-blue-600 border-2 border-blue-400 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              True
            </button>
            <button
              onClick={() => handleAnswerSelect(false)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                selectedOption === 'false'
                  ? 'bg-blue-600 border-2 border-blue-400 text-white'
                  : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
              }`}
            >
              False
            </button>
          </div>
        )}

        {question.type === 'fill-in' && (
          <div>
            <input
              type="text"
              value={fillInAnswer}
              onChange={(e) => {
                setFillInAnswer(e.target.value);
                handleAnswerSelect(e.target.value);
              }}
              className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your answer..."
            />
          </div>
        )}

        {question.type === 'equation' && (
          <div>
            <input
              type="text"
              value={fillInAnswer}
              onChange={(e) => {
                setFillInAnswer(e.target.value);
                handleAnswerSelect(e.target.value);
              }}
              className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="Enter your equation (e.g., x = 5)"
            />
          </div>
        )}
      </div>

      {/* Explanation */}
      {answers[currentQuestion] && (
        <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-blue-400 font-semibold mb-2 hover:text-blue-300 transition-colors"
          >
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </button>
          {showExplanation && (
            <p className="text-gray-300">{question.explanation}</p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isFirstQuestion
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-500 hover:scale-105'
          }`}
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !answers[currentQuestion]
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : isLastQuestion
                ? 'bg-green-600 text-white hover:bg-green-500 hover:scale-105'
                : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105'
          }`}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
