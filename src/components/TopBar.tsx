import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useAppContext } from '../AppContext';
import { FileNode } from '../types';

export function TopBar() {
  const { fileTree, isTerminalOpen, setIsTerminalOpen } = useAppContext();
  const [fileMenuOpen, setFileMenuOpen] = useState(false);

  // Deep recursive function to add files to JSZip
  const addFilesToZip = (zip: JSZip, folderName: string, nodes: FileNode[]) => {
    const currentFolder = folderName ? zip.folder(folderName) : zip;
    if (!currentFolder) return;
    
    for (const node of nodes) {
      if (node.type === 'file') {
        currentFolder.file(node.name, node.content || '');
      } else if (node.children) {
        addFilesToZip(currentFolder, node.name, node.children);
      }
    }
  };

  const handleDownloadProject = () => {
    const zip = new JSZip();
    addFilesToZip(zip, '', fileTree);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'codestudio-project.zip');
    });
    setFileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-[48px] right-0 h-[35px] bg-surface-container border-b border-outline-variant flex items-center justify-between px-4 z-40 transition-all duration-150">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-on-surface-variant tracking-wide text-[13px]">CodeStudio</span>
        <nav className="hidden md:flex items-center gap-1 h-full">
          {/* File Menu Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setFileMenuOpen(!fileMenuOpen)}
              className="px-2 py-1 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded transition-colors text-[13px]"
            >
              File
            </button>
            {fileMenuOpen && (
              <>
                 <div className="fixed inset-0 z-40" onClick={() => setFileMenuOpen(false)}></div>
                 <div className="absolute top-[100%] left-0 mt-1 w-48 bg-surface-container-highest border border-outline-variant rounded shadow-xl py-1 z-50 flex flex-col">
                   <button 
                     onClick={handleDownloadProject}
                     className="px-4 py-2 text-left text-[13px] text-on-surface hover:bg-primary/20 hover:text-primary transition-colors flex items-center gap-2"
                   >
                     <span className="material-symbols-outlined text-[16px]">download</span> Export Project as Zip
                   </button>
                 </div>
              </>
            )}
          </div>

          <button onClick={() => setIsTerminalOpen(!isTerminalOpen)} className="px-2 py-1 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded transition-colors text-[13px]">
             Terminal
          </button>
          
          {['Edit', 'Selection', 'View', 'Go', 'Run', 'Help'].map((item) => (
            <button key={item} className="px-2 py-1 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface rounded transition-colors text-[13px]">
              {item}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Search Command Palette Simulation */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-96 max-w-[40%] bg-inverse-on-surface border border-outline-variant rounded h-[24px] items-center px-2 shadow-sm focus-within:border-primary">
        <span className="material-symbols-outlined text-[14px] text-outline mr-2">search</span>
        <input 
          type="text"
          placeholder="CodeStudio"
          className="bg-transparent border-none outline-none text-on-surface w-full h-full p-0 placeholder-outline text-[12px]" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined text-[18px]">splitscreen</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-variant transition-colors">
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </div>
    </div>
  );
}
