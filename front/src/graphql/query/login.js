export const LOGIN = `
mutation login ($email: String, $password: String) {
  login(email: $email, password: $password) {
    id
    firstname
    lastname
    email
    token
    email
  }
}
`;
