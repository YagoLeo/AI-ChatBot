import React from 'react';
import { Search, FileText, Terminal } from 'lucide-react';

interface Tool {
  type: 'search' | 'file' | 'terminal';
  label: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  { type: 'search', label: 'Search', icon: <Search size={16} /> },
  { type: 'file', label: 'Files', icon: <FileText size={16} /> },
  { type: 'terminal', label: 'Terminal', icon: <Terminal size={16} /> },
];

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: string;
  onToolClick?: (tool: Tool['type']) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  content,
  onToolClick,
}) => {
  const lines = content.split('\n');
  const showTools = type === 'assistant' && lines.length > 1;

  return (
    <div
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex space-x-3 ${
          type === 'assistant' ? 'bg-gray-50' : ''
        } p-4 rounded-lg max-w-[80%]`}
      >
        <div className="flex-1">
          <div className="font-medium mb-1">
            {type === 'assistant' ? 'Claude' : ''}
          </div>
          <div className="text-gray-700">
            {lines.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))}
            {showTools && (
              <div className="flex gap-2 mt-4">
                {tools.map((tool) => (
                  <button
                    key={tool.type}
                    onClick={() => onToolClick?.(tool.type)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {tool.icon}
                    <span>{tool.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;