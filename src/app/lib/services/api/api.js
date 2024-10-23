import axios from "axios";

// Buat instance axios dengan base URL API
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL backend Express
});


// export const signUp(name. pass){
//   let username = name;
//   let password = pass;
//   const signUpResponse =  api.post(
//     user/signup, {
//       name : username,
//       password : password
//     }
  
//   )

//   if(signUpResponse.code == 200){
//     nextPage
//   }
// }