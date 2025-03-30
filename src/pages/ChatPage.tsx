/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import ToolPanel from '../components/ToolPanel';

interface LocationState {
  initialMessage?: string;
}

interface DomElement {
  position: number;
  element: React.ReactNode;
}

const SAMPLE_CONVERSATIONS = [
  {
    id: 1,
    title: 'Code Analysis',
    messages: [
      {
        type: 'user' as const,
        content: 'Can you analyze this React component?',
      },
      {
        type: 'assistant' as const,
        content:
          "I'll help you analyze the React component. Let me break it down:\n\n1. Component Structure\n2. Props Usage\n3. Performance Considerations",
      },
    ],
  },
  {
    id: 2,
    title: 'File Creation',
    messages: [
      { type: 'user' as const, content: 'Create a new TypeScript file' },
      {
        type: 'assistant' as const,
        content:
          "I'll help create a new TypeScript file. First, let's determine the structure:\n\n1. Creating file: src/utils/helpers.ts\n2. Adding type definitions\n3. Implementing functions",
      },
    ],
  },
  {
    id: 3,
    title: 'Search Query',
    messages: [
      { type: 'user' as const, content: 'Search for React best practices' },
      {
        type: 'assistant' as const,
        content:
          "Searching for React best practices. Here's what I found:\n\n1. Component composition\n2. State management\n3. Performance optimization",
      },
    ],
  },
];

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toolPanelOpen, setToolPanelOpen] = useState(false);
  const [activeToolType, setActiveToolType] = useState<
    'search' | 'file' | 'terminal'
  >('search');
  const [messages, setMessages] = useState<
    Array<{ type: 'user' | 'assistant'; content: React.ReactNode }>
  >([]);

  const [isTyping, setIsTyping] = useState(false);
  const [currentContent, setCurrentContent] = useState<React.ReactNode[]>([]);
  const [conversations, setConversations] = useState(SAMPLE_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState(() => {
    if (state?.initialMessage) {
      return {
        id: Date.now(),
        title: state.initialMessage.slice(0, 30) + '...',
        messages: [],
      };
    }
    return SAMPLE_CONVERSATIONS[0];
  });

  useEffect(() => {
    if (state?.initialMessage) {
      handleMessage(state.initialMessage);
    }
  }, []);

  const streamText = async (
    text: string,
    domArr: DomElement[] = []
  ): Promise<React.ReactNode[]> => {
    setIsTyping(true);
    setCurrentContent([]);
    let currentText = '';
    let domIndex = 0;
    const finalContent: React.ReactNode[] = [];

    for (let i = 0; i < text.length; i++) {
      // Append characters one by one
      await new Promise((resolve) => setTimeout(resolve, 50));
      // currentText += text[i];
      finalContent.push(<span key={`char-${i}`}>{text[i]}</span>);
      setCurrentContent([...finalContent]);

      // Add DOM elements at the specified positions
      if (domIndex < domArr.length && domArr[domIndex].position === i) {
        finalContent.push(
          <React.Fragment key={`dom-${domIndex}`}>
            {domArr[domIndex].element}
          </React.Fragment>
        );
        setCurrentContent([...finalContent]);
        domIndex++;
      }
    }

    setIsTyping(false);
    return finalContent;
  };

  const handleToolClick = (toolType: 'search' | 'file' | 'terminal') => {
    setActiveToolType(toolType);
    setToolPanelOpen(true);
  };

  const handleMessage = async (message: string) => {
    const newMessages = [
      ...activeConversation.messages,
      { type: 'user' as const, content: message },
    ];
    setActiveConversation((prev) => ({
      ...prev,
      messages: newMessages,
    }));

    const response =
      "I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:I understand your request. Here's my plan:\n\n";
    const domArr: DomElement[] = [
      {
        position: 40,
        element: (
          <button
            onClick={() => handleToolClick('search')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors my-2"
          >
            <Menu size={16} />
            <span>搜索上下文</span>
          </button>
        ),
      },
      {
        position: 60,
        element: (
          <button
            onClick={() => handleToolClick('terminal')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors my-2"
          >
            <Menu size={16} />
            <span>执行命令</span>
          </button>
        ),
      },
      {
        position: 90,
        element: (
          <button
            onClick={() => handleToolClick('file')}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors my-2"
          >
            <Menu size={16} />
            <span>创建文件</span>
          </button>
        ),
      },
    ];

    const streamedContent = await streamText(response, domArr);

    const finalMessages = [
      ...newMessages,
      { type: 'assistant' as const, content: streamedContent },
    ];
    setActiveConversation((prev) => ({
      ...prev,
      messages: finalMessages,
    }));

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? { ...conv, messages: finalMessages }
          : conv
      )
    );
  };

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Chat',
      messages: [],
    };
    setConversations((prev) => [...prev, newConversation]);
    setActiveConversation(newConversation);
    setMessages([]);
    navigate('/chat', { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-gray-50 border-r"
          >
            <Sidebar
              onClose={() => setSidebarOpen(false)}
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={setActiveConversation}
              onNewChat={handleNewChat}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="ml-4 font-medium">{activeConversation.title}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeConversation.messages.map((message, index) => (
            <ChatMessage
              key={`${activeConversation.id}-${index}`}
              type={message.type}
              content={message.content}
              onToolClick={handleToolClick}
            />
          ))}
          {isTyping && (
            <div className="text-gray-500">
              <ChatMessage
                type="assistant"
                content={<>{currentContent}</>}
                onToolClick={handleToolClick}
              />
            </div>
          )}
        </div>

        <ChatInput onSend={handleMessage} />
      </div>

      {/* Tool Panel */}
      <AnimatePresence>
        {toolPanelOpen && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-96 bg-gray-50 border-l"
          >
            <ToolPanel
              onClose={() => setToolPanelOpen(false)}
              activeToolType={activeToolType}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
