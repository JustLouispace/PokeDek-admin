import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, resetState } from "../features/Product/productSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Supertype",
    dataIndex: "supertype",
    sorter: (a, b) => {
      const supertypeA = a.supertype || ""; // Handle undefined values
      const supertypeB = b.supertype || ""; // Handle undefined values
      return supertypeA.length - supertypeB.length;
    },
  },
  {
    title: "Subtypes",
    dataIndex: "subtypes",
    sorter: (a, b) => {
      const subtypesA = a.subtypes || ""; // Handle undefined values
      const subtypesB = b.subtypes || ""; // Handle undefined values
      return subtypesA.length - subtypesB.length;
    },
  },
  {
    title: "Hp",
    dataIndex: "hp",
    sorter: (a, b) => a.hp - b.hp,
  },
  {
    title: "Types",
    dataIndex: "types",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "EvolvesFrom",
    dataIndex: "evolvesfrom",
    sorter: (a, b) => a.hp - b.hp,
  },
  {
    title: "Images",
    dataIndex: "images",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data = productState.map((product, index) => ({
    key: index + 1,
    title: product.name,
    supertype: product.supertype,
    subtypes: product.subtypes,
    hp: product.hp,
    types: product.types,
    evolvesfrom: product.evolvesFrom,
    images: (
      <div className="d-flex gap-2">
        {product.images.map((image, i) => (
          <img
            key={i}
            src={image.url}
            alt={`Image ${i + 1}`}
            width={50}
            height={50}
          />
        ))}
      </div>
    ),
    action: (
      <>
        <Link to={`/admin/updateproduct/${product._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product._id)} // Pass the product._id to showModal
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));
  const handleDeleteProduct = (productId) => {
    setOpen(false);
    dispatch(deleteProduct(productId));
    dispatch(getProducts())
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this Product"
        performAction={() => handleDeleteProduct(productId)}
      />
    </div>
  );
};

export default Productlist;
