import { cloneElement, lazy, PureComponent, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loader from '../Loader';
import Header from '../Header';
import NotificationList from '../NotificationList';
import { TOP_ELEMENTS, MAIN_ELEMENTS } from './Router.config';

const NoMatch = lazy(() => import('Route/NoMatch'));
const HomePage = lazy(() => import('Route/HomePage'));
const CartPage = lazy(() => import('Route/CartPage'));
const ProductDisplayPage = lazy(() => import('Route/ProductDisplayPage'));
const ProductListPage = lazy(() => import('Route/ProductListPage'));

class RouterComponent extends PureComponent {

  [TOP_ELEMENTS] = [
    { component: <Header key='header'/> },
    { component: <NotificationList key='notificationsList'/> },
  ];

  [MAIN_ELEMENTS] = [
    { component: <Route exact path="/" component={HomePage} key='home'/> },
    { component: <Route path="/cart" component={CartPage} key='cart'/> },
    { component: <Route path="/category/:name" component={ProductListPage} key='category'/> },
    { component: <Route path="/product/:id" component={ProductDisplayPage} key='product'/> },
    { component: <Route component={NoMatch} key='nomatch'/> },
  ];

  renderElements(ELEMENTS) {
    return this[ELEMENTS].map(({ component }) => cloneElement(component));
  }

  renderLoader() {
    return <Loader />;
  }

  renderMainElements() {
    return (
      <Suspense fallback={this.renderLoader()}>
        <Switch>
          { this.renderElements(MAIN_ELEMENTS) }
        </Switch>
      </Suspense>
    );
  }

  renderRouter() {
    return (
      <BrowserRouter>
        { this.renderElements(TOP_ELEMENTS) }
        { this.renderMainElements() }
      </BrowserRouter>
    );
  }

  render() {
    return this.renderRouter();
  }
}

export default RouterComponent;
