export const listGoals = /* GraphQL */ `
  query ListGoals {
    listGoals {
      items {
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
  }
`;

export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
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