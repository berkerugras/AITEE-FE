import React, { useState } from 'react';
import { Card, Col, Grid, Row, Typography, Button, Upload, message, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs || screens.sm;
  const gridLayout = isSmallScreen ? { span: 24 } : { span: 12, offset: 2 };
  const history = useNavigate();

  const [profileImage, setProfileImage] = useState('./profilepicture.jpg'); // Set the default image path here
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [marketProducts, setMarketProducts] = useState([]);
  const [listedProducts, setListedProducts] = useState([]);


  useEffect(() => {
    const userName = JSON.parse(localStorage.getItem("userData")).userName
    const email = JSON.parse(localStorage.getItem("userData")).email
    console.log(userName);
    console.log(email);
    axios.post("http://localhost:5000/posts/fetch-all-orders",
      {
        userName,
        email
      }
    ).then((res) => {
      console.log("******************************USER-ORDERS********************************************")
      console.log(JSON.stringify(res.data[0]));
      setOrderedProducts(res.data);
    });

    axios.post("http://localhost:5000/posts/fetch-all-market-orders",
      {
        userName,
        email
      }
    ).then((res) => {
      console.log("******************************MARKET********************************************")
      console.log(JSON.stringify(res.data[0]));
      setMarketProducts(res.data);
    });

    axios.post("http://localhost:5000/posts/fetch-all-listed-orders",
      {
        userName,
        email
      }
    ).then((res) => {
      console.log("******************************ListedProduct********************************************")
      console.log(JSON.stringify(res.data[0]));
      setListedProducts(res.data);
    });


  }, []);


  const toggleEditMode = () => {
    setEditMode(!editMode);
  };


  const handleSaveChanges = () => {
    const userName = JSON.parse(localStorage.getItem("userData")).userName;
    form.validateFields().then((values) => {
      // Include the email in the request body
      const requestBody = {
        ...values,
        userName: userName
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
          email: values.email,
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


  function goPDP(param) {
    console.log(param.listing_price);
    const newItem = {
      price: param.listing_price,
      product: "http://localhost:5000" + param.product,
      productUserName: param.userName

    };
    history('/buy-market-item', { state: [newItem] });
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
                  email: JSON.parse(localStorage.getItem("userData")).email,
                  address: JSON.parse(localStorage.getItem("userData")).address,
                  age: JSON.parse(localStorage.getItem("userData")).age,
                  phone: JSON.parse(localStorage.getItem("userData")).phone,
                }}
                onFinish={handleSaveChanges}
                layout="vertical"
              >
                <Form.Item name="userName" label="UserName">
                  <Input disabled={true}/>
                </Form.Item>
                <Form.Item name="email" label="Email">
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
                <Paragraph>Email: {JSON.parse(localStorage.getItem("userData")).email}</Paragraph>
                <Paragraph>Address: {JSON.parse(localStorage.getItem("userData")).address}</Paragraph>
                <Paragraph>Age: {JSON.parse(localStorage.getItem("userData")).age}</Paragraph>
                <Paragraph>Phone: {JSON.parse(localStorage.getItem("userData")).phone}</Paragraph>
                <Button onClick={toggleEditMode}>Edit</Button>
              </div>
            )}
          </Col>
        </Row>

      </Card>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "3rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Title style={{ textAlign: "center" }}>Shipping Orders</Title>
          {orderedProducts.map((product, index) => (
            <Row key={index} span={4}>
              {product.product ? (
                <Card
                  hoverable
                  cover={<img alt="product" src={"http://localhost:5000" + product.product} />}
                >
                  <Card.Meta
                    title={`Product ${index + 1}`}
                  />
                  <p>$ {product.price}</p>
                  <p>{product.userName}</p>
                </Card>
              ) : null}
            </Row>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Title style={{ textAlign: "center" }}>Marketplace Orders</Title>
          {marketProducts.map((product, index) => (
            <Row key={index} span={4}>
              {product.product ? (
                <Card
                  hoverable
                  cover={<img alt="product" src={"http://localhost:5000" + product.product} />}
                >
                  <Card.Meta
                    title={`Product ${index + 1}`}
                  />
                  <p>$ {product.price}</p>
                  <p>{product.userName}</p>
                </Card>
              ) : null}
            </Row>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Title style={{ textAlign: "center" }}>Listed Products</Title>
          {listedProducts.map((product, index) => (
            <Row key={index} span={4}>
              {product.product ? (
                <Card
                  hoverable
                  cover={<img alt="product" src={"http://localhost:5000" + product.product} />}
                  onClick={() => { goPDP(product) }}
                >
                  <Card.Meta
                    title={`Product ${index + 1}`}
                  />
                  <p>$ {product.price}</p>
                  <p>{product.userName}</p>
                </Card>
              ) : null}
            </Row>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;