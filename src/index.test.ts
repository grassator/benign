import * as assert from "assert";
import * as util from "util";
import { Benign, benign, PROPERTY_PATH, PROPERTY_PROXY } from "./index";

function assertIsBenign(value: any): value is Benign {
  if (!(PROPERTY_PATH in value)) {
    throw Error(`Expected ${value} to be Benign`);
  }
  return true;
}

describe("benign", () => {
  describe("base functionality", () => {
    it("should allow inspection", () => {
      const b = benign();
      assert.strictEqual(util.inspect(b), "[object Benign]");
    });
    it("should allow being converted to string", () => {
      const b = benign();
      assert.strictEqual(String(b), "[object Benign]");
    });
    it("should allow calling toString()", () => {
      const b = benign();
      assert.strictEqual(b.toString(), "[object Benign]");
    });
    it("should allow being converted to a number", () => {
      const b = benign();
      assert.strictEqual(Number(b), 1);
    });
    it("should allow being converted to a default primitive", () => {
      const b = benign();
      assert.strictEqual(b + "", "[object Benign]");
    });
    it("should be convertible to string by Object.prototype.toString", () => {
      const b = benign();
      assert.strictEqual(
        Object.prototype.toString.call(b),
        "[object Function]"
      );
    });
    it("should return itself as a constructed object", () => {
      const Class = benign();
      assertIsBenign(new Class());
    });
    it("should return itself when called as a function", () => {
      const fn = benign();
      assertIsBenign(fn());
    });
    it("should return itself when calling a method", () => {
      const b = benign();
      assertIsBenign(b.foo());
    });
    it("should return itself when accessing a property", () => {
      const b = benign();
      assertIsBenign(b.foo);
    });
    it("should allow to set a property but not actually do it", () => {
      const b = benign();
      b.foo = "foo";
      assertIsBenign(b.foo);
    });
    it("should report that it has any property", () => {
      const b = benign();
      assert("foo" in b);
      assert("bar" in b);
    });
    it("should return only prototype as own keys", () => {
      assert.deepStrictEqual(Object.getOwnPropertyNames(benign()), [
        "prototype"
      ]);
    });
    it("should allow deleting properties", () => {
      delete benign().foo;
    });
    it("should allow to define properties but not actually do it", () => {
      const b = benign();
      Object.defineProperty(b, "foo", {
        value: "bar"
      });
      assertIsBenign(b.foo);
    });
    it("should report that everything is an instance of benign()", () => {
      const b = benign();
      assert({} instanceof b);
    });
    it("should give a valid prototype", () => {
      const b = benign();
      assert.strictEqual(
        Object.prototype.toString.call(Object.getPrototypeOf(b)),
        "[object Function]"
      );
    });
  });
  describe("external API", () => {
    it("should expose itself under a symbol property", () => {
      const b: Benign = benign();
      assert.strictEqual(b[PROPERTY_PROXY], b);
    });
  });
});
