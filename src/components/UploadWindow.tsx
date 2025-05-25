import { useRef, useState } from 'react';
import './UploadWindow.css';
import TopBar from './TopBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function UploadWindow({ onMenuClick, sidebarOpen }: Props) {
    const [photos, setPhotos] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setPhotos(files);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        photos.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await toast.promise(
            fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: formData,
            }),
            {
                pending: '업로드 중...',
                success: '업로드 성공!',
                error: '업로드 실패!',
            }
            );

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || `서버 응답 오류 (${response.status})`);
            }

            setPhotos([]);
            setPreviewUrls([]);
        } catch (err) {
            console.error('네트워크 오류:', err);
        }
    };


    return (
        <div className={`upload-window ${sidebarOpen ? 'shifted' : ''}`}>
            <TopBar onMenuClick={onMenuClick} title='이미지 업로드' />
            <div className="photo-grid">
                {previewUrls.map((src, idx) => (
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnHover={false}
                hideProgressBar={false}
            />
        </div>
    );
}
