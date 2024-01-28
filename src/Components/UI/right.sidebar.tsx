import { IChore } from '@/Interface/Chore/chore.interface';
import { addChore, updateChore } from '@/store/slices/basic.slice';
import { RootState } from '@/store/store';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  MenuProps,
  Popover,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ChevronDown } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import { VscBellDot } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import AddSamples from './add.samples';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '@/store/slices/auth.slice';

const RightSidebar: React.FC = () => {
  const chores = useSelector((state: RootState) => state.data.chores);
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name;
  const isManager = user?.role === 'MANAGER';
  const dispatch = useDispatch();
  const todaysChores = chores.filter((chore) =>
    moment(chore.date).isSame(moment(), 'day')
  );
  const handleDone = (e: CheckboxChangeEvent, chore: IChore) => {
    if (e.target.checked) {
      dispatch(
        updateChore({
          id: chore.id,
          chore: {
            ...chore,
            done: true,
          },
        })
      );
    } else {
      dispatch(
        updateChore({
          id: chore.id,
          chore: {
            ...chore,
            done: false,
          },
        })
      );
    }
  };
  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      icon: <UserOutlined />,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      danger: true,
      onClick: () => dispatch(logout()),
      icon: <LogoutOutlined />,
      key: '3',
    },
  ];
  return (
    <div className='sidebar-content'>
      <div className='sidebar-header-container'>
        <Button type='text' icon={<VscBellDot />} className='bg-white' />
        <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight'>
          <div className='sidebar-header-user-btn'>
            <Badge dot={isManager} color='blue'>
              <Avatar shape='square' size={25} />
            </Badge>
            <span>{userName}</span>
            <ChevronDown size={15} className='my-auto' />
          </div>
        </Dropdown>
      </div>
      <div className='sidebar-tile'>
        <p className='sidebar-title'>Today's Chores</p>
        <div className='sidebar-chores-container'>
          {todaysChores.length ? (
            todaysChores.map((chore) => (
              <div>
                <Checkbox
                  onChange={(e) => handleDone(e, chore)}
                  checked={chore.done}
                >
                  <span
                    className={
                      chore.done ? 'chore- title line-through' : 'chore-title'
                    }
                  >
                    {chore.title}
                  </span>
                </Checkbox>
              </div>
            ))
          ) : (
            <div className='m-5 text-sm font-semibold text-gray-400 opacity-50'>
              No chores today
            </div>
          )}
        </div>
      </div>
      <div className='sidebar-tile'>
        <p className='sidebar-title'>Notifications</p>
        <div className='sidebar-chores-container'>
          <div className='m-5 text-sm font-semibold text-gray-400 opacity-50'>
            No notifications
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
