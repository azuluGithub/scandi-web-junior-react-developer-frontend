import Field from '../util/Query/Field';

class CategoryQuery {
  _toInstance(name) {
    return name instanceof Field ? name : new Field(name);
  }

  _listToInstances(list) {
    return list.map((item) => this._toInstance(item));
  }
  
  _categoriesChildren() {
    return this._listToInstances(['name']);
  }

  getCategories() {
    return new Field('categories').setChildren(this._categoriesChildren());
  }
}

export default new CategoryQuery();
