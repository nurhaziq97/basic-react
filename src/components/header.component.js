import { useEffect, useState } from "react"
import EventBus from "../common/EventBus";
import authService from "../services/auth.service";
import { Link } from 'react-router-dom';


const Header = () => {
    const [isNavCollapse, setNavCollapse] =  useState(true);
    const [loginState, setLoginState] = useState({
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
        isNavCollapse: true
    });

    const logout = () => {
        authService.logout();
        setLoginState((prevState) =>  ({
            ...prevState,
            showAdminBoard: false,
            showModeratorBoard: false,
            currentUser: undefined
        }));
        EventBus.remove("logout");
    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        if(user){
            setLoginState((prevState) => ({
                ...prevState,
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")      
            }));
        }
    }, [loginState, logout]);

    const handleNavCollapse = () => {
        setNavCollapse((prevState) => (!prevState));
    };
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">
                        Blog App
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" 
                        aria-expanded={!isNavCollapse ? true : false} aria-label="Toggle navigation"
                        onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapse ? 'collapse' : ''} navbar-collapse`} id="navbarScroll">
                        <div className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/datatable"} className="nav-link">
                                    Explore
                                </Link>
                            </li>

                            {loginState.showModeratorBoard && (
                                <li className="nav-item">
                                    <Link to={"/mod"} className="nav-link">
                                        Moderator Board
                                    </Link>
                                </li>
                            )}

                            {loginState.showAdminBoard && (
                                <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                </li>
                            )}

                            {loginState.currentUser && (
                                <li className="nav-item">
                                    <Link to={"/new-story"} className="nav-link">
                                        Write Stories
                                    </Link>
                                </li>
                            )}


                        {loginState.currentUser && (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/new-story"} className="nav-link">
                                        New Blog
                                    </Link>
                                </li>
                            </div>
                        )}
                        </div>

                        {loginState.currentUser && (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/my-blog"} className="nav-link">
                                        My Blog
                                    </Link>
                                </li>
                            </div>
                        )}

                        {loginState.currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {loginState.currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logout}>
                                        Logout
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            { /*<AuthVerify logOut={this.logOut}/> */}
        </div>
    );
}

export default Header;