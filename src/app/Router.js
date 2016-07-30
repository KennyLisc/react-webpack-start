import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from './layout/Layout';
import Index from './pages/index/Index';
import PersonComponet from './pages/person/person.page';
import FormTest from './pages/formtest/formtest';
// import DevTools from 'mobx-react-devtools';
// console.log(FormTest);
if (process.env.NODE_ENV === 'production') {
  // ...
} else {
  // the hacky workaround
  Router.prototype.componentWillReceiveProps = (nextProps) => {
    let components = [];
    function grabComponents(routes) {
      // console.log(routes);
      if (!routes) return;
      routes.forEach((route) => {
        if (route.component) {
          components.push(route.component);
        }
        if (route.indexRoute && route.indexRoute.component) {
          components.push(route.indexRoute.component);
        }
        if (route.childRoutes) {
          grabComponents(route.childRoutes);
        }
      });
    }
    grabComponents(nextProps.routes);
    components.forEach(React.createElement); // force patching
  };
}

const routes =
  (<Route path="/" component={Layout}>
    <IndexRoute component={Index}/>
    <Route path="/person" component={PersonComponet} />
    <Route path="/formtest" component={FormTest} />
    <Route path="*" component={() => <div>404 not found</div>}/>
  </Route>);

const RouterComp = () => (
  <Router history={hashHistory}>
    {routes}
  </Router>
  // <div>
  //   <Router history={hashHistory}>
  //     <Route path="/" component={Layout}>
  //       <IndexRoute component={Index}/>
  //       <Route path="/person" component={PersonComponet} />
  //       <Route path="*" component={() => <div>404 not found</div>}/>
  //     </Route>
  //   </Router>
  //   <DevTools />
  // </div>
);

export default RouterComp;
