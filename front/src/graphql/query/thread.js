export const GET_MY_THEADS = `
  query getMyThreads($userId: ID) { 
    userThreads(userId: $userId) {
      id
      participants {
          id
          lastname
          firstname
          email
      }
    }
  }
`;