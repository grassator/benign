const ProxySymbol = Symbol("Benign Proxy");

const handler: ProxyHandler<{ [ProxySymbol]: any }> = {
  getPrototypeOf(obj) {
    return obj[ProxySymbol];
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
  getOwnPropertyDescriptor(obj) {
    return {
      configurable: true,
      writable: true,
      enumerable: true,
      value: obj[ProxySymbol]
    };
  },
  has() {
    return true;
  },
  get(obj) {
    return obj[ProxySymbol];
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
  apply(obj) {
    return obj[ProxySymbol];
  },
  construct(obj) {
    return obj[ProxySymbol];
  }
};

export const benign = <T = any>(): T => {
  const base = class BenignConstructor {
    static [Symbol.hasInstance]() {
      return true;
    }
    static [ProxySymbol]: any;
  };
  base[ProxySymbol] = new Proxy(base, handler);
  return base[ProxySymbol] as any;
};
