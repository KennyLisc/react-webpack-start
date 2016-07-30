import './index.scss';
import React from 'react';
import { observer } from 'mobx-react';
import EChartsWrapper from './../../core/components/EChartsWrapper';
import Bar from './../../core/models/Bar';
import DI from './../../core/utils/di';
import TYPES from './../../core/constants/service-types';

@observer
class IndexComponent extends React.Component {
  constructor() {
    super();
    this.bar = new Bar();
    console.log('index page loading');
    console.log(DI.get(TYPES.apiHelper));
    DI.get(TYPES.apiHelper).test();
    DI.get(TYPES.apiHelper).test();
    console.log(DI.get(TYPES.apiHelper).date);
  }

  render() {
    return (
      <div>
        <div className="chart-container">
          <EChartsWrapper option={this.bar.option}/>
        </div>
      </div>
    );
  }
}

export default IndexComponent;
