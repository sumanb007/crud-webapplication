// EditStudent Component for updating student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";  // New imports
import StudentForm from "./StudentForm";

// EditStudent Component
const EditStudent = () => {
  const { id } = useParams();  // Extract route parameter (id)
  const navigate = useNavigate();  // For navigation
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  // onSubmit handler
  const onSubmit = (studentObject) => {
    axios
      .put(`http://192.168.0.11:5000/students/update-student/${id}`, studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          navigate("/student-list");  // Navigate to student list
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get(`http://192.168.0.11:5000/students/update-student/${id}`)
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, [id]);  // Add 'id' as dependency

  // Return student form
  return (
    <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Student
    </StudentForm>
  );
};

// Export EditStudent Component
export default EditStudent;

