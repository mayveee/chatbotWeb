import { useState } from 'react';
import Sidebar from '../components/SideBar';
import './Album.css';
import AlbumWindow from '../components/AlbumWindow';

export default function Album() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="album-layout">
            <Sidebar isOpen={sidebarOpen} />
            <AlbumWindow
                onMenuClick={() => setSidebarOpen((prev) => !prev)}
                sidebarOpen={sidebarOpen}
            />
        </div>
    );
}