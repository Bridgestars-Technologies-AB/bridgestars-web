
let storage:any = {};
const mockRNStorage = {
  getItem(path: string | number, cb: (arg0: any, arg1: any) => void) {
    cb(undefined, storage[path] || null);
  },

  setItem(path: string | number, value: any, cb: () => void) {
    storage[path] = value;
    cb();
  },

  removeItem(path: string | number, cb: () => void) {
    delete storage[path];
    cb();
  },

  getAllKeys(cb: (arg0: any, arg1: string[]) => void) {
    cb(undefined, Object.keys(storage));
  },

  multiGet(keys: any[], cb: (arg0: any, arg1: any) => void) {
    const objects = keys.map((key: string | number) => [key, storage[key]]);
    cb(undefined, objects);
  },

  multiRemove(keys: any[], cb: (arg0: any) => void) {
    keys.map((key: string | number) => delete storage[key]);
    cb(undefined);
  },

  clear() {
    storage = {};
  },
};
global.RNStorage = mockRNStorage;
