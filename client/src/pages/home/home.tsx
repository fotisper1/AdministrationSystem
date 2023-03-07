import React from "react";
import {Link} from "react-router-dom"
import "./home.css"
const linkStyle = {
  textDecoration: "none",
  color: 'blue'
};
const Home =()=>{
    return (
        <div className="Home">
          <header className="Home-header">
            <div className="syndesi">
                <button><Link to="/login/admin" style={linkStyle}>Σύνδεση εργοδότη</Link></button>
                <button><Link to="/login/employee" style={linkStyle}>Σύνδεση εργαζομένου</Link></button>
            </div>
          </header>
        </div>
      );
}
export default Home