import React, { useState } from 'react';
import { Button, Card, Col, InputNumber, Row, Select, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () => {
    const newItem = {
      size: selectedSize,
      price: 20, // Replace with the actual price of the T-shirt
      quantity: selectedQuantity,
    };
    setItems([...items, newItem]);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleQuantityChange = (value) => {
    setSelectedQuantity(value);
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Title level={2}>Shopping Cart</Title>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Card key={index}>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </Card>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </Col>
        <Col span={8}>
          <Card>
            <h3>Add to Cart</h3>
            <Select value={selectedSize} onChange={handleSizeChange}>
              <Option value="S">Small</Option>
              <Option value="M">Medium</Option>
              <Option value="L">Large</Option>
            </Select>
            <br />
            <br />
            <InputNumber value={selectedQuantity} onChange={handleQuantityChange} />
            <br />
            <br />
            <Button type="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Card>
          <br />
          <Card>
            <h3>Cart Summary</h3>
            <p>Total Price: ${totalPrice}</p>
            <Button type="primary" disabled={items.length === 0}>
              Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;