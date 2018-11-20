import React, { lazy, Suspense } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './App.css';

const BASE_NAV_URL = process.env.REACT_APP_NAVIGATION_PATH || '';

export const history = createHistory({ basename: BASE_NAV_URL });

const DemoPage = lazy(() => import('./DemoPage'));

const AppRoutes = () => (
  <Router history={history}>
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/" component={() => <DemoPage />} />
        <Route path="/:path" component={() => <DemoPage />} />
      </Switch>
    </Suspense>
  </Router>
);

export default AppRoutes;
