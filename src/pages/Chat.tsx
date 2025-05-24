// pages/Chat.tsx
import { useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);

    // 로딩중 메시지
    const loadingMessage = { role: 'assistant' as const, content: '...' };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
    const response = await fetch('https://your-api-server.com/chat', { // TODO: 서버 주소 나중에 변경
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: msg }),
    });

    const data = await response.json();
    const answer = data.reply // TODO: 서버 json 필드 네임 수정

    setMessages((prev) => {
      const updated = [...prev];
      updated.pop();
      updated.push({ role: 'assistant', content: answer || '응답이 없습니다.' });
      return updated;
    });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({ role: 'assistant', content: '수신 오류가 발생했습니다. 다시 시도해주세요.' });
        return updated;
      });
    }
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
