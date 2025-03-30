import React from 'react';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: React.ReactNode; // Allow ReactNode instead of just string
  onToolClick?: (toolType: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        type === 'user'
          ? 'bg-blue-100 text-blue-900'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
