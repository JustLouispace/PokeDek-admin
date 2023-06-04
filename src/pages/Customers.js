import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/Customers/customerSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import axios from "axios";

const Customerlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search email"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0" // Pass the product._id to showModal
            onClick={() => showModal(record.key)} // Pass the product.key to showModal
          >
            <AiFillDelete />
          </button>
        </>
      ),
    },
  ];

  const Customerslist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getUsers());
    }, []);
    const customerstate = useSelector((state) => state.customer.customers);
    const [searchedEmail, setSearchedEmail] = useState("");
    const data1 = customerstate
      .filter((customer) => customer.role !== "admin")
      .map((customer, index) => ({
        key: index + 1,
        name: customer.Name,
        email: customer.email,
        mobile: customer.mobile,
      }));

    const handleDeleteCustomer = async (customerId) => {
      try {
        const response = await axios.delete(`http://localhost:5000/api/user/${customerId}`);
        console.log(response.data);
        // Dispatch an action to remove the customer from your Redux store
      } catch (error) {
        console.log(error);
        // Handle the error
      }
    };

    return (
      <div>
        <h3 className="mb-4 title">Customers</h3>
        <div>
          <Table
            columns={columns}
            dataSource={data1} // Provide the data source for the table
            onChange={(pagination, filters, sorter) => {
              if (sorter.field === "name") {
                // Handle sorting logic for Name column
              } else if (sorter.field === "key") {
                // Handle sorting logic for SNo column
              }
            }}
          />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          title="Are you sure you want to delete this Product"
          performAction={() => handleDeleteCustomer(productId)}
        />
      </div>
    );
  };

  return <Customerslist />;
};

export default Customerlist;
