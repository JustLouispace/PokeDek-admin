import React, { useEffect, useState } from 'react';
import Custominput from '../components/Custominput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../utils/axiosconfig';

const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().required("Email is Required").email("Email is not valid"),
  role: yup.string().required("Role is Required"),
});

const UpdateCustomer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [role, setrole] = useState('');
  const [id, setId] = useState('')

  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/user/${params.slug}`);


      setname(data.getUser.Name); // Changed this line
      setemail(data.getUser.email); // Changed this line
      setrole(data.getUser.role);
      setId(data.getUser._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  useEffect(() => {
    formik.setFieldValue('name', name);
    formik.setFieldValue('email', email);
    formik.setFieldValue('role', role);
  }, [name, email, role]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || "",
      name: name || "",
      email: email || "",
      role: role || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      const { id, name, email, role } = values;
      const formData = {
        id,
        name,
        email,
        role,
      };

      axios.put(`http://localhost:5000/api/user/edit-user`, formData, config)
        .then(() => {
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/customer");
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='mb-4'>Update User</h1>
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <Custominput
          type="text"
          label="Enter User Name"
          name="name"
          onCh={formik.handleChange}
          onBl={formik.handleBlur}
          val={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}


        <Custominput
          type="email"
          label="Enter Email"
          name="email"
          onCh={formik.handleChange}
          onBl={formik.handleBlur}
          val={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

        <Custominput
          type="text"
          label="Enter Role"
          name="role"
          onCh={formik.handleChange}
          onBl={formik.handleBlur}
          val={formik.values.role}
        />
        {formik.touched.role && formik.errors.role && <div className="error">{formik.errors.role}</div>}

        <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
