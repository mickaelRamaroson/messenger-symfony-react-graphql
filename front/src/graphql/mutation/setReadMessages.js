export const SET_READ_MESSAGES = `
  mutation setReadMessages($messageIds [ID]) {
    setReadMessages(messageIds: $messageIds)
  }
`;
