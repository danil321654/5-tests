import React, { FC, useReducer, ReactNode } from "react";

export const Parent: FC = () => {
  return (
    <div>
      <Child>
        {/* How to get `open` value here and work with it?  */}
        {/* e.g. open ??  
        <SomeOtherComponent /> 
        */}
      </Child>
    </div>
  );
};
const Child: FC = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false);
  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
    </div>
  );
};

//      1)  What options do we have to get `open` value in Parent component?
//          a) Move state to parent
export const ParentWithState: FC = () => {
  const [open, toggleOpen] = useReducer((value) => !value, false);
  return (
    <div>
      <StatelessChild toggleOpen={toggleOpen}>
        {open ?? <SomeOtherComponent />}
      </StatelessChild>
    </div>
  );
};

interface StatelessChildProps {
  toggleOpen: () => void;
}
const StatelessChild: FC<StatelessChildProps> = ({ toggleOpen }) => (
  <div>
    <button onClick={toggleOpen}>Toggle</button>
  </div>
);

//          b) Use render props pattern

export const Parent2: FC = () => {
  return (
    <div>
      <Child2>{(open) => open ?? <SomeOtherComponent />}</Child2>
    </div>
  );
};

interface Child2Props {
  childen?: (arg0: boolean) => ReactNode;
}

const Child2: FC<Child2Props> = ({ children }) => {
  const [open, toggleOpen] = useReducer((value) => !value, false);
  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
      {children?.(open)}
    </div>
  );
};

//      2)  What benefits and drawbacks of each method?
//      a) Move state to parent:
//          +: The most "React" way to do it, code reads easily
//          -: makes entire parent to rerender on state change, we need to pass props to child
//      b) Use render props pattern:
//          +: solves problem without performance issues
//          -: makes code harder to read, developer will need to see the Child implementation
