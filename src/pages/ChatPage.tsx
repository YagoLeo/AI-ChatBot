/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plus } from 'lucide-react';
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    // setPageWidth(toolPanelOpen ? 53 : 53);
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
      '您好！我会帮您分析腾讯公司。我将收集相关信息，包括公司概况、业务模式、财务状况、市场地位和发展前景等方面，为您提供一个全面的分析。请稍等片刻，我马上开始收集信息。\n开始分析腾讯公司的财务表现。我已完成对腾讯公司的全面分析，现在为您提供最终分析报告及相关资料。我对腾讯公司进行了深入研究，包括公司基本情况、业务模式、财务表现、市场地位、竞争分析、发展趋势和投资价值评估等方面。';
    const domArr: DomElement[] = [
      {
        position: 80,
        element: (
          <button
            onClick={() => handleToolClick('search')}
            className="flex rounded-[15px] items-center gap-2 px-[10px] py-[3px] border border-[var(--border-light)] bg-[var(--fill-tsp-gray-main)] max-w-full clickable hover:bg-[var(--fill-tsp-gray-dark)] dark:hover:bg-white/[0.02] my-4"
            data-event-id="PYquLbdNTWi4yMCYRZlUDh"
          >
            <div className="w-[16px] inline-flex items-center text-[var(--text-primary)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 19 18"
                fill="none"
                style={{ minWidth: '21px', minHeight: '21px' }}
              >
                <g filter="url(#filter0_ii_1527_83590)">
                  <path
                    d="M2 4.7C2 3.20883 3.20883 2 4.7 2H13.3C14.7912 2 16 3.20883 16 4.7V13.3C16 14.7912 14.7912 16 13.3 16H4.7C3.20883 16 2 14.7912 2 13.3V4.7Z"
                    fill="url(#paint0_linear_1527_83590)"
                  ></path>
                </g>
                <path
                  d="M2.42857 4.7C2.42857 3.44552 3.44552 2.42857 4.7 2.42857H13.3C14.5545 2.42857 15.5714 3.44552 15.5714 4.7V13.3C15.5714 14.5545 14.5545 15.5714 13.3 15.5714H4.7C3.44552 15.5714 2.42857 14.5545 2.42857 13.3V4.7Z"
                  stroke="#B9B9B7"
                  strokeWidth="0.857143"
                ></path>
                <circle
                  cx="8.625"
                  cy="8.625"
                  r="3"
                  stroke="#535350"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
                <path
                  d="M10.875 10.875L12.375 12.375"
                  stroke="#535350"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <defs>
                  <filter
                    id="filter0_ii_1527_83590"
                    x="1.5"
                    y="1.5"
                    width="15"
                    height="15"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="1" dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_1527_83590"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="-1" dy="-1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_1527_83590"
                      result="effect2_innerShadow_1527_83590"
                    ></feBlend>
                  </filter>
                  <linearGradient
                    id="paint0_linear_1527_83590"
                    x1="9"
                    y1="2"
                    x2="9"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0"></stop>
                    <stop offset="1" stop-opacity="0.16"></stop>
                  </linearGradient>
                </defs>
              </svg>{' '}
            </div>
            <div className="flex-1 h-full min-w-0 flex">
              <div className="inline-flex items-center h-full rounded-full text-[14px] text-[var(--text-secondary)] max-w-[100%]">
                <div
                  className="max-w-[100%] text-ellipsis overflow-hidden whitespace-nowrap text-[13px]"
                  title="正在搜索腾讯公司 公司简介 股票代码"
                >
                  <div className="flex items-center">
                    正在搜索
                    <span className="flex-1 min-w-0 rounded-[6px] px-1 ml-1 relative top-[0px] text-[12px] font-mono max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[var(--text-tertiary)]">
                      <code>腾讯公司 公司简介 股票代码</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ),
      },
      {
        position: 95,
        element: (
          <button
            onClick={() => handleToolClick('file')}
            className="flex rounded-[15px] items-center gap-2 px-[10px] py-[3px] border border-[var(--border-light)] bg-[var(--fill-tsp-gray-main)] max-w-full clickable hover:bg-[var(--fill-tsp-gray-dark)] dark:hover:bg-white/[0.02] my-4"
            data-event-id="ISURkTGTFpOqyy9VZSctye"
          >
            <div className="w-[16px] inline-flex items-center text-[var(--text-primary)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 19 18"
                fill="none"
                style={{ minHeight: '21px', minWidth: '21px' }}
              >
                <g filter="url(#filter0_ii_1527_83564)">
                  <path
                    d="M2 4.7C2 3.20883 3.20883 2 4.7 2H13.3C14.7912 2 16 3.20883 16 4.7V13.3C16 14.7912 14.7912 16 13.3 16H4.7C3.20883 16 2 14.7912 2 13.3V4.7Z"
                    fill="url(#paint0_linear_1527_83564)"
                  ></path>
                </g>
                <path
                  d="M2.42857 4.7C2.42857 3.44552 3.44552 2.42857 4.7 2.42857H13.3C14.5545 2.42857 15.5714 3.44552 15.5714 4.7V13.3C15.5714 14.5545 14.5545 15.5714 13.3 15.5714H4.7C3.44552 15.5714 2.42857 14.5545 2.42857 13.3V4.7Z"
                  stroke="#B9B9B7"
                  stroke-width="0.857143"
                ></path>
                <path
                  d="M9.24211 5.70711C9.63264 5.31658 10.2658 5.31658 10.6563 5.70711V5.70711V5.70711C11.0468 6.09763 11.0468 6.7308 10.6563 7.12132L7.12079 10.6569H5.70658V9.24264L9.24211 5.70711Z"
                  stroke="#535350"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8 12H12"
                  stroke="#535350"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <defs>
                  <filter
                    id="filter0_ii_1527_83564"
                    x="1.5"
                    y="1.5"
                    width="15"
                    height="15"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="1" dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_1527_83564"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="-1" dy="-1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_1527_83564"
                      result="effect2_innerShadow_1527_83564"
                    ></feBlend>
                  </filter>
                  <linearGradient
                    id="paint0_linear_1527_83564"
                    x1="9"
                    y1="2"
                    x2="9"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0"></stop>
                    <stop offset="1" stop-opacity="0.16"></stop>
                  </linearGradient>
                </defs>
              </svg>{' '}
            </div>
            <div className="flex-1 h-full min-w-0 flex">
              <div className="inline-flex items-center h-full rounded-full text-[14px] text-[var(--text-secondary)] max-w-[100%]">
                <div
                  className="max-w-[100%] text-ellipsis overflow-hidden whitespace-nowrap text-[13px]"
                  title="正在创建文件todo.md"
                >
                  <div className="flex items-center">
                    正在创建文件
                    <span className="flex-1 min-w-0 rounded-[6px] px-1 ml-1 relative top-[0px] text-[12px] font-mono max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[var(--text-tertiary)]">
                      <code>todo.md</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ),
      },
      {
        position: 128,
        element: (
          <button
            onClick={() => handleToolClick('terminal')}
            className="flex rounded-[15px] items-center gap-2 px-[10px] py-[3px] border border-[var(--border-light)] bg-[var(--fill-tsp-gray-main)] max-w-full clickable hover:bg-[var(--fill-tsp-gray-dark)] dark:hover:bg-white/[0.02] my-4"
            data-event-id="yZOMLYSR3OwDnGAjzd4bxZ"
          >
            <div className="w-[16px] inline-flex items-center text-[var(--text-primary)]">
              <svg
                width="21"
                height="21"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ minWidth: '21px', minHeight: '21px' }}
              >
                <g id="chat/ç±»å icon">
                  <g id="Rectangle 40263">
                    <g filter="url(#filter0_ii_1527_83555)">
                      <path
                        d="M2 4.7C2 3.20883 3.20883 2 4.7 2H13.3C14.7912 2 16 3.20883 16 4.7V13.3C16 14.7912 14.7912 16 13.3 16H4.7C3.20883 16 2 14.7912 2 13.3V4.7Z"
                        fill="url(#paint0_linear_1527_83555)"
                      ></path>
                    </g>
                    <path
                      d="M2.42857 4.7C2.42857 3.44552 3.44552 2.42857 4.7 2.42857H13.3C14.5545 2.42857 15.5714 3.44552 15.5714 4.7V13.3C15.5714 14.5545 14.5545 15.5714 13.3 15.5714H4.7C3.44552 15.5714 2.42857 14.5545 2.42857 13.3V4.7Z"
                      stroke="#B9B9B7"
                      stroke-width="0.857143"
                    ></path>
                  </g>
                  <path
                    id="Vector 7323"
                    d="M5.25 7L7 9L5.25 11"
                    stroke="#535350"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    id="Vector 7324"
                    d="M8.625 11H12"
                    stroke="#535350"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
                <defs>
                  <filter
                    id="filter0_ii_1527_83555"
                    x="1.5"
                    y="1.5"
                    width="15"
                    height="15"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood
                      flood-opacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="1" dy="1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_1527_83555"
                    ></feBlend>
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    ></feColorMatrix>
                    <feOffset dx="-1" dy="-1"></feOffset>
                    <feGaussianBlur stdDeviation="0.25"></feGaussianBlur>
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    ></feComposite>
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                    ></feColorMatrix>
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_1527_83555"
                      result="effect2_innerShadow_1527_83555"
                    ></feBlend>
                  </filter>
                  <linearGradient
                    id="paint0_linear_1527_83555"
                    x1="9"
                    y1="2"
                    x2="9"
                    y2="16"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="white" stop-opacity="0"></stop>
                    <stop offset="1" stop-opacity="0.16"></stop>
                  </linearGradient>
                </defs>
              </svg>{' '}
            </div>
            <div className="flex-1 h-full min-w-0 flex">
              <div className="inline-flex items-center h-full rounded-full text-[14px] text-[var(--text-secondary)] max-w-[100%]">
                <div
                  className="max-w-[100%] text-ellipsis overflow-hidden whitespace-nowrap text-[13px]"
                  title="正在执行命令mkdir -p /home/ubuntu/tencent_analysis"
                >
                  <div className="flex items-center">
                    正在执行命令
                    <span className="flex-1 min-w-0 rounded-[6px] px-1 ml-1 relative top-[0px] text-[12px] font-mono max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[var(--text-tertiary)]">
                      <code>mkdir -p /home/ubuntu/tencent_analysis</code>
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
      <div
        className="absolute start-4 top-3 md:top-4 flex items-center gap-2 z-10"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="relative flex">
          <div className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-panel-right h-5 w-5 text-[var(--icon-secondary)]"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
            </svg>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-gray-50 border-r fixed z-50 h-full"
        >
          {/* <Sidebar
            onClose={() => setSidebarOpen(false)}
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={setActiveConversation}
            onNewChat={handleNewChat}
          /> */}
          <div
            className="h-full flex flex-col"
            style={{
              width: '300px',
              transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="absolute left-0 top-0 w-[300px] p-4 bg-[var(--background-gray-main)] flex items-center gap-2">
              <div className="relative flex">
                <div
                  className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md"
                  data-state="closed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-panel-right h-5 w-5 text-[var(--icon-secondary)]"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M15 3v18"></path>
                  </svg>
                </div>
              </div>
              <svg
                height="38"
                width="117"
                fill="none"
                viewBox="0 0 117 38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6455 33.3645C28.9013 31.9334 30.4609 24.2578 30.1178 21.9722C30.1178 21.9722 29.7603 20.7451 28.8878 20.745C28.0154 20.745 27.6524 21.6642 27.6524 21.6642C27.6524 21.6642 27.4228 22.5128 27.0624 23.5813C26.5049 25.2341 26.2704 27.2735 24.8164 27.7899C23.3624 28.3062 21.9083 27.8176 21.9083 27.8176C22.897 31.5675 24.3897 34.7957 26.6455 33.3645Z"
                  fill="var(--logo-color)"
                ></path>
                <path
                  d="M15.4685 19.319C14.6398 19.4119 14.2033 19.7251 14.0561 19.8724C13.4744 20.454 13.1836 21.0357 13.1836 21.3265C13.1836 21.6173 12.4994 19.965 12.3491 19.8102C11.9015 19.3493 11.9124 18.6128 12.3733 18.1653C13.0203 17.537 14.0784 17.1337 15.2093 17.0069C16.3823 16.8754 17.7732 17.022 19.1807 17.6454C20.8233 18.373 21.7031 19.9072 22.0354 21.3093C22.2041 22.021 22.2472 22.7523 22.1607 23.4189C22.0768 24.0659 21.8559 24.7579 21.3964 25.2845C20.4393 26.3816 19.0275 26.258 18.2638 26.096C17.8334 26.0047 17.4539 25.8706 17.1869 25.7629C17.0515 25.7083 16.9403 25.6585 16.8604 25.6212C16.8204 25.6024 16.788 25.5867 16.764 25.5748C16.7521 25.5688 16.7422 25.5639 16.7345 25.56L16.7246 25.5549L16.7209 25.553L16.7187 25.5519C16.7187 25.5519 16.7181 25.5515 17.2553 24.5197L16.7181 25.5515C16.1482 25.2548 15.9268 24.5524 16.2235 23.9825C16.5196 23.4138 17.2199 23.1921 17.7891 23.4862M17.7891 23.4862L17.7905 23.4869ZM17.7891 23.4862L17.7975 23.4904C17.8069 23.4951 17.8237 23.5033 17.8471 23.5142C17.894 23.5362 17.9661 23.5686 18.0571 23.6053C18.2429 23.6802 18.4883 23.7653 18.7466 23.8201C19.3602 23.9503 19.5808 23.8267 19.6434 23.755C19.6938 23.6972 19.8036 23.5045 19.8535 23.1197C19.9009 22.7545 19.8808 22.3068 19.7716 21.8458C19.548 20.9023 19.0127 20.1155 18.2384 19.7726C17.229 19.3255 16.2552 19.2308 15.4685 19.319"
                  fill="var(--logo-color)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M7.77759 7.29912C7.49465 7.87591 7.73287 8.57286 8.30967 8.8558C9.13814 9.26219 9.85708 9.66291 10.5689 10.4655C10.9952 10.9461 11.7304 10.9901 12.2111 10.5638C12.6917 10.1375 12.7357 9.40231 12.3094 8.92167C11.2951 7.77804 10.251 7.21671 9.33428 6.76704C8.75748 6.4841 8.06053 6.72232 7.77759 7.29912Z"
                  fill="var(--logo-color)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M14.0647 3.91212C13.4414 4.06794 13.0625 4.69951 13.2183 5.32279C13.3272 5.75823 13.4287 6.13056 13.5216 6.4714C13.6995 7.12377 13.846 7.66079 13.9522 8.30414C14.0568 8.93802 14.6555 9.36705 15.2894 9.26241C15.9232 9.15776 16.3523 8.55908 16.2476 7.9252C16.1221 7.1648 15.9266 6.44534 15.7304 5.7232C15.6436 5.40343 15.5565 5.08313 15.4754 4.75852C15.3196 4.13525 14.688 3.7563 14.0647 3.91212Z"
                  fill="var(--logo-color)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M20.714 4.62785C20.1647 4.29458 19.4493 4.46967 19.116 5.01892C18.5066 6.02336 18.0264 7.28618 17.846 8.67113C17.7631 9.30821 18.2123 9.89191 18.8493 9.97487C19.4864 10.0578 20.0701 9.60862 20.1531 8.97155C20.2897 7.92205 20.6558 6.96626 21.1051 6.2258C21.4383 5.67655 21.2632 4.96112 20.714 4.62785Z"
                  fill="var(--logo-color)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M23.2733 14.0563C25.581 14.5174 25.5813 14.5157 25.5813 14.5157L25.5817 14.514L25.5823 14.5104L25.5837 14.5031L25.5865 14.4874C25.5884 14.4765 25.5904 14.4646 25.5924 14.4517C25.5966 14.4261 25.601 14.3966 25.6053 14.3636C25.6139 14.298 25.6226 14.216 25.6284 14.1212C25.6395 13.9383 25.6418 13.6727 25.595 13.3646C25.5064 12.7809 25.1665 11.6746 23.9686 11.0333L23.7316 10.9064L23.4727 10.8347L22.8772 13.0539C23.4082 13.3382 23.2733 14.0563 23.2733 14.0563ZM22.9043 15.5204L23.2733 14.0563L25.581 14.5174L25.5683 14.585L25.1958 16.063C25.1241 16.4263 25.1147 16.634 25.1186 16.7437C25.1217 16.833 25.1334 16.8623 25.1391 16.8767L25.1397 16.8784C25.1543 16.9155 25.192 16.996 25.3297 17.2048C25.3859 17.29 25.4442 17.3753 25.5186 17.484C25.5382 17.5128 25.559 17.5432 25.5812 17.5757C25.6811 17.7221 25.7981 17.8946 25.9219 18.0877C26.6959 19.2939 26.7719 20.4516 26.7678 21.1935C26.7678 21.2043 26.7677 21.2152 26.7676 21.226C26.8601 21.2577 26.9584 21.2897 27.0628 21.323C27.0972 21.3339 27.1429 21.3483 27.1908 21.3635C27.2582 21.3847 27.3299 21.4074 27.3812 21.4238C27.4821 21.4562 27.6109 21.4983 27.7355 21.5447C27.8222 21.577 27.9054 21.6093 27.9836 21.6417C28.0588 21.6728 28.1505 21.7127 28.247 21.7614C28.3219 21.7992 28.4437 21.864 28.5816 21.9596L29.7937 22.4812L29.7762 24.034C29.7658 24.9469 29.3985 25.9094 29.138 26.5053C28.8508 27.1622 28.4713 27.8628 28.122 28.3285C27.6341 28.9788 27.0812 29.6655 26.4162 30.1047C26.0241 30.3635 25.5507 30.5693 24.9921 30.6368C24.4944 30.697 24.0637 30.6303 23.7473 30.5533L23.654 30.5342C23.5603 30.5149 23.4259 30.4872 23.2624 30.4532C22.9358 30.3852 22.4906 30.2915 22.0185 30.1889C21.148 29.9999 19.9681 29.7355 19.4115 29.5508L19.3713 29.5374L19.3316 29.5227C19.0848 29.431 18.6674 29.3282 17.9761 29.1706C17.9343 29.161 17.8917 29.1513 17.8484 29.1415C17.252 29.0058 16.518 28.8387 15.823 28.6282C15.1032 28.4102 14.2128 28.086 13.4569 27.5577C12.6634 27.0032 11.7613 26.0254 11.711 24.5588C11.7035 24.3392 11.7085 24.127 11.7221 23.9256C11.3648 23.5383 11.0649 23.032 10.9134 22.3837C10.7657 21.752 10.8474 21.192 10.951 20.799C11.0548 20.4049 11.2126 20.0605 11.3445 19.803C11.389 19.7161 11.4352 19.6304 11.4812 19.5476C11.045 19.4099 10.5524 19.2399 10.0729 19.0355C9.44665 18.7685 8.55808 18.3281 7.89471 17.6172C7.53743 17.2343 7.16333 16.6855 7.01207 15.968C6.85378 15.2171 6.98531 14.4967 7.29354 13.8798C8.04388 12.3781 9.4771 11.8476 10.7518 11.8017C11.9029 11.7602 13.1277 12.0823 14.2251 12.4672C15.225 12.8179 16.6562 13.4702 17.8719 14.0383C18.2724 13.3817 18.8002 12.6397 19.2999 12.0405L19.3992 11.9214L19.5141 11.8169C20.3739 11.0343 21.3397 10.7712 22.0757 10.7147C22.4365 10.6871 22.7471 10.7077 22.9795 10.7379C23.0969 10.7531 23.1982 10.7713 23.2804 10.7885C23.3216 10.7971 23.3584 10.8056 23.3905 10.8134C23.4065 10.8173 23.4214 10.8211 23.4351 10.8247L23.4548 10.8299L23.464 10.8323L23.4684 10.8336L23.4705 10.8342C23.4705 10.8342 23.4727 10.8347 22.8772 13.0539C22.8772 13.0539 21.9486 12.7968 21.1503 13.5015C21.1423 13.5086 21.1342 13.5158 21.1262 13.5231C21.1015 13.5528 21.0766 13.5829 21.0518 13.6133C21.0161 13.657 20.9803 13.7014 20.9445 13.7465C20.934 13.7597 20.9235 13.7729 20.9131 13.7862C20.1164 14.797 20.1636 15.2193 18.7094 16.9644C18.7094 16.9644 17.9519 16.6136 17.4988 16.4006C17.1879 16.2544 16.8593 16.1 16.5244 15.9443C15.4441 15.442 14.2989 14.9269 13.4747 14.6378C11.4456 13.9262 9.94965 13.8358 9.40361 14.9286C8.68331 16.3702 11.6083 17.2054 13.078 17.6252C13.3875 17.7136 13.6325 17.7835 13.7654 17.8368C14.5192 18.1394 14.5718 18.7465 14.3473 19.2907C14.2163 19.6082 14.1416 19.7872 13.7657 20.1631C13.184 20.7448 13.0886 21.4335 13.1997 21.9086C13.2553 22.1465 13.3653 22.3195 13.4961 22.4453C13.8469 22.7828 14.3472 22.7807 14.3472 22.7807C14.3472 22.7807 14.0246 23.605 14.0562 24.5257C14.0631 24.7284 14.1176 24.9128 14.2115 25.0815C14.7692 26.0826 16.7164 26.5262 18.3525 26.8988C19.0396 27.0554 19.6719 27.1994 20.1233 27.3669C20.9323 27.6354 24.2345 28.3062 24.2345 28.3062C24.8439 28.4661 25.2217 28.2726 26.2239 26.9366C26.6402 26.3817 27.4203 24.8121 27.4298 23.9637C27.3032 23.9093 27.2944 23.8903 27.2855 23.8712C27.2733 23.845 27.261 23.8186 26.941 23.6994C26.834 23.6595 26.6907 23.6143 26.5268 23.5626C25.8445 23.3474 24.8038 23.0192 24.5257 22.4899C24.3906 22.2329 24.4013 21.8881 24.4137 21.4849C24.433 20.8579 24.4567 20.0898 23.9441 19.2909C23.8183 19.0948 23.6976 18.9183 23.5847 18.7532C22.9419 17.8135 22.5519 17.2433 22.9043 15.5204ZM12.1557 18.3583C12.1572 18.354 12.1567 18.355 12.1548 18.3608L12.1557 18.3583ZM26.7559 21.9333C26.7559 21.9333 26.7559 21.9242 26.7541 21.9085C26.7547 21.9258 26.7559 21.9333 26.7559 21.9333Z"
                  fill="var(--logo-color)"
                  fill-rule="evenodd"
                ></path>
                <path
                  d="M107.046 24.9999H106.364V20.9959H107.288C107.538 22.0519 107.897 22.8219 108.366 23.3059C108.836 23.7899 109.444 24.0319 110.192 24.0319C110.735 24.0319 111.153 23.9219 111.446 23.7019C111.754 23.4672 111.908 23.1519 111.908 22.7559C111.908 22.3452 111.725 21.9492 111.358 21.5679C110.992 21.1719 110.398 20.7539 109.576 20.3139C108.462 19.7126 107.662 19.1186 107.178 18.5319C106.694 17.9306 106.452 17.2559 106.452 16.5079C106.452 16.0239 106.54 15.5766 106.716 15.1659C106.907 14.7406 107.156 14.3739 107.464 14.0659C107.787 13.7579 108.168 13.5232 108.608 13.3619C109.048 13.1859 109.525 13.0979 110.038 13.0979C110.493 13.0979 110.94 13.1639 111.38 13.2959C111.835 13.4279 112.231 13.6112 112.568 13.8459L112.964 13.3179H113.536V16.6399H112.678C112.341 15.8039 111.989 15.2026 111.622 14.8359C111.27 14.4692 110.838 14.2859 110.324 14.2859C109.914 14.2859 109.584 14.3959 109.334 14.6159C109.1 14.8359 108.982 15.1292 108.982 15.4959C108.982 15.9066 109.158 16.2952 109.51 16.6619C109.877 17.0286 110.478 17.4319 111.314 17.8719C111.901 18.1946 112.407 18.5099 112.832 18.8179C113.258 19.1259 113.602 19.4412 113.866 19.7639C114.13 20.0719 114.321 20.4019 114.438 20.7539C114.57 21.0912 114.636 21.4579 114.636 21.8539C114.636 22.3672 114.541 22.8292 114.35 23.2399C114.16 23.6506 113.888 24.0026 113.536 24.2959C113.184 24.5892 112.759 24.8166 112.26 24.9779C111.776 25.1392 111.234 25.2199 110.632 25.2199C110.002 25.2199 109.415 25.1392 108.872 24.9779C108.33 24.8019 107.882 24.5526 107.53 24.2299L107.046 24.9999Z"
                  fill="var(--logo-color)"
                ></path>
                <path
                  d="M100.029 16.9478C100.029 16.3612 100.014 15.8992 99.985 15.5618C99.9556 15.2098 99.875 14.9458 99.743 14.7698C99.611 14.5792 99.413 14.4545 99.149 14.3958C98.8996 14.3225 98.555 14.2638 98.115 14.2198V13.3398H103.087V20.0058C103.087 20.9005 103.094 21.6045 103.109 22.1178C103.138 22.6165 103.182 22.9905 103.241 23.2398C103.285 23.4305 103.336 23.5845 103.395 23.7018C103.454 23.8045 103.549 23.8925 103.681 23.9658C103.813 24.0245 103.989 24.0685 104.209 24.0978C104.444 24.1125 104.744 24.1198 105.111 24.1198V24.9778L100.733 25.2418L100.491 23.2838H100.403C100.022 23.8998 99.4863 24.3765 98.797 24.7138C98.1076 25.0512 97.3376 25.2198 96.487 25.2198C94.9176 25.2198 93.7223 24.6625 92.901 23.5478C92.2703 22.6972 91.955 21.4872 91.955 19.9178V16.9478C91.955 16.3465 91.9403 15.8772 91.911 15.5398C91.8816 15.1878 91.801 14.9238 91.669 14.7478C91.5516 14.5718 91.3683 14.4545 91.119 14.3958C90.8696 14.3225 90.525 14.2638 90.085 14.2198V13.3398H95.013V19.5658C95.013 21.0472 95.1963 22.1252 95.563 22.7998C95.9296 23.4598 96.5163 23.7898 97.323 23.7898C98.1883 23.7898 98.8556 23.3938 99.325 22.6018C99.7943 21.8392 100.029 20.7172 100.029 19.2358V16.9478Z"
                  fill="var(--logo-color)"
                ></path>
                <path
                  d="M79.6885 21.4139C79.6885 22.0152 79.7031 22.4919 79.7325 22.8439C79.7765 23.1812 79.8571 23.4452 79.9745 23.6359C80.1065 23.8119 80.2971 23.9292 80.5465 23.9879C80.8105 24.0465 81.1625 24.0905 81.6025 24.1199V24.9999H74.6725V24.1199C75.0978 24.0905 75.4351 24.0465 75.6845 23.9879C75.9485 23.9292 76.1465 23.8119 76.2785 23.6359C76.4251 23.4599 76.5205 23.2105 76.5645 22.8879C76.6085 22.5652 76.6305 22.1252 76.6305 21.5679V18.8179C76.6305 17.9525 76.6158 17.2559 76.5865 16.7279C76.5571 16.1852 76.5205 15.8185 76.4765 15.6279C76.4325 15.4372 76.3738 15.2832 76.3005 15.1659C76.2271 15.0339 76.1171 14.9385 75.9705 14.8799C75.8238 14.8065 75.6405 14.7625 75.4205 14.7479C75.2005 14.7185 74.9218 14.7039 74.5845 14.7039V13.9559L78.8305 13.1199L79.1165 15.0559H79.2045C79.6885 14.4399 80.2605 13.9632 80.9205 13.6259C81.5805 13.2885 82.3065 13.1199 83.0985 13.1199C84.0371 13.1199 84.7925 13.2519 85.3645 13.5159C85.9511 13.7652 86.4718 14.1905 86.9265 14.7919C87.1758 15.1292 87.3958 15.5692 87.5865 16.1119C87.7771 16.6399 87.8725 17.3732 87.8725 18.3119V21.4139C87.8725 22.0152 87.8871 22.4919 87.9165 22.8439C87.9605 23.1812 88.0411 23.4452 88.1585 23.6359C88.2905 23.8119 88.4811 23.9292 88.7305 23.9879C88.9798 24.0465 89.3171 24.0905 89.7425 24.1199V24.9999H82.8565V24.1199C83.2965 24.1052 83.6411 24.0685 83.8905 24.0099C84.1545 23.9365 84.3525 23.8119 84.4845 23.6359C84.6165 23.4599 84.7045 23.2105 84.7485 22.8879C84.7925 22.5505 84.8145 22.1105 84.8145 21.5679V18.5759C84.8145 17.8279 84.7705 17.1972 84.6825 16.6839C84.5945 16.1705 84.4478 15.7599 84.2425 15.4519C84.0518 15.1292 83.7951 14.9019 83.4725 14.7699C83.1498 14.6232 82.7465 14.5499 82.2625 14.5499C81.7931 14.5499 81.3898 14.6819 81.0525 14.9459C80.7151 15.2099 80.4218 15.5765 80.1725 16.0459C80.0405 16.3099 79.9231 16.6545 79.8205 17.0799C79.7325 17.4905 79.6885 17.9232 79.6885 18.3779V21.4139Z"
                  fill="var(--logo-color)"
                ></path>
                <path
                  d="M69.1896 18.7299C67.9576 19.2872 67.0263 19.8079 66.3956 20.2919C65.7796 20.7612 65.4716 21.2525 65.4716 21.7659C65.4716 22.1912 65.589 22.5285 65.8236 22.7779C66.0583 23.0272 66.3516 23.1519 66.7036 23.1519C67.0556 23.1519 67.3856 23.0932 67.6936 22.9759C68.0016 22.8439 68.2656 22.6752 68.4856 22.4699C68.7056 22.2645 68.8743 22.0225 68.9916 21.7439C69.1236 21.4505 69.1896 21.1425 69.1896 20.8199V18.7299ZM69.1896 17.5639V16.6399C69.1896 15.7892 69.0356 15.1732 68.7276 14.7919C68.4343 14.3959 67.9723 14.1979 67.3416 14.1979C66.9163 14.1979 66.5936 14.3152 66.3736 14.5499C66.1536 14.7699 65.9483 15.1439 65.7576 15.6719C65.6256 16.0385 65.435 16.3245 65.1856 16.5299C64.951 16.7352 64.621 16.8379 64.1956 16.8379C63.785 16.8379 63.4696 16.7132 63.2496 16.4639C63.0296 16.2145 62.9196 15.8625 62.9196 15.4079C62.9196 14.7039 63.301 14.1465 64.0636 13.7359C64.841 13.3252 66.007 13.1199 67.5616 13.1199C69.2043 13.1199 70.3776 13.4205 71.0816 14.0219C71.7856 14.6085 72.1376 15.5985 72.1376 16.9919V21.8099C72.1376 23.0565 72.387 23.6799 72.8856 23.6799C73.1643 23.6799 73.421 23.5845 73.6556 23.3939L73.9856 24.0319C73.7803 24.3985 73.4576 24.6919 73.0176 24.9119C72.5923 25.1172 72.1083 25.2199 71.5656 25.2199C70.891 25.2199 70.3776 25.0145 70.0256 24.6039C69.6736 24.1932 69.4976 23.6139 69.4976 22.8659H69.3876C68.9623 23.6285 68.4123 24.2079 67.7376 24.6039C67.063 24.9999 66.293 25.1979 65.4276 25.1979C64.5036 25.1979 63.763 24.9412 63.2056 24.4279C62.6483 23.8999 62.3696 23.2179 62.3696 22.3819C62.3696 21.7365 62.6556 21.1352 63.2276 20.5779C63.7996 20.0059 64.753 19.4485 66.0876 18.9059L69.1896 17.5639Z"
                  fill="var(--logo-color)"
                ></path>
                <path
                  d="M43.1758 21.3699C43.1758 21.9859 43.1904 22.4699 43.2198 22.8219C43.2491 23.1739 43.3298 23.4452 43.4618 23.6359C43.5938 23.8119 43.7844 23.9292 44.0338 23.9879C44.2831 24.0465 44.6278 24.0905 45.0678 24.1199V24.9999H38.1158V24.1199C38.5558 24.0905 38.9078 24.0465 39.1718 23.9879C39.4358 23.9292 39.6338 23.8119 39.7658 23.6359C39.8978 23.4599 39.9858 23.2105 40.0298 22.8879C40.0738 22.5505 40.0958 22.1032 40.0958 21.5459V18.8179C40.0958 17.9819 40.0811 17.2852 40.0518 16.7279C40.0371 16.1705 40.0004 15.7892 39.9418 15.5839C39.8978 15.3932 39.8391 15.2465 39.7658 15.1439C39.7071 15.0265 39.6044 14.9385 39.4578 14.8799C39.3258 14.8065 39.1498 14.7625 38.9298 14.7479C38.7098 14.7185 38.4238 14.7039 38.0718 14.7039V13.9559L42.3178 13.1199L42.5818 15.0339H42.7138C43.3298 14.3445 43.9458 13.8532 44.5618 13.5599C45.1924 13.2665 45.9184 13.1199 46.7398 13.1199C47.7078 13.1199 48.5071 13.2885 49.1378 13.6259C49.7684 13.9632 50.2451 14.4472 50.5678 15.0779H50.6558C51.1838 14.4619 51.8144 13.9852 52.5478 13.6479C53.2811 13.2959 54.0658 13.1199 54.9018 13.1199C55.7818 13.1199 56.5444 13.2299 57.1898 13.4499C57.8498 13.6699 58.3631 13.9852 58.7298 14.3959C59.0231 14.7332 59.2358 15.1732 59.3678 15.7159C59.5144 16.2585 59.5878 17.0139 59.5878 17.9819V21.3699C59.5878 21.9712 59.6024 22.4479 59.6318 22.7999C59.6758 23.1519 59.7638 23.4232 59.8958 23.6139C60.0278 23.8045 60.2184 23.9292 60.4678 23.9879C60.7171 24.0465 61.0618 24.0905 61.5018 24.1199V24.9999H54.5498V24.1199C54.9898 24.1052 55.3344 24.0685 55.5838 24.0099C55.8478 23.9365 56.0458 23.8119 56.1778 23.6359C56.3244 23.4452 56.4124 23.1885 56.4418 22.8659C56.4858 22.5432 56.5078 22.1032 56.5078 21.5459V18.6639C56.5078 17.9012 56.4638 17.2559 56.3758 16.7279C56.2878 16.1999 56.1484 15.7745 55.9578 15.4519C55.7671 15.1292 55.5104 14.9019 55.1878 14.7699C54.8798 14.6232 54.4984 14.5499 54.0438 14.5499C53.5304 14.5499 53.1051 14.6745 52.7678 14.9239C52.4451 15.1732 52.1738 15.4959 51.9538 15.8919C51.5724 16.5812 51.3818 17.4392 51.3818 18.4659V21.3699C51.3818 21.9712 51.3964 22.4479 51.4258 22.7999C51.4551 23.1519 51.5358 23.4232 51.6678 23.6139C51.7998 23.8045 51.9904 23.9292 52.2398 23.9879C52.5038 24.0465 52.8631 24.0905 53.3178 24.1199V24.9999H46.3438V24.1199C46.7838 24.0905 47.1284 24.0465 47.3778 23.9879C47.6418 23.9292 47.8398 23.8119 47.9718 23.6359C48.1184 23.4599 48.2064 23.2105 48.2358 22.8879C48.2798 22.5505 48.3018 22.1032 48.3018 21.5459V18.6639C48.3018 17.9012 48.2578 17.2559 48.1698 16.7279C48.0818 16.1999 47.9351 15.7745 47.7298 15.4519C47.5391 15.1292 47.2824 14.9019 46.9598 14.7699C46.6371 14.6232 46.2338 14.5499 45.7498 14.5499C45.2658 14.5499 44.8624 14.6672 44.5398 14.9019C44.2318 15.1365 43.9751 15.4519 43.7698 15.8479C43.5791 16.1999 43.4324 16.6032 43.3298 17.0579C43.2271 17.5125 43.1758 17.9819 43.1758 18.4659V21.3699Z"
                  fill="var(--logo-color)"
                ></path>
              </svg>
            </div>
            <div
              className="flex flex-col overflow-hidden bg-[var(--background-nav)] h-full opacity-100 translate-x-0"
              style={{
                width: '300px',
                transition: 'opacity 0.2s, transform 0.2s, width 0.2s',
              }}
            >
              <div className="flex">
                <div className="flex items-center px-3 py-3 flex-row h-[52px] gap-1 justify-end w-full">
                  <div className="flex flex-row justify-between w-full px-1 pt-2">
                    <div
                      className="relative flex"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      <div
                        className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-panel-right h-5 w-5 text-[var(--icon-secondary)]"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                          ></rect>
                          <path d="M15 3v18"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-row gap-1">
                      <div
                        className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md"
                        data-state="closed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-search h-5 w-5 text-var(--icon-secondary)"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 mb-1 flex justify-center flex-shrink-0">
                <button className="flex min-w-[36px] w-full items-center justify-center gap-1.5 rounded-lg h-[36px] bg-[var(--Button-primary-white)] border border-[var(--border-main)] hover:bg-[var(--fill-tsp-white-dark)] cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-plus h-4 w-4 text-[var(--icon-primary)]"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap truncate">
                    新建任务
                  </span>
                  <div className="flex items-center gap-0.5">
                    <span className="flex text-[var(--text-tertiary)] justify-center items-center min-w-5 h-5 px-1 rounded-[4px] bg-[var(--fill-tsp-white-light)] border border-[var(--border-light)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-command"
                      >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                      </svg>
                    </span>
                    <span className="flex justify-center items-center w-5 h-5 px-1 rounded-[4px] bg-[var(--fill-tsp-white-light)] border border-[var(--border-light)] text-sm font-normal text-[var(--text-tertiary)] ">
                      K
                    </span>
                  </div>
                </button>
              </div>
              <div className="flex flex-col flex-1 min-h-0 overflow-auto pt-2 pb-5 overflow-x-hidden">
                {conversations.map((conversation) => (
                  <div className="px-2 mb-2">
                    <div className="group flex h-14 cursor-pointer items-center gap-2 rounded-[10px] px-2 transition-colors bg-[var(--background-white-main)]">
                      <div className="relative">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center relative bg-[var(--icon-primary)]">
                          <div className="relative h-4 w-4 object-cover opacity-100 brightness-100 dark:brightness-0">
                            <img
                              alt={conversation.title}
                              className="w-full h-full object-cover"
                              src="https://files.manuscdn.com/assets/icon/session/ai-network.svg"
                              data-px-source="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="min-w-20 flex-1 transition-opacity opacity-100">
                        <div className="flex items-center gap-1 overflow-x-hidden">
                          <span
                            className="truncate text-sm font-medium text-[var(--text-primary)] flex-1 min-w-0"
                            title={conversation.title}
                          >
                            {conversation.title}
                          </span>
                          <span className="text-[var(--text-tertiary)] text-xs whitespace-nowrap">
                            {'3天前'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 h-[18px] relative">
                          <span
                            className="min-w-0 flex-1 truncate text-xs text-[var(--text-tertiary)]"
                            title={
                              conversation.messages[
                                conversation.messages.length - 1
                              ].content
                            }
                            data-px-source="true"
                          >
                            {
                              conversation.messages[
                                conversation.messages.length - 1
                              ].content
                            }
                          </span>
                          <div
                            className="w-[22px] h-[22px] flex rounded-[6px] items-center justify-center pointer invisible cursor-pointer bg-[var(--background-menu-white)] border border-[var(--border-main)] shadow-sm group-hover:visible"
                            aria-expanded="false"
                            aria-haspopup="dialog"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--icon-secondary)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-ellipsis"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="19" cy="12" r="1"></circle>
                              <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <footer className="flex mt-0 px-4 overflow-x-hidden">
                <div className="w-full flex items-center justify-around py-4 gap-5 border-t border-[var(--border-main)]">
                  <div className="flex items-center gap-[6px] flex-1 min-w-0">
                    <div
                      className="flex items-center justify-center rounded-full font-bold flex-shrink-0 cursor-pointer"
                      style={{
                        width: '24px',
                        height: '24px',
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgb(139, 92, 246)',
                      }}
                    >
                      N
                    </div>
                    <div
                      className="h-7 pl-2 pr-3 flex items-center gap-[6px] rounded-full bg-[var(--fill-tsp-white-main)] cursor-default"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          opacity="0.5"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.1369 6.09927C7.65936 7.53488 6.53292 8.66132 5.09732 9.13886L2.42617 10.0274C1.96992 10.1791 1.96992 10.8245 2.42617 10.9763L5.09732 11.8648C6.53293 12.3423 7.65937 13.4688 8.1369 14.9044L9.02543 17.5755C9.17719 18.0318 9.82255 18.0318 9.97431 17.5755L10.8628 14.9044C11.3404 13.4688 12.4668 12.3423 13.9024 11.8648L16.5736 10.9763C17.0298 10.8245 17.0298 10.1791 16.5736 10.0274L13.9024 9.13886C12.4668 8.66132 11.3404 7.53488 10.8628 6.09927L9.97431 3.42812C9.82255 2.97188 9.17719 2.97188 9.02543 3.42812L8.1369 6.09927ZM9.49987 7.93432C8.89278 9.0067 8.00474 9.89473 6.93237 10.5018C8.00474 11.1089 8.89278 11.997 9.49987 13.0693C10.107 11.997 10.995 11.1089 12.0674 10.5018C10.995 9.89473 10.107 9.0067 9.49987 7.93432Z"
                          fill="var(--icon-primary)"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.1369 6.09927C7.65936 7.53488 6.53292 8.66132 5.09732 9.13886L2.42617 10.0274C1.96992 10.1791 1.96992 10.8245 2.42617 10.9763L5.09732 11.8648C6.53293 12.3423 7.65937 13.4688 8.1369 14.9044L9.02543 17.5755C9.17719 18.0318 9.82255 18.0318 9.97431 17.5755L10.8628 14.9044C11.3404 13.4688 12.4668 12.3423 13.9024 11.8648L16.5736 10.9763C17.0298 10.8245 17.0298 10.1791 16.5736 10.0274L13.9024 9.13886C12.4668 8.66132 11.3404 7.53488 10.8628 6.09927L9.97431 3.42812C9.82255 2.97188 9.17719 2.97188 9.02543 3.42812L8.1369 6.09927ZM9.49987 7.93432C8.89278 9.0067 8.00474 9.89473 6.93237 10.5018C8.00474 11.1089 8.89278 11.997 9.49987 13.0693C10.107 11.997 10.995 11.1089 12.0674 10.5018C10.995 9.89473 10.107 9.0067 9.49987 7.93432Z"
                          fill="var(--icon-primary)"
                        ></path>
                        <path
                          opacity="0.5"
                          d="M15.2102 1.57052C15.2709 1.38802 15.5291 1.38802 15.5898 1.57052L15.9325 2.60097C16.1315 3.19914 16.6009 3.66848 17.199 3.86746L18.2295 4.21022C18.412 4.27093 18.412 4.52907 18.2295 4.58978L17.199 4.93254C16.6009 5.13152 16.1315 5.60087 15.9325 6.19904L15.5898 7.22948C15.5291 7.41198 15.2709 7.41198 15.2102 7.22948L14.8675 6.19904C14.6685 5.60087 14.1991 5.13152 13.601 4.93254L12.5705 4.58978C12.388 4.52907 12.388 4.27093 12.5705 4.21022L13.601 3.86746C14.1991 3.66848 14.6685 3.19913 14.8675 2.60096L15.2102 1.57052Z"
                          fill="var(--icon-primary)"
                        ></path>
                        <path
                          opacity="0.5"
                          d="M15.2102 1.57052C15.2709 1.38802 15.5291 1.38802 15.5898 1.57052L15.9325 2.60097C16.1315 3.19914 16.6009 3.66848 17.199 3.86746L18.2295 4.21022C18.412 4.27093 18.412 4.52907 18.2295 4.58978L17.199 4.93254C16.6009 5.13152 16.1315 5.60087 15.9325 6.19904L15.5898 7.22948C15.5291 7.41198 15.2709 7.41198 15.2102 7.22948L14.8675 6.19904C14.6685 5.60087 14.1991 5.13152 13.601 4.93254L12.5705 4.58978C12.388 4.52907 12.388 4.27093 12.5705 4.21022L13.601 3.86746C14.1991 3.66848 14.6685 3.19913 14.8675 2.60096L15.2102 1.57052Z"
                          fill="var(--icon-primary)"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-mail h-5 w-5 text-[var(--icon-secondary)]"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-house h-5 w-5 text-[var(--icon-secondary)]"
                      >
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-book-open h-5 w-5 text-[var(--icon-secondary)]"
                      >
                        <path d="M12 7v14"></path>
                        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex items-center justify-center cursor-pointer hover:bg-[var(--fill-tsp-gray-main)] rounded-md w-8 h-8"
                      data-state="closed"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-settings2 h-5 w-5 text-[var(--icon-secondary)]"
                      >
                        <path d="M20 7h-9"></path>
                        <path d="M14 17H5"></path>
                        <circle cx="17" cy="17" r="3"></circle>
                        <circle cx="7" cy="7" r="3"></circle>
                      </svg>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Conversations</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2"></div>

            <div className="p-4 border-t">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Plus size={20} />
                <span>New Chat</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
                          className={`relative flex flex-col h-full flex-1 mx-10 w-full max-w-[768px] min-w-[390px] px-5 ml-[30vw]`}
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
            transition={{ duration: 0.15, ease: 'easeOut' }}
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
