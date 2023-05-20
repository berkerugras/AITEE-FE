import React from 'react';
import { Button, Card, Form, Input, Typography } from 'antd';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';

const { Title, Text } = Typography;

const SignInPage = () => {
  const [userName, setUsername]=useState(null);
  const [password, setPassword]=useState(null)

  const history=useNavigate();
  
  async function submit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/posts/login",{
        userName,password
      }).then(res=>{
        if(res.data==="exist"){
          history("/home");
        }
        else if(res.data==="not exist"){
          alert("User not exists")
      }
      })
    }catch(e){
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
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input type="username" onChange={(e)=>{setUsername(e.target.value)}} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(e)=>{setPassword(e.target.value)}}/>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16, offset: 8 }} style={{width:"100%"}}>
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