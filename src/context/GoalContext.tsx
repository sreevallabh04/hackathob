import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { type GraphQLQuery } from '@aws-amplify/api';
import { Goal } from '../types';
import { listGoals } from '../graphql/queries';
import { createGoal, updateGoal as updateGoalMutation, deleteGoal as deleteGoalMutation } from '../graphql/mutations';
import { onCreateGoal, onUpdateGoal, onDeleteGoal } from '../graphql/subscriptions';

const client = generateClient();

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchGoals();
    subscribeToGoalChanges();
  }, []);

  async function fetchGoals() {
    try {
      const result = await client.graphql({
        query: listGoals
      });
      const goals = result.data.listGoals.items;
      setGoals(goals);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch goals'));
    } finally {
      setLoading(false);
    }
  }

  function subscribeToGoalChanges() {
    // Subscribe to goal creations
    const createSub = client.graphql({
      query: onCreateGoal
    }).subscribe({
      next: ({ data }) => {
        setGoals(goals => [...goals, data.onCreateGoal]);
      },
    });

    // Subscribe to goal updates
    const updateSub = client.graphql({
      query: onUpdateGoal
    }).subscribe({
      next: ({ data }) => {
        setGoals(goals => goals.map(goal => 
          goal.id === data.onUpdateGoal.id ? data.onUpdateGoal : goal
        ));
      },
    });

    // Subscribe to goal deletions
    const deleteSub = client.graphql({
      query: onDeleteGoal
    }).subscribe({
      next: ({ data }) => {
        setGoals(goals => goals.filter(goal => goal.id !== data.onDeleteGoal.id));
      },
    });

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }

  async function addGoal(goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      await client.graphql({
        query: createGoal,
        variables: { input: goalData }
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create goal'));
      throw err;
    }
  }

  async function updateGoal(goal: Goal) {
    try {
      await client.graphql({
        query: updateGoalMutation,
        variables: { input: goal }
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update goal'));
      throw err;
    }
  }

  async function deleteGoal(id: string) {
    try {
      await client.graphql({
        query: deleteGoalMutation,
        variables: { input: { id } }
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete goal'));
      throw err;
    }
  }

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal, loading, error }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}