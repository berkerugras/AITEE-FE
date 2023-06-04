import React, { useState } from 'react';
import { Button, Result, Input, Form, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const CheckoutPage = () => {
    const location = useLocation();
    const history = useNavigate();
    const { items } = location.state;
    const [checkoutStatus, setCheckoutStatus] = useState('processing');
    const [form] = Form.useForm();

    const handleBackToCart = () => {
        history.goBack();
    };

    const handlePayment = () => {
        form.validateFields().then((values) => {
            // Perform payment logic here using the form values
            // You can show a loading state while processing the payment
            console.log(values); // Access the form values here
            setCheckoutStatus('success'); // or 'error' if payment fails
        });
    };

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="checkout-page">
            <div className="checkout-title">Checkout</div>
            {checkoutStatus === 'processing' && (
                <div className="checkout-container">
                    <div className="checkout-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Price: ${totalPrice}</p>
                        <Form form={form}>
                            <Title level={4}>Shipping Information</Title>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="note" label="Note">
                                <TextArea rows={4} />
                            </Form.Item>
                            <Button type="primary" onClick={handlePayment}>
                                Proceed to Payment
                            </Button>
                            <Button onClick={handleBackToCart}>Back to Cart</Button>
                        </Form>
                    </div>
                    <div className="checkout-items">
                        <h2>Items:</h2>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <img src={item.canvasPicUrl} alt="" className="checkout-item-image" />
                                    <div>Size: {item.size}</div>
                                    <div>Quantity: {item.quantity}</div>
                                    <div>Price: ${item.price}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {checkoutStatus === 'success' && (
                <Result
                    status="success"
                    title="Payment Successful"
                    subTitle="Thank you for your purchase!"
                    extra={[
                        <Button key="back" onClick={handleBackToCart}>
                            Back to Cart
                        </Button>,
                        <Button key="continue" type="primary" onClick={() => history.push('/')}>
                            Continue Shopping
                        </Button>,
                    ]}
                />
            )}
            {checkoutStatus === 'error' && (
                <Result
                    status="error"
                    title="Payment Failed"
                    subTitle="Oops! Something went wrong. Please try again."
                    extra={[
                        <Button key="back" onClick={handleBackToCart}>
                            Back to Cart
                        </Button>,
                        <Button key="retry" type="primary" onClick={handlePayment}>
                            Retry Payment
                        </Button>,
                    ]}
                />
            )}
            <div className="disclaimer-box">
                <p>
                    Attention! Any item you add to your cart is personal and special for you only. You may proceed to checkout, but be
                    aware that if you remove the item from your cart, it will be gone forever.
                </p>
            </div>
        </div>
    );
};

export default CheckoutPage;
