// pages/Chat.tsx
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: '이건 예시 응답입니다.' }]);
    }, 500);
  };

  return (
    <div className="chat-layout">
      <Sidebar isOpen={sidebarOpen} />
      <ChatWindow
        messages={messages}
        onSend={handleSend}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}
