import axios from "axios";
import authHeader from "./auth-header";
import { URL_MAIN_API } from "./url.service";

const API_URL = URL_MAIN_API + "blog/";

export class BlogService {

    getMyBlog() {
        return axios.get(API_URL + "myblog", { headers: authHeader() })
        .then(response => response.data);
    }

    getAllBlog() {
        return axios.get(API_URL)
        .then(response => response.data);
    }

    createNewBlog (title, content) {
        // console.log(title, authHeader());
        return axios.post(
            API_URL + "create", {
            title,
            content
            }, {headers: authHeader() }
        ).then(response => {
            if (response.data.id) {
                return response.data;
            }
        })
    };

    deleteBlog (blogId) {
        if(blogId) {
            return axios.delete(API_URL + "delete/"+ blogId, {
                headers: authHeader()
            }).then(response => response.data)
            .catch(error => error.response.status);
        }
    }

    getBlog(blogId) {
        if(blogId) {
            return axios.get(API_URL + "view/"+blogId)
            .then(response => response.data);
        }
    }

    editMyBlog(id, title, content) {
        if(title && content) {
            return axios.put(API_URL + "edit/" + id, 
            {
                title,
                content
            },
            {
                headers: authHeader()
            }).then(response => response.data);
        }
    }
}
