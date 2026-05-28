import React from 'react';
import { TopBar } from './components/TopBar';
import { ActivityBar } from './components/ActivityBar';
import { Explorer } from './components/Explorer';
import { CodeEditor } from './components/CodeEditor';
import { StatusBar } from './components/StatusBar';
import { Settings } from './components/Settings';
import { Extensions } from './components/Extensions';
import { SourceControl } from './components/SourceControl';
import { useAppContext } from './AppContext';

export default function App() {
  const { activeView } = useAppContext();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background text-on-surface">
      <TopBar />
      <ActivityBar />
      
      <main className="absolute top-[35px] left-[48px] right-0 bottom-[22px] flex overflow-hidden">
        {activeView === 'explorer' && <Explorer />}
        {activeView === 'search' && (
          <div className="w-[260px] bg-surface-container-high border-r border-outline-variant p-4 flex flex-col shrink-0 h-full">
            <div className="text-[11px] font-semibold tracking-widest text-on-surface-variant uppercase mb-4">Search</div>
            <div className="relative w-full focus-within:text-primary">
              <input type="text" placeholder="Search..." className="w-full bg-surface-container-highest border border-outline-variant rounded p-1.5 focus:border-primary focus:outline-none text-[13px]" />
            </div>
          </div>
        )}
        {activeView === 'source-control' && <SourceControl />}
        
        {/* Editor Area (shows as long as it's not a full screen view like settings) */}
        {activeView !== 'settings' && activeView !== 'extensions' && <CodeEditor />}
        
        {activeView === 'settings' && <Settings />}
        {activeView === 'extensions' && <Extensions />}
      </main>
      
      <StatusBar />
    </div>
  );
}
