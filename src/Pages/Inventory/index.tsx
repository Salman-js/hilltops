import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import {
  categoryOptions,
  categoryOptionsFlat,
  getStockAmount,
} from '@/Components/Item/item.utils';
import CategoryCard from '@/Components/Item/category.card';
import Table, { ColumnsType } from 'antd/es/table';
import { IItem } from '@/Interface/Item/item.interface';
import { Button, Dropdown, Modal, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { removeItem } from '@/store/slices/basic.slice';
import { openModal } from '@/store/slices/modal.slice';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import { ROUTES } from '@/router/constants';

export default function Inventory() {
  const { items, purchases, discharges } = useSelector(
    (state: RootState) => state.data
  );
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id?: string;
  }>({
    open: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemIdQuery = queryParams.get('category') ?? '';
  const categories: string[] = categoryOptions.map(({ value }) =>
    value.toString()
  );
  const dispatch = useDispatch();
  const slides = categories.map((category, index) => (
    <CategoryCard key={index} category={category} />
  ));
  const handleEdit = (item: IItem) => {
    dispatch(
      openModal({
        name: 'item',
        item,
      })
    );
  };
  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };
  const columns: ColumnsType<IItem> = [
    {
      title: '#',
      key: 'name',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'ID',
      dataIndex: 'itemId',
      key: 'itemId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      key: 'name',
      render: (text, record) => (
        <span>
          {record.category?.map((category) => {
            const cat = categoryOptionsFlat.find(
              (cat) => cat.value === category
            )?.label;
            return <Tag>{cat}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: 'Amount in inventory',
      key: 'name',
      render: (text, record) => {
        return (
          <span>
            {getStockAmount(record, purchases, discharges).formatNumber()}
          </span>
        );
      },
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
        <p className='welcome-text'>Inventory</p>
      </div>
      <div className='category-carousel-container'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=''
          containerClass='category-carousel'
          dotListClass=''
          draggable
          focusOnSelect={false}
          infinite={false}
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 4,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=''
          slidesToSlide={1}
          swipeable
        >
          {slides}
        </Carousel>
      </div>
      <div className='inventory-table-container'>
        <div className='w-full flex flex-row justify-between'>
          <div>
            <span className='text-lg text-gray-900 font-semibold tracking-wide'>
              Recent Additions
            </span>
          </div>
          <Button
            icon={<HiOutlineArrowsUpDown />}
            onClick={() => navigate(ROUTES.ADJUSTMENT)}
          >
            Adjustments
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={items.filter((item: IItem) =>
            String(item.category).includes(itemIdQuery)
          )}
          className='mt-4'
          key='id'
        />
      </div>
      <Modal
        title='Delete Item'
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
        Are you sure you want to delete this item?
      </Modal>
    </main>
  );
}
