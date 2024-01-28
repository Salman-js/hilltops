import { IChore } from '@/Interface/Chore/chore.interface';
import { updateChore } from '@/store/slices/basic.slice';
import { RootState } from '@/store/store';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type manipulateChoresProps = {
  chores: IChore[];
};
const ManipulateChores: React.FC<manipulateChoresProps> = ({
  chores: givenChores,
}) => {
  const chores = useSelector((state: RootState) => state.data.chores);
  const dispatch = useDispatch();
  const [newChoreModalOpen, setNewChoreModalOpen] = useState(false);
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
    <div className='rounded-lg bg-white p-4 max-h-[15em] min-h-[15em] overflow-y-auto'>
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
                  realChore?.done ? 'chore-title line-through' : 'chore-title'
                }
              >
                {chore.title}
              </span>
            </Checkbox>
          </div>
        );
      })}
      <Button
        icon={<PlusOutlined />}
        className='shadow-md absolute bottom-10 right-10'
      />
      <Modal
        title='New Chore'
        open={newChoreModalOpen}
        width={400}
        className='rounded-3xl'
        style={{
          top: 50,
        }}
        styles={{
          content: {
            borderRadius: '2em',
            backgroundColor: '#fafafa',
            maxHeight: '40em',
            overflow: 'auto',
            paddingBottom: 0,
          },
          body: {
            minHeight: '15em',
          },
          mask: {
            backdropFilter: 'blur(3px)',
          },
          header: {
            backgroundColor: '#fafafa',
          },
          footer: {
            display: 'none',
          },
        }}
        destroyOnClose
      >
        <div className='p-10'></div>
      </Modal>
    </div>
  );
};
export default ManipulateChores;
