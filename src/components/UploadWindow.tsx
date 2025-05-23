import { useState } from 'react';
import './UploadWindow.css';
import TopBar from './TopBar';

type Props = {
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function UploadWindow({ onMenuClick, sidebarOpen }: Props) {
  return (
      <div className={`upload-window ${sidebarOpen ? 'shifted' : ''}`}>
        <TopBar onMenuClick={onMenuClick} title='이미지 업로드' />
      </div>
    );
}
