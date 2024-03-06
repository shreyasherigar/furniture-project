import axios from "axios";


const BASE_URL = 'http://localhost:8000/api';
const api = axios.create({
 
    baseURL:BASE_URL
});

export const registerUser = async(data) => {
    await api.post("/register/", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        // console.log(response);
        // console.log(response.status);
        return response
    })
    .catch((error) => {
        console.log(error);
    })
}



export const loginUser = async (data) => {
  try {
      const response = await api.post("/login/", data, {
          headers: {
              'Content-Type': 'application/json'
          }
      });

      console.log(response);

      if (response.status === 200) {
          return true;
      } else {
          return false;
      }
  } catch (error) {
      console.log(error); 
      return false;
  }
}


