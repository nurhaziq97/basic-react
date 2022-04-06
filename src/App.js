import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Blog from "./pages/Blog";

export default class App extends React.Component {


	render() {
		return (
			<BrowserRouter>
				<div>
					<Header />
				</div>
				<Routes>
					<Route path="/" element={<Home />} exact={true} />
					<Route path="/profile" element={<Profile />}/>
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</BrowserRouter>
		);
	}
}

