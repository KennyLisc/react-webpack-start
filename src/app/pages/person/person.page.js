import React, { PropTypes as T } from 'react';
// import { hashHistory } from 'react-router';
import { action, observable, extendObservable, transaction, asStructure, toJS } from 'mobx';
// , extendObservable, transaction, asStructure
import { observer } from 'mobx-react';
import Person from './models/person';
import { Button, Modal } from 'antd';
import './person.page.scss';
import appState from '../../core/models/appState';

@observer
class PersonComponet extends React.Component {
  // static propTypes = {
  //   person: Person
  // };
  static propTypes = {
    history: T.object
    // children: T.children
  };

  constructor() {
    super();
    this.person = new Person();
    this.readonly = true;
    this.state = { visible: false, canEdit: false };

    this.appState = appState;

    // this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSetEdit = this.onSetEdit.bind(this);
    // this.readonly = true;
  }


  @observable state: {};

  componentWillMount() {
    console.log('Component WILL MOUNT!');
    this.appState.pageCout = this.appState.pageCout + 1;
    extendObservable(this, {
      screenSize: {
        width: 0,
        height: 0
      },
      minSize: {
        width: 400,
        height: 30
      },
      viewPortSize: asStructure(function () {
        console.log('start change...');
        return {
          width: Math.max(this.screenSize.width, this.minSize.width),
          height: Math.max(this.screenSize.height, this.minSize.height)
        };
      })
    });

    window.onresize = () => {
      console.log('window resize.');
      transaction(() => {
        this.screenSize.width = window.innerWidth || document.documentElement.clientWidth
        || document.body.clientWidth;
        this.screenSize.height = window.innerHeight || document.documentElement.clientHeight
        || document.body.clientHeight;
      });
    };
  }

  @action onChangeNickName = (e) => {
    this.person.nickName = e.target.value;
  }

  @action onEdit = (e) => {
    e.preventDefault();
    this.readonly = false;
  }

  @action onSetEdit(e) {
    e.preventDefault();
    this.state.canEdit = !this.state.canEdit;
  }

  @action onCancel = (e) => {
    e.preventDefault();
    this.readonly = true;
  }

  @observable data = [
    {
      id: 1,
      productName: 'adu',
      info: 'adadd',
      price: 12,
      status: 1,
      address: 'adress1',
      isCheck: false
    },
    {
      id: 2,
      productName: 'adu2',
      info: 'adadd2',
      price: 192,
      status: 2,
      address: 'adress2',
      isCheck: false
    }
  ];

  @action handleCheck(e) {
    console.log(e);
    this.data.forEach((dataItem) => {
      const d = dataItem;
      d.isCheck = e.target.checked;
    });
  }

  @action showModal() {
    this.state.visible = true;
    console.log(this.state.visible);
  }
  @action handleOk() {
    console.log('点击了确定');
    this.state.visible = false;
  }
  @action handleCancel(e) {
    console.log(e);
    this.state.visible = false;
  }

  @action changeScreenSize(e) {
    e.preventDefault();
    this.screenSize.height = this.screenSize.height + 10;
    this.screenSize.width = this.screenSize.width + 10;
  }

  logItem() {
    this.props.history.push('/');
    // hashHistory.push('/');
    // browserHistory.push('/some/path')
    console.log(toJS(this.screenSize));
  }

  // @observable readonly: true;
  @observable readonly = true;

  render() {
    return (
      <div className="myperson">
        no alll
        <input
          type="text"
          disabled={this.readonly}
          value={this.person.nickName}
          onChange={this.onChangeNickName}
        />
        <Button type="primary" onClick={this.onEdit} disabled={!this.state.canEdit}>
          Edit
        </Button>
        <Button onClick={this.onCancel}>
          Cancel second new
        </Button>

        <Button onClick={this.onSetEdit}>
          Togle edit
        </Button>
        <p>{this.person.fullName} - {this.person.nickName}</p>
        <Button type="primary" onClick={::this.showModal}>显示对话框</Button>
        <Modal
          title="第一个 Modal"
          visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容 ok</p>
        </Modal>
        <br />
        <Button onClick={::this.changeScreenSize}>
          ChangeHeight
        </Button>
        <Button onClick={::this.logItem}>
          LogItem
        </Button>
        <div style={{
          width: this.viewPortSize.width
        }}>
            test {this.viewPortSize.width}-{this.viewPortSize.height}

            page counts: {this.appState.pageCout}
        </div>

        <input type="checkbox" onClick={::this.handleCheck}>
        </input>
        check all
        <ul className="productlist">
           {
             this.data.map((x) => {
               return (
                 <ProductItem className="productitem" item={x} key={x.id}>
                   Click here! {x.productName}
                 </ProductItem>
                );
             })
           }
        </ul>
        <input type="input" defaultValue="my name is...."/>
      </div>
    );

    // return (<input value={this.person.nickName} onChange={this.onChangeNickName} > </input>);
  }


}

@observer
class ProductItem extends React.Component {
  static propTypes = {
    item: T.shape({
      id: T.numbers,
      isCheck: T.bool,
      productName: T.string
    })
    // children: T.children
  };


  constructor(props) {
    super(props);
    this.test = 1;
  }

  @action onChange(e) {
    // console.log(e.target.value);
    // e.preventDefault();
    this.props.item.isCheck = e.target.checked;
  }

  @observable showDetail = false;

  @action toggleShow() {
    this.showDetail = !this.showDetail;
  }
  render() {
    let classNameObject = this.showDetail === true ? 'show1' : 'hide1';
    return (
      <li key={this.props.item.id}>
        <input type="checkbox" checked={this.props.item.isCheck} onChange={::this.onChange}>
        </input>

        <button onClick={::this.toggleShow} className={classNameObject}>Show Toggle</button>
        {this.showDetail ? 'show' : 'hide'}-
        {this.props.item.productName}

      </li>

    );
  }
}

export default PersonComponet;
