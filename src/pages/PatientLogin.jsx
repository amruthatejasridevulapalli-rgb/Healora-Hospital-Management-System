import { useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "../styles/auth.css";

function PatientLogin(){

const navigate = useNavigate();

return(
<div className="auth-page">

<div className="auth-card">

<FaHeartbeat className="auth-icon"/>

<h1>Welcome Back ❤️</h1>

<p>Your health journey starts here.</p>


<input 
type="email"
placeholder="Email"
/>


<input
type="password"
placeholder="Password"
/>


<button onClick={() => navigate("/patient-dashboard")}>
Login
</button>


<p className="signup">
New patient? Create account
</p>


</div>

</div>
)

}

export default PatientLogin;