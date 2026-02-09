
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  LIBRARY = 'LIBRARY',
  INGESTION = 'INGESTION',
  RESEARCH = 'RESEARCH',
  NOTEBOOK = 'NOTEBOOK',
  PRODUCTION = 'PRODUCTION',
  AI_TOOLS = 'AI_TOOLS'
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: string;
  type: 'BOOK' | 'THESIS' | 'MANUSCRIPT' | 'POEM' | 'URL' | 'VIDEO' | 'DOCUMENT';
  metadata: {
    year?: string;
    school?: string;
    source?: string; // e.g., URL or YouTube link
    tags: string[];
  };
  content: string; // The raw text extracted
  chunks: KnowledgeUnit[];
}

export interface KnowledgeUnit {
  id: string;
  sourceId: string;
  text: string;
  metadata: {
    page?: number;
    chapter?: string;
    timestamp?: string; // For videos
    index: number;
  };
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  linkedSourceIds: string[];
  notes: ResearchNote[];
  status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';
}

export interface ResearchNote {
  id: string;
  projectId: string;
  sourceId: string;
  sourceTitle: string;
  text: string;
  quote: string;
  timestamp: number;
  tags: string[];
}

export interface UserRole {
  name: string;
  permissions: string[];
}
