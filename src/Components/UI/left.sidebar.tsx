import { ROUTES } from '@/router/constants';
import { RootState } from '@/store/store';
import {
  CheckOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import { LayoutDashboard } from 'lucide-react';
import React, { useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const LeftSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const isManager = user?.role === 'MANAGER';
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
      onClick: () => navigate(ROUTES.INVENTORY),
      icon: <BsBoxSeam size={18} />,
    },
    {
      key: 'vendor',
      label: 'Vendors',
      onClick: () => navigate(ROUTES.VENDOR),
      icon: <ShopOutlined />,
    },
    ...(isManager
      ? [
          {
            key: 'user',
            label: 'Users',
            icon: <UserOutlined />,
          },
        ]
      : []),
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
