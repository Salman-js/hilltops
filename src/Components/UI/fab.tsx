import { closeModal } from '@/store/slices/modal.slice';
import { RootState } from '@/store/store';
import { EditOutlined, FileOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const Fab: React.FC = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <>
      <FloatButton.Group
        trigger='hover'
        shape='square'
        icon={<EditOutlined />}
        className='lg:right-[20%] right-10'
      >
        <FloatButton icon={<BsBoxSeam />} tooltip='Add Item' />
      </FloatButton.Group>
      <Modal
        title={modal?.title}
        open={modal.isVisible}
        width={modal.width}
        onCancel={() => dispatch(closeModal())}
        onOk={() => dispatch(closeModal())}
        className='rounded-3xl'
        styles={{
          content: {
            borderRadius: '2em',
          },
        }}
        destroyOnClose
      >
        {modal.component}
      </Modal>
    </>
  );
};
export default Fab;
