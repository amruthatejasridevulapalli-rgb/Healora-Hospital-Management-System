import "../styles/dashboard.css";


function DoctorDashboard(){

return(

<div className="dashboard">


<div className="welcome-card">

<h1>
Welcome Doctor 👨‍⚕️
</h1>

<p>
Manage your patients efficiently.
</p>

</div>



<div className="dashboard-grid">


<div className="dashboard-card">

<h3>
Today's Patients
</h3>

<h2>
18
</h2>

</div>



<div className="dashboard-card">

<h3>
Appointments
</h3>

<h2>
12
</h2>

</div>



<div className="dashboard-card">

<h3>
Reports Pending
</h3>

<h2>
4
</h2>

</div>


</div>


</div>

)

}


export default DoctorDashboard;