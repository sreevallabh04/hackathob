import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { GoalModal } from './GoalModal';

export function NewGoalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        New Goal
      </button>

      <GoalModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}