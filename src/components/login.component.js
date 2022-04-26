import React, { useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
}

const LoginHooks = () => {
    const [loginStatus, loginState] = useState({
        username: '',
        password: '',
        loading: false, 
        message: "",
    });

    const onChangeUsername = (e) => loginState(prevState => ({
            ...prevState,
            username: e.target.value
        }));

    const onChangePassword = (e) => loginState(prevState => ({
        ...prevState,
        password: e.target.value
    }));


    const formRef = useRef();
    const checkRef = useRef();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginState({
            message: "",
            loading: true
        });
        console.log(loginStatus);
        formRef.current.validateAll();
        if( checkRef.current.context._errors.length === 0 ) {
            AuthService.loginEmail(loginStatus.username, 
                loginStatus.password).then(
                    () => {
                        //TODO => success login
                        navigate("/profile");
                        console.log("Login Successfully");
                        window.location.reload();
                    }, error => {
                        const resMessage = (
                            error.response && 
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                        
                        loginState( prevState => ({
                            ...prevState, 
                            loading: false, 
                            message: resMessage
                        }));
                    }
                );
        }else {
            loginState(prevState => ({
                ...prevState, 
                loading: false
            }));
        }
    }

    
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                onSubmit = {handleLogin}
                ref={formRef}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input 
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={onChangeUsername}
                            validations = {[required]} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input 
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={onChangePassword}
                            validations = {[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block"
                        disabled={loginStatus.loading}>
                            {loginStatus.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    
                    {loginStatus.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {loginStatus.message}
                            </div>
                        </div>
                    )}

                    <CheckButton
                        style={{display: "none"}}
                        ref= {checkRef}
                    />
                </Form>
            </div>
        </div>
    );
}

export default LoginHooks;
