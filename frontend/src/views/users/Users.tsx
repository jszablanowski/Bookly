import { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, message } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"
import { AddUser } from './AddUser';
import { User } from './User';

const { Title } = Typography;
const { Search } = Input;

interface State {
  addingUser : boolean,
  searchedPhrase : string
  carList : User[]
}
export class Users extends Component<any, State> {
  static displayName = Users.name;
  
  constructor(props : any){
      super(props);
      this.state={
          addingUser: false,
          searchedPhrase: "",
          carList : exampleUsers
      }
  }

  onSearchHandler = (value: any) => {
    this.setState({searchedPhrase: value});
  }
  addUserHandler = () => {
    this.setState({addingUser: true});
  }
  addUserCancelHandler = () => {
    this.setState({addingUser: false});
    console.log("Adding user has been canceled");
  }
  addUserConfirmHandler = (user : User) => {
    user.userid = "6996"
    this.setState(prevState => ({
      addingUser: false,
      carList: [...prevState.carList, user]
    }))
    this.displaySuccessMessage();
  }
  displaySuccessMessage = () => {
    message.success('New user added succesfully!');
  };
  displayErrorMessage = () => {
    message.error('Operation failed!');
  };

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
            <Button>Edit</Button>
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
          
          <Table columns={this.columns} dataSource={this.state.carList.filter((user) => (
            user.username.toUpperCase().includes(this.state.searchedPhrase.toUpperCase())
           ))} />

          <AddUser visible={this.state.addingUser} onCancel={this.addUserCancelHandler} onAdd={this.addUserConfirmHandler} />
        </div>
    );
  }
}