import "./TopBar.css"

type Props = {
  onMenuClick: () => void;
  title: string;
};

export default function TopBar({ onMenuClick, title }: Props) {
  return (
    <header className="top-bar">
      <div className="left"><button onClick={onMenuClick} className="menu-btn">☰</button></div>
      <div className="center"><h1 className="top-bar-title">{title}</h1></div>
      <div className="right" />
    </header>
  );
}
