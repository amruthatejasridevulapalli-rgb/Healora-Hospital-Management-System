import "../styles/dashboard.css";

function PatientDashboard(){

return(

<div className="dashboard">

<div className="welcome-card">

<h1>
Hello, Patient 👋
</h1>

<p>
Your health journey in one place.
</p>

</div>


<div className="dashboard-grid">


<div className="dashboard-card">

<h3>
Upcoming Appointment
</h3>

<h2>
Dr. Ananya Rao
</h2>

<p>
Tomorrow • 10:30 AM
</p>

</div>


<div className="dashboard-card">

<h3>
Medical Reports
</h3>

<h2>
5
</h2>

<p>
Available reports
</p>

</div>


<div className="dashboard-card">

<h3>
Prescriptions
</h3>

<h2>
3
</h2>

<p>
Active medicines
</p>

</div>


</div>

</div>

)

}

export default PatientDashboard;