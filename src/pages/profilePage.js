import React, { useState } from 'react';
import { Card, Col, Grid, Row, Typography, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs || screens.sm;
  const gridLayout = isSmallScreen ? { span: 24 } : { span: 12, offset: 2 };

  const [profileImage, setProfileImage] = useState(null);

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
                <Button icon={<UploadOutlined />}>Edit</Button>
              </Upload>
            </div>
          </Col>
          <Col span={18}>
            <Title level={2}>John Doe</Title>
            <Paragraph>Address: 123 Main St</Paragraph>
            <Paragraph>Age: 30</Paragraph>
            <Paragraph>Phone: 123-456-7890</Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;
