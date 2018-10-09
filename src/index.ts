export const PROPERTY_PROXY = Symbol("Benign Proxy");
export const PROPERTY_PATH = Symbol("Benign Proxy Path");

export abstract class BenignConstructor {
  private constructor() {}
  private static readonly [PROPERTY_PROXY]: any;
  private static readonly [PROPERTY_PATH]: string[];
}

export type Benign = typeof BenignConstructor;

const handler: ProxyHandler<Benign> = {
  getPrototypeOf(obj) {
    return obj[PROPERTY_PROXY];
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
      value: obj[PROPERTY_PROXY]
    };
  },
  has() {
    return true;
  },
  get(obj) {
    return obj[PROPERTY_PROXY];
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
    return obj[PROPERTY_PROXY];
  },
  construct(obj) {
    return obj[PROPERTY_PROXY];
  }
};

const benignInternal = (path: string[]): any => {
  class BenignConstructor {
    static [Symbol.hasInstance]() {
      return true;
    }
    private static readonly [PROPERTY_PATH]: string[] = path;
    private static readonly [PROPERTY_PROXY]: any = new Proxy(
      BenignConstructor,
      handler as any
    );
  }
  return BenignConstructor[PROPERTY_PROXY] as any;
};

export const benign = <T = any>(): T & Benign => benignInternal([]);
