import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { Link } from 'react-router-dom';
const { Text } = Typography;
const SignupPage = () => {
  const onFinish = (values) => {
    const age = Number(values.age);
    console.log("Received values of form: ", values);
    console.log("Age: ", age);
  };

  const validateAge = (rule, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      return Promise.reject('Please input a valid number for your age!');
    } else if (numValue < 0 || numValue > 120) {
      return Promise.reject('Please input a valid age between 0 and 120!');
    } else {
      return Promise.resolve();
    }
  };


  const { Title } = Typography;
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Sign Up
        </Title>
        <Form
          name="basic"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ marginLeft: "-50px" }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

         <Form.Item
            label="Age"
            name="age"            
            rules={[
              { required: true, message: 'Please input your age!' },
              { validator: validateAge }
            ]}
            style={{ marginBottom: '1em' }}
          >
            <Input type="text" style={{ width: '100%' }}/>
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^\d{10}$/,
                message: "Please input a valid 10-digit phone number!",
              },
            ]}
            style={{ marginBottom: "1em" }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              Sign Up
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

export default SignupPage;
