import { Link } from "react-router-dom"
import "./navbar.css"
const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white'
};
const LogoutNav=()=>{
    return(
    <div className='navbar'>
        <ul>
          <li id="my-system"><Link to="/" style={linkStyle}>My system</Link></li>
          <li id="logout"><Link to="/logout" style={linkStyle} >Logout</Link></li>
        </ul>
    </div>
    )
}
export default LogoutNav