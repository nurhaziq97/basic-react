import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import authService from "../services/auth.service";
import {BlogService} from "../services/blog.service";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

// set the color mode of HTML
document.documentElement.setAttribute('data-color-mode', 'light');


const EditBlog = () => {
    const [editorState, setEditorState] =  useState("");
    const [blogState, setblogState] = useState(null);
    const [title, setTitleState] = useState("");
    const [userState, setUserState] = useState(null);
    const formRef = useRef();
    const blogService = new BlogService();
    const {blogId} = useParams();
    const toast = useRef(null);
    const navigate = useNavigate();
    const onChangeTitle = (e) => setTitleState(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const responseMessage = blogService.editMyBlog(blogId, title, editorState)
        .then(response => {
            if(response.message) {
                // toast.current.show({severity: 'success', summary: response.message, detail: "Successfully Updated the Blog", life: 500})
            }
            return response.message;
        });
        if(responseMessage) {
            navigate("/blog/view/"+blogId);
        }
    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        setUserState(user);
        if(blogId) {
            const blog = blogService.getBlog(blogId)
            .then(response => {
                setEditorState(response.blogContent);
                setTitleState(response.blogTitle);
                return setblogState(response);
            })
        }
    }, []);

    const handleCancel = (e) => {
        navigate("/");
        window.location.reload();
    }

    
    return (
    <div className="card">
        <Form
        ref={formRef} 
        onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formInputTitle">
                <Form.Label>BlogTitle</Form.Label>
                <Form.Control type="text" onChange={onChangeTitle} 
                value={(title ? title : "")}/>
            </Form.Group>
            <Form.Group className="mb-3">
             <Form.Label>Content</Form.Label>
                {/* <Form.Control as="textarea" rows={15} /> */}
                <MDEditor
                    value={editorState}
                    onChange={setEditorState}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    />
            </Form.Group>
            <div className="d-flex justify-content-end">
                <Button variant="success" className="me-2" type="submit">
                    Submit
                </Button>
                <Button variant="danger" onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
            <Toast ref={toast} />
        </Form>
    </div>
    );
}

export default EditBlog;