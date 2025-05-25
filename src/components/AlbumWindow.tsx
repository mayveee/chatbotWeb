import { useEffect, useState } from 'react';
import './AlbumWindow.css';
import TopBar from './TopBar';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

type PhotoItem = {
  id: string;
  url: string;
};

export default function AlbumWindow({ onMenuClick, sidebarOpen }: Props) {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/delete/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPhotos((prev) => prev.filter((photo) => photo.id !== id));
      } else {
        const data = await res.json();
        alert(`삭제 실패: ${data.error || res.status}`);
      }
    } catch (err) {
      console.error("삭제 요청 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/list-images");
        const data = await res.json();

        const photoData: PhotoItem[] = data.images.map((filename: string) => {
          const id = filename.split(".")[0];
          return {
            id,
            url: `http://127.0.0.1:8000/images/${filename}`,
          };
        });

        setPhotos(photoData);
      } catch (err) {
        console.error("이미지 불러오기 실패:", err);
      }
    };

    fetchImages();
  }, []);

  return (
      <div className={`album-window ${sidebarOpen ? 'shifted' : ''}`}>
        <TopBar onMenuClick={onMenuClick} title='앨범' />
        <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt={`Photo ${photo.id}`} />
            <button className="delete-btn" onClick={() => handleDelete(photo.id)}>삭제</button>
          </div>
        ))}
      </div>
      </div>
    );
}
