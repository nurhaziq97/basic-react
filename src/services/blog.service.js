import axios from "axios";
import authHeader from "./auth-header";

export class BlogService {
    getMyBlog() {
        return axios.get("http://localhost:8080/api/blog/myblog", { headers: authHeader() })
        .then(response => response.data);
    }

    getAllBlog() {
        return axios.get("http://localhost:8080/api/blog/")
        .then(response => response.data);
    }

    createNewBlog (title, content) {
        // console.log(title, authHeader());
        return axios.post(
            "http://localhost:8080/api/blog/create", {
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
            return axios.delete("http://localhost:8080/api/blog/delete/"+ blogId, {
                headers: authHeader()
            }).then(response => response.data)
            .catch(error => error.response.status);
        }
    }
}