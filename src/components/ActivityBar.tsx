import React from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { useAppContext } from '../AppContext';

export function ActivityBar() {
  const { activeView, setActiveView } = useAppContext();

  const handleToggle = (view: ViewState) => {
    setActiveView(activeView === view ? 'none' : view);
  };

  const NavItem = ({ name, icon, view }: { name: string; icon: string; view: ViewState }) => {
    const isActive = activeView === view;
    return (
      <div 
        className={cn(
          "w-full h-12 flex items-center justify-center cursor-pointer transition-colors duration-150",
          isActive 
            ? "border-l-2 border-primary bg-surface-container-high text-on-surface" 
            : "border-l-2 border-transparent text-outline hover:text-on-surface-variant hover:bg-surface-container-highest"
        )}
        title={name}
        onClick={() => handleToggle(view)}
      >
        <span className={cn("material-symbols-outlined text-[24px]", isActive ? "font-variation-settings-'FILL' 1" : "")}>
          {icon}
        </span>
      </div>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-[48px] bg-surface-container-lowest border-r border-outline-variant flex flex-col items-center py-4 z-50 justify-between">
      <div className="flex flex-col items-center w-full gap-2 mt-[35px]">
        <NavItem name="Explorer" icon="folder_open" view="explorer" />
        <NavItem name="Search" icon="search" view="search" />
        <NavItem name="Source Control" icon="account_tree" view="source-control" />
        <NavItem name="Extensions" icon="extension" view="extensions" />
      </div>
      <div className="flex flex-col items-center w-full gap-2 mb-6">
        <NavItem name="Settings" icon="settings" view="settings" />
      </div>
    </aside>
  );
}
