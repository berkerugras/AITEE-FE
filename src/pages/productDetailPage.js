import React, { useState } from 'react';
import { Button, Result, Input, Form, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Select } from 'antd';

const { TextArea } = Input;
const { Title } = Typography;

const ProductDetailPage = () => {

    const location = useLocation();
    const history = useNavigate();
    const items = location.state[0];
    const [checkoutStatus, setCheckoutStatus] = useState('processing');
    const [form] = Form.useForm();
    const [formSize] = Form.useForm();

    console.log(items);
    const handleBackToCart = () => {
        history.goBack();
    };

    async function handlePayment() {
        //backend code should be implemented here
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

            })
            .catch((error) => {
                console.log(error);
            });
    };
    const totalPrice = items.price;



    return (
        <div className="checkout-page" style={{ marginTop: "2.5rem" }}>
            {checkoutStatus === 'processing' && (
                <div className="checkout-container">
                    <div className="checkout-summary">
                        <h3>Product Detail Page</h3>
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
                            <Button type="primary" onClick={handlePayment}>
                                Proceed to Payment
                            </Button>
                            <Button onClick={handleBackToCart}>Back to Cart</Button>
                        </Form>
                    </div>
                    <div className="checkout-items">
                        <ul style={{ listStyleType: "none" }}>
                            <li>
                                <img style={{ width: "25rem" }} src={items.product} alt="" className="checkout-item-image" />
                                <div style={{ fontSize: "x-large", fontWeight: "bold" }}>Price: ${items.price}</div>
                                <Form form={formSize}>
                                    <Form.Item name="size">
                                        <p style={{
                                            marginTop: "1rem",
                                            fontSize: "1rem",
                                            fontWeight: "bold"
                                        }}>Select Size</p>
                                        <Select style={{
                                            marginTop: "1rem",
                                            width: "10rem"
                                        }} defaultValue="Medium">
                                            <Select.Option value="Small">Small</Select.Option>
                                            <Select.Option value="Medium">Medium</Select.Option>
                                            <Select.Option value="Large">Large</Select.Option>
                                            <Select.Option value="XLarge">XLarge</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </li>
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
        </div>
    );
};
export default ProductDetailPage;