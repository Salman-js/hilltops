import { IItem } from '@/Interface/Item/item.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { ShopFilled, UserOutlined } from '@ant-design/icons';
import { Alert, Col, Row, Space } from 'antd';
import React from 'react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';
import { HiUser } from 'react-icons/hi';

export type tileHomeProps = {
  vendors: IVendor[];
  items: IItem[];
};

const HomeTopTile: React.FC<tileHomeProps> = ({ vendors, items }) => {
  const alerts = [
    {
      message: 'Item 1 has almost ran out. Replenish soon.',
    },
    {
      message: 'Item 2 has almost ran out. Replenish soon.',
    },
    {
      message: 'Item 3 has almost ran out. Replenish soon.',
    },
    {
      message: 'Item 4 has almost ran out. Replenish soon.',
    },
  ];
  return (
    <div className='home-header-tiles-container'>
      <Row gutter={[16, 16]}>
        <Col lg={11} xs={24}>
          <div className='home-header-tile p-6'>
            <Row gutter={[16, 16]}>
              <Col lg={12} sm={12} xs={24} className='home-tile'>
                <div className='home-tile-icon-container'>
                  <BsBoxSeamFill size={25} />
                </div>
                <div className='home-tile-text-container'>
                  <div className='border border-black'>
                    <span className='home-tile-title'>Items</span>
                  </div>
                  <div>
                    <span className='home-tile-value'>{items.length}</span>
                  </div>
                </div>
              </Col>
              <Col lg={12} sm={12} xs={24} className='home-tile'>
                <div className='home-tile-icon-container'>
                  <ShopFilled className='text-2xl' />
                </div>
                <div className='home-tile-text-container'>
                  <div className='border border-black'>
                    <span className='home-tile-title'>Vendors</span>
                  </div>
                  <div>
                    <span className='home-tile-value'>{vendors.length}</span>
                  </div>
                </div>
              </Col>
              <Col lg={12} sm={12} xs={24} className='home-tile'>
                <div className='home-tile-icon-container'>
                  <UserOutlined className='text-2xl' />
                </div>
                <div className='home-tile-text-container'>
                  <div className='border border-black'>
                    <span className='home-tile-title'>Users</span>
                  </div>
                  <div>
                    <span className='home-tile-value'>{items.length}</span>
                  </div>
                </div>
              </Col>
              <Col lg={12} sm={12} xs={24} className='home-tile'>
                <div className='home-tile-icon-container'>
                  <GoGraph size={25} />
                </div>
                <div className='home-tile-text-container'>
                  <div className='border border-black'>
                    <span className='home-tile-title'>Expenses</span>
                  </div>
                  <div>
                    <span className='home-tile-value'>{items.length}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={11} xs={24}>
          <div className='home-header-tile p-2'>
            <span className='text-base font-semibold px-2'>Alerts</span>
            <div className='alerts-container'>
              <Space
                direction='vertical'
                className='w-full items-center justify-center'
              >
                {alerts?.map((alert) => (
                  <Alert message={alert.message} type='error' closable />
                )) ?? (
                  <p className='pt-5 opacity-60 text-gray-400 font-semibold'>
                    Nothing here
                  </p>
                )}
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default HomeTopTile;
