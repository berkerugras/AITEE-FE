import React from 'react';
import { Avatar, Card, Col, Divider, Grid, Row, Typography } from 'antd';
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs || screens.sm;
  const gridLayout = isSmallScreen ? { span: 24 } : { span: 12, offset: 2 };

  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={6}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div className="profile-image-container">
                <img src="ege.jfif" alt="profile" />
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Title level={2}>Ahmet Kaya</Title>
            <Paragraph>Web Developer</Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquam arcu vitae lacus tristique mattis.
            </Paragraph>
            <Paragraph>Website: <a href="ahmetkaya@gmail.com">ahmetkaya@gmail.com</a></Paragraph>
            <Paragraph>Email: <a href="mailto:ahmetkaya@google.com">ahmetkaya@google.com</a></Paragraph>
            <Paragraph>Phone: (123) 456-7890</Paragraph>
            <div className="icons" style={{display:"flex",}}>
              <a href="https://github.com/egesevinc/"><i className="ion-social-github" style={{ fontSize: '36px' }}></i></a>
              <a href="https://www.linkedin.com/in/egesevincc"><i className="ion-social-linkedin" style={{ fontSize: '36px' }}></i></a>
              <a href="https://www.instagram.com/egessevinc/"><i className="ion-social-instagram" style={{ fontSize: '36px' }}></i></a>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;