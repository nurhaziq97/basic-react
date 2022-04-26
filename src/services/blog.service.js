import axios from 'axios';

import authHeader from './auth-header';


const API_URL = "http://localhost:8080/api/blog";

// const GetAllBlogsPost = axios
//     .get(
//         API_URL + ''
//     ).then(response => {
//         return response;
//     });


const CreateNewBlog = (title, content) => {
    // console.log(title, authHeader());
    console.log(axios.post(
        API_URL + '/create', {
        title,
        content
        }, {headers: authHeader() }
    ).then(response => {
        if (response.data.id) {
            return response.data;
        }
    }))
};

export { CreateNewBlog };
