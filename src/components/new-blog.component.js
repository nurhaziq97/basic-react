import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import rehypeSanitize from "rehype-sanitize";
import {BlogService} from "../services/blog.service";

// set the color mode of HTML
document.documentElement.setAttribute('data-color-mode', 'light');


const NewStory = () => {
    const [editorState, setEditorState] =  useState("");
    const [title, setTitleState] = useState("");
    const formRef = useRef();
    
    
    const onChangeTitle = (e) => setTitleState(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, editorState);
        const blogService = new BlogService();
        blogService.createNewBlog(title, editorState);
    }

    const navigate = useNavigate();
     

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
                <Form.Control type="text" onChange={onChangeTitle}/>
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
        </Form>
    </div>
    );
}

export default NewStory;