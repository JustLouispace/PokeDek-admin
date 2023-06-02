import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { VscDashboard } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
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
              icon: <VscDashboard className='fs-4' />,
              label: 'Customer',
            },
            {
              key: 'product-ctrl',
              icon: <VscDashboard className='fs-4' />,
              label: 'Product',
              children: [
                {
                  key: 'add-product',
                  icon: <VscDashboard className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <VscDashboard className='fs-4' />,
                  label: 'Product-list',
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
          <div>
            <div></div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img className="profile-img" src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="" />
              </div>
              <div>
                <h5 className='mb-0'>LouisJaaa</h5>
                <p className='mb-0'>LouisJaaaaaaa@gmail.com</p>
              </div>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;