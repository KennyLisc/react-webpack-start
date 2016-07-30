import './layout.scss';

import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import appState from './../core/models/appState';

const SubMenu = Menu.SubMenu;

@observer
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNavKey: ''
    };
    this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
  }

  handleNavMenuClick(e) {
    console.log(e.key);
    this.setState({
      currentNavKey: e.key
    });
  }

  renderNav() {
    return (
      <nav className="layout-nav">
        <Menu
          onClick={this.handleNavMenuClick}
          selectedKeys={[this.state.currentNavKey]}
          mode="horizontal" theme="dark"
        >
          <Menu.Item key="index">
            <Link to="/" activeClassName="active">首页</Link>
          </Menu.Item>
          <Menu.Item key="person" activeClassName="active">
            <Link to="/person" activeClassName="active">Person</Link>
          </Menu.Item>
          <Menu.Item key="formtest">
            <Link to="/formtest" activeClassName="active">Form Test</Link>
          </Menu.Item>
          <SubMenu key="about" title="关于">
            <Menu.Item key="index1">
              <Link to="/index1">index-1</Link>
            </Menu.Item>
            <Menu.Item key="index2">
              <Link to="/index2">index-2</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="login">
            <Link to="/login">登录</Link>
          </Menu.Item>
        </Menu>
      </nav>
    );
  }

  renderLoading() {
    const coverClass = classNames({
      'loading-cover': true,
      hide: !appState.isLockScreen
    });
    return (
      <div className={coverClass}>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderLoading()}
        {this.renderNav()}
        <div className="layout-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object
};
export default Layout;
