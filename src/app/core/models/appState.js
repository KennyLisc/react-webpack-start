import { observable } from 'mobx';

const appState = {
  @observable isLockScreen: false,
  @observable pageCout: 0
};

export default appState;
