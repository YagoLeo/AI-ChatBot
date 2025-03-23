import React from 'react';
import { X, MessageSquare, Plus } from 'lucide-react';

interface Conversation {
  id: number;
  title: string;
  messages: Array<{type: 'user' | 'assistant', content: string}>;
}

interface SidebarProps {
  onClose: () => void;
  conversations: Conversation[];
  activeConversation: Conversation;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onClose, 
  conversations, 
  activeConversation, 
  onSelectConversation,
  onNewChat
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Conversations</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
          <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
              activeConversation.id === conversation.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <MessageSquare size={20} />
            <div className="flex-1">
              <div className="font-medium">{conversation.title}</div>
              <div className="text-sm text-gray-500 truncate">
                {conversation.messages[conversation.messages.length - 1].content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;