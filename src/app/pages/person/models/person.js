import { observable, computed } from 'mobx';

export default class Person {
// observable state:
  @observable firstName = 'Michel';
  @observable lastName = 'Weststrate';
  @observable nickName = '';

  // computed values:
  @computed get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
