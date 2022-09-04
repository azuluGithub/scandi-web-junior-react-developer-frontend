import { cartReducer } from './Cart/Cart.reducer';
import { currenciesReducer } from './Currency/Currency.reducer';
import { overlayReducer } from './Overlay/Overlay.reducer';
import { routeReducer } from './Route/Route.reducer';
import { productsReducer } from './Product/Product.reducer';
import { categoriesReducer } from './Category/Category.reducer';
import { notificationReducer } from './Notification/Notification.reducer';
import { popupReducer } from './Popup/Popup.reducer';

const reducersObject = {
  overlay: overlayReducer,
  route: routeReducer,
  cart: cartReducer,
  productsReducer,
  currenciesReducer,
  categoriesReducer,
  notificationReducer,
  popupReducer,
}

class InjectStaticReducers {
  registerReducers(store) {
    for (let reducerKey in reducersObject) {
      store.injectReducer(reducerKey, reducersObject[reducerKey]);
    }

    return store;
  }
}

export default new InjectStaticReducers();