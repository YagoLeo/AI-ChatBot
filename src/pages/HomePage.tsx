import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      navigate('/chat', { state: { initialMessage: message } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Bot className="w-16 h-16 mx-auto mb-6 text-blue-500" />
          <h1 className="text-4xl font-bold mb-4">Welcome to Claude</h1>
          <p className="text-lg text-gray-600 mb-8">Your AI assistant for getting things done</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-gray-50 p-6 rounded-lg">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
                className="w-full bg-transparent border-none outline-none text-lg"
              />
            </div>
            <button
              type="submit"
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 transition-colors"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quick Analysis",
                description: "Get instant insights and data analysis"
              },
              {
                title: "Code Generation",
                description: "Generate code in multiple languages"
              },
              {
                title: "File Operations",
                description: "Create and modify files with ease"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;