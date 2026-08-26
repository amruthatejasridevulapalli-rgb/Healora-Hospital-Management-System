import { useEffect, useMemo, useState } from "react";
import {
  FaBed,
  FaCheckCircle,
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrashAlt,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";
import initialPatients from "../data/patients";
import "../styles/patients.css";

const emptyPatient = {
  name: "",
  age: "",
  gender: "Female",
  blood: "A+",
  doctor: "",
  phone: "",
  email: "",
  status: "Outpatient",
  diagnosis: "",
};

const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

function Patients() {
  const [patientList, setPatientList] = useState(() => {
  const savedPatients = localStorage.getItem("healora_patients");

  return savedPatients ? JSON.parse(savedPatients) : initialPatients;
});
  
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState(emptyPatient);

  useEffect(() => {
  localStorage.setItem("healora_patients", JSON.stringify(patientList));
}, [patientList]);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return patientList;

    return patientList.filter((patient) =>
      [patient.id, patient.name, patient.doctor, patient.phone, patient.status]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [patientList, search]);

  const statistics = {
    total: patientList.length,
    admitted: patientList.filter((patient) => patient.status === "Admitted").length,
    outpatient: patientList.filter((patient) => patient.status === "Outpatient").length,
    discharged: patientList.filter((patient) => patient.status === "Discharged").length,
  };

  const closeModal = () => {
    setModal(null);
    setSelectedPatient(null);
    setForm(emptyPatient);
  };

  const openAddModal = () => {
    setForm(emptyPatient);
    setModal("form");
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setForm({ ...emptyPatient, ...patient, age: String(patient.age) });
    setModal("form");
  };

  const openViewModal = (patient) => {
    setSelectedPatient(patient);
    setModal("view");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const patientData = { ...form, age: Number(form.age) };

    if (selectedPatient) {
      setPatientList((current) =>
        current.map((patient) =>
          patient.id === selectedPatient.id ? { ...patient, ...patientData } : patient
        )
      );
    } else {
      const nextId = Math.max(100, ...patientList.map((patient) => Number(patient.id))) + 1;
      setPatientList((current) => [{ ...patientData, id: nextId }, ...current]);
    }

    closeModal();
  };

  const requestDelete = (patient) => {
    setSelectedPatient(patient);
    setModal("delete");
  };

  const deletePatient = () => {
    setPatientList((current) =>
      current.filter((patient) => patient.id !== selectedPatient.id)
    );
    closeModal();
  };

  return (
    <div className="patients-page">
      <div className="patients-header">
        <div>
          <span className="page-kicker">Clinical directory</span>
          <h1>Patient Management</h1>
          <p className="patients-subtitle">
            Manage patient records, admissions, and care information in one place.
          </p>
        </div>
        <button className="add-btn" type="button" onClick={openAddModal}>
          <FaPlus aria-hidden="true" /> Add patient
        </button>
      </div>

      <section className="patient-stats" aria-label="Patient statistics">
        <article className="stat-card stat-total">
          <span className="stat-icon"><FaUserInjured /></span>
          <div><strong>{statistics.total}</strong><span>Total patients</span></div>
        </article>
        <article className="stat-card stat-admitted">
          <span className="stat-icon"><FaBed /></span>
          <div><strong>{statistics.admitted}</strong><span>Admitted</span></div>
        </article>
        <article className="stat-card stat-outpatient">
          <span className="stat-icon"><FaUserMd /></span>
          <div><strong>{statistics.outpatient}</strong><span>Outpatients</span></div>
        </article>
        <article className="stat-card stat-discharged">
          <span className="stat-icon"><FaCheckCircle /></span>
          <div><strong>{statistics.discharged}</strong><span>Discharged</span></div>
        </article>
      </section>

      <section className="patients-panel">
        <div className="patients-toolbar">
          <div>
            <h2>Patient directory</h2>
            <p>{filteredPatients.length} record{filteredPatients.length === 1 ? "" : "s"} shown</p>
          </div>
          <label className="search-box-patient">
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by name, ID, doctor, or phone"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="patients-table-wrap">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient</th><th>ID</th><th>Age / Gender</th><th>Blood</th>
                <th>Assigned doctor</th><th>Phone</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length ? filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td data-label="Patient"><div className="patient-name"><span>{patient.name.charAt(0)}</span><strong>{patient.name}</strong></div></td>
                  <td data-label="ID"><span className="patient-id">#{patient.id}</span></td>
                  <td data-label="Age / Gender">{patient.age} yrs <span className="muted-dot">•</span> {patient.gender || "Not specified"}</td>
                  <td data-label="Blood"><span className="blood-badge">{patient.blood}</span></td>
                  <td data-label="Assigned doctor">{patient.doctor}</td>
                  <td data-label="Phone">{patient.phone}</td>
                  <td data-label="Status"><span className={`status-badge ${statusClass(patient.status)}`}>{patient.status}</span></td>
                  <td data-label="Actions">
                    <div className="patient-actions">
                      <button className="icon-btn view-btn" type="button" onClick={() => openViewModal(patient)} aria-label={`View ${patient.name}`}><FaEye /></button>
                      <button className="icon-btn edit-btn" type="button" onClick={() => openEditModal(patient)} aria-label={`Edit ${patient.name}`}><FaEdit /></button>
                      <button className="icon-btn delete-btn" type="button" onClick={() => requestDelete(patient)} aria-label={`Delete ${patient.name}`}><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td className="empty-state" colSpan="8">No patients match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modal && <div className="modal-backdrop" role="presentation" onMouseDown={closeModal}>
        <div className={`patient-modal ${modal === "delete" ? "confirm-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="patient-modal-title" onMouseDown={(event) => event.stopPropagation()}>
          {modal === "form" && <form onSubmit={handleSubmit}>
            <div className="modal-header"><div><h2 id="patient-modal-title">{selectedPatient ? "Edit patient" : "Add new patient"}</h2><p>Enter the patient's current care details.</p></div><button className="modal-close" type="button" onClick={closeModal} aria-label="Close"><FaTimes /></button></div>
            <div className="patient-form-grid">
              <label>Full name<input name="name" value={form.name} onChange={handleFormChange} required placeholder="e.g. Aisha Khan" /></label>
              <label>Age<input name="age" type="number" min="0" max="130" value={form.age} onChange={handleFormChange} required placeholder="e.g. 32" /></label>
              <label>Gender<select name="gender" value={form.gender} onChange={handleFormChange}><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></label>
              <label>Blood group<select name="blood" value={form.blood} onChange={handleFormChange}>{["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((blood) => <option key={blood}>{blood}</option>)}</select></label>
              <label>Assigned doctor<input name="doctor" value={form.doctor} onChange={handleFormChange} required placeholder="e.g. Dr. Meera Nair" /></label>
              <label>Phone number<input name="phone" inputMode="tel" value={form.phone} onChange={handleFormChange} required placeholder="10-digit mobile number" /></label>
              <label>Email address<input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="patient@email.com" /></label>
              <label>Care status<select name="status" value={form.status} onChange={handleFormChange}><option>Admitted</option><option>Outpatient</option><option>Discharged</option></select></label>
              <label className="full-width">Diagnosis / notes<textarea name="diagnosis" value={form.diagnosis} onChange={handleFormChange} rows="3" placeholder="Add a short diagnosis or care note" /></label>
            </div>
            <div className="modal-footer"><button className="secondary-btn" type="button" onClick={closeModal}>Cancel</button><button className="add-btn" type="submit">{selectedPatient ? "Save changes" : "Add patient"}</button></div>
          </form>}

          {modal === "view" && selectedPatient && <>
            <div className="modal-header"><div><h2 id="patient-modal-title">Patient details</h2><p>Patient ID #{selectedPatient.id}</p></div><button className="modal-close" type="button" onClick={closeModal} aria-label="Close"><FaTimes /></button></div>
            <div className="patient-profile"><div className="profile-avatar">{selectedPatient.name.charAt(0)}</div><div><h3>{selectedPatient.name}</h3><span className={`status-badge ${statusClass(selectedPatient.status)}`}>{selectedPatient.status}</span></div></div>
            <dl className="details-grid"><div><dt>Age</dt><dd>{selectedPatient.age} years</dd></div><div><dt>Gender</dt><dd>{selectedPatient.gender || "Not specified"}</dd></div><div><dt>Blood group</dt><dd>{selectedPatient.blood}</dd></div><div><dt>Phone</dt><dd>{selectedPatient.phone}</dd></div><div><dt>Email</dt><dd>{selectedPatient.email || "Not provided"}</dd></div><div><dt>Assigned doctor</dt><dd>{selectedPatient.doctor}</dd></div><div className="full-detail"><dt>Diagnosis / notes</dt><dd>{selectedPatient.diagnosis || "No care notes recorded."}</dd></div></dl>
            <div className="modal-footer"><button className="secondary-btn" type="button" onClick={closeModal}>Close</button><button className="add-btn" type="button" onClick={() => openEditModal(selectedPatient)}><FaEdit /> Edit patient</button></div>
          </>}

          {modal === "delete" && selectedPatient && <><div className="delete-symbol"><FaTrashAlt /></div><h2 id="patient-modal-title">Delete patient?</h2><p>Remove <strong>{selectedPatient.name}</strong> from the patient directory? This action cannot be undone.</p><div className="modal-footer"><button className="secondary-btn" type="button" onClick={closeModal}>Keep patient</button><button className="danger-btn" type="button" onClick={deletePatient}>Delete patient</button></div></>}
        </div>
      </div>}
    </div>
  );
}

export default Patients;
