import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaPlus,
  FaSearch,
  FaTimes,
  FaTrashAlt,
  FaUserMd,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import initialDoctors from "../data/doctors";
import "../styles/doctors.css";

const emptyDoctor = {
  name: "",
  specialization: "",
  department: "",
  experience: "",
  phone: "",
  email: "",
  availability: "Available",
};

const availabilityClass = (availability) =>
  availability.toLowerCase().replace(/\s+/g, "-");

function Doctors() {
  const [doctorList, setDoctorList] = useState(() => {
    const savedDoctors = localStorage.getItem("healora_doctors");

    return savedDoctors ? JSON.parse(savedDoctors) : initialDoctors;
  });

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState(emptyDoctor);

  useEffect(() => {
    localStorage.setItem("healora_doctors", JSON.stringify(doctorList));
  }, [doctorList]);

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return doctorList;

    return doctorList.filter((doctor) =>
      [
        doctor.id,
        doctor.name,
        doctor.specialization,
        doctor.department,
        doctor.phone,
        doctor.availability,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [doctorList, search]);

  const statistics = {
    total: doctorList.length,
    available: doctorList.filter(
      (doctor) => doctor.availability === "Available"
    ).length,
    busy: doctorList.filter(
      (doctor) => doctor.availability === "Busy"
    ).length,
    onLeave: doctorList.filter(
      (doctor) => doctor.availability === "On Leave"
    ).length,
  };

  const closeModal = () => {
    setModal(null);
    setSelectedDoctor(null);
    setForm(emptyDoctor);
  };

  const openAddModal = () => {
    setForm(emptyDoctor);
    setSelectedDoctor(null);
    setModal("form");
  };

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);

    setForm({
      ...emptyDoctor,
      ...doctor,
      experience: String(doctor.experience),
    });

    setModal("form");
  };

  const openViewModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModal("view");
  };

  const requestDelete = (doctor) => {
    setSelectedDoctor(doctor);
    setModal("delete");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const doctorData = {
      ...form,
      experience: Number(form.experience),
    };

    if (selectedDoctor) {
      setDoctorList((current) =>
        current.map((doctor) =>
          doctor.id === selectedDoctor.id
            ? { ...doctor, ...doctorData }
            : doctor
        )
      );
    } else {
      const nextId =
        Math.max(200, ...doctorList.map((doctor) => Number(doctor.id))) + 1;

      setDoctorList((current) => [
        {
          ...doctorData,
          id: nextId,
        },
        ...current,
      ]);
    }

    closeModal();
  };

  const deleteDoctor = () => {
    setDoctorList((current) =>
      current.filter((doctor) => doctor.id !== selectedDoctor.id)
    );

    closeModal();
  };

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <div>
          <span className="page-kicker">Medical directory</span>

          <h1>Doctors Management</h1>

          <p className="doctors-subtitle">
            Manage doctors, departments, specializations, and availability.
          </p>
        </div>

        <button
          className="add-btn"
          type="button"
          onClick={openAddModal}
        >
          <FaPlus />
          Add doctor
        </button>
      </div>

      <section className="doctor-stats">
        <article className="doctor-stat-card doctor-total">
          <span className="doctor-stat-icon">
            <FaUserMd />
          </span>

          <div>
            <strong>{statistics.total}</strong>
            <span>Total doctors</span>
          </div>
        </article>

        <article className="doctor-stat-card doctor-available">
          <span className="doctor-stat-icon">
            <FaCheckCircle />
          </span>

          <div>
            <strong>{statistics.available}</strong>
            <span>Available</span>
          </div>
        </article>

        <article className="doctor-stat-card doctor-busy">
          <span className="doctor-stat-icon">
            <FaClock />
          </span>

          <div>
            <strong>{statistics.busy}</strong>
            <span>Busy</span>
          </div>
        </article>

        <article className="doctor-stat-card doctor-leave">
          <span className="doctor-stat-icon">
            <FaClock />
          </span>

          <div>
            <strong>{statistics.onLeave}</strong>
            <span>On leave</span>
          </div>
        </article>
      </section>

      <section className="doctors-panel">
        <div className="doctors-toolbar">
          <div>
            <h2>Doctor directory</h2>

            <p>
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"} shown
            </p>
          </div>

          <label className="doctor-search-box">
            <FaSearch />

            <input
              type="search"
              placeholder="Search by name, department, or specialization"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="doctors-table-wrap">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>ID</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Phone</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.length ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td data-label="Doctor">
                      <div className="doctor-name">
                        <span>
                          {doctor.name.replace("Dr. ", "").charAt(0)}
                        </span>

                        <strong>{doctor.name}</strong>
                      </div>
                    </td>

                    <td data-label="ID">
                      <span className="doctor-id">
                        #{doctor.id}
                      </span>
                    </td>

                    <td data-label="Specialization">
                      {doctor.specialization}
                    </td>

                    <td data-label="Department">
                      {doctor.department}
                    </td>

                    <td data-label="Experience">
                      {doctor.experience} yrs
                    </td>

                    <td data-label="Phone">
                      {doctor.phone}
                    </td>

                    <td data-label="Availability">
                      <span
                        className={`availability-badge ${availabilityClass(
                          doctor.availability
                        )}`}
                      >
                        {doctor.availability}
                      </span>
                    </td>

                    <td data-label="Actions">
                      <div className="doctor-actions">
                        <button
                          className="icon-btn view-btn"
                          type="button"
                          onClick={() => openViewModal(doctor)}
                          aria-label={`View ${doctor.name}`}
                        >
                          <FaEye />
                        </button>

                        <button
                          className="icon-btn edit-btn"
                          type="button"
                          onClick={() => openEditModal(doctor)}
                          aria-label={`Edit ${doctor.name}`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          type="button"
                          onClick={() => requestDelete(doctor)}
                          aria-label={`Delete ${doctor.name}`}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty-state" colSpan="8">
                    No doctors match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={closeModal}
        >
          <div
            className={`doctor-modal ${
              modal === "delete" ? "confirm-modal" : ""
            }`}
            role="dialog"
            aria-modal="true"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {modal === "form" && (
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <div>
                    <h2>
                      {selectedDoctor
                        ? "Edit doctor"
                        : "Add new doctor"}
                    </h2>

                    <p>
                      Enter the doctor's professional information.
                    </p>
                  </div>

                  <button
                    className="modal-close"
                    type="button"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="doctor-form-grid">
                  <label>
                    Doctor name
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Dr. Aisha Khan"
                    />
                  </label>

                  <label>
                    Specialization
                    <input
                      name="specialization"
                      value={form.specialization}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Cardiologist"
                    />
                  </label>

                  <label>
                    Department
                    <input
                      name="department"
                      value={form.department}
                      onChange={handleFormChange}
                      required
                      placeholder="e.g. Cardiology"
                    />
                  </label>

                  <label>
                    Experience
                    <input
                      name="experience"
                      type="number"
                      min="0"
                      max="60"
                      value={form.experience}
                      onChange={handleFormChange}
                      required
                      placeholder="Years"
                    />
                  </label>

                  <label>
                    Phone number
                    <input
                      name="phone"
                      inputMode="tel"
                      value={form.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="10-digit mobile number"
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      placeholder="doctor@healora.com"
                    />
                  </label>

                  <label>
                    Availability
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={handleFormChange}
                    >
                      <option>Available</option>
                      <option>Busy</option>
                      <option>On Leave</option>
                    </select>
                  </label>
                </div>

                <div className="modal-footer">
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button className="add-btn" type="submit">
                    {selectedDoctor
                      ? "Save changes"
                      : "Add doctor"}
                  </button>
                </div>
              </form>
            )}

            {modal === "view" && selectedDoctor && (
              <>
                <div className="modal-header">
                  <div>
                    <h2>Doctor details</h2>
                    <p>Doctor ID #{selectedDoctor.id}</p>
                  </div>

                  <button
                    className="modal-close"
                    type="button"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="doctor-profile">
                  <div className="profile-avatar">
                    {selectedDoctor.name
                      .replace("Dr. ", "")
                      .charAt(0)}
                  </div>

                  <div>
                    <h3>{selectedDoctor.name}</h3>

                    <span
                      className={`availability-badge ${availabilityClass(
                        selectedDoctor.availability
                      )}`}
                    >
                      {selectedDoctor.availability}
                    </span>
                  </div>
                </div>

                <dl className="doctor-details-grid">
                  <div>
                    <dt>Specialization</dt>
                    <dd>{selectedDoctor.specialization}</dd>
                  </div>

                  <div>
                    <dt>Department</dt>
                    <dd>{selectedDoctor.department}</dd>
                  </div>

                  <div>
                    <dt>Experience</dt>
                    <dd>{selectedDoctor.experience} years</dd>
                  </div>

                  <div>
                    <dt>Phone</dt>
                    <dd>{selectedDoctor.phone}</dd>
                  </div>

                  <div>
                    <dt>Email</dt>
                    <dd>{selectedDoctor.email}</dd>
                  </div>
                </dl>

                <div className="modal-footer">
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>

                  <button
                    className="add-btn"
                    type="button"
                    onClick={() =>
                      openEditModal(selectedDoctor)
                    }
                  >
                    <FaEdit />
                    Edit doctor
                  </button>
                </div>
              </>
            )}

            {modal === "delete" && selectedDoctor && (
              <>
                <div className="delete-symbol">
                  <FaTrashAlt />
                </div>

                <h2>Delete doctor?</h2>

                <p>
                  Remove{" "}
                  <strong>{selectedDoctor.name}</strong>{" "}
                  from the doctor directory? This action cannot
                  be undone.
                </p>

                <div className="modal-footer">
                  <button
                    className="secondary-btn"
                    type="button"
                    onClick={closeModal}
                  >
                    Keep doctor
                  </button>

                  <button
                    className="danger-btn"
                    type="button"
                    onClick={deleteDoctor}
                  >
                    Delete doctor
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;