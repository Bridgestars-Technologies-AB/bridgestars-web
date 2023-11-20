
let mockStorage:any = {};
const mockLocalStorage = {
  getItem(path: string | number): any {
    return mockStorage[path] || null;
  },

  setItem(path: string | number, value: any) {
    mockStorage[path] = value;
  },

  removeItem(path: string | number) {
    delete mockStorage[path];
  },

  get length() {
    return Object.keys(mockStorage).length;
  },

  key: (i: string | number) => {
    const keys = Object.keys(mockStorage) as any;
    return keys[i] || null;
  },

  clear() {
    mockStorage = {};
  },
};
global.localStorage = mockLocalStorage;
