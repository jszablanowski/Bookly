import { Component, useContext } from 'react';
import { NavLink } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import './NavMenu.css';
import 'antd/dist/antd.css';
import { UserOutlined, CarOutlined, CompassOutlined, HomeOutlined, ShoppingCartOutlined, LockOutlined } from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import { GlobalStore, globalContext } from '../reducers/GlobalStore';
const { Header } = Layout;
const { SubMenu } = Menu;

export function NavMenu() {
  const location = useLocation(); 
  const { globalState } = useContext(globalContext);


  const getSelectedKeyFromPath = () => {
    let path = location.pathname;
    if(path.includes('flats')) return ['Flats'];
    if(path.includes('cars')) return ['Cars'];
    if(path.includes('parking_spots')) return ['ParkingSpots'];
    if(path.includes('users')) return ['Users'];
    return ['AdminPanel'];
  }

  const navigateTo_IfLoggedIn = (to : string) => {
    return globalState.isUserAuthenticated ? to : "/login"
  }

  return (
    <Header >
      <div className="logo" />

      <Menu theme="dark" mode="horizontal" selectedKeys={getSelectedKeyFromPath()}>
        <Menu.Item key="AdminPanel" icon={<LockOutlined />}><NavLink tag={Link} to={navigateTo_IfLoggedIn("/home")}>Admin Panel</NavLink></Menu.Item>
        <Menu.Item key="Users" icon={<UserOutlined />}><NavLink tag={Link} to={navigateTo_IfLoggedIn("/users")}>Users</NavLink></Menu.Item>

        <SubMenu key="SubMenu" title="Bookings" icon={<ShoppingCartOutlined />}>
          <Menu.Item key="Flats" icon={<HomeOutlined />}>
            <NavLink tag={Link} to={navigateTo_IfLoggedIn("/bookings/flats")}>Flats</NavLink>
          </Menu.Item>
          <Menu.Item key="Cars" icon={<CarOutlined />}>
            <NavLink tag={Link} to={navigateTo_IfLoggedIn("/bookings/cars")}>Cars</NavLink>
          </Menu.Item>
          <Menu.Item key="ParkingSpots" icon={<CompassOutlined />}>
            <NavLink tag={Link} to={navigateTo_IfLoggedIn("/bookings/parking_spots")}>Parking Spots</NavLink>
          </Menu.Item>              
        </SubMenu>
      </Menu>
      
    </Header>
  );
}
