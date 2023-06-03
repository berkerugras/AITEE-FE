import React, { useState } from 'react';
import { Card, Col, Grid, Row, Typography, Button, Upload, message, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs || screens.sm;
  const gridLayout = isSmallScreen ? { span: 24 } : { span: 12, offset: 2 };

  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleImageUpload = (info) => {
    const { file } = info;

    // Check if the uploaded file is a JPG
    if (file.type !== 'image/jpeg') {
      message.error('Please upload a JPG file.');
      return;
    }

    // Read the uploaded file
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    form.validateFields().then((values) => {
      // Save the updated user information to the database or update the state as needed
      // You can use the values object to access the updated form values
      // and send the updated data to the server or update the state in the parent component.
      console.log(values);
      setEditMode(false);
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Upload
                accept=".jpg,.jpeg"
                showUploadList={false}
                beforeUpload={(file) => false}
                onChange={handleImageUpload}
              >
                <Button icon={<UploadOutlined />} disabled={!editMode}>
                  Edit
                </Button>
              </Upload>
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