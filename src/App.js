import "./App.css";
import React, { useState } from "react";
import useInput from "./Hooks/useInput";
import useTabs from "./Hooks/useTabs";
import useTitle from "./Hooks/useTitle";
import useClick from "./Hooks/useClick";
import useConfirm from "./Hooks/useConfirm";
import { usePreventLeave } from "./Hooks/usePreventLeave";
import { useBeforeLeave } from "./Hooks/useBeforeLeave";
import { useFadeIn } from "./Hooks/useFadeIn";
import { useNetwork } from "./Hooks/useNetwork";
import { useScroll } from "./Hooks/useScroll";
import { useFullScreen } from "./Hooks/useFullScreen";
import { useNotification } from "./Hooks/useNotification";
import { useAxios } from "./Hooks/useAxios";
import axios from "axios";

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

  const titleUpdater = useTitle("Loading...");
  setTimeout(() => titleUpdater("Home"), 5000);

  const sayHello = () => console.log("say hello");
  const contentTitle = useClick(sayHello);

  const deleteWorld = () => console.log("Deleting the World...");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);

  const { enablePrevent, disablePrevent } = usePreventLeave();

  useBeforeLeave(() => console.log("Are you Leaving?"));

  const fadeInElement1 = useFadeIn(1, 2);
  const fadeInElement2 = useFadeIn(5, 3);

  const onLine = useNetwork();
  const { y } = useScroll();

  const imageRef = useFullScreen();

  const notification = useNotification("Request Notification");

  const { loading, data, error, refetch } = useAxios({
    url: "cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json",
  });
  console.log(`loading: ${loading}\nData: ${data}\nError: ${error}`);

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
      <div className="useClick">
        <h1 ref={contentTitle}>Hello if Click here</h1>
      </div>
      <div className="useConfirm">
        <button onClick={confirmDelete}>Delete the World!</button>
      </div>
      <div className="usePreventLeave">
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </div>
      <div className="useFadeIn1" {...fadeInElement1}>
        useFadeIn 1
      </div>
      <div className="useFadeIn2" {...fadeInElement2}>
        useFadeIn 2
      </div>
      <div className="useNetwork">{onLine ? "Online" : "Offline"}</div>
      <div
        className="useScroll"
        style={{ height: "100vh", color: y > 100 ? "yellow" : "green" }}
      >
        MouseScroll
      </div>
      <div className="useFullScreen">
        <img
          ref={imageRef.element}
          src="https://images.unsplash.com/photo-1567722066597-2bdf36d13481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMTI4NzN8MHwxfGNvbGxlY3Rpb258OTkzfDE1NDg1MXx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=400"
        />
        <button onClick={imageRef.triggerFull}>Image Full</button>
        <button onClick={imageRef.exitFull}>exit Fullscreen</button>
      </div>
      <div className="useNotification">
        <button onClick={notification}>Notification</button>
      </div>
      <div className="useAxios">
        <h1>{data && data.status}</h1>
        <h2>{loading && "Loading"}</h2>
        <h2>{error && "Error"}</h2>
        <button onClick={refetch}>Refetch</button>
      </div>
    </>
  );
}

export default App;
