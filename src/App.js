import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import authHeader from './services/auth-header';

import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Header from './components/header.component';
import LoginHooks from './components/login.component';
import DataTableBasicDemo from './components/datatable.component';
import NewStory from './components/new-blog.component';

// check theme name here => https://github.com/primefaces/primereact/tree/master/public/themes
import "primereact/resources/themes/lara-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import MyBlog from './components/myblog.component';
import BlogView from './components/blog.view.component';
import EditBlog from './components/edit.blog.component';

export default class App extends React.Component {
	state = {
		isLoggedIn:false
	}

	checkLoggedIn = () => {
		if( authHeader() )  {
			this.state.setState(() => ({isLoggedIn:true}));
		}
	}

	render() {
		return (
		<div>
			<BrowserRouter>
				<Header />
				<div className='container mt-3'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginHooks />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/user" element={<BoardUser />} />
					<Route path="/mod" element={<BoardModerator />} />
					<Route path="/admin" element={<BoardAdmin />} />
					<Route path="/datatable" element={<DataTableBasicDemo />} />
					<Route path="/my-blog" element={<MyBlog />} />
					<Route path="*" element={<Home />} />
					<Route path="/new-story" element={<NewStory /> } />
					<Route path="/blog/view/:id" element={<BlogView />} />
					<Route path="/blog/edit/:blogId" element={<EditBlog />} />
				</Routes>
				</div>
			</BrowserRouter>
		</div>);
	}
}