export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal {
    onCreateGoal {
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

export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal {
    onUpdateGoal {
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

export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal {
    onDeleteGoal {
      id
    }
  }
`;