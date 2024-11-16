import React from 'react';
import { Goal } from '../types';
import { BarChart3, Target, Calendar, Trophy } from 'lucide-react';

interface DashboardProps {
  goals: Goal[];
}

export function Dashboard({ goals }: DashboardProps) {
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress').length;
  const averageProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / (goals.length || 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-500 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">Total Goals</h3>
          <Target className="text-blue-500 h-6 w-6" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-yellow-500 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">In Progress</h3>
          <Calendar className="text-yellow-500 h-6 w-6" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{inProgressGoals}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-green-500 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">Completed</h3>
          <Trophy className="text-green-500 h-6 w-6" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{completedGoals}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-500 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-700 font-medium">Average Progress</h3>
          <BarChart3 className="text-purple-500 h-6 w-6" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{Math.round(averageProgress)}%</p>
      </div>
    </div>
  );
}