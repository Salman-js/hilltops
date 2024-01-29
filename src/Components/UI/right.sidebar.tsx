import { IChore } from '@/Interface/Chore/chore.interface';
import { updateChore } from '@/store/slices/basic.slice';
import { RootState } from '@/store/store';
import {
  Alert,
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
import React, { useState } from 'react';
import { VscBell } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { logout, setNotificationCheckTime } from '@/store/slices/auth.slice';
import { INotification } from '@/Interface/User/user.interface';
import { getNotifMessage, getNotifications } from '../Home/data';
import { openModal } from '@/store/slices/modal.slice';

const RightSidebar: React.FC = () => {
  const { chores, items, vendors, purchases, discharges } = useSelector(
    (state: RootState) => state.data
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const filteredItems = items.filter(
    (itm) =>
      itm.user.username !== user?.username &&
      moment(itm.createdAt).isAfter(
        moment(user?.lastNotificationCheckTime ?? moment().subtract(1, 'day'))
      )
  );
  const filteredPurchases = purchases.filter(
    (itm) =>
      itm.user.username !== user?.username &&
      moment(itm.createdAt).isAfter(
        moment(user?.lastNotificationCheckTime ?? moment().subtract(1, 'day'))
      )
  );
  const filteredVendors = vendors.filter(
    (itm) =>
      itm.user.username !== user?.username &&
      moment(itm.createdAt).isAfter(
        moment(user?.lastNotificationCheckTime ?? moment().subtract(1, 'day'))
      )
  );
  const filteredDischarges = discharges.filter(
    (itm) =>
      itm.user.username !== user?.username &&
      moment(itm.createdAt).isAfter(
        moment(user?.lastNotificationCheckTime ?? moment().subtract(1, 'day'))
      )
  );
  const userName = user?.name;
  const isManager = user?.role === 'MANAGER';
  const processedNotifications: (INotification | undefined)[] = isManager
    ? getNotifications(
        filteredItems,
        filteredVendors,
        filteredPurchases,
        filteredDischarges
      )
    : [];
  const [notifications, setNotifications] = useState<
    (INotification | undefined)[]
  >(processedNotifications);
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
  const handleNotificationCheckTime = () => {
    dispatch(setNotificationCheckTime(moment()));
  };
  const menuItems: MenuProps['items'] = [
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
  const handleRemoveNotification = (id: string | undefined) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif?.id !== id)
    );
  };
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleNotificationCheckTime();
    }
  };
  const handleView = (notif: INotification | undefined) => {
    if (notif) {
      dispatch(
        openModal({
          name: notif.type,
          item: notif.item,
        })
      );
    }
  };
  return (
    <div className='sidebar-content'>
      <div className='sidebar-header-container'>
        <Popover
          trigger={['click']}
          zIndex={3}
          placement='bottomRight'
          title='Notifications'
          afterOpenChange={handleOpenChange}
          content={
            <div className='m-auto text-sm font-semibold text-gray-400 opacity-75 min-h-[5em] max-h-[10em] overflow-auto pt-4 flex justify-center items-center'>
              <div className='rounded-lg bg-white p-4'>
                {notifications?.length ? (
                  notifications.map((notif) => (
                    <Alert
                      message={getNotifMessage(notif)}
                      type='info'
                      closable
                      onClose={(e) => e.stopPropagation()}
                      afterClose={() => handleRemoveNotification(notif?.id)}
                      onClick={() => handleView(notif)}
                      className='mt-2 cursor-pointer'
                    />
                  ))
                ) : (
                  <div className='m-5 text-sm font-semibold text-gray-400 opacity-50'>
                    No notifications
                  </div>
                )}
              </div>
            </div>
          }
        >
          <Badge count={notifications?.length} size='small' color='blue'>
            <Button type='text' icon={<VscBell />} className='bg-white' />
          </Badge>
        </Popover>
        <Dropdown
          menu={{ items: menuItems }}
          trigger={['click']}
          placement='bottomRight'
        >
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
          {notifications?.length ? (
            notifications.map((notif) => (
              <Alert
                message={getNotifMessage(notif)}
                type='info'
                closable
                onClose={(e) => e.stopPropagation()}
                afterClose={() => handleRemoveNotification(notif?.id)}
                onClick={() => handleView(notif)}
                className='mt-2 cursor-pointer'
              />
            ))
          ) : (
            <div className='m-5 text-sm font-semibold text-gray-400 opacity-50'>
              No notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RightSidebar;
