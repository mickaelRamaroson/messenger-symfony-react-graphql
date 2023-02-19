export const CREATE_MESSAGE = `
  mutation createMessage ($threadId ID!, $fromId ID!, $content String!) {
    createMessage(threadId: $threadId, fromId: $fromId, content: $content) {
      id
      content
      createdAt
      isRead
      user {
        id
        firstname
        lastname
        email
      }
    }
  }
`;
