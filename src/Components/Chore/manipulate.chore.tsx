import { IChore } from '@/Interface/Chore/chore.interface';
import { updateChore } from '@/store/slices/basic.slice';
import { RootState } from '@/store/store';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
type manipulateChoresProps = {
  chores: IChore[];
};
const ManipulateChores: React.FC<manipulateChoresProps> = ({
  chores: givenChores,
}) => {
  const chores = useSelector((state: RootState) => state.data.chores);
  const dispatch = useDispatch();
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
  return (
    <div className='sidebar-chores-container'>
      {givenChores.map((chore) => {
        const realChore = chores.find((chr) => chr.id === chore.id);
        return (
          <div>
            <Checkbox
              onChange={(e) => handleDone(e, chore)}
              checked={realChore?.done}
            >
              <span
                className={
                  realChore?.done ? 'chore- title line-through' : 'chore-title'
                }
              >
                {chore.title}
              </span>
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};
export default ManipulateChores;
