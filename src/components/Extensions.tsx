import React from 'react';

export function Extensions() {
  return (
    <div className="flex-1 flex overflow-hidden h-full w-full">
      <aside className="w-sidebar bg-surface-container border-r border-outline-variant flex flex-col shrink-0 z-30">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="tracking-wider text-on-surface uppercase text-[11px] font-semibold">Extensions</h2>
          <div className="flex gap-1">
            <button className="text-outline hover:text-on-surface rounded p-0.5"><span className="material-symbols-outlined text-[16px]">filter_list</span></button>
            <button className="text-outline hover:text-on-surface rounded p-0.5"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-2 top-1.5 text-[14px] text-outline">search</span>
            <input type="text" placeholder="Search Extensions..." className="w-full bg-surface border border-outline-variant rounded pl-7 pr-2 py-1 text-on-surface placeholder-outline focus:outline-none focus:border-primary focus:bg-inverse-on-surface transition-colors" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex items-center px-2 py-1 cursor-pointer hover:bg-surface-container-highest group">
              <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-on-surface transition-transform duration-200 rotate-90">chevron_right</span>
              <span className="text-on-surface-variant ml-1 font-bold text-[11px] tracking-widest">INSTALLED</span>
              <span className="ml-auto bg-inverse-on-surface text-outline px-1.5 rounded-full text-[10px]">4</span>
            </div>
            <div className="flex flex-col py-1">
              <div className="flex items-start gap-2 px-4 py-2 hover:bg-surface-container-highest cursor-pointer">
                <div className="w-8 h-8 rounded bg-[#414141] flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-primary">code_blocks</span></div>
                <div className="flex flex-col overflow-hidden w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-on-surface truncate group-hover:text-primary">Python</span>
                    <span className="material-symbols-outlined text-[14px] text-outline">settings</span>
                  </div>
                  <span className="text-on-surface-variant truncate opacity-80 text-[12px]">Microsoft</span>
                </div>
              </div>
              <div className="flex items-start gap-2 px-4 py-2 bg-surface-container-highest cursor-pointer border-l-2 border-primary pl-[14px]">
                <div className="w-8 h-8 rounded bg-[#414141] flex items-center justify-center shrink-0 border border-primary"><span className="material-symbols-outlined text-[#67df70]">brush</span></div>
                <div className="flex flex-col overflow-hidden w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-on-surface truncate">Prettier - Code formatter</span>
                    <span className="material-symbols-outlined text-[14px] text-outline">settings</span>
                  </div>
                  <span className="text-on-surface-variant truncate opacity-80 text-[12px]">Prettier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1 bg-surface flex flex-col relative overflow-hidden">
        <div className="h-[35px] bg-surface-container flex items-end border-b border-outline-variant shrink-0 overflow-x-auto">
            <div className="flex items-center h-[34px] px-3 border-t-2 border-primary bg-surface gap-2 cursor-pointer min-w-max group">
              <span className="material-symbols-outlined text-[14px] text-outline">extension</span>
              <span className="text-on-surface italic">Extension: Marketplace</span>
              <button className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-surface-variant text-outline hover:text-on-surface transition-opacity"><span className="material-symbols-outlined text-[14px]">close</span></button>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto pb-12">
            <div className="relative w-full pt-16 pb-12 px-8 flex flex-col items-center justify-center border-b border-outline-variant bg-gradient-to-b from-surface-container-low to-surface">
              <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-variant shadow-lg border border-outline-variant mb-2">
                  <span className="material-symbols-outlined text-[32px] text-primary">storefront</span>
                </div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight">CodeStudio Marketplace</h1>
                <p className="text-on-surface-variant max-w-xl">Discover and install extensions to add new languages, debuggers, and tools to your environment. Enhance your productivity with community-built integrations.</p>
                <div className="w-full relative mt-4">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
                  <input type="text" placeholder="Search extensions by name, category, or publisher..." className="w-full bg-surface-container-highest border border-outline-variant rounded-full pl-12 pr-4 py-3 text-on-surface placeholder-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-inverse-on-surface transition-all shadow-sm" />
                </div>
              </div>
            </div>
            <div className="px-8 py-8 max-w-7xl mx-auto flex flex-col gap-10">
               <div className="flex flex-col gap-4">
                  <h3 className="text-on-surface font-semibold tracking-wide uppercase text-[12px]">Browse by Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Programming Languages', 'Themes', 'Debuggers', 'Linters', 'Source Control'].map(cat => (
                      <button key={cat} className="px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2">
                         <span className="material-symbols-outlined text-[16px]">{cat === 'Themes' ? 'palette' : cat === 'Debuggers' ? 'bug_report' : 'extension'}</span> {cat}
                      </button>
                    ))}
                  </div>
               </div>
               <div className="flex flex-col gap-4">
                 <h3 className="text-on-surface font-semibold tracking-wide uppercase text-[12px]">Featured Extensions</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                   {[
                     { name: 'Python', pub: 'Microsoft', dls: '120M', icon: 'terminal', color: '#4f96d1' },
                     { name: 'GitHub Copilot', pub: 'GitHub', dls: '14M', icon: 'smart_toy', color: '#ffffff' },
                     { name: 'Prettier', pub: 'Prettier', dls: '45M', icon: 'draw', color: '#e18e36' }
                   ].map(ext => (
                     <div key={ext.name} className="bg-surface-container border border-outline-variant rounded-lg p-5 flex flex-col gap-4 hover:border-outline hover:bg-surface-container-highest transition-all duration-200 group">
                        <div className="flex gap-4 items-start">
                           <div className="w-14 h-14 rounded-md bg-[#2d2d2d] border border-outline-variant flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[32px]" style={{ color: ext.color }}>{ext.icon}</span>
                           </div>
                           <div className="flex flex-col w-full overflow-hidden">
                              <h4 className="text-on-surface truncate group-hover:text-primary transition-colors text-[14px] font-semibold">{ext.name}</h4>
                              <span className="text-on-surface-variant text-[12px] truncate">{ext.pub}</span>
                           </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-2">
                           <div className="flex items-center gap-3 text-outline text-[12px]">
                              <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">download</span> {ext.dls}</div>
                           </div>
                           <button className="bg-primary-container hover:bg-primary-container/90 text-on-primary-container px-4 py-1.5 rounded font-medium transition-colors cursor-pointer">Install</button>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}
