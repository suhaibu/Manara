
import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AppView, LibraryItem, ResearchProject, ResearchNote } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import IngestionHub from './components/IngestionHub';
import ResearchCenter from './components/ResearchCenter';
import Notebook from './components/Notebook';
import KnowledgeProduction from './components/KnowledgeProduction';
import AIAssistant from './components/AIAssistant';

const INITIAL_LIBRARY: LibraryItem[] = [
  {
    id: 'ref-001',
    title: 'مقدمة في الفكر المريدي',
    author: 'باحث أكاديمي',
    category: 'فكر وتصوف',
    type: 'BOOK',
    metadata: { tags: ['تاريخ', 'مبادئ'], year: '1445هـ' },
    content: 'النص الكامل للكتاب هنا...',
    chunks: []
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [library, setLibrary] = useState<LibraryItem[]>(INITIAL_LIBRARY);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [activeProject, setActiveProject] = useState<ResearchProject | null>(null);

  // Persistence simulation (optional enhancement)
  useEffect(() => {
    const savedLib = localStorage.getItem('manara_lib');
    if (savedLib) setLibrary(JSON.parse(savedLib));
  }, []);

  const addToLibrary = (newItem: LibraryItem) => {
    const updated = [...library, newItem];
    setLibrary(updated);
    localStorage.setItem('manara_lib', JSON.stringify(updated));
  };

  const createProject = (title: string) => {
    const newProject: ResearchProject = {
      id: `proj-${Date.now()}`,
      title,
      description: '',
      linkedSourceIds: [],
      notes: [],
      status: 'ACTIVE'
    };
    setProjects([...projects, newProject]);
    setActiveProject(newProject);
    setCurrentView(AppView.RESEARCH);
  };

  const updateProjectNotes = (projectId: string, note: ResearchNote) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, notes: [...p.notes, note] } : p
    ));
    if (activeProject?.id === projectId) {
      setActiveProject(prev => prev ? { ...prev, notes: [...prev.notes, note] } : null);
    }
  };

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden" dir="rtl">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-bold text-stone-800 font-heritage tracking-wide">
            {currentView === AppView.DASHBOARD && "لوحة التحكم"}
            {currentView === AppView.LIBRARY && "المكتبة الرقمية"}
            {currentView === AppView.INGESTION && "مركز استيراد البيانات"}
            {currentView === AppView.RESEARCH && "مركز الأبحاث"}
            {currentView === AppView.NOTEBOOK && "المفكرة الأكاديمية"}
            {currentView === AppView.PRODUCTION && "إنتاج المعرفة"}
            {currentView === AppView.AI_TOOLS && "مساعد الذكاء الاصطناعي المقيد"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">مرحباً، باحث مريدي</span>
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold">
              م
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {currentView === AppView.DASHBOARD && <Dashboard libraryCount={library.length} projectsCount={projects.length} setView={setCurrentView} />}
          {currentView === AppView.LIBRARY && <Library items={library} />}
          {currentView === AppView.INGESTION && <IngestionHub onIngest={addToLibrary} />}
          {currentView === AppView.RESEARCH && (
            <ResearchCenter 
              projects={projects} 
              library={library} 
              onCreateProject={createProject} 
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          )}
          {currentView === AppView.NOTEBOOK && (
            <Notebook 
              activeProject={activeProject} 
              library={library}
              onSaveNote={updateProjectNotes}
            />
          )}
          {currentView === AppView.PRODUCTION && <KnowledgeProduction project={activeProject} />}
          {currentView === AppView.AI_TOOLS && <AIAssistant library={library} activeProject={activeProject} />}
        </div>
      </main>
    </div>
  );
};

export default App;
