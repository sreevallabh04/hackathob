import React, { useState } from 'react';
import { useGoals } from '../context/GoalContext';
import { Goal } from '../types';
import { X, Plus, Trash } from 'lucide-react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal;
}

export function GoalModal({ isOpen, onClose, goal }: GoalModalProps) {
  const { addGoal, updateGoal } = useGoals();
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [category, setCategory] = useState<Goal['category']>(goal?.category || 'short-term');
  const [deadline, setDeadline] = useState(goal?.deadline || '');
  const [milestones, setMilestones] = useState(goal?.milestones || []);
  const [newMilestone, setNewMilestone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData: Omit<Goal, 'id' | 'status' | 'progress' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      category,
      deadline,
      milestones
    };

    if (goal) {
      updateGoal({
        ...goal,
        ...goalData,
        updatedAt: new Date().toISOString()
      });
    } else {
      addGoal({
        ...goalData,
        id: crypto.randomUUID(),
        status: 'not-started',
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    onClose();
  };

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([
        ...milestones,
        { id: crypto.randomUUID(), title: newMilestone.trim(), completed: false }
      ]);
      setNewMilestone('');
    }
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Goal['category'])}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="short-term">Short Term</option>
                    <option value="long-term">Long Term</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="milestones" className="block text-sm font-medium text-gray-700">
                  Milestones
                </label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                    placeholder="Add a milestone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <ul className="mt-2 space-y-2">
                  {milestones.map((milestone) => (
                    <li key={milestone.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{milestone.title}</span>
                      <button
                        type="button"
                        onClick={() => removeMilestone(milestone.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                {goal ? 'Update Goal' : 'Create Goal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}