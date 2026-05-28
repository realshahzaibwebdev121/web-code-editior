import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { FileNode } from '../types';
import { useAppContext } from '../AppContext';

export function Explorer() {
  const { fileTree, setFileTree, openTabs, setOpenTabs, activeTabId, setActiveTabId } = useAppContext();

  const handleFileClick = (node: FileNode) => {
    if (node.isEditing) return; // Ignore click when editing
    if (node.type === 'file') {
      const isOpened = openTabs.find(t => t.id === node.id);
      if (!isOpened) {
        setOpenTabs([...openTabs, { id: node.id, title: node.name }]);
      }
      setActiveTabId(node.id);
    } else {
      toggleFolder(node.id);
    }
  };

  const toggleFolder = (nodeId: string) => {
    const newTree = JSON.parse(JSON.stringify(fileTree)); // deep copy 
    
    // recursive search
    const traverse = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          node.isExpanded = !node.isExpanded;
          return true;
        }
        if (node.children) {
          if (traverse(node.children)) return true;
        }
      }
      return false;
    };
    traverse(newTree);
    setFileTree(newTree);
  };

  const setEditing = (nodeId: string, editing: boolean) => {
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const traverse = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          node.isEditing = editing;
          return true;
        }
        if (node.children) if (traverse(node.children)) return true;
      }
      return false;
    };
    traverse(newTree);
    setFileTree(newTree);
  };

  const renameNode = (nodeId: string, newName: string) => {
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const traverse = (nodes: FileNode[]) => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          node.name = newName;
          node.isEditing = false;
          return true;
        }
        if (node.children) if (traverse(node.children)) return true;
      }
      return false;
    };
    traverse(newTree);
    setFileTree(newTree);
    
    // update tabs if it was a file
    const newTabs = openTabs.map(t => t.id === nodeId ? { ...t, title: newName } : t);
    setOpenTabs(newTabs);
  };

  const deleteNode = (nodeId: string) => {
    const newTree = JSON.parse(JSON.stringify(fileTree));
    const findAndDelete = (nodes: FileNode[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === nodeId) {
          nodes.splice(i, 1);
          return true;
        }
        if (nodes[i].children) if (findAndDelete(nodes[i].children!)) return true;
      }
      return false;
    };
    findAndDelete(newTree);
    setFileTree(newTree);
    
    // close tab if opened
    const newTabs = openTabs.filter(t => t.id !== nodeId);
    setOpenTabs(newTabs);
    if (activeTabId === nodeId) {
      setActiveTabId(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
    }
  };

  const createNewFile = () => {
    const name = window.prompt("Enter file name:");
    if (!name) return;

    const newTree = JSON.parse(JSON.stringify(fileTree));
    const newId = `/${name}`;
    newTree.push({
      id: newId,
      name: name,
      type: 'file',
      content: ''
    });
    setFileTree(newTree);
    
    const isOpened = openTabs.find(t => t.id === newId);
    if (!isOpened) {
      setOpenTabs([...openTabs, { id: newId, title: name }]);
    }
    setActiveTabId(newId);
  };

  const createNewFolder = () => {
    const name = window.prompt("Enter folder name:");
    if (!name) return;
    
    const newTree = JSON.parse(JSON.stringify(fileTree));
    newTree.push({
      id: `/${name}`,
      name: name,
      type: 'folder',
      children: [],
      isExpanded: true
    });
    setFileTree(newTree);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nodeId: string, currentName: string) => {
    if (e.key === 'Enter') {
      renameNode(nodeId, e.currentTarget.value || currentName);
    } else if (e.key === 'Escape') {
      setEditing(nodeId, false);
    }
  };

  const renderTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isFile = node.type === 'file';
      const isActive = activeTabId === node.id;
      return (
        <div key={node.id} className="flex flex-col w-full">
          <div 
            className={cn(
              "flex items-center pr-2 py-0.5 cursor-pointer hover:bg-surface-container-highest transition-colors flex-shrink-0 group/node text-[13px] w-full",
              isActive ? "bg-primary/10 text-primary border-l-2 border-primary" : "border-l-2 border-transparent text-on-surface-variant hover:text-on-surface"
            )}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => handleFileClick(node)}
            onContextMenu={(e) => {
              e.preventDefault();
              setEditing(node.id, true);
            }}
          >
            <span className={cn(
              "material-symbols-outlined text-[16px] mr-1 group-hover/node:text-on-surface transition-transform", 
              isFile ? "opacity-0" : "",
              node.isExpanded ? "rotate-90" : ""
            )}>
              keyboard_arrow_right
            </span>
            <span className={cn(
              "material-symbols-outlined text-[16px] mr-1.5",
              isActive ? "text-primary" : (!isFile ? "text-outline group-hover/node:text-on-surface" : "text-outline")
            )}>
              {!isFile ? (node.isExpanded ? "folder_open" : "folder") : 
               (node.name.endsWith('.tsx') || node.name.endsWith('.ts')) ? "code" : 
               node.name.endsWith('.json') ? "data_object" : "description"
              }
            </span>
            {node.isEditing ? (
              <input 
                autoFocus
                defaultValue={node.name}
                onKeyDown={(e) => handleKeyDown(e, node.id, node.name)}
                onBlur={(e) => renameNode(node.id, e.target.value || node.name)}
                className="bg-surface border border-primary text-on-surface outline-none w-full flex-1 px-1 -ml-1 text-[13px]"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="truncate flex-1">{node.name}</span>
            )}
            
            <div className="flex gap-1 ml-2 opacity-0 group-hover/node:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); setEditing(node.id, true); }}
                className="hover:text-primary"
                title="Rename (Right click also works)"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                className="hover:text-error"
                title="Delete"
              >
                <span className="material-symbols-outlined text-[14px]">delete</span>
              </button>
            </div>
          </div>
          {node.isExpanded && node.children && (
            <div className="flex flex-col w-full">
              {renderTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside className="w-[260px] bg-surface-container-high border-r border-outline-variant flex flex-col flex-shrink-0 relative h-full">
      <div className="px-4 py-2 font-semibold tracking-widest text-on-surface-variant uppercase text-[11px] select-none flex justify-between items-center w-full">
        <span>Explorer</span>
        <div className="flex gap-1">
          <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-on-surface" onClick={createNewFile}>note_add</span>
          <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-on-surface" onClick={createNewFolder}>create_new_folder</span>
          <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-on-surface">sync</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
        {renderTree(fileTree)}
      </div>
    </aside>
  );
}
