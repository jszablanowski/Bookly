import { Component, useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Row, message, Pagination } from 'antd';
import exampleUsers from "../../exampleData/users.json";
import {Typography} from "antd"
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import { User } from '../../classes/User';
import { UserService } from '../../app/services/UserService'
import { globalContext, GlobalStore } from '../../reducers/GlobalStore';
import Checkbox from 'antd/lib/checkbox/Checkbox';


const { Title } = Typography;
const { Search } = Input;

interface State {
  addingUser : boolean
  editingUser : boolean
  toEditUser : User
  searchedPhrase : string
  userList : User[]
}

interface Props {
  userService : UserService
}


const Users: React.FC<Props> = (props: Props) =>  {
  const pageSize = 100;
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [toEditUser, setToEditUser] = useState(exampleUsers[0]);
  const [searchedPhrase, setSearchedPhrase] = useState("");
  const [userList, setUserList] = useState(exampleUsers);
  const [showActive, setshowActive] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(1);
  const { globalState } = useContext(globalContext);

  const onSearchHandler = (value: any) => {
    setSearchedPhrase(value);
  }
  const addUserHandler = () => {
    setAddingUser(true);
  }
  const addUserCancelHandler = () => {
    setAddingUser(false);
    console.log("Adding user has been canceled");
  }
  const addUserConfirmHandler = (user : User) => {
    props.userService.createUser({
      username: user.email,
      password: user.password,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname
    }).then(response => {
      console.log(response)
      setAddingUser(false);
      displayAddingSuccessMessage();
      fetchData(pageNumber, showActive);
    })
      .catch(error => console.error(error));
  }
  const displayAddingSuccessMessage = () => {
    message.success('New user added succesfully!');
  };
  const displayEditingSuccessMessage = () => {
    message.success('User edited succesfully!');
  };

  const editUserHandler = (record :  any) => {
    setToEditUser(record);
    setEditingUser(true);
  }
  const editUserCancelHandler = () => {
    setEditingUser(false);
    console.log("Editing user has been canceled");
  }
  const editUserConfirmHandler = (user : User) => {
    user.userid = toEditUser.userid;
    props.userService.editUser(
      globalState.token,
      user.userid,
      user.email,
      user.firstname,
      user.lastname,
      user.password
      ).then(response => {
        console.log(response)
      }).catch(error => console.error(error));
    fetchData(pageNumber, showActive);

    setEditingUser(false);
    console.log("Editing " + user.userid + " new data: " + " " + user.email + " " + user.email + " " + user.firstname + " " + user.lastname)
    displayEditingSuccessMessage();
  }
  const editUser = () => {
    return <EditUser visible={editingUser} onCancel={editUserCancelHandler} onConfirm={editUserConfirmHandler} editeduser={toEditUser} />
  }
  const deleteUser = (userId : number) => {
    props.userService.deleteUser(
      globalState.token,
      userId
      ).then(response => console.log(response)
      ).catch(error => console.error(error));
    console.log("Deleting " + userId);
    fetchData(pageNumber, showActive);
  }
  const onshowActiveChangeHandler = () => {
    fetchData(pageNumber, !showActive);
    setshowActive(!showActive);
  }
  function changePageNumberHandler(page : number, pageSize : number) {
      fetchData(page, showActive)
  }
  function fetchData(page : number, active: boolean) {
    console.log("fetching page:" + page + " pageSize:" + pageSize + " active:" + active);
  
    props.userService.getUsers(
      globalState.token,
        page,
        pageSize,
        active
  ).then((response) => {
      console.log(response);
      let users : any = response.users?.map((user : any) => ({
          userid: user.id,
          email: user.email,
          firstname: user.first_name,
          lastname: user.last_name
      }))

      setUserList(users);
      setTotalPages(response.totalPages === undefined ? 1 : response.totalPages);
  }).catch((error) => {
    message.error('Could not load data!');
    console.log(error)
  });
  }

  useEffect(() => {
    fetchData(1, true);
  }, []);

  const columns = [
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
      render: (_text: any, record: { userid : number, email : string; firstname: string; lastname: string; }) => (
        <Space size="middle">
            <Button onClick={(e) => editUserHandler(record)}>Edit</Button>
            {showActive && <Button onClick={(e) => deleteUser(record.userid)}>Delete</Button>}
        </Space>
      ),
    },
  ];

  return (
      <div> 
        <Title>Users</Title>
        
        <Row justify="space-between">
          <Search placeholder="search..." allowClear onSearch={onSearchHandler} style={{ width: 400, marginBottom: 20}} />

          <Button onClick={addUserHandler}  style={{ width: 150 }}>Add user</Button>

         <Input.Group>
          <Checkbox checked={showActive} onChange={onshowActiveChangeHandler} >
            Show active users
          </Checkbox>
         </Input.Group>
        </Row>
        
        <Table columns={columns} dataSource={userList.filter((user) => (
          user.email.toUpperCase().includes(searchedPhrase.toUpperCase())
          ))}
        />

        <AddUser visible={addingUser} onCancel={addUserCancelHandler} onConfirm={addUserConfirmHandler} />
        { editingUser && editUser() }
      </div>
  );
}

export default Users;