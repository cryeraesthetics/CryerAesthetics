import { useNavigate } from 'react-router-dom';

export default function BackLink({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button className="back-link" onClick={() => navigate(to)}>
      ‹ {label}
    </button>
  );
}
