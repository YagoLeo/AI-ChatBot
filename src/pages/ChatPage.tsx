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
  const [pageWidth, setPageWidth] = useState(100);
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
    // 添加调试日志
    console.log('Sidebar state changed:');
    console.log('Setting page width to:', toolPanelOpen ? 53 : 87);

    setPageWidth(toolPanelOpen ? 53 : 87);
  }, [toolPanelOpen]);

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
    const currentText = '';
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
            className="bg-gray-50 border-r"
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

      <div className="flex-1 min-w-0 h-full py-0 pr-0 relative">
        <div className="flex h-full bg-[var(--background-gray-main)]">
          <div className="flex flex-1 min-w-0 min-h-0">
            <div className="[&_.simplebar-scrollbar]:opacity-0 [&_.simplebar-scrollbar::before]:w-[var(--simplebar-scrollbar-width)] [&_.simplebar-scrollbar::before]:bg-[var(--text-disable)] [&_.simplebar-track.simplebar-vertical]:w-[calc(var(--simplebar-scrollbar-width)+2px)] [&_.simplebar-track.simplebar-vertical]:mr-1 [&:hover_.simplebar-scrollbar]:opacity-100 [&:hover_.simplebar-scrollbar::before]:bg-[var(--text-tertiary)] [&_.simplebar-track.simplebar-vertical.simplebar-hover_.simplebar-scrollbar::before]:bg-[var(--text-tertiary)] [&_.simplebar-content-wrapper]:flex [&_.simplebar-content-wrapper]:flex-col [&_.simplebar-content-wrapper]:h-full [&_.simplebar-content]:flex [&_.simplebar-content]:flex-1 flex flex-1 min-w-0 h-full [&_.simplebar-content]:flex-row simplebar-scrollable-y">
              <div className="simplebar-wrapper" style={{ margin: 0 }}>
                <div className="simplebar-mask">
                  <div className="simplebar-offset">
                    <div
                      className="simplebar-content-wrapper"
                      style={{
                        height: '100%',
                        overflow: 'hidden scroll',
                      }}
                    >
                      <div
                        className="simplebar-content"
                        style={{ width: `${pageWidth}vw` }}
                        data-page-width={pageWidth} // 添加数据属性方便调试
                      >
                        <div
                          className={`relative flex flex-col h-full flex-1 mx-auto w-full max-w-[768px] min-w-[390px] ${
                            sidebarOpen ? 'px-2' : 'px-5'
                          }`}
                        >
                          <div className="sticky top-0 z-10 bg-[var(--background-gray-main)] flex-shrink-0 flex flex-row items-center justify-between pt-3 pb-1">
                            <div className="flex w-full flex-col gap-[4px]">
                              <div className="text-[var(--text-primary)] text-lg font-medium w-full flex flex-row items-center justify-between flex-1 min-w-0">
                                <div className="flex flex-row items-center gap-2 flex-1 min-w-0">
                                  <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                                    腾讯公司分析
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className="relative"
                                    aria-expanded="false"
                                    aria-haspopup="dialog"
                                  >
                                    <button className="h-8 px-3 rounded-[100px] inline-flex items-center gap-1 clickable outline outline-1 outline-offset-[-1px] outline-[var(--border-btn-main)] hover:bg-[var(--fill-tsp-white-light)] mr-1.5">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--icon-secondary)"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-share"
                                      >
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                        <polyline points="16 6 12 2 8 6"></polyline>
                                        <line
                                          x1="12"
                                          x2="12"
                                          y1="2"
                                          y2="15"
                                        ></line>
                                      </svg>
                                      <span className="text-[var(--text-secondary)] text-sm font-medium">
                                        分享
                                      </span>
                                    </button>
                                  </span>
                                  <button className="p-[5px] flex items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="lucide lucide-file-search text-[var(--icon-secondary)]"
                                    >
                                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                      <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path>
                                      <path d="m9 18-1.5-1.5"></path>
                                      <circle cx="5" cy="14" r="3"></circle>
                                    </svg>
                                  </button>
                                  <button className="p-[5px] flex items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="lucide lucide-star text-[var(--icon-secondary)]"
                                    >
                                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    className="p-[5px] flex items-center justify-center hover:bg-[var(--fill-tsp-white-dark)] rounded-lg cursor-pointer"
                                    aria-expanded="false"
                                    aria-haspopup="dialog"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="lucide lucide-ellipsis text-[var(--icon-secondary)]"
                                    >
                                      <circle cx="12" cy="12" r="1"></circle>
                                      <circle cx="19" cy="12" r="1"></circle>
                                      <circle cx="5" cy="12" r="1"></circle>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="w-full flex justify-between items-center"></div>
                            </div>
                          </div>

                          <div className="flex flex-col w-full gap-[12px] pb-[80px] pt-[12px] flex-1">
                            {activeConversation.messages.map(
                              (message, index) => (
                                <ChatMessage
                                  key={`${activeConversation.id}-${index}`}
                                  type={message.type}
                                  content={message.content}
                                  onToolClick={handleToolClick}
                                />
                              )
                            )}
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

                          <div className="flex flex-col bg-[var(--background-gray-main)] sticky bottom-0">
                            <div className="pb-3 relative bg-[var(--background-gray-main)]">
                              <div className="flex flex-col gap-3 rounded-[22px] transition-all relative bg-[var(--fill-input-chat)] py-3 max-h-[300px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[var(--border-main)]">
                                <div className="overflow-y-auto pl-4 pr-2">
                                  <textarea
                                    className="flex rounded-md border-input focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden flex-1 bg-transparent p-0 pt-[1px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full placeholder:text-[var(--text-disable)] text-[15px] shadow-none resize-none min-h-[28px]"
                                    rows={1}
                                    placeholder="向 Manus 发送消息"
                                    style={{ height: '28px' }}
                                  >
                                    1
                                  </textarea>
                                </div>
                                <footer className="flex flex-row justify-between w-full px-3">
                                  <div className="flex gap-2 pr-2 items-center">
                                    <button className="rounded-full border border-[var(--border-main)] inline-flex items-center justify-center gap-1 clickable cursor-pointer text-xs text-[var(--text-secondary)] hover:bg-[var(--fill-tsp-gray-main)] w-8 h-8 p-0">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="var(--icon-secondary)"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-paperclip"
                                      >
                                        <path d="M13.234 20.252 21 12.3"></path>
                                        <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486"></path>
                                      </svg>
                                    </button>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 p-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-[var(--Button-primary-black)] hover:opacity-90">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                      >
                                        <path
                                          d="M7.91699 15.0642C7.53125 15.0642 7.22119 14.9397 6.98682 14.6907C6.75244 14.4465 6.63525 14.1218 6.63525 13.7166V6.39966L6.77441 3.34546L7.48486 3.89478L5.62451 6.12134L3.99121 7.76196C3.87402 7.87915 3.73975 7.97681 3.58838 8.05493C3.44189 8.13306 3.271 8.17212 3.07568 8.17212C2.73389 8.17212 2.4458 8.05981 2.21143 7.83521C1.98193 7.60571 1.86719 7.3103 1.86719 6.94897C1.86719 6.60229 1.99902 6.29712 2.2627 6.03345L6.97949 1.30933C7.0918 1.19214 7.2334 1.10181 7.4043 1.03833C7.5752 0.969971 7.74609 0.935791 7.91699 0.935791C8.08789 0.935791 8.25879 0.969971 8.42969 1.03833C8.60059 1.10181 8.74463 1.19214 8.86182 1.30933L13.5786 6.03345C13.8423 6.29712 13.9741 6.60229 13.9741 6.94897C13.9741 7.3103 13.8569 7.60571 13.6226 7.83521C13.3931 8.05981 13.1074 8.17212 12.7656 8.17212C12.5703 8.17212 12.397 8.13306 12.2456 8.05493C12.0991 7.97681 11.9673 7.87915 11.8501 7.76196L10.2095 6.12134L8.34912 3.89478L9.05957 3.34546L9.19141 6.39966V13.7166C9.19141 14.1218 9.07422 14.4465 8.83984 14.6907C8.60547 14.9397 8.29785 15.0642 7.91699 15.0642Z"
                                          fill="var(--icon-onblack)"
                                        ></path>
                                      </svg>
                                    </button>
                                  </div>
                                </footer>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
