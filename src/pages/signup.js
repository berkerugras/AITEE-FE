import React from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';

const SignupPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const { Title } = Typography;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;