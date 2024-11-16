import React from 'react';
import { Goal } from '../types';
import { GoalCard } from './GoalCard';

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({ goals }: GoalListProps) {
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
        <p className="text-gray-500">Create your first goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedGoals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}