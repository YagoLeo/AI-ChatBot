import React, { useState, useEffect } from 'react';
import { X, Search, FileText, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

interface ToolPanelProps {
  onClose: () => void;
  activeToolType: 'search' | 'file' | 'terminal';
}

const ToolPanel: React.FC<ToolPanelProps> = ({ onClose, activeToolType }) => {
  const [searchContent, setSearchContent] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [terminalContent, setTerminalContent] = useState('');
  const [visibleFiles, setVisibleFiles] = useState<string[]>([]);

  const files = [
    'src/components/Header.tsx',
    'src/components/Sidebar.tsx',
    'src/components/ChatInput.tsx',
    'src/components/MessageList.tsx',
    'src/utils/helpers.ts',
    'src/styles/main.css',
  ];

  const streamContent = async (
    content: string,
    setter: (text: string) => void
  ) => {
    let currentText = '';
    for (let i = 0; i < content.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      currentText += content[i];
      setter(currentText);
    }
  };

  const streamFiles = async () => {
    setVisibleFiles([]);
    for (let i = 0; i < files.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setVisibleFiles((prev) => [...prev, files[i]]);
    }
  };

  useEffect(() => {
    // Reset states when tool type changes
    setSearchContent('');
    setFileContent('');
    setTerminalContent('');
    setVisibleFiles([]);

    if (activeToolType === 'search') {
      streamContent(
        'Searching through documentation...\n\n' +
          'Found relevant results:\n' +
          '1. React Components\n' +
          '2. State Management\n' +
          '3. Performance Optimization',
        setSearchContent
      );
    } else if (activeToolType === 'file') {
      streamFiles();
    } else if (activeToolType === 'terminal') {
      streamContent(
        '$ npm install @types/react\n' +
          'Installing dependencies...\n' +
          'Done!\n\n' +
          '$ npm run build\n' +
          'Building project...\n' +
          '✓ Project built successfully\n\n' +
          '$ git status\n' +
          'On branch main\n' +
          'Changes to be committed:\n' +
          '  modified: src/components/ToolPanel.tsx\n' +
          '  modified: src/components/ChatMessage.tsx\n',
        setTerminalContent
      );
    }
  }, [activeToolType]);

  // return (
  //   <div className="h-full flex flex-col">
  //     <div className="p-4 border-b flex justify-between items-center">
  //       <h2 className="font-semibold">Tools</h2>
  //       <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
  //         <X size={20} />
  //       </button>
  //     </div>

  //   </div>
  // );

  return (
    <div
      className="h-full w-full fixed top-0 right-0 z-50 sm:sticky sm:top-0 sm:right-0 sm:h-[100vh] sm:ml-3 sm:py-3 sm:mr-4"
      style={{ width: '660px', opacity: 1, transition: '0.2s ease-in-out' }}
    >
      <div className="h-full" style={{ width: '660px' }}>
        <div className="bg-[var(--background-gray-main)] sm:bg-[var(--background-menu-white)] sm:rounded-[22px] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] border border-black/8 dark:border-[var(--border-light)] flex h-full w-full">
          <div className="flex-1 min-w-0 p-4 flex flex-col h-full">
            <div className="flex items-center gap-2 w-full">
              <div className="text-[var(--text-primary)] text-lg font-semibold flex-1">
                Manus 的电脑
              </div>
              <span aria-expanded="false" aria-haspopup="dialog">
                <button className="flex items-center justify-end gap-0.5 clickable rounded-full py-[3px] pr-2 pl-3 border border-[var(--border-dark)] hover:bg-[var(--fill-tsp-gray-main)]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[var(--icon-primary)]"
                  >
                    <g clipPath="url(#:ret:_clip0_150_29647)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.38477 3.33341C2.92453 3.33341 2.55143 3.70651 2.55143 4.16675V12.5001C2.55143 12.9603 2.92453 13.3334 3.38477 13.3334H16.7181C17.1783 13.3334 17.5514 12.9603 17.5514 12.5001V4.16675C17.5514 3.70651 17.1783 3.33341 16.7181 3.33341H3.38477ZM0.884766 4.16675C0.884766 2.78604 2.00405 1.66675 3.38477 1.66675H16.7181C18.0988 1.66675 19.2181 2.78604 19.2181 4.16675V12.5001C19.2181 13.8808 18.0988 15.0001 16.7181 15.0001H3.38477C2.00405 15.0001 0.884766 13.8808 0.884766 12.5001V4.16675Z"
                        fill="var(--icon-primary)"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.88477 17.5001C5.88477 17.0398 6.25786 16.6667 6.7181 16.6667H13.3848C13.845 16.6667 14.2181 17.0398 14.2181 17.5001C14.2181 17.9603 13.845 18.3334 13.3848 18.3334H6.7181C6.25786 18.3334 5.88477 17.9603 5.88477 17.5001Z"
                        fill="var(--icon-primary)"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0501 13.3333C10.5104 13.3333 10.8835 13.7063 10.8835 14.1666V17.4999C10.8835 17.9602 10.5104 18.3333 10.0501 18.3333C9.58989 18.3333 9.2168 17.9602 9.2168 17.4999V14.1666C9.2168 13.7063 9.58989 13.3333 10.0501 13.3333Z"
                        fill="var(--icon-primary)"
                      ></path>
                      <path
                        d="M8.11331 6.25002C8.10195 6.22379 8.09873 6.19475 8.10408 6.16666C8.10943 6.13858 8.1231 6.11275 8.14332 6.09254C8.16353 6.07232 8.18936 6.05865 8.21744 6.0533C8.24553 6.04795 8.27457 6.05117 8.3008 6.06253L12.9088 7.93453C12.9368 7.94595 12.9605 7.9659 12.9766 7.99155C12.9926 8.01721 13.0002 8.04726 12.9982 8.07745C12.9961 8.10764 12.9847 8.13643 12.9654 8.15973C12.9461 8.18303 12.9199 8.19967 12.8907 8.20727L11.1269 8.66231C11.0273 8.68793 10.9363 8.73977 10.8635 8.81245C10.7907 8.88513 10.7386 8.97599 10.7128 9.07559L10.2581 10.8399C10.2504 10.8692 10.2338 10.8953 10.2105 10.9146C10.1872 10.9339 10.1584 10.9454 10.1282 10.9474C10.098 10.9494 10.068 10.9418 10.0423 10.9258C10.0167 10.9098 9.99673 10.886 9.98531 10.858L8.11331 6.25002Z"
                        fill="var(--icon-primary)"
                        stroke="var(--icon-primary)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id=":ret:_clip0_150_29647">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.0507812)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-down text-[var(--text-primary)]"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </span>
              <button
                className="w-7 h-7 relative rounded-md inline-flex items-center justify-center gap-2.5 cursor-pointer hover:bg-[var(--fill-tsp-gray-main)]"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-minimize2 w-5 h-5 text-[var(--icon-tertiary)]"
                >
                  <polyline points="4 14 10 14 10 20"></polyline>
                  <polyline points="20 10 14 10 14 4"></polyline>
                  <line x1="14" x2="21" y1="10" y2="3"></line>
                  <line x1="3" x2="10" y1="21" y2="14"></line>
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-[40px] h-[40px] bg-[var(--fill-tsp-gray-main)] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ minWidth: '28px', minHeight: '28px' }}
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
                        strokeWidth="0.857143"
                      ></path>
                    </g>
                    <path
                      id="Vector 7323"
                      d="M5.25 7L7 9L5.25 11"
                      stroke="#535350"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      id="Vector 7324"
                      d="M8.625 11H12"
                      stroke="#535350"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
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
                      <stop stopColor="white" stopOpacity="0"></stop>
                      <stop offset="1" stopOpacity="0.16"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="text-[12px] text-[var(--text-tertiary)]">
                  Manus 正在使用
                  <span className="text-[var(--text-secondary)]">终端</span>
                </div>
                <div
                  title="正在执行命令mkdir -p /home/ubuntu/tencent_analysis"
                  className="max-w-[100%] w-[max-content] truncate text-[13px] rounded-full inline-flex items-center px-[10px] py-[3px] border border-[var(--border-light)] bg-[var(--fill-tsp-gray-main)] text-[var(--text-secondary)]"
                >
                  正在执行命令
                  <span className="flex-1 min-w-0 px-1 ml-1 text-[12px] font-mono max-w-full text-ellipsis overflow-hidden whitespace-nowrap text-[var(--text-tertiary)]">
                    <code>mkdir -p /home/ubuntu/tencent_analysis</code>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-[12px] overflow-hidden bg-[var(--background-gray-main)] border border-[var(--border-dark)] dark:border-black/30 shadow-[0px_4px_32px_0px_rgba(0,0,0,0.04)] flex-1 min-h-0 mt-[16px]">
              <Tabs value={activeToolType} className="flex-1">
                <TabsContent value="search" className="p-4">
                  <div className="font-mono text-sm whitespace-pre-wrap">
                    {searchContent}
                  </div>
                </TabsContent>

                <TabsContent value="file" className="p-4">
                  <div className="space-y-2">
                    {visibleFiles.map((file, index) => (
                      <div
                        key={file}
                        className="flex items-center gap-2 p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <FileText size={16} className="text-gray-500" />
                        <span className="font-mono text-sm">{file}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="terminal" className="p-4">
                  <div className="font-mono text-sm whitespace-pre-wrap bg-gray-900 text-green-400 p-4 rounded">
                    {terminalContent}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;