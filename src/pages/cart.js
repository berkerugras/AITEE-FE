import React, { useState } from 'react';
import { Button, Table, Space, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import axios from "axios";


const { Title } = Typography;

const CartPage = () => {
  const location = useLocation();
  const [items, setItems] = useState(location.state && location.state.items ? location.state.items : []);
  const navigate = useNavigate();

  const handleDeleteItem = (item) => {
    const updatedItems = items.filter((i) => i !== item);
    window.history.replaceState({}, document.title)
    setItems(updatedItems);
  };
  async function handleCheckout(e) {
    e.preventDefault();
    navigate('/checkout', { state: { items } });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => <img src={record.canvasPicUrl} alt="" className="item-image" />,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>${text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteItem(record)}
          />
        </Space>
      ),
    },
  ];

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className='shopping-cart-title'>Shopping Cart</div>
      <div className="cart-container">
        <div className="cart-table">
          {items.length > 0 ? (
            <Table
              columns={columns}
              dataSource={items}
              rowKey={(record) => record.canvasPicUrl}
              pagination={false}

            />
          ) : (
            <p className="empty-cart-message">Your cart is empty</p>
          )}
        </div>
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Total Price: ${totalPrice}</p>
          <Button
            disabled={items.length === 0}
            onClick={handleCheckout}
            className="checkout-button"
          >
            Checkout
          </Button>
        </div>
      </div>
      <div className="disclaimer-box">
        <p>Attention! Any item you add to your cart is personal and special for you only. You may proceed to checkout but be aware that if you remove the item from your cart, it will be gone forever.</p>
      </div>
    </div>
  );
};

export default CartPage;
