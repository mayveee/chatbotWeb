import "./TopBar.css"

type Props = {
  onMenuClick: () => void;
};

export default function TopBar({ onMenuClick }: Props) {
  return (
    <header className="top-bar">
      <button className="menu-btn" onClick={onMenuClick}>☰</button>
      <h1 className="top-bar-title">챗봇</h1>
    </header>
  );
}
