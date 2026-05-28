import React from 'react';

export function StatusBar() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-status-bar bg-surface-container flex justify-between items-center px-3 z-50 text-[12px] border-t border-outline-variant pl-14">
      <div className="flex items-center h-full gap-2">
        <div className="h-full flex items-center text-on-surface-variant px-2 hover:bg-surface-container-highest transition-colors cursor-pointer gap-1">
          <span className="material-symbols-outlined text-[14px]">account_tree</span>
          <span>main*</span>
        </div>
        <div className="h-full flex items-center text-on-surface-variant px-2 hover:bg-surface-container-highest transition-colors cursor-pointer gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>0 errors</span>
        </div>
        <div className="h-full flex items-center text-on-surface-variant px-2 hover:bg-surface-container-highest transition-colors cursor-pointer gap-1">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          <span>0 warnings</span>
        </div>
      </div>
      
      <div className="flex items-center h-full gap-2 text-on-surface-variant">
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span>Ln 14, Col 12</span>
        </div>
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span>Spaces: 2</span>
        </div>
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span>UTF-8</span>
        </div>
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span>CRLF</span>
        </div>
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span>TypeScript React</span>
        </div>
        <div className="h-full flex items-center px-2 hover:bg-surface-container-highest transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[14px]">feedback</span>
        </div>
      </div>
    </footer>
  );
}
