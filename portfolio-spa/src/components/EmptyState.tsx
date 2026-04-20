import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
}

const MESSAGES: Record<FilterType, [string, string, string]> = {
  all:       ['{ }', 'pole ühtegi projekti', 'lisa esimene projekt ülal'],
  active:    ['¬', 'aktiivseid projekte pole', ''],
  completed: ['∅', 'lõpetatud projekte pole', ''],
  wip:       ['…', 'töös projekte pole', ''],
  liked:     ['♡', 'meeldivaid projekte pole', 'vajuta ♡ et lisada'],
};

export default function EmptyState({ filter }: Props) {
  const [icon, line1, line2] = MESSAGES[filter];
  return (
    <div className="empty">
      <span className="empty-big">{icon}</span>
      {line1}
      {line2 && <><br />{line2}</>}
    </div>
  );
}
