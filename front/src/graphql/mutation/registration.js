export const REGISTRATION = `
mutation addUser ($lastname String, $firstname String, $email: String, $password: String){
  registerUser (lastname: $lastname,firstname: $firstname, email:$email,password: $password){
      token
      email
      firstname
      lastname
      id
  }
}`;
