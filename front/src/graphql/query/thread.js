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
      lastMessage {
        id
        content
        user {
          id
        }
        isRead
      }
    }
  }
`;

export const GET_THREAD_BY_ID = `
  query thread($id: ID!) {
    thread(id: $id) {
      id
      messages {
        id
        content
        user {
          id
        }
        isRead
        createdAt
      }
    }
  }
`;

export const GET_LAST_MESSAGE_THREAD = `
  query lastMessageThread($threadId: ID!) {
    lastMessageThread(threadId: $threadId) {
      id
      content
      createdAt
      isRead
      user {
        id
      }
    }
  }
`;

export const GET_LAST_USER_THREAD = `
query lastThreadUser($userId ID!) {
  lastThreadUser(userId: $userId) {
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
