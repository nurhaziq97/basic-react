import React from "react";

export default class Home extends React.Component {
    isLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem('user'));
    
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}