import { useEffect, useState } from 'react';
import './AlbumWindow.css';
import TopBar from './TopBar';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function AlbumWindow({ onMenuClick, sidebarOpen }: Props) {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    // TODO: 서버로 부터 이미지 fetch 해오기기
    setPhotos([
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=300&h=300&fit=crop',
    ]);
  }, []);

  return (
      <div className={`album-window ${sidebarOpen ? 'shifted' : ''}`}>
        <TopBar onMenuClick={onMenuClick} title='앨범' />
        <div className="photo-grid">
        {photos.map((url, index) => (
          <div key={index} className="photo-item">
            <img src={url} alt={`Photo ${index + 1}`} />
          </div>
        ))}
      </div>
      </div>
    );
}
