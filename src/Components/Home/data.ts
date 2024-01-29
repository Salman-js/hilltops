import { IDischarge, IItem } from '@/Interface/Item/item.interface';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';
import { INotification, IUser } from '@/Interface/User/user.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { ColumnConfig, LineConfig } from '@ant-design/plots';

export const data = [
  {
    type: 'January',
    sales: 38,
  },
  {
    type: 'February',
    sales: 52,
  },
  {
    type: 'March',
    sales: 61,
  },
  {
    type: 'April',
    sales: 145,
  },
  {
    type: 'May',
    sales: 48,
  },
  {
    type: 'June',
    sales: 38,
  },
  {
    type: 'July',
    sales: 38,
  },
  {
    type: 'August',
    sales: 38,
  },
  {
    type: 'September',
    sales: 75,
  },
  {
    type: 'October',
    sales: 95,
  },
  {
    type: 'November',
    sales: 25,
  },
  {
    type: 'December',
    sales: 53,
  },
];
export const allUsers: IUser[] = [
  {
    id: String(new Date().getTime()),
    name: 'Manager',
    role: 'MANAGER',
    username: 'manager',
    password: '123456',
  },
  {
    id: String(new Date().getTime() + 25),
    name: 'Worker',
    role: 'POFFICER',
    username: 'officer',
    password: '123456',
  },
];
export const lineConfig: LineConfig = {
  data,
  padding: 'auto',
  xField: 'type',
  yField: 'sales',
  height: 200,
  autoFit: true,
  xAxis: {
    // type: 'timeCat',
    tickCount: 5,
  },
  smooth: true,
  scrollbar: {
    type: 'horizontal',
  },
  animation: {
    appear: {
      animation: 'path-in',
      duration: 2000,
    },
  },
};

export const barConfig: ColumnConfig = {
  data,
  xField: 'type',
  yField: 'sales',
  legend: false,
  height: 200,
  minColumnWidth: 30,
  maxColumnWidth: 30,
  autoFit: true,
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  scrollbar: {
    type: 'horizontal',
  },
};
export const getNotifications = (
  items: IItem[],
  vendors: IVendor[],
  purchases: IPurchase[],
  discharges: IDischarge[]
): INotification[] => {
  const result: INotification[] = [];
  items.map((itm) => {
    result.push({
      id: itm.id,
      name: itm.user.name,
      type: 'item',
      time: itm.createdAt,
      item: itm,
    });
  });
  vendors.map((itm) => {
    result.push({
      id: itm.id,
      name: itm.user.name,
      type: 'vendor',
      time: itm.createdAt,
      item: itm,
    });
  });
  purchases.map((itm) => {
    result.push({
      id: itm.id,
      name: itm.user.name,
      type: 'purchase',
      time: itm.createdAt,
      item: itm,
    });
  });
  discharges.map((itm) => {
    result.push({
      id: itm.id,
      name: itm.user.name,
      type: 'discharge',
      time: itm.createdAt,
      item: itm,
    });
  });
  console.log('Notifs: ', result);
  return result;
};
export const getNotifMessage = (notif: INotification | undefined): string => {
  if (notif) {
    switch (notif.type) {
      case 'item':
        return `${notif.name} added new inventory item`;
        break;
      case 'vendor':
        return `${notif.name} added new vendor`;
        break;
      case 'purchase':
        return `${notif.name} made an inventory adjustment`;
        break;
      case 'discharge':
        return `${notif.name} made an inventory adjustment`;
        break;
      default:
        return '';
    }
  } else {
    return '';
  }
};
