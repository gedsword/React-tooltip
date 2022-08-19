import { useRef } from 'react';

//Mutable value

function MyComponent() {
  const reference = useRef(initialValue);
  const someHandler = () => {
    // Access reference value:
    const value = reference.current;
    // Update reference value:
    reference.current = newValue;
  };
  // ...
}

function LogButtonClicks() {
  const countRef = useRef(0);
  
  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };
  console.log('I rendered!');
  return <button onClick={handle}>Click me</button>;
}


function Stopwatch() {
  const timerIdRef = useRef(0);
  const [count, setCount] = useState(0);
  const startHandler = () => {
    if (timerIdRef.current) { return; }
    timerIdRef.current = setInterval(() => setCount(c => c+1), 1000);
  };
  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
  };
  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);
  return (
    <div>
      <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
}

//Accessing DOM elements

function AccessingElement() {
  const elementRef = useRef();
   useEffect(() => {
    const divElement = elementRef.current;
    console.log(divElement); // logs <div>I'm an element</div>
  }, []);
  return (
    <div ref={elementRef}>
      I'm an element
    </div>
  );
}

//Use case: focusing an input

function InputFocus() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <input 
      ref={inputRef} 
      type="text" 
    />
  );
}


//Ref is null on initial rendering

function InputFocus() {
  const inputRef = useRef();
  useEffect(() => {
    // Logs `HTMLInputElement` 
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);
  // Logs `undefined` during initial rendering
  console.log(inputRef.current);
  return <input ref={inputRef} type="text" />;
}


//Updating references restriction

function MyComponent({ prop }) {
  const myRef = useRef(0);
  useEffect(() => {
    myRef.current++; // Good!
    setTimeout(() => {
      myRef.current++; // Good!
    }, 1000);
  }, []);
  const handler = () => {
    myRef.current++; // Good!
  };
  myRef.current++; // Bad!
  if (prop) {
    myRef.current++; // Bad!
  }
  return <button onClick={handler}>My button</button>;
}


function Stopwatch() {
  const timerIdRef = useRef(0);
  const [count, setCount] = useState(0);

  const startHandler = () => {
    if (timerIdRef.current) {
      return;
    }
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };

 const stopHandler = () => {
   clearInterval(timerIdRef.current);
   timerIdRef.current = 0;
 };

 const resetHandler = () => {
   clearInterval(timerIdRef.current);
  timerIdRef.current = 0;
  setCount(0)
 };

useEffect(() => {
  return () => clearInterval(timerIdRef.current);
}, []);

return (
  <div>
    <div className="timer">Timer: {count}s</div>
    <div>
      <button onClick={startHandler}>Start</button>
      <button onClick={stopHandler}>Stop</button>
      <button onClick={resetHandler}>Reset</button>
    </div>
  </div>
);
}
