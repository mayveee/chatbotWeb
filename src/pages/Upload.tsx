import { useState } from 'react';
import Sidebar from '../components/SideBar';
import './Upload.css';
import UploadWindow from '../components/UploadWindow';

export default function Upload() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="upload-layout">
            <Sidebar isOpen={sidebarOpen} />
            <UploadWindow
                onMenuClick={() => setSidebarOpen((prev) => !prev)}
                sidebarOpen={sidebarOpen}
            />
        </div>
    );
}