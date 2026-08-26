import { useState } from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaRupeeSign,
} from "react-icons/fa";

import initialPatients from "../data/patients";
import initialDoctors from "../data/doctors";

import "../styles/dashboard.css";

function Dashboard() {
  const [patientCount] = useState(() => {
    const savedPatients = localStorage.getItem("healora_patients");

    const patients = savedPatients
      ? JSON.parse(savedPatients)
      : initialPatients;

    return patients.length;
  });

  const [doctorCount] = useState(() => {
    const savedDoctors = localStorage.getItem("healora_doctors");

    const doctors = savedDoctors
      ? JSON.parse(savedDoctors)
      : initialDoctors;

    return doctors.length;
  });

  const cards = [
    {
      title: "Patients",
      value: patientCount,
      icon: <FaUserInjured />,
      color: "#8B5CF6",
    },
    {
      title: "Doctors",
      value: doctorCount,
      icon: <FaUserMd />,
      color: "#6EE7B7",
    },
    {
      title: "Appointments",
      value: "18",
      icon: <FaCalendarCheck />,
      color: "#F9A8D4",
    },
    {
      title: "Revenue",
      value: "₹2.3L",
      icon: <FaRupeeSign />,
      color: "#FBBF24",
    },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h1>👋 Welcome back, Amrutha</h1>
        <p>Ready to make healthcare easier today?</p>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <div
              className="dashboard-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <h3>{card.title}</h3>

            <h2>{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;