import './login.scss';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class LoginComponent extends Component {
  test = () => {
    return true;
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default LoginComponent;
