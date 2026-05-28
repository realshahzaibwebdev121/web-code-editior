import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { FileNode, EditorTab, ViewState } from './types';

// Default file tree
const initialFileTree: FileNode[] = [
  {
    id: '/src',
    name: 'src',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: '/src/components',
        name: 'components',
        type: 'folder',
        isExpanded: true,
        children: [
          { id: '/src/components/App.tsx', name: 'App.tsx', type: 'file', content: `import React from 'react';\n\nexport function App() {\n  return <div>Hello World</div>;\n}` },
          { id: '/src/components/Header.tsx', name: 'Header.tsx', type: 'file', content: `export const Header = () => <header>Header</header>;` }
        ]
      },
      { id: '/src/App.css', name: 'App.css', type: 'file', content: `.app { padding: 20px; }` },
      { id: '/src/index.tsx', name: 'index.tsx', type: 'file', content: `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport { App } from './components/App';\n\nReactDOM.render(<App />, document.getElementById('root'));` },
      { id: '/src/types.ts', name: 'types.ts', type: 'file', content: `export interface User {\n  id: string;\n}` }
    ]
  },
  {
    id: '/public',
    name: 'public',
    type: 'folder',
    children: [
      { id: '/public/index.html', name: 'index.html', type: 'file', content: `<!DOCTYPE html>\n<html lang="en">\n<body>\n  <div id="root"></div>\n</body>\n</html>` },
      { id: '/public/favicon.ico', name: 'favicon.ico', type: 'file', content: `[Binary data for favicon]` }
    ]
  },
  { id: '/package.json', name: 'package.json', type: 'file', content: `{\n  "name": "my-app",\n  "version": "1.0.0"\n}` },
  { id: '/README.md', name: 'README.md', type: 'file', content: `# My App\n\nWelcome to my application.` },
  { id: '/tsconfig.json', name: 'tsconfig.json', type: 'file', content: `{\n  "compilerOptions": {\n    "strict": true\n  }\n}` }
];

export interface AppContextType {
  fileTree: FileNode[];
  setFileTree: React.Dispatch<React.SetStateAction<FileNode[]>>;
  openTabs: EditorTab[];
  setOpenTabs: React.Dispatch<React.SetStateAction<EditorTab[]>>;
  activeTabId: string | null;
  setActiveTabId: React.Dispatch<React.SetStateAction<string | null>>;
  activeView: ViewState;
  setActiveView: React.Dispatch<React.SetStateAction<ViewState>>;
  isTerminalOpen: boolean;
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [fileTree, setFileTree] = useState<FileNode[]>(initialFileTree);
  const [openTabs, setOpenTabs] = useState<EditorTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewState>('explorer');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      fileTree, setFileTree,
      openTabs, setOpenTabs,
      activeTabId, setActiveTabId,
      activeView, setActiveView,
      isTerminalOpen, setIsTerminalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
