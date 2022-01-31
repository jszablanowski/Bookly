import { Component, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, Modal, Form } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"
import { User } from '../../classes/User';

const { Title } = Typography;
const { Search } = Input;

interface Props {
    visible : boolean,
    onCancel : Function,
    onConfirm  : Function,
    modalTitle: String,
    editeduser: User | null;
}


export const UserForm: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState();
    const [form] = Form.useForm();

    const passwordValidate = (password : String) => {
        return password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
    }

    const getDefaultEmail = () => {
        if(props.editeduser != null)
            return props.editeduser.email;
        return "";
    }
    const getDefaultFirstname = () => {
        if(props.editeduser != null)
            return props.editeduser.firstname;
        return "";
    }
    const getDefaultLastname = () => {
        if(props.editeduser != null)
            return props.editeduser.lastname;
        return "";
    }

    return (
        <Modal title={props.modalTitle} visible={props.visible}
            onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    props.onConfirm(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                });}}
            okText="Confirm"
            onCancel={(e) => props.onCancel()}>
                
             <Form layout='vertical' form={form}>
                <Form.Item name="email" label="Email" initialValue={getDefaultEmail()}
                    rules={[
                        {
                            required: true,
                            message: 'Email cannot be empty!',
                        },
                        {
                            type: 'email',
                            message: 'Please enter valid email!'
                        },
                ]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="firstname" label="First name" initialValue={getDefaultFirstname()}
                    rules={[
                        {
                            required: true,
                            message: 'First name cannot be empty!',
                        },
                ]}>
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastname" label="Last name" initialValue={getDefaultLastname()}
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
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (passwordValidate(value)) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('Must contain at least 8 characters, one uppercase and one number!'));
                        },
                    }),
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