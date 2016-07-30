// import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class ApiHelper {
  constructor() {
    this.date = 'test ok';
    this.now = new Date();
  }
  test() {
    console.log('test', this.date);
    console.log(this.now);
  }
}
