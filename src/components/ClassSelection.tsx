import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const classes = [6, 7, 8, 9, 10];

function ClassSelection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Select Your Class</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((classNum) => (
          <motion.button
            key={classNum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/class/${classNum}`)}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <BookOpen className="w-8 h-8" />
              <span className="text-xl font-semibold">Class {classNum}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default ClassSelection;