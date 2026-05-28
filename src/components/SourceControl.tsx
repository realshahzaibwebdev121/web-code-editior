import React from 'react';

export function SourceControl() {
  return (
    <div className="flex-1 flex overflow-hidden h-full w-full">
      <aside className="w-sidebar bg-surface-container border-r border-outline-variant flex flex-col flex-shrink-0 z-30">
        <div className="flex items-center justify-between px-4 py-3 text-on-surface font-semibold tracking-wider uppercase text-[11px]">
          <span>SOURCE CONTROL</span>
          <div className="flex gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">check</span>
            <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">refresh</span>
          </div>
        </div>
        <div className="px-2 pb-4 border-b border-outline-variant">
          <textarea className="w-full bg-surface-bright text-on-surface border border-outline-variant rounded p-2 focus:border-primary focus:outline-none resize-none mb-2" placeholder="Message (Press Ctrl+Enter to commit)" rows={3}></textarea>
          <div className="flex gap-1 px-1">
            <button className="flex-1 bg-primary text-on-primary font-medium rounded py-1 px-2 hover:opacity-90 transition-opacity cursor-pointer">Commit</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
           <div className="flex items-center px-4 py-1 cursor-pointer hover:bg-surface-variant group">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1">expand_more</span>
              <span className="font-semibold text-on-surface text-[11px]">STAGED CHANGES</span>
              <span className="ml-2 text-on-surface-variant bg-surface-container-highest px-1.5 rounded-full text-[10px]">1</span>
           </div>
           <div className="flex items-center px-4 py-1 cursor-pointer hover:bg-surface-variant pl-8 group">
              <span className="material-symbols-outlined text-[16px] text-primary mr-2" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
              <span className="text-on-surface truncate">App.tsx</span>
              <span className="ml-2 text-on-surface-variant truncate opacity-60 text-[10px] flex-1 text-right">src</span>
              <span className="text-tertiary font-bold ml-2 text-[12px]">M</span>
           </div>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col bg-surface overflow-hidden">
        {/* Editor Tabs */}
        <div className="flex items-center h-[35px] bg-surface-container border-b border-outline-variant overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center px-4 h-full bg-surface border-t-2 border-primary text-primary cursor-pointer border-r border-outline-variant min-w-fit gap-2">
            <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>description</span>
            <span>App.tsx (Merge Conflict)</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e]">
          <div className="flex flex-1 min-h-0">
            {/* Diff View Area (3 columns) */}
            <div className="flex-1 border-r border-outline-variant flex flex-col overflow-hidden">
               <div className="px-4 py-1.5 bg-surface-container-highest text-error font-semibold text-[11px] uppercase tracking-wide border-b border-outline-variant shrink-0">Current Change (Local)</div>
               <div className="p-4 font-mono text-[13px] leading-[22px] overflow-auto whitespace-pre">
                  <div className="opacity-50 text-on-surface">import React, {'{'} useState {'}'} from 'react';</div>
                  <div className="opacity-50 text-on-surface">import {'{'} Button {'}'} from './ui/Button';</div>
                  <div className="bg-error/20 border-l-2 border-error -mx-4 px-4 py-0.5 text-error">import {'{'} Header {'}'} from './ui/Header';</div>
                  <br />
                  <div className="text-on-surface">export function App() {'{'}</div>
                  <div className="bg-error/20 border-l-2 border-error -mx-4 px-4 py-0.5 text-error">const [count, setCount] = useState(0);</div>
               </div>
            </div>
            
            <div className="flex-1 border-r border-outline-variant flex flex-col overflow-hidden">
               <div className="px-4 py-1.5 bg-surface-container-highest text-tertiary font-semibold text-[11px] uppercase tracking-wide border-b border-outline-variant shrink-0">Incoming Change (Remote)</div>
               <div className="p-4 font-mono text-[13px] leading-[22px] overflow-auto whitespace-pre">
                  <div className="opacity-50 text-on-surface">import React, {'{'} useState, useEffect {'}'} from 'react';</div>
                  <div className="opacity-50 text-on-surface">import {'{'} Button {'}'} from './ui/Button';</div>
                  <br /><br />
                  <div className="text-on-surface">export function App() {'{'}</div>
                  <div className="bg-tertiary/20 border-l-2 border-tertiary -mx-4 px-4 py-0.5 text-tertiary">const [count, setCount] = useState(0);</div>
                  <div className="bg-tertiary/20 border-l-2 border-tertiary -mx-4 px-4 py-0.5 text-tertiary">const [theme, setTheme] = useState('dark');</div>
               </div>
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
               <div className="px-4 py-1.5 bg-surface-container-highest text-on-surface font-semibold text-[11px] uppercase tracking-wide border-b border-outline-variant shrink-0">Result</div>
               <div className="p-4 font-mono text-[13px] leading-[22px] overflow-auto whitespace-pre">
                  <div className="text-on-surface">import React, {'{'} useState, useEffect {'}'} from 'react';</div>
                  <div className="text-on-surface">import {'{'} Button {'}'} from './ui/Button';</div>
                  <br />
                  <div className="text-on-surface">export function App() {'{'}</div>
                  <div className="bg-primary/20 border-l-2 border-primary -mx-4 px-4 py-2 italic text-on-surface-variant">&lt;!-- Conflict Resolution Area --&gt;</div>
                  <br />
                  <div className="opacity-50 text-on-surface">return (</div>
               </div>
            </div>
          </div>
          
          {/* Terminal below diff */}
          <div className="h-[200px] flex-shrink-0 flex flex-col border-t border-outline-variant bg-surface-container">
             <div className="flex justify-between items-center h-8 bg-surface-container border-b border-outline-variant px-2 shrink-0">
                <div className="flex h-full text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                   <div className="px-3 flex items-center cursor-pointer hover:text-on-surface">PROBLEMS</div>
                   <div className="px-3 flex items-center cursor-pointer hover:text-on-surface">OUTPUT</div>
                   <div className="px-3 flex items-center cursor-pointer hover:text-on-surface">DEBUG CONSOLE</div>
                   <div className="px-3 flex items-center cursor-pointer text-primary border-b-2 border-primary">TERMINAL</div>
                </div>
             </div>
             <div className="flex-1 p-3 overflow-y-auto font-mono text-[13px] text-on-surface whitespace-pre-wrap leading-[20px]">
                <span className="text-tertiary">stitch@web-ide</span>:<span className="text-primary-container">~/project</span><span className="text-white">$</span> git merge feature/new-ui<br/>
                Auto-merging src/App.tsx<br/>
                CONFLICT (content): Merge conflict in src/App.tsx<br/>
                Automatic merge failed; fix conflicts and then commit the result.<br/>
                <span className="text-tertiary">stitch@web-ide</span>:<span className="text-primary-container">~/project</span><span className="text-white">$</span> <span className="animate-pulse">_</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
