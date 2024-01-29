import { IItem } from '@/Interface/Item/item.interface';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { ShopFilled, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { GoGraph } from 'react-icons/go';
import { getStockAmount } from '../Item/item.utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { openModal } from '@/store/slices/modal.slice';
import { IAlert } from '@/Interface/User/user.interface';

const HomeTopTile: React.FC = () => {
  const { discharges, purchases, items, vendors } = useSelector(
    (state: RootState) => state.data
  );
  const dispatch = useDispatch();
  const [alerts, setAlerts] = useState<(IAlert | undefined)[]>(
    items
      .filter((item) => {
        const amountLeft = getStockAmount(item, purchases, discharges);
        const lowQuantity = item.lowQuantityWarning ?? 0;
        if (amountLeft < lowQuantity) {
          return true;
        } else {
          return false;
        }
      })
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      })
  );
  const handleRemoveAlert = (id: string | undefined) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert?.id !== id));
  };
  const handleReplenishModal = () => {
    dispatch(
      openModal({
        name: 'purchase',
        item: null,
        title: 'Inventory Adjustment',
        width: 600,
      })
    );
  };
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
                    <span className='home-tile-value'>2</span>
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
                    <span className='text-xs text-gray-900'>
                      ETB{' '}
                      {items
                        .reduce((sum, item) => {
                          const unitPrice = item.unitPrice ?? 0;
                          const quantity = item.startQuantity ?? 0;
                          const amount = unitPrice * quantity;
                          return sum + amount;
                        }, 0)
                        .formatCurrency()}
                    </span>
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
                {alerts?.length ? (
                  alerts?.map((alert) => (
                    <Alert
                      message={`${alert?.name + ' almost out of stock!'}`}
                      action={
                        <Button
                          size='small'
                          type='text'
                          onClick={handleReplenishModal}
                        >
                          Replenish
                        </Button>
                      }
                      type='warning'
                      closable
                      afterClose={() => handleRemoveAlert(alert?.id)}
                      showIcon
                    />
                  ))
                ) : (
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
