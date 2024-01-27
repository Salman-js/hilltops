import { IChore } from '@/Interface/Chore/chore.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import {
  addChore,
  addVendor,
  removeChore,
  removeVendor,
  resetData,
} from '@/store/slices/basic.slice';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';

const AddSamples: React.FC = () => {
  const dispatch = useDispatch();
  const chores: IChore[] = [
    {
      id: String(new Date().getTime() + 523),
      title: 'Chore 1',
      date: moment(),
      done: false,
    },
    {
      id: String(new Date().getTime() + 32),
      title: 'Chore 2',
      date: moment().add(2, 'day'),
      done: false,
    },
    {
      id: String(new Date().getTime() + 786),
      title: 'Chore 3',
      date: moment().add(3, 'day'),
      done: false,
    },
    {
      id: String(new Date().getTime() + 824),
      title: 'Chore 4',
      date: moment().add(4, 'day'),
      done: false,
    },
  ];
  const vendors: IVendor[] = [
    {
      id: String(moment().add(1, 'day').date()),
      name: 'Vendor 1',
    },
    {
      id: String(moment().add(2, 'day').date()),
      name: 'Vendor 2',
    },
    {
      id: String(moment().add(3, 'day').date()),
      name: 'Vendor 3',
    },
    {
      id: String(moment().add(4, 'day').date()),
      name: 'Vendor 4',
    },
    {
      id: String(moment().add(5, 'day').date()),
      name: 'Vendor 5',
    },
  ];
  const handleAddSamples = (type: 'chore' | 'vendor') => {
    if (type === 'chore') {
      dispatch(resetData());
      chores.forEach((chore) => {
        dispatch(addChore(chore));
      });
    } else {
      dispatch(resetData());
      vendors.forEach((vendor) => {
        dispatch(addVendor(vendor));
      });
    }
  };
  return (
    <div>
      <button onClick={() => handleAddSamples('vendor')}>Add vendors</button>
      <button onClick={() => handleAddSamples('chore')}>Add chores</button>
    </div>
  );
};
export default AddSamples;
