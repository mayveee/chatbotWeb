// pages/Chat.tsx
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  // TODO: 텍스트 전송 시 서버로 부터 응답 받기
  const handleSend = (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);

    // 로딩중 메시지지
    const loadingMessage = { role: 'assistant' as const, content: '...' };
    setMessages((prev) => [...prev, loadingMessage]);

    // 임시 응답
    setTimeout(() => {
      setMessages((prev) => {
        // 로딩 메시지 제거하고 실제 응답 추가
        const updated = [...prev];
        updated.pop();
        updated.push({ role: 'assistant', content: '이건 예시 응답입니다.' });
        return updated;
      });
    }, 7000);
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
