import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '../lib/utils';
import { EditorTab, FileNode } from '../types';
import { useAppContext } from '../AppContext';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

export function CodeEditor() {
  const { openTabs, setOpenTabs, activeTabId, setActiveTabId, isTerminalOpen, setIsTerminalOpen, fileTree, setFileTree } = useAppContext();

  // Find active file
  const activeFile = useMemo(() => {
    let found: FileNode | null = null;
    const findNode = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.id === activeTabId) {
          found = node;
          return true;
        }
        if (node.children) if (findNode(node.children)) return true;
      }
      return false;
    };
    findNode(fileTree);
    return found;
  }, [fileTree, activeTabId]);

  const [localContent, setLocalContent] = useState('');
  const activeIdRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (activeFile?.id !== activeIdRef.current) {
      setLocalContent(activeFile?.content || '');
      activeIdRef.current = activeFile?.id || null;
    } else if (activeFile?.content !== undefined && activeFile.content !== localContent) {
      // In case of external changes, we can selectively update here if we want to.
      // But we shouldn't overwrite if the user is typing. We leave it simple for now and rely on sync on tab switch.
    }
  }, [activeFile?.id]);

  useEffect(() => {
    if (!activeFile || localContent === activeFile.content) return;
    const handler = setTimeout(() => {
      updateFileContent(localContent);
    }, 500);
    return () => clearTimeout(handler);
  }, [localContent, activeFile, fileTree]);

  const updateFileContent = (newContent: string) => {
    if (!activeFile) return;
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const findAndUpdate = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.id === activeFile.id) {
          node.content = newContent;
          return true;
        }
        if (node.children) if (findAndUpdate(node.children)) return true;
      }
      return false;
    };
    findAndUpdate(newTree);
    setFileTree(newTree);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t.id !== id);
    setOpenTabs(newTabs);
    if (activeTabId === id) {
       setActiveTabId(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
    }
  };

  const highlightCode = (code: string) => {
    if (!activeFile) return code;
    const ext = activeFile.name.split('.').pop() || '';
    let grammar = Prism.languages.javascript;
    if (ext === 'ts' || ext === 'tsx') grammar = Prism.languages.typescript || Prism.languages.javascript;
    else if (ext === 'css') grammar = Prism.languages.css;
    else if (ext === 'json') grammar = Prism.languages.json || Prism.languages.javascript;
    return Prism.highlight(code, grammar, ext);
  };

  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-surface text-on-surface-variant relative select-none h-full">
         <span className="material-symbols-outlined text-[64px] opacity-20 mb-4">terminal</span>
         <div className="text-[24px] font-semibold opacity-30">CodeStudio</div>
         <div className="flex gap-4 mt-8 opacity-50 text-[13px]">
           <div className="flex items-center gap-2"><span>Show Command Palette</span> <span className="px-1.5 py-0.5 bg-surface-container rounded font-mono">F1</span></div>
           <div className="flex items-center gap-2"><span>Go to File</span> <span className="px-1.5 py-0.5 bg-surface-container rounded font-mono">⌘P</span></div>
           <div className="flex items-center gap-2"><span>Open terminal</span> <span className="px-1.5 py-0.5 bg-surface-container rounded font-mono">⌘`</span></div>
         </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-surface h-full">
      {/* Editor Tabs */}
      <div className="flex h-top-bar bg-surface-container border-b border-outline-variant overflow-x-auto no-scrollbar relative shrink-0">
        {openTabs.map((tab) => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={cn(
              "flex items-center px-4 h-[35px] cursor-pointer group min-w-[120px] max-w-[200px] border-r border-outline-variant transition-colors relative overflow-hidden",
              tab.id === activeTabId 
                ? "bg-surface border-t-2 border-t-primary text-primary" 
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest border-t-2 border-t-transparent"
            )}
          >
            <span className={cn("truncate mr-2 flex-1 text-[13px]", tab.id === activeTabId ? "italic" : "")}>{tab.title}</span>
            <span onClick={(e) => closeTab(e, tab.id)} className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 hover:bg-surface-variant rounded p-0.5 text-on-surface-variant">close</span>
          </div>
        ))}
      </div>
      
      {/* Breadcrumbs */}
      <div className="h-[22px] flex items-center px-4 text-on-surface-variant text-[11px] border-b border-outline-variant shrink-0 bg-surface">
        <span className="hover:text-on-surface cursor-pointer">src</span>
        <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
        <span className="hover:text-on-surface cursor-pointer">{activeFile?.name || ''}</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Code View */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="flex-1 overflow-auto bg-[#1e1e1e] flex text-[14px] leading-[21px] relative">
            {activeFile ? (
              <Editor
                value={localContent}
                onValueChange={setLocalContent}
                highlight={code => highlightCode(code)}
                padding={16}
                style={{
                  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  fontSize: 14,
                  minHeight: '100%',
                  width: '100%',
                }}
                className="editor-container text-on-surface"
              />
            ) : null}
          </div>
          
          {/* Terminal Panel */}
          {isTerminalOpen && (
            <div className="h-[250px] border-t border-outline-variant bg-surface flex flex-col shrink-0">
              <div className="flex h-[35px] px-4 items-center gap-4 text-[11px] uppercase tracking-wide border-b border-outline-variant">
                <span className="text-on-surface-variant hover:text-on-surface cursor-pointer">Problems</span>
                <span className="text-on-surface-variant hover:text-on-surface cursor-pointer">Output</span>
                <span className="text-on-surface border-b-2 border-primary h-full flex items-center cursor-pointer">Terminal</span>
                <span className="text-on-surface-variant hover:text-on-surface cursor-pointer">Ports</span>
                <div className="ml-auto flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface p-1 rounded hover:bg-surface-variant">add</span>
                  <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface p-1 rounded hover:bg-surface-variant">delete</span>
                  <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface p-1 rounded hover:bg-surface-variant" onClick={() => setIsTerminalOpen(false)}>close</span>
                </div>
              </div>
              <div className="flex-1 p-4 font-mono text-[12px] leading-5 overflow-y-auto">
                <div><span className="text-tertiary">stitch@web-ide:~/project$</span> <span className="font-bold">npm run dev</span></div>
                <div className="text-on-surface-variant mt-1">
                  &gt; project@0.0.0 dev<br/>
                  &gt; vite<br/><br/>
                  <span className="text-tertiary">  VITE v5.0.4</span> ready in 250 ms<br/><br/>
                  <span className="text-primary-container">  ➜</span> <span className="font-bold text-on-surface">Local:</span> <a href="http://localhost:5173/" target="_blank" rel="noreferrer" className="text-primary-container hover:underline cursor-pointer">http://localhost:5173/</a><br/>
                  <span className="text-primary-container">  ➜</span> <span className="font-bold text-on-surface">Network:</span> use --host to expose<br/>
                  <span className="text-primary-container">  ➜</span> <span className="font-bold text-on-surface">press h to show help</span><br/><br/>
                  <span className="opacity-50">  8:32:15 AM</span> <span className="text-tertiary">[vite]</span> hmr update /src/App.tsx<br/>
                </div>
                <div className="mt-2"><span className="text-tertiary">stitch@web-ide:~/project$</span> <span className="inline-block w-2 h-4 bg-on-surface align-middle animate-pulse"></span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
