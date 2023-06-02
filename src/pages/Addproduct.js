import React, { useState } from 'react';
import Custominput from '../components/Custominput';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const Addproduct = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    }
    return (
        <div>
            <h1 className='mb-4'>Addproduct</h1>
            <div>
                <form>
                    <Custominput type="text" label="Enter Product Name" />
                    <div className='mb-3'>
                        <ReactQuill
                            theme='snow'
                            value={desc}
                            onChange={(evt) => {
                                handleDesc(evt);
                            }}
                        />
                    </div>
                    <Custominput type="text" label="supertype" />
                    <Custominput type="text" label="subtype" />
                    <Custominput type="text" label="hp" />
                    <select name='' className='form-control py-3 mb-3' id='' >
                        <option value="">Fire</option>
                        <option value="">Grass</option>
                    </select>
                    <select name='' className='form-control py-3 mb-3' id='' >
                        <option value="">evolvesFrom</option>
                    </select>
                    <Dragger {...props}>
            <form action="">
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-text'>
                Helloooooooooo
              </p>
            </form>
          </Dragger>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct