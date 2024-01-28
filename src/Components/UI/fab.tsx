import {
  ModalNameType,
  closeModal,
  openModal,
} from '@/store/slices/modal.slice';
import { RootState } from '@/store/store';
import { EditOutlined, ShopOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ItemForm from '../Item/form.item';
import { IItem } from '@/Interface/Item/item.interface';
import PurchaseForm from '../Purchase/form.purchase';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';
import { generateModalTitle } from '@/Utils/generate';
import VendorForm from '../Vendor/form.vendor';
import { IVendor } from '@/Interface/Vendor/vendor.interface';

const Fab: React.FC = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const handleOpenModal = (type: ModalNameType, width = 600) => {
    dispatch(
      openModal({
        name: type,
        item: null,
        title: generateModalTitle(type),
        width,
      })
    );
  };
  return (
    <>
      <FloatButton.Group
        trigger='hover'
        shape='square'
        icon={<EditOutlined />}
        className='lg:right-[20%] right-10'
      >
        <FloatButton
          icon={<MdAddShoppingCart />}
          tooltip='New Purchase'
          onClick={() => handleOpenModal('purchase', 700)}
        />
        <FloatButton
          icon={<ShopOutlined />}
          tooltip='New Vendor'
          onClick={() => handleOpenModal('vendor')}
        />
        <FloatButton
          icon={<BsBoxSeam />}
          tooltip='New Item'
          onClick={() => handleOpenModal('item')}
        />
      </FloatButton.Group>
      <Modal
        title={modal?.title}
        open={modal.isVisible}
        width={modal.width}
        onCancel={() => dispatch(closeModal())}
        className='rounded-3xl'
        footer={[]}
        style={{
          top: 30,
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
        {modal.component ? (
          modal.component
        ) : modal.name === 'item' ? (
          <ItemForm item={(modal.item as IItem) ?? null} />
        ) : modal.name === 'purchase' ? (
          <PurchaseForm item={(modal.item as IPurchase) ?? null} />
        ) : modal.name === 'vendor' ? (
          <VendorForm item={(modal.item as IVendor) ?? null} />
        ) : null}
      </Modal>
    </>
  );
};
export default Fab;
