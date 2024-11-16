import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { chapters } from '../data/chapters';

function Quiz() {
  const { classId, subject, chapter } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const chapterData = chapters[subject as keyof typeof chapters]?.[Number(classId)]?.[Number(chapter) - 1];
  const questions = chapterData?.questions || [];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-purple-300">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-purple-300">Score: {score}</span>
        </div>

        <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion]?.question}</h3>

        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {questions[currentQuestion]?.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedAnswer === option
                    ? option === questions[currentQuestion].correct
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer === option && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      {option === questions[currentQuestion].correct ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default Quiz;