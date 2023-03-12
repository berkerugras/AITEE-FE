import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';

const { Title } = Typography;

const SignInPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
        <Form
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignInPage;