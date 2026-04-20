export type Language = 'TypeScript' | 'JavaScript' | 'Python' | 'Rust' | 'Go' | 'CSS' | 'Other';
export type Status = 'active' | 'completed' | 'wip';
export type FilterType = 'all' | 'active' | 'completed' | 'wip' | 'liked';
export type SortType = 'newest' | 'likes' | 'name';

export interface Project {
  id: string;
  title: string;
  description: string;
  language: Language;
  status: Status;
  likes: number;
  liked: boolean;
  editing: boolean;
  createdAt: number;
}
