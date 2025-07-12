import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    const botMessage = { sender: 'bot', text: data.reply };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h2>🩺 Healthcare Chatbot</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
    </div>
  );
}

export default App;
