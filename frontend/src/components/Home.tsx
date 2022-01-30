import { Col, Row, Button } from 'antd';
import { useCallback, useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { TeamOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { GlobalStore, globalContext } from '../reducers/GlobalStore';

import {Typography} from "antd"
const { Title } = Typography;


export default function Home() {
  const navigate = useNavigate();
  const handleUsersClick = useCallback(() => navigate('/users', {replace: true}), [navigate]);
  const handleBookingsClick = useCallback(() => navigate('/bookings/flats', {replace: true}), [navigate]);

    return (
      <div>
          <Row justify="space-around" align="middle" style={{minHeight: "70vh" }}>
              <Col flex="45%">
                  <Button style={{minHeight: "50vh", minWidth: "100%" }} onClick={handleUsersClick}>
                    <Title><TeamOutlined /> Users</Title>
                  </Button>
              </Col>

              <Col flex="auto" />

              <Col flex="45%">    
                <Button style={{minHeight: "50vh", minWidth: "100%" }} onClick={handleBookingsClick}>
                    <Title><ShoppingCartOutlined /> Bookings</Title>
                </Button>   
              </Col>
          </Row>
      </div>
    );

}
