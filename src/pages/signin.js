import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import axios from "axios";
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const { Title, Text } = Typography;

const SignInPage = () => {
  const history = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)


  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/posts/login", {
        email, password
      }, {
        withCredentials: true
      }).then((res) => {
        if (res.data.exist === "exist") {
          console.log(res.data);
          console.log(res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data))
          window.dispatchEvent(new Event("storage"));
          console.log(JSON.parse(localStorage.getItem("userData")).exist);
          history("/home", { localStorage: localStorage });

        }
        else if (res.data === "not exist") {
          console.log(res.data);
          alert("User not exists")
        }
      })

    } catch (e) {
      alert("wrong details");
      console.log(e);

    }
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Sign In</Title>
        <Form
          action="POST"
          name="basic"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 8 }} style={{ width: "100%" }}>
            <Button onClick={submit} type="primary" htmlType="submit" style={{ float: "right" }}>
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