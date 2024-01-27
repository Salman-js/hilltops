import ManipulateChores from '@/Components/Chore/manipulate.chore';
import { Calendar } from '@/Components/UI/Custom Pickers';
import { IChore } from '@/Interface/Chore/chore.interface';
import { openModal } from '@/store/slices/modal.slice';
import { RootState } from '@/store/store';
import { Badge, CalendarProps } from 'antd';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Chore() {
  const { chores } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const getListData = (value: Moment, period: 'day' | 'month'): IChore[] => {
    const selectedChores: IChore[] = chores.filter((chore) =>
      moment(chore.date).isSame(moment(value), period)
    );
    return selectedChores;
  };
  const dateCellRender = (value: Moment) => {
    const listData: IChore[] = getListData(value, 'day');
    return (
      <div className='events'>
        {listData.map((item) => {
          const realChore = chores.find((chr) => chr.id === item.id);
          return (
            <Badge
              key={item.id}
              status={item.done ? 'success' : 'processing'}
              text={item.title}
              className={
                realChore?.done ? 'chore- title line-through' : 'chore-title'
              }
            />
          );
        })}
      </div>
    );
  };

  const monthCellRender = (value: Moment) => {
    const listData: IChore[] = getListData(value, 'month');
    return (
      <div className='events'>
        {listData.map((item) => (
          <Badge
            key={item.id}
            status={item.done ? 'success' : 'processing'}
            text={item.title}
          />
        ))}
      </div>
    );
  };
  const cellRender: CalendarProps<Moment>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  const handleSelect = (
    value: Moment,
    info: { source: 'year' | 'month' | 'date' | 'customize' }
  ) => {
    const selectedChores: IChore[] = chores.filter((chore) =>
      moment(chore.date).isSame(
        moment(value),
        info.source === 'date' ? 'day' : 'month'
      )
    );
    dispatch(
      openModal({
        isVisible: true,
        component: <ManipulateChores chores={selectedChores} />,
        title: 'Chores',
      })
    );
  };
  return (
    <main className='chore-container'>
      <div className='w-full text-left'>
        <p className='welcome-text'>Chores</p>
      </div>
      <div className='chore-calendar-container'>
        <Calendar cellRender={cellRender} onSelect={handleSelect} />
      </div>
    </main>
  );
}
