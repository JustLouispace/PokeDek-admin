import React, { useEffect, useState } from 'react';
import Custominput from '../components/Custominput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, resetState, updateAProduct } from "../features/Product/productSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import axios from 'axios';
import { config } from '../utils/axiosconfig';


const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  supertype: yup.string().required("Supertype is Required"),
  subtypes: yup.string().required("Subtypes is Required"),
  hp: yup.string().required("Hp is Required"),
  types: yup
    .string()
    .test("is-required", "Types is Required", (value) => value !== ""),
  evolvesFrom: yup
    .string()
    .test("is-required", "EvolvesFrom is Required", (value) => value !== ""),
});

const Addproduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [supertype, setsupertype] = useState('');
  const [subtypes, setsubtypes] = useState('');
  const [hp, sethp] = useState('');
  const [types, setTypes] = useState('');
  const [evolvesFrom, setEvolvesFrom] = useState('');



  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/PokemonCard/${params.slug}`);
      console.log(data);
      setName(data.name);
      setsupertype(data.supertype);
      setsubtypes(data.subtypes);
      sethp(data.hp);
      setTypes(data.types);
      setEvolvesFrom(data.evolvesFrom);
      setImages(data.images);
      formik.setFieldValue('images', data.images);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  useEffect(() => {
    formik.setFieldValue('name', name);
    formik.setFieldValue('supertype', supertype);
    formik.setFieldValue('subtypes', subtypes);
    formik.setFieldValue('hp', hp);
    formik.setFieldValue('types', types);
    formik.setFieldValue('evolvesFrom', evolvesFrom);
  }, [name, supertype, subtypes, hp, types, evolvesFrom,]);

  const imgState = useSelector((state) => state.upload.images);
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  console.log(img);

  useEffect(() => {
    formik.setFieldValue('images', images);
  }, [images]);

  useEffect(() => {
    const img = [];
    imgState.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });
    formik.setFieldValue('images', [...formik.values.images, ...img]);
  }, [imgState]);

  const formik = useFormik({
    initialValues: {
      name: "",
      supertype: "",
      subtypes: "",
      price: "",
      hp: "",
      types: "",
      evolvesFrom: "",
      images: []
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { name, supertype, subtypes, hp, types, evolvesFrom, images } = values;
      const formData = {
        name,
        supertype,
        subtypes,
        hp: hp.toString(),
        types,
        evolvesFrom,
        images,
      };


      if (params.slug) {
        axios.put(`http://localhost:5000/api/PokemonCard/${params.slug}`, formData, config)
          .then(() => {
            // Rest of the code
          })
          .catch((error) => {
            // Handle error
          })
          .then(() => {
            dispatch(resetState());
            formik.resetForm();
            setTimeout(() => {
              navigate("/admin/product-list");
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            // Handle error
          });


      }
    }
  });


  return (
    <div>
      <h1 className='mb-4'>UppdataProduct</h1>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <Custominput
            type="text"
            label="Enter Product Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

          <Custominput
            type="text"
            label="Enter Supertype"
            name="supertype"
            onCh={formik.handleChange("supertype")}
            onBl={formik.handleBlur("supertype")}
            val={formik.values.supertype}
          />
          {formik.touched.supertype && formik.errors.supertype && <div className="error">{formik.errors.supertype}</div>}

          <Custominput
            type="text"
            label="Subtype"
            name="subtypes"
            onCh={formik.handleChange("subtypes")}
            onBl={formik.handleBlur("subtypes")}
            val={formik.values.subtypes}
          />
          {formik.touched.subtypes && formik.errors.subtypes && <div className="error">{formik.errors.subtypes}</div>}

          

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {formik.values.images?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => {
                      const filteredImages = formik.values.images.filter((img) => img.public_id !== i.public_id);
                      formik.setFieldValue('images', filteredImages);
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button type="submit" className="btn btn-success border-0 rounded-3 my-5">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
