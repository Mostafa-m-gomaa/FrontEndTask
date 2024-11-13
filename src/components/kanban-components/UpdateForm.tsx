
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICase } from "../../types";


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

type IFormProps = {
  item: ICase;
  setShow: (show: boolean) => void;
};

export default function UpdateForm({ item , setShow }: IFormProps) {

  interface FormValues {
    title: string;
    name: string;
    age: number | string; 
    email: string;
    phone: string;
    status: string;
    id: string | number;
  }


const formik = useFormik<FormValues>({
    initialValues: {
      title: item.title,
      name: item.name,
      age: item.age,
      email: item.email,
      phone: item.phone,
      status: item.status,
      id: item.id, 
    },
    validationSchema,
    onSubmit: (values) => {
        setShow(false);
      const cases = JSON.parse(localStorage.getItem("cases") || "[]");

      const index = cases.findIndex((caseItem: FormValues) => caseItem.id === values.id);
      if (index !== -1) {
        cases[index] = { ...cases[index], ...values };
      } else {
        cases.push({ ...values, id: cases.length + 1 });
      }
      localStorage.setItem("cases", JSON.stringify(cases));
      

    },
  });
  const deleteCase = (id: string | number) => {
     setShow(false);
    const cases = JSON.parse(localStorage.getItem("cases") || "[]");
    const updatedCases = cases.filter((caseItem: FormValues) => caseItem.id !== id);
    localStorage.setItem("cases", JSON.stringify(updatedCases));

  };
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 h-full overflow-x-hidden overflow-y-scroll w-[95%] mx-auto px-2">
      <b>Update Form</b>

      <div className="flex flex-col">
        <input
          type="text"
          id="title"
          name="title"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          placeholder="Enter title"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          id="name"
          name="name"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Enter name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          id="age"
          name="age"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
          placeholder="Enter age"
        />
        {formik.touched.age && formik.errors.age ? (
          <div className="text-red-500">{formik.errors.age}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          id="email"
          name="email"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Enter email"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          id="phone"
          name="phone"
          className="ml-2 p-1 border rounded-md"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          placeholder="Enter phone"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}
      </div>
      <div className="flex flex-col">
    <select     
      name="status" 
    onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.status}
          className="ml-2 p-1 border rounded-md"  id="">
        <option value="unclaimed">Unclaimed</option>
        <option value="first contact">First Contact</option>
        <option value="preparing work offer">Preparing Work Offer</option>
        <option value="sent to therapists">Sent To Therapists</option>
    </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Update
      </button>
      <button type="button" onClick={() => deleteCase(formik.values.id)} className="bg-red-500 text-white p-2 rounded-md mt-4">
        Delete
      </button>
      
    </form>
  );
}


