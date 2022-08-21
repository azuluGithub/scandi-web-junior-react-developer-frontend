import Field from 'Util/Query/Field';

class ProductQuery {

  _toInstance(name) {
    return name instanceof Field ? name : new Field(name);
  }

  _listToInstances(list) {
    return list.map((item) => this._toInstance(item));
  }

  _currencyChildren() {
    return this._listToInstances(['label', 'symbol']);
  }

  _currency() {
    return new Field('currency').setChildren(this._currencyChildren());
  }

  _pricesChildren() {
    return this._listToInstances([this._currency(), 'amount']);
  }

  _prices() {
    return new Field('prices').setChildren(this._pricesChildren());
  }

  _itemsChildren() {
    return this._listToInstances(['id', 'displayValue', 'value']);
  }

  _items() {
    return new Field('items').setChildren(this._itemsChildren());
  }

  _attributesChildren() {
    return this._listToInstances(['id', 'name', 'type', this._items()]);
  }

  _attributes() {
    return new Field('attributes').setChildren(this._attributesChildren());
  }

  _productChildren() {
    return this._listToInstances(
      [
        'id',
        'name',
        'inStock',
        'gallery',
        'description',
        'category',
        'brand',
        this._attributes(),
        this._prices(),
      ]
    );
  }

  getProduct() {
    return new Field('product').setChildren(this._productChildren());
  }

  _products() {
    return new Field('products').setChildren(this._productChildren());
  }

  _productsChildren() {
    return this._listToInstances([ this._products() ]);
  }

  getProducts() {
    return new Field('category').setChildren(this._productsChildren());
  }
}

export default new ProductQuery();