class Field {
  children = [];

  constructor(name) {
    this.name = name;
  }

  setChildren(instances) {
    this.children = [ ...this.children, ...instances ];
    return this;
  }
}

export default Field;
