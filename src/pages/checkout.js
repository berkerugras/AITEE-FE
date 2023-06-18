import React, { useState } from 'react';
import { Button, Result, Input, Form, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    async function handlePayment() {
        const localStorageJSON = JSON.parse(localStorage.getItem('userData'));
        const email = localStorageJSON.email
        const userName = localStorageJSON.userName
        const age = localStorageJSON.age
        const price = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const size = items[0].size
        const product = items[0].canvasPicUrl;

        let note = "";
        let name = "";
        let lastname = "";
        let address = localStorageJSON.address;
        let phone = localStorageJSON.phone;


        form.validateFields()
            .then((values) => {
                note = values.note;
                name = values.name;
                lastname = values.lastname;
                address = values.address;
                phone = values.phone;
                console.log(values);
                setCheckoutStatus('success');

                axios.post("http://localhost:5000/posts/order-product", {
                    name,
                    lastname,
                    note,
                    userName,
                    email,
                    address,
                    phone,
                    price,
                    age,
                    product,
                    size
                }, {
                    withCredentials: true
                }).then((res) => {
                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="checkout-page" style={{ marginTop: "3rem" }}>
            {checkoutStatus === 'processing' && (
                <div className="checkout-container">
                    <div className="checkout-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Price: ${totalPrice}</p>
                        <Form form={form}>
                            <Title level={4}>Shipping Information</Title>
                            <Form.Item
                                name="username"
                                label="User Name"
                                rules={[{ required: true }]}
                                initialValue={JSON.parse(localStorage.getItem('userData')).userName}

                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="lastname"
                                label="Lastname"
                                rules={[{ required: true, message: 'Please enter your lastname' }]}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                                initialValue={JSON.parse(localStorage.getItem('userData')).address}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                                initialValue={JSON.parse(localStorage.getItem('userData')).phone}

                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="note" label="Note">
                                <TextArea rows={4} />
                            </Form.Item>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                                <Button type="primary" onClick={handlePayment}>
                                    Proceed to Payment
                                </Button>
                                <Button onClick={handleBackToCart}>Back to Cart</Button>
                            </div>
                        </Form>
                    </div>
                    <div className="checkout-items">
                        <ul style={{ listStyleType: "none" }}>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <img style={{ width: "25rem" }} src={item.canvasPicUrl} alt="" className="checkout-item-image" />
                                    <div><span style={{ fontWeight: "bold" }}>Size: </span> {item.size}</div>
                                    <div><span style={{ fontWeight: "bold" }}>Quantity: </span> {item.quantity}</div>
                                    <div><span style={{ fontWeight: "bold" }}>Price: </span> ${item.price}</div>
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
