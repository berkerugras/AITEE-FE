import React, { useState } from 'react';
import { Card, Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

const SizeOptions = ({ onSizeChange }) => {
  const handleSizeChange = (e) => {
    onSizeChange(e.target.value);
  };

  return (
    <>
      <h3>Size:</h3>
      <Radio.Group onChange={handleSizeChange}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="medium">Medium</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="xlarge">XLarge</Radio.Button>
      </Radio.Group>
    </>
  );
};

const TypeOptions = ({ onTypeChange, onPriceChange }) => {
  const handleTypeChange = (e) => {
    const type = e.target.value;
    const price = {
      't-shirt': 10,
      sweatshirt: 20,
      shorts: 30,
    }[type];
    onTypeChange(type);
    onPriceChange(price);
  };

  return (
    <>
      <h3>Type:</h3>
      <Radio.Group onChange={handleTypeChange}>
        <Radio.Button value="t-shirt">T-Shirt ($10)</Radio.Button>
        <Radio.Button value="sweatshirt">Sweatshirt ($20)</Radio.Button>
        <Radio.Button value="shorts">Shorts ($30)</Radio.Button>
      </Radio.Group>
    </>
  );
};

const AntdCard = () => {
  const [size, setSize] = useState(null);
  const [type, setType] = useState(null);
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  const handleBuy = () => {
    if (size && type && price) {
      const newItem = {
        size,
        price,
        quantity: 1,
      };
      navigate('/cart', { state: { items: [newItem] } });
    }
  };

  return (
    <Card title="Product Card">
      <SizeOptions onSizeChange={handleSizeChange} />
      <TypeOptions onTypeChange={handleTypeChange} onPriceChange={handlePriceChange} />
      <Button
        style={{ marginTop: '20px' }}
        type="primary"
        size="large"
        block
        onClick={handleBuy}
        disabled={!(size && type && price)}
      >
        Buy (${price})
      </Button>
    </Card>
  );
};

export default AntdCard;