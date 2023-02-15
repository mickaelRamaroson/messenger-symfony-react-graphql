export const CREATE_THREAD = `
  mutation createThread($idFrom ID, $idTo ID) {
    createThread(idFrom: $idFrom, idTo: $idTo) {
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
