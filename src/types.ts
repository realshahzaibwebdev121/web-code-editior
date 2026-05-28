export type ViewState = 'explorer' | 'search' | 'source-control' | 'extensions' | 'settings' | 'none';

export interface FileNode {
  id: string; // unique path string
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isExpanded?: boolean;
  content?: string;
  isEditing?: boolean; // For renaming
}

export interface EditorTab {
  id: string; // matches FileNode id
  title: string;
  isDirty?: boolean;
}

