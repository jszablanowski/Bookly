import { Component, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, Modal, Form } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"

const { Title } = Typography;
const { Search } = Input;

interface Props {
    visible : boolean,
    onCancel : Function,
    onAdd  : Function
}

export const AddUser: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState();
    const [form] = Form.useForm();

    return (
        <Modal title="Add new user" visible={props.visible}
            onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    props.onAdd(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                });}}
            okText="Add user"
            onCancel={(e) => props.onCancel()}>

             <Form layout='vertical' form={form}>
                <Form.Item name="username" label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Username cannot be empty!',
                        },
                ]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="firstname" label="First name"
                    rules={[
                        {
                            required: true,
                            message: 'First name cannot be empty!',
                        },
                ]}>
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastname" label="Last name"
                    rules={[
                        {
                            required: true,
                            message: 'Last name cannot be empty!',
                        },
                ]}>
                    <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item label="Password" name="password" hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirm" label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
}