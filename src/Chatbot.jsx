import React, { useState } from 'react';
import axios from 'axios';
import './views/chatbot.css'

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/query', { query });
      setResponse(res.data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="message sender">{query}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div className="message receiver">{response}</div>
    </div>
  );
}

export default App;
