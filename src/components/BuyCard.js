import React, { useState } from 'react';
import { Card, Button, Radio } from 'antd';

const SizeOptions = () => {
  const [size, setSize] = useState('medium');

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <h3>Size:</h3>
      <Radio.Group onChange={handleSizeChange} value={size}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="medium">Medium</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="xlarge">XLarge</Radio.Button>
      </Radio.Group>
    </>
  );
};

const TypeOptions = ({ onPriceChange }) => {
  const [type, setType] = useState('t-shirt');
  const [price, setPrice] = useState(10);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    const newPrice = {
      't-shirt': 10,
      sweatshirt: 20,
      shorts: 30,
    }[e.target.value];
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  return (
    <>
      <h3>Type:</h3>
      <Radio.Group onChange={handleTypeChange} value={type}>
        <Radio.Button value="t-shirt">T-Shirt ($10)</Radio.Button>
        <Radio.Button value="sweatshirt">Sweatshirt ($20)</Radio.Button>
        <Radio.Button value="shorts">Shorts ($30)</Radio.Button>
      </Radio.Group>
    </>
  );
};

const AntdCard = () => {
  const [price, setPrice] = useState(10);

  return (
    <Card title="Product Card">
      <SizeOptions />
      <TypeOptions onPriceChange={setPrice} />
      <Button style={{marginTop:'20px'}} type="primary" size="large" block>
        Buy (${price})
      </Button>
    </Card>
  );
};

export default AntdCard;