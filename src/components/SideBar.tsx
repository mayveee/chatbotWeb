// components/Sidebar.tsx
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: Props) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <h2>챗봇 메뉴</h2>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="/"
              className={`sidebar-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              대화
            </Link>
          </li>
          <li>
            <Link
              to="/album"
              className={`sidebar-item ${location.pathname === '/album' ? 'active' : ''}`}
            >
              앨범
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className={`sidebar-item ${location.pathname === '/upload' ? 'active' : ''}`}
            >
              이미지 업로드
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
