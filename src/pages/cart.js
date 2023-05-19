import React, { useState } from 'react';
import { Button, Card, Col, InputNumber, Row, Select, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

const CartPage = () => {
  const location = useLocation();
  const [items, setItems] = useState(location.state && location.state.items ? location.state.items : []);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const newItem = {
      size: selectedSize,
      price: location.state?.selectedOptions.price,
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

  const handleCheckout = () => {
    // Pass the items data to the checkout page
    navigate('/checkout', { state: { items } });
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
            <Button type="primary" disabled={items.length === 0} onClick={handleCheckout}>
              Checkout
            </Button>
          </Card>
        </Col>
      </Row>
      AAAAAA
    </div>
  );
};

export default CartPage;
