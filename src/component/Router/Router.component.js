import React, { lazy, PureComponent, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loader from '../Loader';
import Header from '../Header';
import NotificationList from '../NotificationList';

const NoMatch = lazy(() => import('../../route/NoMatch'));
const HomePage = lazy(() => import('../../route/HomePage'));
const CartPage = lazy(() => import('../../route/CartPage'));
const ProductDisplayPage = lazy(() => import('../../route/ProductDisplayPage'));
const ProductListPage = lazy(() => import('../../route/ProductListPage'));

class RouterComponent extends PureComponent {

  renderLoader() {
    return <Loader />;
  }

  renderMainElements() {
    return (
      <Suspense fallback={this.renderLoader()}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/category/:name" component={ProductListPage} />
          <Route path="/product/:id" component={ProductDisplayPage} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
    );
  }

  renderTopElements() {
    return (
      <>
        <Header />
        <NotificationList />
      </>
    );
  }

  renderRouter() {
    return (
      <BrowserRouter>
        { this.renderTopElements() }
        { this.renderMainElements() }
      </BrowserRouter>
    );
  }

  render() {
    return this.renderRouter();
  }
}

export default RouterComponent;
