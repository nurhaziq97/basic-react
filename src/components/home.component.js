import React, { useEffect, useState } from "react";

import UserService from "../services/user.service";
import ViewBlogGridComponent from "./view-blog-grid.component";

import 'primeflex/primeflex.css';

const Home = () => {
  const [networkState, setNetworkState] = useState("");
  
  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setNetworkState({
          content: response.data
        });
      },
      error => {
        setNetworkState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  });
  return (
    // <div className="card col-md-12">
    //       <div className="card-body">
    //         <h3 className="card-title">Top Stories</h3>
    //           <div className="card-text">
                <ViewBlogGridComponent />
      //         </div>
      //     </div>
      // </div>
  );
}

export default Home;
