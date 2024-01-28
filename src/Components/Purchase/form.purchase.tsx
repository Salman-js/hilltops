import { generateId } from '@/Utils/generate';
import { RootState } from '@/store/store';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Space,
  Tooltip,
  message,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { IoSparklesOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/slices/modal.slice';
import { addPurchase, updatePurchase } from '@/store/slices/basic.slice';
import { IPItem, IPurchase } from '@/Interface/Purchase/purchase.interface';
import { DatePicker } from '../UI/Custom Pickers';
import Table, { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { IItem } from '@/Interface/Item/item.interface';
import AnimatedNumbers from 'react-animated-numbers';

type formItemProps = {
  item: IPurchase | null;
};

const PurchaseForm: React.FC<formItemProps> = ({ item }) => {
  const [form] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<IPurchase | null>(item);
  const [addingRow, setAddingRow] = useState(false);
  const [pItems, setItems] = useState<IPItem[]>(item?.items ?? []);
  const { vendors, items, purchases } = useSelector(
    (state: RootState) => state.data
  );
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(closeModal());
  };

  const initialValues = useMemo(() => {
    if (item) {
      const { items, ...purchaseData } = item;
      return {
        ...purchaseData,
      };
    } else {
      return {};
    }
  }, [item]);
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newItem: IPurchase = {
          id: selectedItem?.id,
          ...values,
        };
        if (selectedItem) {
          dispatch(
            updatePurchase({
              id: selectedItem?.id as string,
              purchase: newItem,
            })
          );
          message.success({
            content: 'Purchase updated',
          });
          dispatch(closeModal());
        } else {
          const newItem: IPurchase = {
            id: String(new Date().getTime()),
            ...values,
            vendor: vendors.find((vendor) => vendor.name === values.vendor),
          };
          dispatch(addPurchase(newItem));
          message.success({
            content: 'Purchase created',
          });
          dispatch(closeModal());
        }
      })
      .catch((err) => {
        console.log('Validation Error: ', err);
      });
  };

  const handleAddRow = () => {
    const newRow: IPItem = {
      id: String(new Date().getTime()),
      quantity: 0,
      unitPrice: 0,
    };
    setItems((prevData) => [...prevData, newRow]);
    setAddingRow(true);
  };
  const handleInputChange = (
    key: string | number,
    dataIndex: keyof IPItem,
    value: number | string | IItem | undefined | null
  ) => {
    setItems((prevData) => {
      const newItems = prevData.map((item) =>
        item.id === key
          ? {
              ...item,
              [dataIndex]: value,
            }
          : item
      );
      form.setFieldsValue({ items: newItems });
      return newItems;
    });
  };
  const itemColumns: ColumnsType<IPItem> = [
    {
      title: '#',
      key: 'no',
      render: (text, record, index) => (
        <Form.Item>
          <span>{index + 1}</span>
        </Form.Item>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record, index) => (
        <Form.Item
          name={[index, 'quantity']}
          rules={[{ required: true, message: 'required' }]}
        >
          <InputNumber
            size='small'
            onChange={(value) =>
              handleInputChange(record.id, 'quantity', value)
            }
            style={{ width: '7em' }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Item',
      dataIndex: 'itemId',
      key: 'itemId',
      render: (text, record, index) => (
        <Form.Item
          name={[index, 'itemId']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Select
            options={items.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            })}
            style={{ width: '14em' }}
            size='small'
            onChange={(value) => {
              const item = items.find((itm) => itm.id === value);
              handleInputChange(record.id, 'itemId', value);
              handleInputChange(record.id, 'unitPrice', item?.unitPrice);
              handleInputChange(record.id, 'description', item?.description);
              handleInputChange(record.id, 'item', item);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => (
        <Form.Item name={[index, 'description']}>
          <Input.TextArea
            size='small'
            onChange={(e) =>
              handleInputChange(record.id, 'description', e.target.value)
            }
            rows={2}
            style={{ width: '14em' }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record, index) => (
        <Form.Item
          name={[index, 'unitPrice']}
          rules={[
            { required: true, message: 'Required' },
            {
              min: 1,
              message: 'Invalid input',
            },
          ]}
        >
          <InputNumber
            onChange={(value) =>
              handleInputChange(record.id, 'unitPrice', value)
            }
            style={{ width: '7em' }}
            size='small'
          />
        </Form.Item>
      ),
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (text, record) => (
        <Form.Item>
          <InputNumber
            value={(record.quantity * record.unitPrice).formatCurrency()}
            size='small'
            onChange={(value) => {
              handleInputChange(record.id, 'quantity', 1);
              handleInputChange(record.id, 'unitPrice', value);
            }}
            style={{ width: '7em' }}
          />
        </Form.Item>
      ),
    },
    {
      dataIndex: 'action',
      key: 'delete',
      render: (_: number, record) => (
        <Popconfirm
          title='Remove this item?'
          onConfirm={() => {
            setItems((prevItems) =>
              prevItems.filter((item) => item.id !== record.id)
            );
          }}
          onCancel={() => console.log(record)}
          okText='Yes'
          cancelText='No'
        >
          <Form.Item>
            <Button type='text' icon={<DeleteOutlined />} danger />
          </Form.Item>
        </Popconfirm>
      ),
    },
  ];

  const getRowClassName = (record: IPItem, index: number) => {
    if (index === pItems.length - 1 && addingRow) {
      return 'new-row';
    }
    return '';
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);
  return (
    <div className='form-container'>
      <Form form={form} layout='vertical'>
        <Row
          gutter={[10, 0]}
          className='max-h-[30em] overflow-y-auto overflow-x-hidden pr-2'
        >
          <Col lg={8} xs={12}>
            <Form.Item
              name='orderNo'
              label='Order #'
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
                          orderNo: generateId(purchases[0]?.orderNo),
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
            <Form.Item name='vendor' label='Vendor'>
              <Select
                options={vendors.map((vendor) => {
                  return {
                    value: vendor.name,
                  };
                })}
                size='large'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
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
              <DatePicker
                size='large'
                className='w-full'
                format='MMM, DD/YYYY'
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item name='oneTimeVendor' label='One Time Vendor'>
              <Input placeholder='One Time Vendor' size='large' />
            </Form.Item>
          </Col>
          <Col lg={8} className='flex flex-col justify-start items-start'>
            <div className='text-base tracking-wide'>Total</div>
            <div className='w-full text-lg flex flex-row p-2 font-semibold'>
              <span className='inline mr-2'>ETB</span>
              <AnimatedNumbers
                includeComma
                className='inline'
                animateToNumber={pItems.reduce((sum, item) => {
                  const quantity = item.quantity ?? 0;
                  const unitPrice = item.unitPrice ?? 0;
                  const amount = quantity * unitPrice;
                  return sum + amount;
                }, 0)}
              />
            </div>
          </Col>
          <Col lg={24} xs={24}>
            <Form.Item name='note' label='Notes'>
              <Input.TextArea size='large' placeholder='' rows={2} />
            </Form.Item>
          </Col>
          <Form.List name='items' initialValue={pItems}>
            {(_) => {
              return (
                <Col span={24}>
                  <Table
                    dataSource={pItems}
                    columns={itemColumns}
                    pagination={false}
                    scroll={{ x: true }}
                    rowClassName={getRowClassName}
                    footer={() => (
                      <div style={{ width: '100%' }}>
                        <Button
                          type='dashed'
                          onClick={handleAddRow}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Item
                        </Button>
                      </div>
                    )}
                  />
                </Col>
              );
            }}
          </Form.List>
        </Row>
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
      </Form>
    </div>
  );
};
export default PurchaseForm;
