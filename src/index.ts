class BenignConstructor {
  static [Symbol.hasInstance]() {
    return true;
  }
}

export const benign = <T = any>(): T => {
  const proxy: any = new Proxy(BenignConstructor, {
    getPrototypeOf() {
      return BenignConstructor;
    },
    setPrototypeOf() {
      return true;
    },
    isExtensible() {
      return true;
    },
    preventExtensions() {
      return true;
    },
    getOwnPropertyDescriptor(obj, name) {
      if (name === "prototype") {
        return Reflect.getOwnPropertyDescriptor(BenignConstructor, name);
      }
      return {
        configurable: true,
        writable: true,
        enumerable: true,
        value: proxy
      };
    },
    has() {
      return true;
    },
    get() {
      return proxy;
    },
    set() {
      return true;
    },
    deleteProperty() {
      return true;
    },
    defineProperty() {
      return true;
    },
    /** @deprecated */
    enumerate() {
      return [];
    },
    ownKeys() {
      // Has to return prototype
      return ["prototype"];
    },
    apply() {
      return proxy;
    },
    construct() {
      return proxy;
    }
  });
  return proxy;
};
