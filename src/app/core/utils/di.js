import inversify from 'inversify';
import 'reflect-metadata';

const kernel = new inversify.Kernel();

class DI {
  static get(key) {
    return kernel.get(key);
  }

  static bind(key, value) {
    // console.log(inversify);
    // inversify.decorate(inversify.injectable(), value);
    kernel.bind(key).to(value).inSingletonScope();
  }
}

export default DI;
