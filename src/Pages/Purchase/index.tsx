import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Dropdown, Modal, Tabs, Tag } from 'antd';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { removeDischarge, removePurchase } from '@/store/slices/basic.slice';
import { ModalNameType, openModal } from '@/store/slices/modal.slice';
import { useState } from 'react';
import { IPPurchase, IPurchase } from '@/Interface/Purchase/purchase.interface';
import moment from 'moment';
import { IDischarge } from '@/Interface/Item/item.interface';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/router/constants';

export default function Purchase() {
  const { purchases, discharges } = useSelector(
    (state: RootState) => state.data
  );
  const processedPurchases: IPPurchase[] = purchases.map((purchase) => {
    const children = purchase.items;
    return {
      ...purchase,
      children,
    };
  });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id?: string;
    type: 'purchase' | 'discharge';
  }>({
    open: false,
    type: 'purchase',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = (type: ModalNameType, item: IPurchase | IDischarge) => {
    dispatch(
      openModal({
        name: type,
        item,
        title: 'Inventory Adjustment',
        width: 700,
      })
    );
  };
  const handleDelete = (
    type: 'purchase' | 'discharge',
    id: string | undefined
  ) => {
    if (id) {
      if (type === 'purchase') {
        dispatch(removePurchase(id));
      } else {
        dispatch(removeDischarge(id));
      }
    }
  };
  const purchaseColumns: ColumnsType<IPPurchase> = [
    {
      title: '#',
      key: 'name',
      render: (text, record, index) => (
        <span>{record.children && index + 1}</span>
      ),
    },
    {
      title: 'Order #',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Date',
      key: 'name',
      render: (text, record) => (
        <span>
          {record.children && moment(record.date).format('MMM, DD/YYYY')}
        </span>
      ),
    },
    {
      title: 'Items Bought',
      key: 'items',
      render: (text, record) => (
        <span>
          {!record.unitPrice && record.children ? (
            record.children?.map((item) => {
              return <Tag>{item.item?.name}</Tag>;
            })
          ) : (
            <Tag>{record.item?.name}</Tag>
          )}
        </span>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (text, record, index) => (
        <span>
          {record.children
            ? record.children
                .reduce((sum, item) => {
                  const quantity = item.quantity ?? 0;
                  const unitPrice = item.unitPrice ?? 0;
                  const amount = quantity * unitPrice;
                  return sum + amount;
                }, 0)
                .formatCurrency()
            : (
                (record.quantity ?? 0) * (record.unitPrice ?? 0)
              ).formatCurrency()}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'tags',
      render: (_: number, record) => (
        <>
          {record.children ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '2',
                    label: 'Edit',
                    onClick: () => handleEdit('purchase', record),
                    icon: <EditOutlined />,
                  },
                  {
                    key: '3',
                    label: 'Delete',
                    danger: true,
                    onClick: () =>
                      setDeleteModal({
                        id: record.id,
                        open: true,
                        type: 'purchase',
                      }),
                    icon: <DeleteOutlined />,
                  },
                ],
              }}
              placement='bottomCenter'
              arrow={{ pointAtCenter: true }}
              trigger={['click']}
            >
              <Button type='text' icon={<MoreOutlined />} />
            </Dropdown>
          ) : null}
        </>
      ),
    },
  ];
  const dischargeColumns: ColumnsType<IDischarge> = [
    {
      title: '#',
      key: 'name',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Order #',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Date',
      key: 'name',
      render: (text, record) => (
        <span>{moment(record.date).format('MMM, DD/YYYY')}</span>
      ),
    },
    {
      title: 'Item Discharged',
      key: 'items',
      render: (text, record) => <span>{<Tag>{record.item?.name}</Tag>}</span>,
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (text, record, index) => <span>{record.quantity}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'tags',
      render: (_: number, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: '2',
                label: 'Edit',
                onClick: () => handleEdit('discharge', record),
                icon: <EditOutlined />,
              },
              {
                key: '3',
                label: 'Delete',
                danger: true,
                onClick: () =>
                  setDeleteModal({
                    id: record.id,
                    open: true,
                    type: 'discharge',
                  }),
                icon: <DeleteOutlined />,
              },
            ],
          }}
          placement='bottomCenter'
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <Button type='text' icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  return (
    <main className='home-container'>
      <div className='home-header'>
        <div className='w-full flex flex-row justify-start py-8'>
          <Button
            icon={<ArrowLeftOutlined />}
            type='text'
            onClick={() => navigate(ROUTES.INVENTORY)}
          />
          <div className='ml-6'>
            <span className='welcome-text'>Inventory Adjustments</span>
          </div>
        </div>
      </div>
      <div className='inventory-table-container'>
        <Tabs
          items={[
            {
              label: 'Additions',
              key: '0',
              children: (
                <Table
                  columns={purchaseColumns}
                  dataSource={processedPurchases}
                  className='mt-4'
                  key='id'
                />
              ),
            },
            {
              label: 'Discharges',
              key: '1',
              children: (
                <Table
                  columns={dischargeColumns}
                  dataSource={discharges}
                  className='mt-4'
                  key='id'
                />
              ),
            },
          ]}
        />
      </div>
      <Modal
        title={`Delete ${
          deleteModal.type === 'purchase' ? 'Purchase' : 'Discharge'
        }`}
        open={deleteModal.open}
        onCancel={() => setDeleteModal({ open: false, type: 'purchase' })}
        onOk={() => handleDelete(deleteModal.type, deleteModal.id)}
        className='rounded-3xl'
        okText='Delete'
        okType='primary'
        okButtonProps={{
          danger: true,
        }}
        styles={{
          content: {
            borderRadius: '2em',
            backgroundColor: '#fafafa',
          },
          mask: {
            backdropFilter: 'blur(3px)',
          },
          header: {
            backgroundColor: '#fafafa',
          },
        }}
        destroyOnClose
      >
        Are you sure you want to delete this {deleteModal.type}?
      </Modal>
    </main>
  );
}
