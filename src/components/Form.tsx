
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AppContext } from "../App";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.number().typeError("Age must be a number").required("Age is required").min(1, "Age must be at least 1"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
});

const Form: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
      age: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
     
      const cases = JSON.parse(localStorage.getItem("cases") || "[]");
        const newCase = {
            ...values,
            id: cases.length + 1,  
            status: "unclaimed",            };
     
      cases.push(newCase);

  
      localStorage.setItem("cases", JSON.stringify(cases));
      setRefresh(!refresh);

      console.log("Form submitted and data saved to localStorage", cases);
    },
  });

  const { refresh, setRefresh } = useContext(AppContext)!;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4  h-full overflow-x-hidden overflow-y-scroll w-[90%] lg:w-[25%] px-2">
      <b>Form</b>

      <div className="flex flex-col">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.touched.age && formik.errors.age ? (
          <div className="text-red-500">{formik.errors.age}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Submit
      </button>
      
    </form>
  );
};

export default Form;
