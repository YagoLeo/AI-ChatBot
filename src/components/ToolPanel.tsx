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
    'src/styles/main.css'
  ];

  const streamContent = async (content: string, setter: (text: string) => void) => {
    let currentText = '';
    for (let i = 0; i < content.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      currentText += content[i];
      setter(currentText);
    }
  };

  const streamFiles = async () => {
    setVisibleFiles([]);
    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setVisibleFiles(prev => [...prev, files[i]]);
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
        "Searching through documentation...\n\n" +
        "Found relevant results:\n" +
        "1. React Components\n" +
        "2. State Management\n" +
        "3. Performance Optimization",
        setSearchContent
      );
    } else if (activeToolType === 'file') {
      streamFiles();
    } else if (activeToolType === 'terminal') {
      streamContent(
        "$ npm install @types/react\n" +
        "Installing dependencies...\n" +
        "Done!\n\n" +
        "$ npm run build\n" +
        "Building project...\n" +
        "✓ Project built successfully\n\n" +
        "$ git status\n" +
        "On branch main\n" +
        "Changes to be committed:\n" +
        "  modified: src/components/ToolPanel.tsx\n" +
        "  modified: src/components/ChatMessage.tsx\n",
        setTerminalContent
      );
    }
  }, [activeToolType]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Tools</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
          <X size={20} />
        </button>
      </div>

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
  );
};

export default ToolPanel;