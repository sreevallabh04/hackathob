import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { chapters } from '../data/chapters';

function ChapterSelection() {
  const navigate = useNavigate();
  const { classId, subject } = useParams();

  const subjectChapters = chapters[subject as keyof typeof chapters]?.[Number(classId)] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Select Chapter</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectChapters.map((chapter, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/class/${classId}/${subject}/${index + 1}`)}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4">
              <BookOpen className="w-6 h-6 flex-shrink-0" />
              <div>
                <span className="text-sm text-purple-300">Chapter {index + 1}</span>
                <h3 className="text-lg font-semibold">{chapter.title}</h3>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default ChapterSelection;