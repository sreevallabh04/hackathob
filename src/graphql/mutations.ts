export const createGoal = /* GraphQL */ `
  mutation CreateGoal($input: CreateGoalInput!) {
    createGoal(input: $input) {
      id
      title
      description
      deadline
      progress
      category
      status
      milestones {
        id
        title
        completed
      }
      createdAt
      updatedAt
    }
  }
`;

export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal($input: UpdateGoalInput!) {
    updateGoal(input: $input) {
      id
      title
      description
      deadline
      progress
      category
      status
      milestones {
        id
        title
        completed
      }
      createdAt
      updatedAt
    }
  }
`;

export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal($input: DeleteGoalInput!) {
    deleteGoal(input: $input) {
      id
    }
  }
`;