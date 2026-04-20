import { useRef } from 'react';
import type { Project } from '../types';
import LikeButton from './LikeButton';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3b82f6',
  JavaScript: '#f59e0b',
  Python: '#10b981',
  Rust: '#f97316',
  Go: '#06b6d4',
  CSS: '#a78bfa',
  Other: '#6b7280',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'aktiivne',
  completed: 'valmis',
  wip: 'töös',
};

interface Props {
  project: Project;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onToggleLike: (id: string) => void;
  onEdit: (id: string) => void;
  onSaveEdit: (id: string, newTitle: string) => void;
}

export default function ProjectCard({
  project, onDelete, onToggleComplete, onToggleLike, onEdit, onSaveEdit,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const accentColor = LANG_COLORS[project.language] ?? LANG_COLORS.Other;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSaveEdit(project.id, inputRef.current?.value ?? project.title);
    if (e.key === 'Escape') onSaveEdit(project.id, project.title);
  };

  return (
    <div className={`project-card${project.status === 'completed' ? ' completed' : ''}`}>
      <div className="card-accent-bar" style={{ background: accentColor }} />

      <div className="card-top">
        {project.editing ? (
          <input
            ref={inputRef}
            className="card-title-input"
            defaultValue={project.title}
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={(e) => onSaveEdit(project.id, e.target.value)}
          />
        ) : (
          <div className="card-title">{project.title}</div>
        )}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button className="icon-btn" onClick={() => onEdit(project.id)} title="Muuda">✎</button>
          <button className="icon-btn del" onClick={() => onDelete(project.id)} title="Kustuta">✕</button>
        </div>
      </div>

      <div className="card-meta">
        <span className="tag tag-lang">{project.language}</span>
        <span className={`tag tag-status-${project.status}`}>
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <div className="card-desc">{project.description}</div>

      <div className="card-actions">
        <LikeButton
          liked={project.liked}
          likes={project.likes}
          onToggle={() => onToggleLike(project.id)}
        />
        <button
          className={`complete-btn${project.status === 'completed' ? ' done' : ''}`}
          onClick={() => onToggleComplete(project.id)}
        >
          {project.status === 'completed' ? '✓ valmis' : '○ märgi valmis'}
        </button>
      </div>
    </div>
  );
}
