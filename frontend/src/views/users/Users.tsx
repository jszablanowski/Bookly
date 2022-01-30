import { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, message } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import { User } from './User';
import { UserService } from '../../app/services/UserService'


const { Title } = Typography;
const { Search } = Input;

interface State {
  addingUser : boolean
  editingUser : boolean
  toEditUser : User | null
  searchedPhrase : string
  userList : User[]
}

interface Props {
  userService : UserService
}

export class Users extends Component<Props, State> {
  constructor(props : any){
      super(props);
      this.state={
          addingUser: false,
          editingUser: false,
          toEditUser: null,
          searchedPhrase: "",
          userList : exampleUsers,
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
    this.props.userService.createUser({
      username: user.email,
      password: user.password,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname
    }).then(response => {
      console.log(response)
      this.setState({addingUser: false})
      this.displayAddingSuccessMessage();
    })
      .catch(error => console.error(error));

   
  }
  displayAddingSuccessMessage = () => {
    message.success('New user added succesfully!');
  };
  displayEditingSuccessMessage = () => {
    message.success('User edited succesfully!');
  };
  displayErrorMessage = () => {
    message.error('Operation failed!');
  };

  editUserHandler = (record :  any) => {
    this.setState({toEditUser : record, editingUser : true} );
  }
  editUserCancelHandler = () => {
    this.setState({editingUser: false});
    console.log("Editing user has been canceled");
  }
  editUserConfirmHandler = (user : User) => {
    this.setState({editingUser: false});
    console.log("Editing " + user.userid + "new data: " + user)
    this.displayEditingSuccessMessage();
  }

  columns = [
    {
      title: 'User ID',
      dataIndex: 'userid',
      key: 'userid',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
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
      render: (_text: any, record: { userid : string, email : string; firstname: string; lastname: string; }) => (
        <Space size="middle">
            <Button onClick={(e) => this.editUserHandler(record)}>Edit {record.firstname}</Button>
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
          
          <Table columns={this.columns} dataSource={this.state.userList.filter((user) => (
            user.email.toUpperCase().includes(this.state.searchedPhrase.toUpperCase())
           ))} />

          <AddUser visible={this.state.addingUser} onCancel={this.addUserCancelHandler} onConfirm={this.addUserConfirmHandler} />
          <EditUser visible={this.state.editingUser} onCancel={this.editUserCancelHandler} onConfirm={this.editUserConfirmHandler} editeduser={this.state.toEditUser} />
        </div>
    );
  }
}