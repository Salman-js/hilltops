import { IUser } from '@/Interface/User/user.interface';
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
