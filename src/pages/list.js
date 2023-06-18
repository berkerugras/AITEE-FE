import React, { useState } from 'react';
import { Button, Result, Input, Form, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const ListingPage = () => {
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

        let listing_price = "";
        let note = "";
        let address = localStorageJSON.address;
        let phone = localStorageJSON.phone;


        form.validateFields()
            .then((values) => {
                note = values.note;
                listing_price = values.newprice
                console.log(values);
                setCheckoutStatus('success');

                axios.post("http://localhost:5000/posts/market-product", {
                    note,
                    userName,
                    email,
                    address,
                    phone,
                    price,
                    listing_price,
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
        <div className="checkout-page">
            {checkoutStatus === 'processing' && (
                <div className="checkout-container" style={{ marginTop: "3rem" }}>
                    <div className="checkout-summary">
                        <h3>Summary</h3>
                        <p>To be paid: ${totalPrice}</p>
                        <Form form={form}>
                            <Title level={4}>Listing Information</Title>
                            <Form.Item
                                name="username"
                                label="User Name"
                                rules={[{ required: true }]}
                                initialValue={JSON.parse(localStorage.getItem('userData')).userName}
                            >
                                <Input disabled={true} />
                            </Form.Item>

                            <Form.Item
                                name="newprice"
                                label="Listing Price ($)"
                                rules={[{ required: true, message: 'Please enter the new price for this item' }]}
                                initialValue="30"
                            >
                                <Input type="number" />
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
                                    <div><span style={{ fontWeight: "bold" }}>Size:</span> {item.size}</div>
                                    <div><span style={{ fontWeight: "bold" }}>Quantity:</span> {item.quantity}</div>
                                    <div><span style={{ fontWeight: "bold" }}>Price:</span> ${item.price}</div>
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

export default ListingPage;
