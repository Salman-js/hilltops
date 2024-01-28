import { generateId } from '@/Utils/generate';
import { RootState } from '@/store/store';
import {
  Button,
  Cascader,
  Checkbox,
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
import { categoryOptions, getStockAmount } from './item.utils';
import { closeModal } from '@/store/slices/modal.slice';
import {
  addDischarge,
  addItem,
  updateDischarge,
  updateItem,
} from '@/store/slices/basic.slice';
import { DatePicker } from '../UI/Custom Pickers';
import moment from 'moment';
import { IDischarge, IItem } from '@/Interface/Item/item.interface';

type formItemProps = {
  item: IDischarge | null;
};

const ItemDischargeForm: React.FC<formItemProps> = ({ item }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<IDischarge | null>(item);
  const [dischargedItem, setDischargedItem] = useState<IItem | null>(
    item?.item ?? null
  );
  const [toBeReturned, setToBeReturned] = useState(item?.toBeReturned ?? false);
  const { purchases, discharges, items } = useSelector(
    (state: RootState) => state.data
  );
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
        date: moment(item.date),
        returnDate: moment(item.returnDate),
      };
    } else {
      return {};
    }
  }, [item]);

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newItem: IDischarge = {
          id: selectedItem?.id,
          ...values,
          item: items.find((item) => item.name === values.item),
        };
        if (selectedItem) {
          dispatch(
            updateDischarge({
              id: selectedItem?.id as string,
              discharge: newItem,
            })
          );
          message.success({
            content: 'Item Discharged',
          });
          dispatch(closeModal());
        } else {
          const newItem: IDischarge = {
            id: String(new Date().getTime()),
            ...values,
            approved,
            item: items.find((item) => item.name === values.item),
          };
          dispatch(addDischarge(newItem));
          message.success({
            content: 'Discharge data updated',
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
          <Col lg={8} xs={12}>
            <Form.Item
              name='orderNo'
              label='Discharge Order #'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input
                placeholder='Order #'
                size='large'
                addonAfter={
                  <Tooltip title='generate'>
                    <IoSparklesOutline
                      onClick={() => {
                        form.setFieldsValue({
                          orderNo: generateId(discharges[0]?.orderNo),
                        });
                      }}
                      className='cursor-pointer'
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          <Col lg={16} xs={12}>
            <Form.Item
              name='item'
              label='Item'
              rules={[
                {
                  required: true,
                  message: 'Please select item',
                },
              ]}
            >
              <Select
                options={items.map((item) => {
                  return {
                    value: item.name,
                  };
                })}
                onChange={(value) =>
                  setDischargedItem(
                    items.find((itm) => itm.name === value) ?? null
                  )
                }
                size='large'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='quantity'
              label='Quantity'
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
                addonBefore={`Max = ${getStockAmount(
                  dischargedItem,
                  purchases,
                  discharges
                )}`}
                max={getStockAmount(dischargedItem, purchases, discharges)}
                disabled={!dischargedItem}
                className='w-full'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item name='givenTo' label='Given To'>
              <Input size='large' placeholder='Given to' />
            </Form.Item>
          </Col>
          <Col lg={8} xs={12}>
            <Form.Item
              name='date'
              label='Date'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <DatePicker size='large' placeholder='Date' className='w-full' />
            </Form.Item>
          </Col>
          <Col lg={6} xs={12}>
            <Form.Item name='toBeReturned' label='To Be Returned?'>
              <Checkbox onChange={(e) => setToBeReturned(e.target.checked)} />
            </Form.Item>
          </Col>
          <Col lg={9} xs={12}>
            <Form.Item name='returnDate' label='Return Date'>
              <DatePicker
                size='large'
                placeholder='Return Date'
                className='w-full'
                disabled={!toBeReturned}
                format='MMM, DD/YYYY'
              />
            </Form.Item>
          </Col>
          <Col lg={24} xs={24}>
            <Form.Item name='description' label='Note'>
              <Input.TextArea size='large' placeholder='Note.' />
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
export default ItemDischargeForm;
