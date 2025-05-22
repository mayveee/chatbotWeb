import { useState } from 'react';
import Sidebar from '../components/SideBar';
import './Album.css';
import AlbumWindow from '../components/AlbumWindow';

export default function Album() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="Album-layout">
            <Sidebar isOpen={sidebarOpen} />
            <AlbumWindow
                onMenuClick={() => setSidebarOpen((prev) => !prev)}
                sidebarOpen={sidebarOpen}
            />
        </div>
    );
}