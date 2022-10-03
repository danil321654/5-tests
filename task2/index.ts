const counter = (initial = 0) => {
  let counter = initial;
  return [() => counter, () => counter++];
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
