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
import { IDischarge, IItem } from '@/Interface/Item/item.interface';
import PurchaseForm from '../Purchase/form.purchase';
import { IPurchase } from '@/Interface/Purchase/purchase.interface';
import { generateModalTitle } from '@/Utils/generate';
import VendorForm from '../Vendor/form.vendor';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import ItemDischargeForm from '../Item/form.item.discharge';
import AdjustmentForm from '../Item/adjustment.form';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';

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
          icon={<HiOutlineArrowsUpDown />}
          tooltip='Inventory Adjustment'
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
          top: 10,
        }}
        styles={{
          content: {
            borderRadius: '2em',
            backgroundColor: '#fafafa',
            maxHeight: '43em',
            overflow: 'hidden',
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
          <AdjustmentForm
            item={(modal.item as IPurchase) ?? null}
            type='purchase'
          />
        ) : modal.name === 'vendor' ? (
          <VendorForm item={(modal.item as IVendor) ?? null} />
        ) : modal.name === 'discharge' ? (
          <AdjustmentForm
            item={(modal.item as IDischarge) ?? null}
            type='discharge'
          />
        ) : null}
      </Modal>
    </>
  );
};
export default Fab;
