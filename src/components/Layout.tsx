import React from 'react';
import { Dashboard } from './Dashboard';
import { GoalList } from './GoalList';
import { NewGoalButton } from './NewGoalButton';
import { useGoals } from '../context/GoalContext';
import { Rocket, LogOut } from 'lucide-react';
import { AuthUser } from '@aws-amplify/auth';

interface LayoutProps {
  user: AuthUser;
  onSignOut?: () => void;
}

export function Layout({ user, onSignOut }: LayoutProps) {
  const { goals } = useGoals();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">GoalTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user.username}
              </span>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Goals</h1>
          <NewGoalButton />
        </div>
        
        <Dashboard goals={goals} />
        <GoalList goals={goals} />
      </main>
    </div>
  );
}