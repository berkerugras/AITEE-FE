import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [products, setProduct] = useState([]);
  const history = useNavigate();
  const productsa = [
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

  useEffect(() => {
    axios.get("http://localhost:5000/posts/get-all-documents").then((res) => {
      setProduct(res.data);
      console.log(JSON.stringify(res.data));
    });
  }, []);

  // Add an empty product to fill the last row if necessary
  if (products.length % 5 !== 0) {
    products.push({ image: '', price: '' });
  }

  // function checkIfProductsEmpty() {
  //   if (products.length === 0) {
  //     return <div style={{ padding: '24px' }}>
  //       <h1>Marketplace</h1>
  //     </div>
  //   }
  //   else {
  //     return <div style={{ padding: '24px' }}>
  //       <h1>Marketplace</h1>
  //       <Row gutter={[16, 16]}>
  //         {products.map((product, index) => (
  //           <Col key={index} span={4}>
  //             {product.product ? (
  //               <Card
  //                 hoverable
  //                 cover={<img alt="product" src={"http://localhost:5000" + product.product} />}
  //               >
  //                 <Card.Meta
  //                   title={`Product ${index + 1}`}
  //                 />
  //                 <p>$ {product.price}</p>
  //                 <p>{product.userName}</p>
  //               </Card>
  //             ) : null}
  //           </Col>
  //         ))}
  //         {/* Add an empty card to fill the last row if necessary */}
  //         {products.length % 5 !== 0 && <Col span={4} />}
  //       </Row>
  //     </div>
  //   }
  // }
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
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col key={index} span={4}>
            {product.product ? (
              <Card
                onClick={() => { goPDP(product) }}
                hoverable
                cover={<img alt="product" src={"http://localhost:5000" + product.product} />}
              >
                <Card.Meta
                  title={`Product ${index + 1}`}
                />
                <p>$ {product.listing_price}</p>
                <p>{product.userName}</p>
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