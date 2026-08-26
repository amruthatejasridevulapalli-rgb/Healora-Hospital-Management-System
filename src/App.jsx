import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";

import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import AdminLogin from "./pages/AdminLogin";


import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Insurance from "./pages/Insurance";
import Laboratory from "./pages/Laboratory";
import Pharmacy from "./pages/Pharmacy";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";


import MainLayout from "./layouts/MainLayout";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Public Pages */}

        <Route 
          path="/welcome" 
          element={<Landing />} 
        />


        <Route 
          path="/patient-login" 
          element={<PatientLogin />} 
        />


        <Route 
          path="/doctor-login" 
          element={<DoctorLogin />} 
        />


        <Route 
          path="/admin-login" 
          element={<AdminLogin />} 
        />



        {/* Admin Portal */}

        <Route
          path="/*"
          element={
            <MainLayout>

              <Routes>

                <Route 
                  path="/" 
                  element={<Dashboard />} 
                />

                <Route 
                  path="/patients" 
                  element={<Patients />} 
                />

                <Route 
                  path="/doctors" 
                  element={<Doctors />} 
                />

                <Route 
                  path="/appointments" 
                  element={<Appointments />} 
                />

                <Route 
                  path="/billing" 
                  element={<Billing />} 
                />

                <Route 
                  path="/insurance" 
                  element={<Insurance />} 
                />

                <Route 
                  path="/laboratory" 
                  element={<Laboratory />} 
                />

                <Route 
                  path="/pharmacy" 
                  element={<Pharmacy />} 
                />

                <Route 
                  path="/notifications" 
                  element={<Notifications />} 
                />

                <Route 
                  path="/reports" 
                  element={<Reports />} 
                />

                <Route 
                  path="/settings" 
                  element={<Settings />} 
                />

                <Route 
                 path="/patient-dashboard" 
                 element={<PatientDashboard />} 
                />

                <Route 
                 path="/doctor-dashboard" 
                 element={<DoctorDashboard />} 
                />
                
              </Routes>

            </MainLayout>
          }
        />


      </Routes>

    </BrowserRouter>

  );

}

export default App;