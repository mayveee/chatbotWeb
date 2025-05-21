// components/Sidebar.tsx
import './Sidebar.css';

type Props = {
  isOpen: boolean;
};

export default function Sidebar({ isOpen }: Props) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <h2>챗봇 메뉴</h2>
        <ul>
          <li>새 대화</li>
          <li>최근 질문</li>
          <li>설정</li>
        </ul>
      </div>
    </aside>
  );
}
