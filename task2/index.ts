type CounterType = (initial?: number) => [() => number, () => void];

const counter: CounterType = (initial = 0) => {
  let counterNum = initial;
  return [
    () => counterNum,
    () => {
      counterNum++;
    },
  ];
};

const [getA, nextA] = counter(1);
console.log(getA());
nextA();
console.log(getA());

const [getB, nextB] = counter(10);
nextB();
console.log(getA());
console.log(getB());
nextA();
console.log(getA());
console.log(getB());

module.exports = { counterFunc: counter };
