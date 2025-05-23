import { useRef, useState } from 'react';
import './UploadWindow.css';
import TopBar from './TopBar';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function UploadWindow({ onMenuClick, sidebarOpen }: Props) {
    const [photos, setPhotos] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const readers = files.map(
        file =>
            new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("파일 읽기 실패"));
            reader.readAsDataURL(file);
            })
        );

        Promise.all(readers).then(setPhotos);
    };

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const handleSubmit = () => {
        console.log('보낼 이미지 목록:', photos);
        // TODO: 서버로 전송하는 로직 연결
    };

    return (
        <div className={`upload-window ${sidebarOpen ? 'shifted' : ''}`}>
            <TopBar onMenuClick={onMenuClick} title='이미지 업로드' />
            <div className="photo-grid">
                {photos.map((src, idx) => (
                <div className="photo-item" key={idx}>
                    <img src={src} alt={`Uploaded ${idx}`} />
                </div>
                ))}
            </div>

            <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={handleFileChange}
            />

            <button className="upload-fab" onClick={openFileDialog}>＋</button>
            {photos.length > 0 && (
                <button className="send-fab" onClick={handleSubmit}>➤</button>
            )}
        </div>
    );
}
