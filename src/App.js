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
      let warningClass = "";
      if (text.length > hardLimit) {
        warningClass = "hard-limit";
      } else if (text.length > softLimit) {
        warningClass = "soft-limit";
      }

      return {
        id: index,
        text: text,
        warningClass: warningClass,
        length: text.length,
      };
    });

    setTweets(threadObj);
  }

  const tweetStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
  };

  function buildTweetDiv(tweet) {
    const tStyle = {
      ...tweetStyle,
      content: tweet.length,
      border: `1px solid ${
        tweet.warningClass === "hard-limit"
          ? "red"
          : tweet.warningClass === "soft-limit"
          ? "orange"
          : "black"
      }`,
    };
    return (
      <a
        href="#"
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
      >
        <div class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-8 md:rounded-none md:rounded-l-lg">
          {tweet.length}
        </div>
        <div class="flex flex-col justify-between p-4 leading-normal">
          <p class="mb-3 font-normal">{tweet.text}</p>
        </div>
      </a>
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
