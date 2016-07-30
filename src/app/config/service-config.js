import DI from '../core/utils/di';
import Types from '../core/constants/service-types';
import ApiHelper from '../core/services/apihelper';

DI.bind(Types.apiHelper, ApiHelper);

console.log('di setting.');
