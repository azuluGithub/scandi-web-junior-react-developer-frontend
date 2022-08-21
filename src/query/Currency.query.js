import Field from 'Util/Query/Field';

class CurrencyQuery {
  _toInstance(name) {
    return name instanceof Field ? name : new Field(name);
  }

  _listToInstances(list) {
    return list.map((item) => this._toInstance(item));
  }

  _currenciesChildren() {
    return this._listToInstances(['label', 'symbol']);
  }

  getCurrencies() {
    return new Field('currencies').setChildren(this._currenciesChildren());
  }
}

export default new CurrencyQuery();