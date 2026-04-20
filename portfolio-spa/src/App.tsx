import { useState, useCallback, useEffect } from 'react';
import type { Project, Language, FilterType, SortType } from './types';
import ProjectCard from './components/ProjectCard';
import EmptyState from './components/EmptyState';

const LANGUAGES: Language[] = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'CSS', 'Other'];

const INITIAL_PROJECTS: Project[] = [
  { id: '1', title: 'Portfolio SPA', description: 'Interaktiivne ühe-lehekülje portfoolio rakendus React + TypeScript-iga.', language: 'TypeScript', status: 'active', likes: 12, liked: false, editing: false, createdAt: Date.now() - 3000 },
  { id: '2', title: 'REST API boilerplate', description: 'Express.js serveripoolne alus autentimise ja rate-limitinguga.', language: 'JavaScript', status: 'completed', likes: 7, liked: true, editing: false, createdAt: Date.now() - 2000 },
  { id: '3', title: 'CLI task manager', description: 'Terminali-põhine ülesannete haldur Rust-is, kiire ja kerge.', language: 'Rust', status: 'wip', likes: 4, liked: false, editing: false, createdAt: Date.now() - 1000 },
];

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'kõik' },
  { value: 'active', label: 'aktiivsed' },
  { value: 'completed', label: 'valmis' },
  { value: 'liked', label: 'meeldivad' },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [titleInput, setTitleInput] = useState<string>('');
  const [langInput, setLangInput] = useState<Language>('TypeScript');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  document.body.className = darkMode ? '' : 'light';

  

  const addProject = useCallback(() => {
    if (!titleInput.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: titleInput.trim(),
      description: descriptionInput.trim() || '—',
      language: langInput,
      status: 'active',
      likes: 0,
      liked: false,
      editing: false,
      createdAt: Date.now(),
    };
    setProjects((prev) => [newProject, ...prev]);
    setTitleInput('');
    setDescriptionInput('');
    }, [titleInput, langInput, descriptionInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addProject();
  };

  const deleteProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const toggleComplete = (id: string) =>
    setProjects((prev) =>
      prev.map((p) => p.id === id ? { ...p, status: p.status === 'completed' ? 'active' : 'completed' } : p)
    );

  const toggleLike = (id: string) =>
    setProjects((prev) =>
      prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)
    );

  const startEdit = (id: string) => setProjects((prev) => prev.map((p) => ({ ...p, editing: p.id === id })));

  const saveEdit = (id: string, newTitle: string) =>
    setProjects((prev) =>
      prev.map((p) => p.id === id ? { ...p, title: newTitle.trim() || p.title, editing: false } : p)
    );

  const filtered = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'liked') return p.liked;
    return p.status === filter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'likes') return b.likes - a.likes;
    if (sort === 'name') return a.title.localeCompare(b.title);
    return b.createdAt - a.createdAt;
  });

  const totalLikes = projects.reduce((sum, p) => sum + p.likes, 0);
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  return (
    <>
      <header className="header">
        <div className="logo"><span>// </span>developer.portfolio<span>.tsx</span></div>
        <div className="header-right">
          <div className="stats">
            <div className="stat"><div className="stat-val"><span className="accent">{projects.length}</span></div><div className="stat-label">projekti</div></div>
            <div className="stat"><div className="stat-val"><span className="accent">{completedCount}</span></div><div className="stat-label">valmis</div></div>
            <div className="stat"><div className="stat-val"><span className="accent">{totalLikes}</span></div><div className="stat-label">likes</div></div>
          </div>
          <button className="dark-toggle" onClick={() => setDarkMode((d) => !d)}>
            {darkMode ? '☀ hele' : '◑ tume'}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-tag">Arendaja portfoolio</div>
        <h1>Ehitan<br /><span className="hl">digitaalseid</span>{' '}<span className="hl2">veebilehti</span></h1>
        <p>Meeldib luua ja hallata veebilehti.</p>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-title">// projektid</span>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="filter-bar">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <button key={value} className={`filter-btn${filter === value ? ' active' : ''}`} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value as SortType)}>
              <option value="newest">uusimad</option>
              <option value="likes">kõige rohkem meeldimisi</option>
              <option value="name">nime järgi</option>
            </select>
          </div>
        </div>

        <div className="add-form">
          <div className="input-wrap">
            <input value={titleInput} onChange={(e) => setTitleInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="projekti nimi... (Enter lisab)" maxLength={60} />
          </div>
          <div className="input-wrap" style={{ width: '100%' }}>
            <textarea
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="projekti kirjeldus..."
              rows={3}
            />
          </div>
          <div className="input-wrap" style={{ flex: '0 0 auto', minWidth: '140px' }}>
            <select value={langInput} onChange={(e) => setLangInput(e.target.value as Language)}>
              {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addProject}>+ lisa</button>
        </div>

        {sorted.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <div className="projects-grid">
            {sorted.map((p) => (
              <ProjectCard key={p.id} project={p} onDelete={deleteProject} onToggleComplete={toggleComplete} onToggleLike={toggleLike} onEdit={startEdit} onSaveEdit={saveEdit} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>// built with React + TypeScript + Vite</span>
        <span>{new Date().getFullYear()} ©</span>
      </footer>
    </>
  );
}
