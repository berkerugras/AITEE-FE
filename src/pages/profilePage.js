import React, { useState } from 'react';
import { Card, Col, Grid, Row, Typography, Button, Upload, message, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs || screens.sm;
  const gridLayout = isSmallScreen ? { span: 24 } : { span: 12, offset: 2 };

  const [profileImage, setProfileImage] = useState('./profilepicture.jpg'); // Set the default image path here
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };


  const handleSaveChanges = () => {
    const email = JSON.parse(localStorage.getItem("userData")).email;
    form.validateFields().then((values) => {
      // Include the email in the request body
      const requestBody = {
        ...values,
        email: email
      };
  
      // Save the updated user information to the database using a PUT request
      axios.put("http://localhost:5000/posts/update", requestBody)
        .then((response) => {
          console.log(response.data);
          setEditMode(false);
        })
        .catch((error) => {
          console.error(error);
        });
        localStorage.setItem("userData", JSON.stringify({
          ...JSON.parse(localStorage.getItem("userData")),
          userName: values.userName,
          address: values.address,
          age: values.age,
          phone: values.phone
        }));
        window.dispatchEvent(new Event("storage"));
    });    
  };
  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={6}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div className="profile-image-container">
                {profileImage ? (
                  <img src={profileImage} alt="profile" />
                ) : (
                  <div className="no-profile-image">No image selected</div>
                )}
              </div>
            </div>
            
          </Col>
          <Col span={18}>
            {editMode ? (
              <Form
                form={form}
                initialValues={{                 
                  userName: JSON.parse(localStorage.getItem("userData")).userName,
                  address: JSON.parse(localStorage.getItem("userData")).address,
                  age: JSON.parse(localStorage.getItem("userData")).age,
                  phone: JSON.parse(localStorage.getItem("userData")).phone,
                }}
                onFinish={handleSaveChanges}
                layout="vertical"
              >
                <Form.Item name="userName" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="age" label="Age">
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                  <Input />
                </Form.Item>

                <Row gutter={16} justify="end">
                  <Col>
                    <Button type="primary" onClick={handleSaveChanges}>
                      Save
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            ) : (
              <div>
                <Title level={2}>{JSON.parse(localStorage.getItem("userData")).userName}</Title>
                <Paragraph>Address: {JSON.parse(localStorage.getItem("userData")).address}</Paragraph>
                <Paragraph>Age: {JSON.parse(localStorage.getItem("userData")).age}</Paragraph>
                <Paragraph>Phone: {JSON.parse(localStorage.getItem("userData")).phone}</Paragraph>
                <Button onClick={toggleEditMode}>Edit</Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;