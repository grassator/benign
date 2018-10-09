import * as assert from "assert";
import { benign } from "./index";

describe("benign", () => {
  describe("base functionality", () => {
    it("should return itself as a constructed object", () => {
      const Class = benign();
      assert.strictEqual(new Class(), Class);
    });
    it("should return itself when called as a function", () => {
      const fn = benign();
      assert.strictEqual(fn(), fn);
    });
    it("should return itself when calling a method", () => {
      const b = benign();
      assert.strictEqual(b.foo(), b);
    });
    it("should return itself when accessing a property", () => {
      const b = benign();
      assert.strictEqual(b.foo, b);
    });
    it("should allow to set a property but not actually do it", () => {
      const b = benign();
      b.foo = "foo";
      assert.strictEqual(b.foo, b);
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
      assert.strictEqual(b.foo, b);
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
});
