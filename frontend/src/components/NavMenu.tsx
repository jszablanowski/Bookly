import { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import 'antd/dist/antd.css';
import { UserOutlined, CarOutlined, CompassOutlined, HomeOutlined, ShoppingCartOutlined, LockOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';
const { Header } = Layout;
const { SubMenu } = Menu;

interface State {
  collapsed : boolean
}

export class NavMenu extends Component<any, State> {
  static displayName = NavMenu.name;

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <Header >
        <div className="logo" />

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item icon={<LockOutlined />}><NavLink tag={Link} to="/">Admin Panel</NavLink></Menu.Item>
          <Menu.Item icon={<UserOutlined />}><NavLink tag={Link} to="/users">Users</NavLink></Menu.Item>

          <SubMenu key="SubMenu" title="Bookings" icon={<ShoppingCartOutlined />}>
            <Menu.Item icon={<HomeOutlined />}>
              <NavLink tag={Link} to="/bookings/flats">Flats</NavLink>
            </Menu.Item>
            <Menu.Item icon={<CarOutlined />}>
              <NavLink tag={Link} to="/bookings/cars">Cars</NavLink>
            </Menu.Item>
            <Menu.Item icon={<CompassOutlined />}>
              <NavLink tag={Link} to="/bookings/parking-spots">Parking Spots</NavLink>
            </Menu.Item>              
          </SubMenu>
        </Menu>
        
      </Header>
    );
  }
}
