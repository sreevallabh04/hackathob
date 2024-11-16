export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  category: 'short-term' | 'long-term';
  status: 'not-started' | 'in-progress' | 'completed';
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface AISuggestion {
  id: string;
  goalId: string;
  suggestion: string;
  type: 'improvement' | 'milestone' | 'motivation';
  createdAt: string;
}