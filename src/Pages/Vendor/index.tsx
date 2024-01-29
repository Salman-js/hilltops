import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Dropdown, Modal, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { removeVendor } from '@/store/slices/basic.slice';
import { openModal } from '@/store/slices/modal.slice';
import { useState } from 'react';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { ethiopiaRegionsFlat } from '@/Components/Vendor/vendor.utils';

export default function Vendor() {
  const { vendors } = useSelector((state: RootState) => state.data);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id?: string;
  }>({
    open: false,
  });
  const dispatch = useDispatch();
  const handleEdit = (item: IVendor) => {
    dispatch(
      openModal({
        name: 'vendor',
        item,
      })
    );
  };
  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(removeVendor(id));
    }
    setDeleteModal({ open: false });
  };
  const columns: ColumnsType<IVendor> = [
    {
      title: '#',
      key: 'name',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'ID',
      dataIndex: 'vendorId',
      key: 'vendorId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      key: 'location',
      render: (text, record) => (
        <span>
          {record.location?.map((location) => {
            const address = ethiopiaRegionsFlat.find(
              (loc) => loc.value === location
            )?.label;
            return <Tag>{address}</Tag>;
          })}
        </span>
      ),
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
                onClick: () => handleEdit(record),
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
        <p className='welcome-text'>Vendors</p>
      </div>
      <div className='inventory-table-container'>
        <Table
          columns={columns}
          dataSource={vendors}
          className='mt-4'
          key='id'
        />
      </div>
      <Modal
        title='Delete Vendor'
        open={deleteModal.open}
        onCancel={() => setDeleteModal({ open: false })}
        onOk={() => handleDelete(deleteModal.id)}
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
        Are you sure you want to delete this vendor?
      </Modal>
    </main>
  );
}
