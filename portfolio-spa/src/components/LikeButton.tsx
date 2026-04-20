interface Props {
  liked: boolean;
  likes: number;
  onToggle: () => void;
}

export default function LikeButton({ liked, likes, onToggle }: Props) {
  return (
    <button
      className={`like-btn${liked ? ' liked' : ''}`}
      onClick={onToggle}
      title="Like"
      aria-label={liked ? 'Eemalda meeldiv' : 'Märgi meeldivaks'}
    >
      <span>{liked ? '♥' : '♡'}</span>
      <span>{likes}</span>
    </button>
  );
}
