import React from 'react';
import { Goal } from '../types';
import { useGoals } from '../context/GoalContext';
import { Clock, CheckCircle2, Circle, MoreVertical, Trash2 } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const { updateGoal, deleteGoal } = useGoals();
  const [showMenu, setShowMenu] = React.useState(false);

  const statusColors = {
    'not-started': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const handleStatusChange = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(goal.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length] as Goal['status'];
    
    updateGoal({
      ...goal,
      status: nextStatus,
      progress: nextStatus === 'completed' ? 100 : goal.progress
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
              {goal.status.replace('-', ' ')}
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {goal.category}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      deleteGoal(goal.id);
                      setShowMenu(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Goal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{goal.description}</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Due {formatDate(goal.deadline)}</span>
            </div>
            <button
              onClick={handleStatusChange}
              className="flex items-center text-gray-500 hover:text-blue-600"
            >
              {goal.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {goal.milestones.length > 0 && (
        <div className="border-t border-gray-100 px-6 py-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones</h4>
          <ul className="space-y-2">
            {goal.milestones.map((milestone) => (
              <li key={milestone.id} className="flex items-center">
                <button
                  onClick={() => {
                    const updatedMilestones = goal.milestones.map(m =>
                      m.id === milestone.id ? { ...m, completed: !m.completed } : m
                    );
                    updateGoal({
                      ...goal,
                      milestones: updatedMilestones,
                      progress: Math.round((updatedMilestones.filter(m => m.completed).length / updatedMilestones.length) * 100)
                    });
                  }}
                  className="flex items-center text-gray-500 hover:text-blue-600"
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </button>
                <span className={`ml-2 text-sm ${milestone.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {milestone.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}