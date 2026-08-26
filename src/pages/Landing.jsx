import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

import {
  FaUser,
  FaUserMd,
  FaUserShield,
  FaHeartbeat
} from "react-icons/fa";


function Landing() {

  const navigate = useNavigate();

  const roles = [
    {
      title: "Patient",
      text: "Manage your health journey",
      icon: <FaUser />,
      path: "/patient-login"
    },
    {
      title: "Doctor",
      text: "Care for your patients",
      icon: <FaUserMd />,
      path: "/doctor-login"
    },
    {
      title: "Administrator",
      text: "Manage hospital operations",
      icon: <FaUserShield />,
      path: "/admin-login"
    }
  ];


  return (
    <div className="landing">

      <div className="landing-header">

        <FaHeartbeat className="landing-icon"/>

        <h1>Healora</h1>

        <p>
          Healthcare, Happier.
        </p>

      </div>


      <h2>
        Continue as
      </h2>


      <div className="role-container">

        {
          roles.map((role)=>(
            
            <div
              className="role-card"
              key={role.title}
              onClick={()=>navigate(role.path)}
            >

              <div className="role-icon">
                {role.icon}
              </div>

              <h3>
                {role.title}
              </h3>

              <p>
                {role.text}
              </p>

            </div>

          ))
        }

      </div>


    </div>
  );
}


export default Landing;