import { useState } from "react";
import "./App.css";

const hardLimit = 280;
const softLimit = 240;
const addCount = true;

function App() {
  const [message, setMessage] = useState("");

  const [tweets, setTweets] = useState([]);

  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setMessage(event.target.value);
    createThread(event.target.value);
    // console.log(event.target.value);
  };

  function createThread(text) {
    // Split by three dashes at the beginning of a line
    const thread = text.split(/^-/gm);
    // Remove empty spaces and new lines from the array
    const threadClean = thread
      .filter((item) => item.trim() !== "")
      .map((item) => item.trim());
    // Create an array of objects with an increasing Id  and the text
    const count = threadClean.length;
    const threadObj = threadClean.map((item, index) => {
      const text = addCount ? `${index + 1}/${count} ${item}` : item;

      return {
        id: index,
        text: text,
      };
    });

    setTweets(threadObj);
  }

  function buildTweetDiv(tweet) {
    // Create an array of css classes
    const classes = [
      "flex",
      "flex-col",
      "bg-white",
      "mt-2",
      "mb-2",
      "border",
      "border-gray-200",
      "rounded-lg",
      "shadow",
    ];

    // Recreate the whole text but highlight the characters that are over the limit
    const text = tweet.text.split("");
    const textSpans = [];
    text.forEach((char, index) => {
      if (index < softLimit) {
        textSpans.push(<span>{char}</span>);
      } else if (index < hardLimit) {
        textSpans.push(<span class="bg-yellow-100">{char}</span>);
      } else {
        textSpans.push(<span class="bg-red-300">{char}</span>);
      }
    });

    return (
      <div className={classes.join(" ")}>
        <div class="flex flex-col text-left p-4 leading-normal">
          <p>{textSpans}</p>
        </div>
        <div class="text-right p-4 pt-0 pb-0 bg-gray-50">
          <button
            class="px-2 py-2 "
            onClick={() => {
              navigator.clipboard.writeText(tweet.text);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="p-8 grid grid-cols-2 gap-4">
      <div>
        <div class="h-full">
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none w-full h-full"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
      </div>
      <div>{tweets.map((tweet) => buildTweetDiv(tweet))}</div>
    </div>
  );
}

export default App;
