import axios from "axios";
import {MAIN_URL} from "./config.service";

const API_URL = MAIN_URL + "auth/";

// const register = (username, email, password, firstname, lastname) => {
//     return axios.post(API_URL+"register", {
//         username,
//         email, 
//         password, 
//         firstname,
//         lastname
//     });
// };

// const login = (email, password ) => {
//     return axios.post(
//         API_URL+"login",
//         {
//             email, 
//             password
//         }
//     ).then((response) => {
//         if(response.data.accessToken) {
//             localStorage.setItem("user", JSON.stringify(response.data));
//         }
//         return response.data;
//     });
// }

// const logout = () => {
//     localStorage.removeItem("user");
// };

// export default {
//     register, login, logout
// };



class AuthService {
    login(username, password) {
      return axios
        .post(API_URL + "signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }

	loginEmail(email, password) {
		return axios
			.post(API_URL + "login", {
				email, 
				password
			})
			.then(response => {
				if(response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));

				}
				return response.data;
			});
	}
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(username, email, password) {
      return axios.post(API_URL + "signup", {
        username,
        email,
        password
      });
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new AuthService();
  

