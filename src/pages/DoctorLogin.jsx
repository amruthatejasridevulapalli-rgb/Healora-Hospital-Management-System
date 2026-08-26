import { useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";
import "../styles/auth.css";


function DoctorLogin(){

const navigate = useNavigate();


return(

<div className="auth-page">

<div className="auth-card">

<FaUserMd className="auth-icon"/>

<h1>Doctor Login</h1>

<p>Care for your patients better.</p>


<input
type="email"
placeholder="Doctor Email"
/>


<input
type="password"
placeholder="Password"
/>


<button onClick={() => navigate("/doctor-dashboard")}>
Login
</button>


<p className="signup">
Forgot password?
</p>


</div>

</div>

)

}

export default DoctorLogin;