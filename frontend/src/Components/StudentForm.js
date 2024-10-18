// src/Components/StudentForm.js

import React from "react";
import * as Yup from "yup";
import {
    Formik, Form,
    Field, ErrorMessage
} from "formik";
import {
    FormGroup,
    FormControl, Button, FormLabel
} from "react-bootstrap";

const StudentForm = (props) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string()
            .email("You have entered an invalid email address")
            .required("Required"),
        rollno: Yup.number()
            .positive("Invalid roll number")
            .integer("Invalid roll number")
            .required("Required"),
    });

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Field
                            name="name"
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="name"
                            component="span"
                            className="text-danger"
                        />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Field
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className="text-danger"
                        />
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel htmlFor="rollno">Roll Number</FormLabel>
                        <Field
                            name="rollno"
                            type="number"
                            id="rollno"
                            placeholder="Enter your class roll number"
                            className="form-control"
                        />
                        <ErrorMessage
                            name="rollno"
                            component="span"
                            className="text-danger"
                        />
                    </FormGroup>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default StudentForm;

