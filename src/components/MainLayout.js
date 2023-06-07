import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { VscDashboard } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { RxCardStack } from "react-icons/rx";
import { TbCards } from "react-icons/tb";
import { CgCardSpades } from "react-icons/cg";
import { GiCardPlay } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { VscRequestChanges } from "react-icons/vsc";
import { RiFileListLine } from "react-icons/ri";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleSignout = () => {
    // Clear data in local storage
    localStorage.removeItem('user');
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">PK</span>
            <span className="lg-logo">Pokedek</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <VscDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customer',
              icon: <RxCardStack className='fs-4' />,
              label: 'Customer',
            },
            {
              key: 'product-ctrl',
              icon: <TbCards className='fs-4' />,
              label: 'Product',
              children: [
                {
                  key: 'add-product',
                  icon: <CgCardSpades className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <GiCardPlay className='fs-4' />,
                  label: 'Product-list',
                },


              ]
            },
            {
              key: 'request-ctrl',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Request',
              children: [
                {
                  key: 'add-Requset',
                  icon: <VscRequestChanges className='fs-4' />,
                  label: 'Add Requsett',
                },
                {
                  key: 'Requset-list',
                  icon: <RiFileListLine className='fs-4' />,
                  label: 'Requset-list',
                },


              ]
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="d-flex justify-content-between ps-1 pe-5" style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center dropdown">
            <div>
              <img className="profile-img" src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="" />
            </div>
            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <h5 className="mb-0">Hi Admin</h5>
              <p className="mb-0">You can click here to logout</p>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/"
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  onClick={handleSignout}
                  to="/"
                >
                  Signout
                </Link>
              </li>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light" />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;