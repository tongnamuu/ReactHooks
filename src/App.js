import "./App.css";
import React, { useState } from "react";
import useInput from "./Hooks/useInput";
import useTabs from "./Hooks/useTabs";

const content = [
  {
    tab: "Section 1",
    content: "Content of Section 1",
  },
  {
    tab: "Section 2",
    content: "Content of Section 2",
  },
];

function App() {
  const [item, setItem] = useState(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const maxLen = (val) => val.length < 10;
  const name = useInput("Mr", maxLen);

  const { currentItem, changeItem } = useTabs(0, content);

  return (
    <>
      <div>
        <h1>Hello {item}</h1>
        <button onClick={incrementItem}>Increment</button>
        <button onClick={decrementItem}>Decrement</button>
        <input
          placeholder="Name"
          value={name.value}
          onChange={name.onChange}
        ></input>
        <input placeholder="Name" {...name}></input>
      </div>
      <div className="useTabs">
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
        <div>{currentItem.content}</div>
      </div>
    </>
  );
}

export default App;
