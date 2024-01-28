import { IChore } from '@/Interface/Chore/chore.interface';
import { addChore, updateChore } from '@/store/slices/basic.slice';
import { RootState } from '@/store/store';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Space, message } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from '../UI/Custom Pickers';
import moment, { Moment } from 'moment';
type manipulateChoresProps = {
  date: Date | Moment;
  source: 'year' | 'month' | 'date' | 'customize';
};
const ManipulateChores: React.FC<manipulateChoresProps> = ({
  date,
  source,
}) => {
  const [form] = Form.useForm();
  const chores = useSelector((state: RootState) => state.data.chores);
  const givenChores: IChore[] = chores.filter((chore) =>
    moment(chore.date).isSame(moment(date), source === 'date' ? 'day' : 'month')
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [newChoreModalOpen, setNewChoreModalOpen] = useState(false);
  const handleDone = (e: CheckboxChangeEvent, chore: IChore) => {
    if (e.target.checked) {
      dispatch(
        updateChore({
          id: chore.id,
          chore: {
            ...chore,
            done: true,
          },
        })
      );
    } else {
      dispatch(
        updateChore({
          id: chore.id,
          chore: {
            ...chore,
            done: false,
          },
        })
      );
    }
  };
  form.setFieldsValue({ date });
  const handleCancel = () => {
    setNewChoreModalOpen(false);
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const newItem: IChore = {
          id: String(new Date().getTime()),
          ...values,
          user,
        };
        dispatch(addChore(newItem));
        message.success({
          content: 'Chore created',
        });
        handleCancel();
      })
      .catch((err) => {
        console.log('Validation Error: ', err);
      });
  };
  return (
    <div className='rounded-lg bg-white p-4 max-h-[15em] min-h-[15em] overflow-y-auto'>
      {givenChores.length ? (
        givenChores.map((chore) => {
          const realChore = chores.find((chr) => chr.id === chore.id);
          return (
            <div>
              <Checkbox
                onChange={(e) => handleDone(e, chore)}
                checked={realChore?.done}
              >
                <span
                  className={
                    realChore?.done ? 'chore-title line-through' : 'chore-title'
                  }
                >
                  {chore.title}
                </span>
              </Checkbox>
              <div>
                <span className='text-xs text-gray-800 ml-6'>
                  {chore.description}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className='m-auto text-lg font-semibold text-gray-400 opacity-50 h-[10em] flex justify-center items-center'>
          No chores
        </div>
      )}
      <Button
        icon={<PlusOutlined />}
        className='shadow-md absolute bottom-10 right-10'
        onClick={() => setNewChoreModalOpen(true)}
      />
      <Modal
        title='New Chore'
        open={newChoreModalOpen}
        onCancel={handleCancel}
        width={700}
        className='rounded-3xl'
        style={{
          top: 50,
        }}
        styles={{
          content: {
            borderRadius: '2em',
            backgroundColor: '#fafafa',
            maxHeight: '40em',
            overflow: 'auto',
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
        <Form form={form} layout='vertical'>
          <Row gutter={[10, 10]}>
            <Col lg={12} xs={24}>
              <Form.Item name='date'>
                <Calendar fullscreen={false} />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <Form.Item
                    name='title'
                    label='Title'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter title',
                      },
                    ]}
                  >
                    <Input placeholder='Title' size='large' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='description' label='Description'>
                    <Input.TextArea
                      placeholder='Description'
                      rows={4}
                      size='large'
                    />
                  </Form.Item>
                </Col>
              </Row>
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
      </Modal>
    </div>
  );
};
export default ManipulateChores;
