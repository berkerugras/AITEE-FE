import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
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

          <Form.Item wrapperCol={{ span: 16, offset: 8 }} style={{width:"100%"}}>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          <Text>
            Don't have an account?&nbsp;
            <Link to="/signup">Sign Up</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;