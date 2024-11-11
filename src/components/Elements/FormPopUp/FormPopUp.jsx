import { useState, useEffect, useCallback } from "react";
import styles from "./FormPopUp.module.css";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormPopUp = ({ isOpen, onClose, roomName, onSubmitResponse }) => {
  const router = useRouter();

  // Helper function to show toast notifications
  // Toast function to show success or error messages
  const showToast = (message, isSuccess = false) => {
    toast[isSuccess ? "success" : "error"](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark", // Dark theme for the toast
      transition: Bounce, // Bounce transition effect
    });
  };

  // Handle token validation on component mount
  useEffect(() => {
    const token =
      localStorage.getItem("UserAccessToken") || sessionStorage.getItem("UserAccessToken");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  const roomTypeMap = {
    "Delux Room": "1",
    "Two Sharing Room": "2",
    "Three Sharing Room": "3",
    "Four Sharing Room": "4",
    "Five Sharing Room": "5",
    "Six Sharing Room": "6",
  };

  const MappedRoomName = roomTypeMap[roomName]
  // Initialize form state
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    userName: "",
    dob: "",
    mobile: "",
    emailId: "",
    adhaar: "",
    pan: "",
    address: "",
    workAddress: "",
    startDate: "",
    endDate: "",
    bedNo: "",
    roomNo: "",
    rent: "",
    noticeInd: "N",
    emergencyNo: "",
    roomType: "",
    // image: null,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, roomType: MappedRoomName }));
  };

  // Validate the current step's form fields
  const validateForm = () => {
    const requiredFields = currentStep === 0
      ? ["userName", "dob", "mobile", "emailId", "adhaar", "pan"]
      : ["address", "workAddress", "startDate", "bedNo", "roomNo", "rent", "emergencyNo"];

    return requiredFields.filter((field) => !formData[field]);
  };

  // Handle next step logic
  const handleNext = () => {
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      showToast("Please fill in all required fields.");
      return;
    }
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 1)); // Adjust max step here if you add more
  };

  // Handle previous step logic
  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Submit the form data
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const missingFields = validateForm();
      if (missingFields.length > 0) {
        showToast("Please fill in all required fields.");
        return;
      }


      const token =
        localStorage.getItem("UserAccessToken") || sessionStorage.getItem("UserAccessToken");
        console.log(formData)      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },

          body: JSON.stringify(formData),

        });

        if (response.ok) {
          showToast("Student Added Succesfully",true)
          setTimeout(() => {
            onClose();
          }, 1000);

        } else {
          showToast("Something went wrong! Please try again later.");
        }
      } catch (error) {
        console.error("Error during adding student:", error);
        showToast("Something went wrong! Please try again later.");
      }
    },
    [formData, showToast, onClose, onSubmitResponse]
  );

  // Skip rendering if modal is not open
  if (!isOpen) return null;

  // Fields configuration for each step
  const stepFields = [
    [
      { label: "Name", name: "userName", type: "text" },
      { label: "Date of Birth", name: "dob", type: "date" },
      { label: "Mobile No", name: "mobile", type: "tel" },
      { label: "Email", name: "emailId", type: "email" },
      { label: "Aadhar", name: "adhaar", type: "text" },
      { label: "PAN", name: "pan", type: "text" },
    ],
    [
      { label: "Address", name: "address", type: "text" },
      { label: "Work Address", name: "workAddress", type: "text" },
      { label: "Start Date", name: "startDate", type: "date" },
      { label: "End Date", name: "endDate", type: "date" },
      { label: "Bed No", name: "bedNo", type: "text" },
      { label: "Room No", name: "roomNo", type: "text" },
      { label: "Rent", name: "rent", type: "number" },
      { label: "Emergency Contact No", name: "emergencyNo", type: "tel" },
    ]
  ];

  return (
    <div className={styles.modalOverlay}>
      <ToastContainer />
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>Add Student</h2>
        <h3>Room Type: {roomName}</h3>
        <form onSubmit={handleSubmit}>
          {stepFields[currentStep].map(({ label, name, type }) => (
            <label key={name}>
              {label}:
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </label>
          ))}
          <div className={styles.buttonContainer}>
            {currentStep > 0 && (
              <p className={styles.navButton} onClick={handlePrevious}>Previous</p>
            )}
            {currentStep < 1 ? (
              <p className={styles.navButton} onClick={handleNext}>Next</p>
            ) : (
              <button type="submit" className={styles.submitButton}>Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
