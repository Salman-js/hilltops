import { ROUTES } from '@/router/constants';
import {
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import { LayoutDashboard } from 'lucide-react';
import React, { useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const LeftSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      onClick: () => navigate(ROUTES.HOME),
      icon: <LayoutDashboard size={20} />,
    },
    {
      key: 'inventory',
      label: 'Inventory',
      icon: <BsBoxSeam size={18} />,
    },
    {
      key: 'purchase',
      label: 'Purchases',
      icon: <ShoppingCartOutlined style={{ fontSize: 20 }} />,
    },
    {
      key: 'vendor',
      label: 'Vendors',
      icon: <ShopOutlined />,
    },
    {
      key: 'user',
      label: 'Users',
      icon: <UserOutlined />,
    },
    {
      key: 'chore',
      label: 'Chores',
      onClick: () => navigate(ROUTES.CHORE),
      icon: <CheckOutlined />,
    },
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='sidebar-content'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: collapsed ? 'center' : 'flex-end',
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <Button
          type='default'
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
      <Menu
        mode='inline'
        theme='light'
        inlineCollapsed={collapsed}
        items={items}
        style={{
          borderRight: 'none',
        }}
      />
    </div>
  );
};
export default LeftSidebar;
