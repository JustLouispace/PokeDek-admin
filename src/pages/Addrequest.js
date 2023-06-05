import React, { useEffect, useState } from 'react';
import Custominput from '../components/Custominput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, resetState } from "../features/Product/productSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import axios from 'axios';

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



const Addrequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);


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
        formik.values.images = img;
    }, [img]);


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

            axios.post(`http://localhost:5000/api/Request`, formData)
                .then((response) => {
                    // Assuming the POST request returns the created product's slug
                })
                .then(() => {
                    dispatch(resetState());
                    formik.resetForm();
                    setTimeout(() => {
                        navigate("/admin/Requset-list");
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    });

    return (
        <div>
            <h1 className='mb-4'>Add Request</h1>
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

                    <Custominput
                        type="number"
                        label="Hp"
                        name="hp"
                        onCh={formik.handleChange("hp")}
                        onBl={formik.handleBlur("hp")}
                        val={formik.values.hp}
                    />
                    {formik.touched.hp && formik.errors.hp && <div className="error">{formik.errors.hp}</div>}

                    <select
                        name="types"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.types}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        <option value="Grass">Grass</option>
                        <option value="Lightning">Lightning</option>
                        <option value="Fire">Fire</option>
                        <option value="Water">Water</option>
                        <option value="Metal">Metal</option>
                        <option value="Darknest">Darknest</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Colorless">Colorless</option>
                        <option value="Phychic">Phychic</option>
                        <option value="Dragon">Dragon</option>
                        <option value="Fairy">Fairy</option>
                    </select>
                    {formik.touched.types && formik.errors.types && (
                        <div className="error">{formik.errors.types}</div>
                    )}
                    {formik.touched.types && formik.errors.types && (
                        <div className="error">{formik.errors.types}</div>
                    )}
                    <Custominput
                        type="text"
                        label="Enter evolvesFrom"
                        name="evolvesFrom"
                        onCh={formik.handleChange("evolvesFrom")}
                        onBl={formik.handleBlur("evolvesFrom")}
                        val={formik.values.evolvesFrom}
                    />
                    {formik.touched.evolvesFrom && formik.errors.evolvesFrom && <div className="error">{formik.errors.evolvesFrom}</div>}
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
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
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

export default Addrequest;
