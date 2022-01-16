import { Component } from 'react';
import { NavMenu } from './NavMenu';
import 'antd/dist/antd.css';

import '.././custom.css';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

export class AppLayout extends Component {
  static displayName = AppLayout.name;

  render () {
    return (
      <Layout className="layout">
        <NavMenu />
        <Content style={{ padding: '0 50px' }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
