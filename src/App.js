
import {useState} from 'react';
import './App.css';




function App() {
  const [message, setMessage] = useState('');

  const [tweets, setTweets] = useState([]);

  const handleMessageChange = event => {
    // 👇️ access textarea value
    setMessage(event.target.value);
    createThread(event.target.value)
    // console.log(event.target.value);
  };


  function createThread(text) {
    // Split by three dashes at the beginning of a line
    const thread = text.split(/^-/gm);
    // Remove empty spaces and new lines from the array
    const threadClean = thread.filter(item => item.trim() !== '').map(item => item.trim());
    // Create an array of objects with an increasing Id  and the text
    const count = threadClean.length;
    const threadObj = threadClean.map((item, index) => {
      return {
        id: index,
        text: `${index+1}/${count} ${item}`
      }
    });

    setTweets(threadObj);
  }

  const tweetStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px'
  };

  return (
    <div className="App">
      <textarea
        id="message"
        name="message"
        value={message}
        onChange={handleMessageChange}
      />
      <div>
        {tweets.map(tweet => (
          <div style={tweetStyle} key={tweet.id}>{tweet.text}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
