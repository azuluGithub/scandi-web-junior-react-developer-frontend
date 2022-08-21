class BrowserDatabase {
  setItem(key, data) {
    if (data) {
      const stringified = JSON.stringify(data);
      window.localStorage.setItem(key, stringified);
    }
  }

  getItem(key) {
    const storage = window.localStorage.getItem(key);
    return storage !== undefined ? JSON.parse(storage) : null;
  }
}

export default new BrowserDatabase();
