const { counterFunc } = require("./index");

describe("counter func", () => {
  const [getA, nextA] = counterFunc(1);
  const [getB, nextB] = counterFunc(10);

  test("proper initial state", () => {
    expect(getA()).toBe(1);
  });

  test("'next' function increments", () => {
    nextA();
    expect(getA()).toBe(2);
  });
  test("counters are independent", () => {
    nextB();
    expect(getA()).toBe(2);
    expect(getB()).toBe(11);
    nextA();
    expect(getA()).toBe(3);
    expect(getB()).toBe(11);
  });
});
