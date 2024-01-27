import { allUsers } from '@/Components/Home/data';
import { ILoginType, IUser } from '@/Interface/User/user.interface';
import { setAuthenticated, setUser } from '@/store/slices/auth.slice';
import { RootState } from '@/store/store';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form] = Form.useForm();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleLogin = (user: IUser) => {
    dispatch(setAuthenticated());
    dispatch(setUser(user));
  };
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values: ILoginType) => {
        const user: IUser | undefined = allUsers.find(
          (usr) =>
            values.username === usr.username && values.password === usr.password
        );
        if (user) {
          handleLogin(user);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.error('Form Validation Error:', error);
      });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);
  return (
    <main className='home-container login-main-container'>
      <div className='login-container'>
        <div className='login-image-container'>
          <div className='login-image-text-container'>
            <div className='p-4'>
              <span className='text-7xl text-gray-50 break-words mb-3 font-semibold'>
                Store Management System
              </span>
            </div>
          </div>
        </div>
        <div className='login-form-container'>
          <div>
            <img src='/assets/logo.jpg' alt='' className='w-20' />
          </div>
          <div className='text-center flex flex-col justify-center items-center border border-black'>
            <p className='text-4xl text-gray-900 font-semibold -mb-2'>
              Welcome Back
            </p>
            <p className='text-sm text-gray-900'>
              Enter your username and password
            </p>
            <div className='text-left flex flex-row justify-self-start'>
              {error ? (
                <Alert
                  message='Invalid Username or Password'
                  type='error'
                  showIcon
                  closable
                  afterClose={() => setError(false)}
                />
              ) : null}
            </div>
            <Form form={form} layout='vertical' className='w-auto'>
              <div className='login-form-main'>
                <Row gutter={[10, 0]} className='w-2/3'>
                  <Col span={24}>
                    <Form.Item
                      name='username'
                      label='Username'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter username',
                        },
                      ]}
                    >
                      <Input
                        size='middle'
                        placeholder='Username'
                        className='rounded-md border-none text-sm'
                        style={{
                          backgroundColor: 'rgb(226 232 240)',
                        }}
                        prefix={<UserOutlined className='text-slate-500' />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name='password'
                      label='Password'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter password',
                        },
                      ]}
                    >
                      <Input.Password
                        size='middle'
                        placeholder='Password'
                        className='rounded-md border-none text-sm'
                        style={{
                          backgroundColor: 'rgb(226 232 240)',
                        }}
                        prefix={<LockOutlined className='text-slate-500' />}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='bg-gray-800 hover:bg-gray-900'
                        style={{ backgroundColor: 'rgb(31 41 55)' }}
                        block
                        onClick={handleFormSubmit}
                      >
                        Sign in
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
