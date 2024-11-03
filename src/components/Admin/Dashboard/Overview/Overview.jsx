"use client";
import styles from "./Overview.module.css";
import Link from "next/link";
import { useState } from "react";

const Modal = ({ isOpen, onClose, roomType }) => {
  if (!isOpen) return null;

  const initialFormData = {
    name: "",
    fatherName: "",
    mobileNo: "",
    fatherMobileNo: "",
    email: "",
    studentAadhar: "",
    fatherAadhar: "",
    currentAddress: "",
    collegeField: "",
    gender: "male",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.fatherName)
        newErrors.fatherName = "Father's name is required.";
      if (!formData.mobileNo) newErrors.mobileNo = "Mobile number is required.";
      if (!formData.fatherMobileNo)
        newErrors.fatherMobileNo = "Father's mobile number is required.";
    } else {
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Invalid email.";
      if (!formData.studentAadhar)
        newErrors.studentAadhar = "Student Aadhar is required.";
      if (!formData.fatherAadhar)
        newErrors.fatherAadhar = "Father's Aadhar is required.";
      if (!formData.currentAddress)
        newErrors.currentAddress = "Current address is required.";
      if (!formData.collegeField)
        newErrors.collegeField = "College field is required.";
    }
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateForm();
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 1));
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const stepErrors = validateForm();
    if (Object.keys(stepErrors).length === 0) {
        const submissionData = {
            roomType: roomType,
            gender: formData.gender,
            ...formData, // Spread the rest of the form data
        };
        console.log("Form submitted:", submissionData); // Log the combined data
        onClose();
        setFormData(initialFormData);
    } else {
        setErrors(stepErrors);
    }
};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <h2>Add Student</h2>
        <h3>Room Type: {roomType}</h3>
        <form onSubmit={handleSubmit}>
          {currentStep === 0 ? (
            <>
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label>
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className={styles.errorMessage}>{errors.name}</div>
                )}
              </label>
              <label>
                Father's Name:
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
                {errors.fatherName && (
                  <div className={styles.errorMessage}>{errors.fatherName}</div>
                )}
              </label>
              <label>
                Mobile No:
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
                {errors.mobileNo && (
                  <div className={styles.errorMessage}>{errors.mobileNo}</div>
                )}
              </label>
              <label>
                Father's Mobile No:
                <input
                  type="tel"
                  name="fatherMobileNo"
                  value={formData.fatherMobileNo}
                  onChange={handleChange}
                />
                {errors.fatherMobileNo && (
                  <div className={styles.errorMessage}>
                    {errors.fatherMobileNo}
                  </div>
                )}
              </label>
            </>
          ) : (
            <>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </label>
              <label>
                Student Aadhar Card:
                <input
                  type="text"
                  name="studentAadhar"
                  value={formData.studentAadhar}
                  onChange={handleChange}
                />
                {errors.studentAadhar && (
                  <div className={styles.errorMessage}>
                    {errors.studentAadhar}
                  </div>
                )}
              </label>
              <label>
                Father's Aadhar Card:
                <input
                  type="text"
                  name="fatherAadhar"
                  value={formData.fatherAadhar}
                  onChange={handleChange}
                />
                {errors.fatherAadhar && (
                  <div className={styles.errorMessage}>
                    {errors.fatherAadhar}
                  </div>
                )}
              </label>
              <label>
                Current Address:
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                />
                {errors.currentAddress && (
                  <div className={styles.errorMessage}>
                    {errors.currentAddress}
                  </div>
                )}
              </label>
              <label>
                College Field:
                <input
                  type="text"
                  name="collegeField"
                  value={formData.collegeField}
                  onChange={handleChange}
                />
                {errors.collegeField && (
                  <div className={styles.errorMessage}>
                    {errors.collegeField}
                  </div>
                )}
              </label>
            </>
          )}
          <div className={styles.buttonContainer}>
            {currentStep > 0 && (
              <p className={styles.navButton} onClick={handlePrevious}>
                Previous
              </p>
            )}
            {currentStep < 1 ? (
              <p className={styles.navButton} onClick={handleNext}>
                Next
              </p>
            ) : (
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default function OverviewComponent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomType, setRoomType] = useState("");

  const handleOpenModal = (type) => {
    setRoomType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setRoomType("");
  };

  return (
    <main>
      <section className={styles.overviewContainer}>
        {["Standard Room", "Delux Room", "Super Delux Room"].map((type) => (
          <div key={type} className={styles.roomsInfomationContainer}>
            <h2>{type}</h2>
            <div className={styles.roomInformation}>
              <div className={styles.availabeRooms}>
                <p>
                  Available Rooms: <span>555</span>
                </p>
              </div>
              <div className={styles.manageRooms}>
                <button onClick={() => handleOpenModal(type)}>
                  Add Student
                </button>
                <Link href="/admin/dashboard/view-student">
                  <button>View Student</button>
                </Link>
                <Link href="/admin/dashboard/manage-student">
                  <button>Update/Remove Student</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        roomType={roomType}
      />
    </main>
  );
}
