import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, Microscope, GlobeIcon } from 'lucide-react';

const subjects = [
  { id: 'maths', name: 'Mathematics', icon: Calculator },
  { id: 'science', name: 'Science', icon: Microscope },
  { id: 'social', name: 'Social Studies', icon: GlobeIcon },
];

function SubjectSelection() {
  const navigate = useNavigate();
  const { classId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Select Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map(({ id, name, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/class/${classId}/${id}`)}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-4">
              <Icon className="w-12 h-12" />
              <span className="text-xl font-semibold">{name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default SubjectSelection;