import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
const SignupPage = () => {
  const [email, setEmail] = useState(null)
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null)
  const [address, setAddress] = useState(null)
  const [age, setAge] = useState(null)
  const [phone, setPhone] = useState(null)

  const onFinish = (values) => {
    const age = Number(values.age);
    // history.push(`/profile?username=${username}&password=${password}`);
    console.log("Received values of form: ", values);
    console.log("Age: ", age);
  };
  const history=useNavigate();


  async function submit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/posts/register",{
        userName,email,password,address,age,phone
      }).then(res=>{
        console.log(res.data.exist === "exist");
        if(res.data.exist==="exist"){
            alert("user already exist")
        }
        else if(res.data==="not exist"){
          history("/home",{state:{id:email}});
      }
      })
    }catch(e){
      alert("wrong details");
      console.log(e);

    }
  }

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const history = useHistory();

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };
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
          action="POST"
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
            <Input type="username" onChange={(e) => { setUsername(e.target.value) }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input.Password onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: "Please input your email address!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input style={{ width: "100%" }} onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
            style={{ marginBottom: "1em" }}
          >
            <Input style={{ width: "100%" }} onChange={(e) => { setAddress(e.target.value) }} />
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
            <Input type="text" style={{ width: '100%' }} onChange={(e) => { setAge(e.target.value) }} />
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
            <Input style={{ width: "100%" }} onChange={(e) => { setPhone(e.target.value) }} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <Button onClick={submit} type="primary" htmlType="submit" style={{ float: "right" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
          <Text>
            Already have an account?&nbsp;
            <Link to="/signin">Sign In</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
