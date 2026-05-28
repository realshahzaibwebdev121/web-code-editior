import React from 'react';

export function Settings() {
  return (
    <div className="flex-1 flex w-full h-full overflow-hidden bg-background">
      {/* Editor Tabs Area */}
      <div className="flex flex-col w-full h-full">
        <div className="flex h-[35px] bg-surface-container-low border-b border-outline-variant overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center px-4 h-full bg-surface border-t-2 border-primary cursor-pointer group min-w-[120px] max-w-[200px]">
            <span className="material-symbols-outlined text-[16px] text-outline mr-2">settings</span>
            <span className="text-on-surface truncate flex-1 italic">Settings</span>
            <span className="material-symbols-outlined text-[14px] ml-2 opacity-0 group-hover:opacity-100 text-outline hover:text-on-surface-variant rounded flex items-center justify-center p-0.5 transition-opacity">close</span>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-[200px] h-full bg-surface-container-low border-r border-outline-variant flex flex-col py-2 shrink-0">
            <div className="px-4 pb-2 mb-2 border-b border-outline-variant/50 font-semibold text-on-surface-variant uppercase tracking-wider text-[11px]">
               Categories
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                 <div className="block px-4 py-1.5 text-on-surface bg-surface-container-highest border-l-2 border-primary cursor-pointer">Commonly Used</div>
                 <div className="block px-4 py-1.5 text-on-surface-variant hover:bg-surface-container-high transition-colors ml-[2px] cursor-pointer">Text Editor</div>
                 <div className="block px-4 py-1.5 text-on-surface-variant hover:bg-surface-container-high transition-colors ml-[2px] cursor-pointer">Workbench</div>
                 <div className="block px-4 py-1.5 text-on-surface-variant hover:bg-surface-container-high transition-colors ml-[2px] cursor-pointer">Window</div>
                 <div className="block px-4 py-1.5 text-on-surface-variant hover:bg-surface-container-high transition-colors ml-[2px] cursor-pointer">Features</div>
                 <div className="block px-4 py-1.5 text-on-surface-variant hover:bg-surface-container-high transition-colors ml-[2px] cursor-pointer">Application</div>
              </div>
            </div>
          </aside>
          <div className="flex-1 flex flex-col h-full bg-surface overflow-y-auto p-8 lg:px-12 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-on-surface mb-2">Settings</h1>
            </div>
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">Commonly Used</h2>
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-1 max-w-lg">
                  <label className="text-on-surface font-medium flex items-center justify-between">Editor: Font Size</label>
                  <p className="text-on-surface-variant text-[12px] mb-1">Controls the font size in pixels.</p>
                  <input type="number" defaultValue="14" className="bg-surface-container-highest border border-outline-variant text-on-surface rounded px-2 py-1 w-24 h-[28px] font-mono focus:border-primary focus:outline-none transition-colors" />
                </div>
                
                <div className="flex flex-col gap-1 max-w-lg">
                  <label className="text-on-surface font-medium flex items-center justify-between">Editor: Font Family</label>
                  <p className="text-on-surface-variant text-[12px] mb-1">Controls the font family.</p>
                  <input type="text" defaultValue="'JetBrains Mono', 'Courier New', monospace" className="bg-surface-container-highest border border-outline-variant text-on-surface rounded px-3 py-1 w-full h-[28px] font-mono focus:border-primary focus:outline-none transition-colors" />
                </div>

                <div className="flex flex-col gap-1 max-w-lg">
                  <label className="text-on-surface font-medium flex items-center justify-between">Editor: Tab Size</label>
                  <p className="text-on-surface-variant text-[12px] mb-1">The number of spaces a tab is equal to.</p>
                  <input type="number" defaultValue="4" className="bg-surface-container-highest border border-outline-variant text-on-surface rounded px-2 py-1 w-24 h-[28px] font-mono focus:border-primary focus:outline-none transition-colors" />
                </div>
                
                <div className="flex flex-col gap-1 max-w-lg">
                  <label className="text-on-surface font-medium flex items-center justify-between">Editor: Cursor Style</label>
                  <p className="text-on-surface-variant text-[12px] mb-1">Controls the cursor style.</p>
                  <select className="bg-surface-container-highest border border-outline-variant text-on-surface rounded px-2 py-1 w-48 h-[28px] focus:border-primary focus:outline-none">
                    <option value="line">line</option>
                    <option value="block">block</option>
                    <option value="underline">underline</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1 max-w-lg mt-4">
                  <label className="text-on-surface font-medium flex items-center justify-between">Workbench: Color Theme</label>
                  <p className="text-on-surface-variant text-[12px] mb-1">Specifies the color theme used in the workbench.</p>
                  <div className="flex items-center gap-2">
                    <select className="bg-surface-container-highest border border-outline-variant text-on-surface rounded px-2 py-1 w-64 h-[28px] focus:border-primary focus:outline-none">
                      <option value="deep-spectrum">Deep Spectrum (Dark)</option>
                      <option value="light-plus">Light+ (Default Light)</option>
                      <option value="monokai">Monokai</option>
                    </select>
                    <button className="px-3 py-1 bg-surface-container-highest hover:bg-surface-variant border border-outline-variant rounded text-on-surface transition-colors cursor-pointer leading-[18px]">
                        Browse Additional Color Themes...
                    </button>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
