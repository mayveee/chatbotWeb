// components/AlbumWindow.tsx
import './AlbumWindow.css';
import TopBar from './TopBar';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function AlbumWindow({ onMenuClick, sidebarOpen }: Props) {
  return (
      <div className={`album-window ${sidebarOpen ? 'shifted' : ''}`}>
        <TopBar onMenuClick={onMenuClick} title='앨범' />
        
      </div>
    );
}
