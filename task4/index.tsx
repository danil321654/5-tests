import React, {
  FC,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";

export const Parent: FC = () => {
  const [count, setCount] = useState(0);
  const [extraA, setExtraA] = useState(1);
  const [extraB, setExtraB] = useState(2);
  return (
    <LayerA count={count} setCount={setCount} extraA={extraA} extraB={extraB} />
  );
};
/**
 * LAYER A -------------------------------------------------
 */
type LayerAProps = {
  count: number;
  setCount: (value: number) => void;
  extraA: number;
  extraB: number;
};
const LayerA: FC<LayerAProps> = ({ count, setCount, extraA, extraB }) => (
  <div>
    <LayerB count={count} setCount={setCount} extraB={extraB} />
    <div>{extraA}</div>
  </div>
);
/**
 * LAYER B -------------------------------------------------
 */
type LayerBProps = {
  count: number;
  setCount: (value: number) => void;
  extraB: number;
};
const LayerB: FC<LayerBProps> = ({ count, setCount, extraB }) => (
  <div>
    <Child count={count} setCount={setCount} />
    <div>{extraB}</div>
  </div>
);
/**
 * LAST CHILD ----------------------------------------------
 */
type ChildProps = {
  count: number;
  setCount: (value: number) => void;
};
const Child: FC<ChildProps> = ({ count, setCount }) => (
  <>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Inc</button>
  </>
);

// 1)   What’s wrong with this code snippet?
//      1.1) Almost the same props are passed from parent to child and then to its child and so on
//      1.2) Code is hard to read
//      1.3) Every component is rerendered on every state change

// 2) How can we improve it?

//      a) Create and use context for storing states

interface CountAndExtrasContextProps {
  count: number;
  setCount: (value: number) => void;
  extraA: number;
  extraB: number;
}

const CountAndExtrasContext = createContext({} as CountAndExtrasContextProps);

const useCountAndExtrasContext = (): CountAndExtrasContextProps =>
  useContext(CountAndExtrasContext);

export const ParentWithContext: FC = () => {
  const [count, setCount] = useState(0);
  const [extraA, setExtraA] = useState(1);
  const [extraB, setExtraB] = useState(2);
  return (
    <CountAndExtrasContext.Provider value={{ count, setCount, extraA, extraB }}>
      <LayerAWithContext />
    </CountAndExtrasContext.Provider>
  );
};

const LayerAWithContext: FC = () => {
  const { extraA } = useCountAndExtrasContext();
  return (
    <div>
      <LayerBWithContext />
      <div>{extraA}</div>
    </div>
  );
};

const LayerBWithContext: FC = () => {
  const { extraB } = useCountAndExtrasContext();
  return (
    <div>
      <Child />
      <div>{extraB}</div>
    </div>
  );
};
const ChildWithContext: FC = () => {
  const { count, setCount } = useCountAndExtrasContext();
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>
    </>
  );
};
//      b) Component composition

export const ParentComposition: FC = () => {
  const [count, setCount] = useState(0);
  const [extraA, setExtraA] = useState(1);
  const [extraB, setExtraB] = useState(2);
  return (
    <LayerAComposition
      extraA={extraA}
      LayerB={
        <LayerBComposition
          extraB={extraB}
          Child={<ChildComposition count={count} setCount={setCount} />}
        />
      }
    />
  );
};
/**
 * LAYER A -------------------------------------------------
 */
type LayerACompositionProps = {
  LayerB: ReactNode;
  extraA: number;
};
const LayerAComposition: FC<LayerACompositionProps> = ({ LayerB, extraA }) => (
  <div>
    {LayerB}
    <div>{extraA}</div>
  </div>
);
/**
 * LAYER B -------------------------------------------------
 */
type LayerBCompositionProps = {
  Child: ReactNode;
  extraB: number;
};
const LayerBComposition: FC<LayerBCompositionProps> = ({ Child, extraB }) => (
  <div>
    {Child}
    <div>{extraB}</div>
  </div>
);
/**
 * LAST CHILD ----------------------------------------------
 */
type ChilCompositiondProps = {
  count: number;
  setCount: (value: number) => void;
};
const ChildComposition: FC<ChilCompositiondProps> = ({ count, setCount }) => (
  <>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Inc</button>
  </>
);

//
// 3) What benefits and drawbacks of each method?

//      a) Context:
//          +: solves problem of props drilling and makes code easier to read
//          -: makes components unusable without context (affects reusability) and does not solve the problem unnecessary rerenders
//      b) Component composition:
//          +: solves problem of props drilling and makes code easier to read and solves the problem unnecessary rerenders
//          -: makes code hard to read when composition is too nested like in ParentComposition component
