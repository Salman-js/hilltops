import { IItem } from '@/Interface/Item/item.interface';
import { generateId } from '@/Utils/generate';
import { RootState } from '@/store/store';
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tooltip,
  message,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { IoSparklesOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { categoryOptions } from './item.utils';
import { closeModal } from '@/store/slices/modal.slice';
import { addItem, updateItem } from '@/store/slices/basic.slice';
import { DatePicker } from '../UI/Custom Pickers';
import moment from 'moment';

type formItemProps = {
  item: IItem | null;
};

const ItemForm: React.FC<formItemProps> = ({ item }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<IItem | null>(item);
  const { vendors, items } = useSelector((state: RootState) => state.data);
  const { user } = useSelector((state: RootState) => state.auth);
  const approved = user?.role === 'MANAGER';
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(closeModal());
  };
  const initialValues = useMemo(() => {
    if (item) {
      return {
        ...item,
        user,
        vendors: item.vendors?.map((vendor) => vendor.name),
        lastPurchaseDate: moment(item.lastPurchaseDate),
      };
    } else {
      return {
        user,
      };
    }
  }, [item]);

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newItem: IItem = {
          id: selectedItem?.id,
          ...values,
          vendors: vendors.filter((vendor) =>
            values.vendors.includes(vendor.name)
          ),
        };
        if (selectedItem) {
          dispatch(
            updateItem({
              id: selectedItem?.id as string,
              item: newItem,
            })
          );
          message.success({
            content: 'Item updated',
          });
          dispatch(closeModal());
        } else {
          const newItem: IItem = {
            id: String(new Date().getTime()),
            ...values,
            approved,
            createdAt: moment(),
            user,
            vendors: vendors.filter((vendor) =>
              values.vendors.includes(vendor.name)
            ),
          };
          dispatch(addItem(newItem));
          message.success({
            content: 'Item created',
          });
          dispatch(closeModal());
        }
      })
      .catch((err) => {
        console.log('Validation Error: ', err);
      });
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);
  return (
    <div className='form-container'>
      <Form form={form} layout='vertical'>
        <Row gutter={[10, 0]}>
          <Col lg={6} xs={12}>
            <Form.Item
              name='itemId'
              label='Item ID'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input
                placeholder='ID'
                size='large'
                addonAfter={
                  <Tooltip title='generate'>
                    <IoSparklesOutline
                      onClick={() => {
                        form.setFieldsValue({
                          itemId: generateId(items[0]?.itemId),
                        });
                      }}
                      className='cursor-pointer'
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          <Col lg={9} xs={12}>
            <Form.Item
              name='name'
              label='Item Name'
              rules={[
                {
                  required: true,
                  message: 'Please enter item name',
                },
              ]}
            >
              <Input size='large' placeholder='Name' />
            </Form.Item>
          </Col>
          <Col lg={9} xs={12}>
            <Form.Item name='category' label='Category'>
              <Cascader
                options={categoryOptions}
                placeholder='Category'
                size='large'
                className='w-full'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='unitPrice'
              label='Unit Price'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <InputNumber
                controls={false}
                size='large'
                prefix={'ETB'}
                min={0}
                className='w-full'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='startQuantity'
              label='Starting Quantity'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <InputNumber
                controls={false}
                size='large'
                min={0}
                className='w-full'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item name='lowQuantityWarning' label='Low Quantity Warning'>
              <InputNumber
                controls={false}
                size='large'
                min={0}
                className='w-full'
              />
            </Form.Item>
          </Col>
          <Col lg={16} xs={12}>
            <Form.Item name='vendors' label='Vendors'>
              <Select
                options={vendors.map((vendor) => {
                  return {
                    value: vendor.name,
                  };
                })}
                mode='multiple'
                size='large'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item name='lastPurchaseDate' label='Last Purchase Date'>
              <DatePicker
                size='large'
                className='w-full'
                format='MMM, DD/YYYY'
              />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24}>
            <Form.Item name='description' label='Additional Info.'>
              <Input.TextArea
                size='large'
                placeholder='Storage/Exp. Date/Condition...'
              />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24} className='flex flex-row justify-end'>
            <Space>
              <Form.Item>
                <Button onClick={handleCancel}>Cancel</Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default ItemForm;
