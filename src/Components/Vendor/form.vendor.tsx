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
  Space,
  Tooltip,
  message,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { IoSparklesOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/slices/modal.slice';
import { addVendor, updateVendor } from '@/store/slices/basic.slice';
import { IVendor } from '@/Interface/Vendor/vendor.interface';
import { ethiopiaRegions, validatePhone } from './vendor.utils';
import { Rule } from 'antd/es/form';
import moment from 'moment';

type formItemProps = {
  item: IVendor | null;
};

const VendorForm: React.FC<formItemProps> = ({ item }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<IVendor | null>(item);
  const { vendors } = useSelector((state: RootState) => state.data);
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
        const newVendor: IVendor = {
          ...values,
          id: selectedItem?.id,
        };
        if (selectedItem) {
          dispatch(
            updateVendor({
              id: selectedItem?.id as string,
              vendor: newVendor,
            })
          );
          message.success({
            content: 'Vendor updated',
          });
          dispatch(closeModal());
        } else {
          const newVendor: IVendor = {
            id: String(new Date().getTime()),
            ...values,
            approved,
            user,
            createdAt: moment(),
          };
          dispatch(addVendor(newVendor));
          message.success({
            content: 'Vendor created',
          });
          dispatch(closeModal());
        }
      })
      .catch((err) => {
        console.log('Validation Error: ', err);
      });
  };

  const validateVendorId = async (_: Rule, value: string | null) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value?.length && vendors.some((vendor) => vendor.vendorId === value)) {
      return Promise.reject('ID is taken');
    } else {
      return Promise.resolve();
    }
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);
  return (
    <div className='form-container'>
      <Form form={form} layout='vertical'>
        <Row gutter={[10, 0]}>
          <Col lg={6} xs={24}>
            <Form.Item
              name='vendorId'
              label='Vendor ID'
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
                {
                  validator: validateVendorId,
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
                          vendorId: generateId(vendors[0]?.vendorId),
                        });
                      }}
                      className='cursor-pointer'
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Col>
          <Col lg={18} xs={24}>
            <Form.Item
              name='name'
              label='Vendor Name'
              rules={[
                {
                  required: true,
                  message: 'Please enter vendor name',
                },
              ]}
            >
              <Input size='large' placeholder='Name' />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              name='phone'
              label='Phone'
              rules={[
                {
                  validator: validatePhone,
                },
              ]}
            >
              <InputNumber
                size='large'
                placeholder='Phone'
                addonBefore='+251'
                controls={false}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item name='location' label='Location'>
              <Cascader
                options={ethiopiaRegions}
                placeholder='Location'
                size='large'
                className='w-full'
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
export default VendorForm;
