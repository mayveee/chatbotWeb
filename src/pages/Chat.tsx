// pages/Chat.tsx
import { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/chat-history/1234");
        const data = await res.json();
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("초기 대화 내역 불러오기 실패:", err);
      }
    };

    fetchHistory();
  }, []);

  const handleSend = async (msg: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);

    // 로딩중 메시지
    const loadingMessage = { role: 'assistant' as const, content: '...' };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await fetch('http://127.0.0.1:8000/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();
      const answer = data.reply

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
