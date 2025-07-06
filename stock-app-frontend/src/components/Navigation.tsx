import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, StockOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/portfolio',
      icon: <HomeOutlined />,
      label: 'Portfolio',
      onClick: () => navigate('/portfolio'),
    },
  ];

  return (
    <Header style={{ background: '#001529' }}>
      <div style={{ color: 'white', fontSize: '20px', float: 'left', marginRight: '20px' }}>
        <StockOutlined /> Stock Manager
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default Navigation;