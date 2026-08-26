import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import "../styles/auth.css";


function AdminLogin(){

const navigate = useNavigate();


return(

<div className="auth-page">

<div className="auth-card">

<FaUserShield className="auth-icon"/>

<h1>Administrator</h1>

<p>Manage Healora operations.</p>


<input
type="email"
placeholder="Admin Email"
/>


<input
type="password"
placeholder="Password"
/>


<button onClick={() => navigate("/")}>
Login
</button>


</div>

</div>

)

}

export default AdminLogin;