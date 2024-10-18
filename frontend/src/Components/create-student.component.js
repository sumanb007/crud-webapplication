// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentForm from "./StudentForm";

// CreateStudent Component
const CreateStudent = () => {
const [formValues, setFormValues] =
	useState({ name: '', email: '', rollno: '' })
// onSubmit handler
const onSubmit = (studentObject, { resetForm, setSubmitting }) => {
        axios.post('http://192.168.0.11:5000/students/create-student', studentObject)
            .then(res => {
                if (res.status === 200) {
                    alert('Student successfully created');
                    resetForm(); // Reset form fields to initial state
                } else {
                    return Promise.reject();
                }
            })
            .catch(err => alert('Something went wrong'))
            .finally(() => setSubmitting(false)); // Ensure Formik submission ends
    };
	
// Return student form
return(
	<StudentForm initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Create Student
	</StudentForm>
)
}

// Export CreateStudent Component
export default CreateStudent

