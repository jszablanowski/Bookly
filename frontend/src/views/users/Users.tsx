import { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"

const { Title } = Typography;
const { Search } = Input;

export class Users extends Component {
  static displayName = Users.name;
  carList = exampleUsers;
  searchedPhrase = "";

  onSearchHandler = (value: any) => {
    this.searchedPhrase = value;
    console.log("Searching " + value);
    this.forceUpdate();
  }

  addUserHandler = () => {
    console.log("Adding new user");
  }

  columns = [
    {
      title: 'User ID',
      dataIndex: 'userid',
      key: 'userid',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'Last Name',
      key: 'lastname',
      dataIndex: 'lastname'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: any, record: { firstname: string; lastname: string; }) => (
        <Space size="middle">
            <Button>Edit {record.firstname + ' ' + record.lastname}</Button>
            <Button>Delete</Button>
        </Space>
      ),
    },
  ];

  render () {
    return (
        <div>
          <Title>Users</Title>
          
          <Row justify="space-between">
            <Search placeholder="search..." allowClear onSearch={this.onSearchHandler} style={{ width: 400, marginBottom: 20}} />
            <Button onClick={this.addUserHandler} style={{ width: 150}} >Add user</Button>
          </Row>
          
          <Table columns={this.columns} dataSource={this.carList.filter((user) => (
            user.username.toUpperCase().includes(this.searchedPhrase.toUpperCase())
           ))} />
        </div>
    );
  }
}