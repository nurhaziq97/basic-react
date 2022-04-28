import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogService } from "../services/blog.service";
import {Button} from 'primereact/button';
import authService from "../services/auth.service";

const BlogView = () =>  {
    const blogService = new BlogService();
    const {id} = useParams();
    const [blogState, setBlogState] = useState(null);
    const user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(()=> {
        if(id) {
            blogService.getBlog(id)
            .then(response => setBlogState(response));
        }
    }, []);


    const handleClick = () => {
        navigate("/blog/edit/"+id);
    }

    return (
        <div>
            {blogState && (
                <div>
                    <div className="card">
                        <h2 className="card-title fw-bold">{blogState.blogTitle}</h2>
                        <div className="fw-light text-muted">Author: {blogState.username}</div>
                        <hr/>
                        <div className="card-body">
                            <MDEditor.Markdown source={blogState.blogContent} />
                        </div>
                        {blogState.email === user .email && (
                            <Button type="button" label="Edit Blog" icon="pi pi-pencil" onClick={handleClick}/>
                        )}
                    </div>
                </div>
            )}        
        </div>
    );
    
}

export default BlogView;