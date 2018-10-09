export const PROPERTY_PROXY = Symbol("Benign Proxy");
export const PROPERTY_PATH = Symbol("Benign Proxy Path");

export abstract class BenignConstructor {
  private constructor() {}
  private static readonly [PROPERTY_PROXY]: any;
  private static readonly [PROPERTY_PATH]: PropertyKey[];
}

export type Benign = typeof BenignConstructor;

let INSPECT_PROP: PropertyKey = "inspect";

// This funky piece of code checks if implementation
// of `console.log` uses custom symbol to check if
// target object has a special inspection code
try {
  console.log(
    new Proxy(
      {},
      {
        get(obj, prop) {
          if (typeof prop === "symbol") {
            INSPECT_PROP = prop;
          }
          throw Error();
        }
      }
    )
  );
} catch (e) {
  // noop
}

function formatPath(path: PropertyKey[]): string {
  if (path.length === 0) {
    return "";
  }
  return (
    "." +
    path
      .map(item => (typeof item === "symbol" ? item.toString() : String(item)))
      .join(".")
  );
}

function benignInspect(this: Benign) {
  return `[object Benign${formatPath(Reflect.get(this, PROPERTY_PATH))}]`;
}

function benignToPrimitive(hint: "string" | "number" | "default") {
  if (hint === "number") {
    return 1;
  }
  return `[object Benign]`;
}

const handler: ProxyHandler<Benign> = {
  getPrototypeOf(obj) {
    return obj;
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
  getOwnPropertyDescriptor(obj, prop) {
    const realProp = Reflect.getOwnPropertyDescriptor(obj, prop);
    if (realProp) {
      return realProp;
    }
    return {
      configurable: true,
      writable: true,
      enumerable: true,
      value: Reflect.get(obj, PROPERTY_PROXY)
    };
  },
  has() {
    return true;
  },
  get(obj, prop) {
    if (prop === INSPECT_PROP) {
      return benignInspect;
    }
    if (prop === Symbol.toPrimitive || prop === "toString") {
      return benignToPrimitive;
    }
    if (prop === PROPERTY_PATH || prop === "prototype") {
      return Reflect.get(obj, prop);
    }
    return Reflect.get(obj, PROPERTY_PROXY);
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
    return Reflect.get(obj, PROPERTY_PROXY);
  },
  construct(obj) {
    return Reflect.get(obj, PROPERTY_PROXY);
  }
};

const benignInternal = (path: PropertyKey[]): any => {
  class BenignConstructor {
    private [Symbol.toPrimitive]() {
      return "benign";
    }
    private static readonly [PROPERTY_PATH]: PropertyKey[] = path;
    private static readonly [PROPERTY_PROXY]: any = new Proxy(
      BenignConstructor,
      handler as any
    );
  }
  return BenignConstructor[PROPERTY_PROXY] as any;
};

export const benign = <T = any>(): T & Benign => benignInternal([]);
