import { Component, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, Modal, Form } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"
import { UserForm } from './UserForm';
import { User } from '../../classes/User';

const { Title } = Typography;
const { Search } = Input;

interface Props {
    visible : boolean,
    onCancel : Function,
    onConfirm  : Function,
    editeduser: User | null;
}


export const EditUser: React.FC<Props> = (props: Props) => {

    return (
        <UserForm modalTitle="Edit user" visible={props.visible} onCancel={props.onCancel} onConfirm={props.onConfirm} editeduser={props.editeduser} />
    );
}