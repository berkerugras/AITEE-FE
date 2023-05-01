import { Card, Col, Row } from 'antd';

const Marketplace = () => {
  const products = [
    { image: 'https://via.placeholder.com/150x150', price: 10 },
    { image: 'https://via.placeholder.com/150x150', price: 15 },
    { image: 'https://via.placeholder.com/150x150', price: 20 },
    { image: 'https://via.placeholder.com/150x150', price: 25 },
    { image: 'https://via.placeholder.com/150x150', price: 30 },
    { image: 'https://via.placeholder.com/150x150', price: 35 },
    { image: 'https://via.placeholder.com/150x150', price: 40 },
    { image: 'https://via.placeholder.com/150x150', price: 45 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
    { image: 'https://via.placeholder.com/150x150', price: 50 },
  ];

  // Add an empty product to fill the last row if necessary
  if (products.length % 5 !== 0) {
    products.push({ image: '', price: '' });
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>Marketplace</h1>
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col key={index} span={4}>
            {product.image ? (
              <Card
                hoverable
                cover={<img alt="product" src={product.image} />}
              >
                <Card.Meta
                  title={`Product ${index + 1}`}
                  description={`$${product.price}`}
                />
              </Card>
            ) : null}
          </Col>
        ))}
        {/* Add an empty card to fill the last row if necessary */}
        {products.length % 5 !== 0 && <Col span={4} />}
      </Row>
    </div>
  );
};

export default Marketplace;