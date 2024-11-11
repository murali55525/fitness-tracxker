import { useState } from 'react';
import './ChatBot.css';  // Make sure the path matches your file location

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    
    const requestData = {
      messages: [{ role: 'user', content: message }],
      model: 'gpt-4', // Changed model to 'gpt-4'
      max_tokens: 150, // Increased max tokens
      temperature: 0.7, // Changed temperature to 0.7
    };

    try {
      const res = await fetch('https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
          'x-rapidapi-key': '7cabf4db3amsh3318170d96bae90p185322jsnd4f9f7c1d6fd',
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching the chatbot response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
