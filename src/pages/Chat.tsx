// pages/Chat.tsx
import { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string | string[] }[]>([]);

  type ChatMessage = {
  role: 'user' | 'assistant';
  content: string | string[];
};

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/chat-history/1234");
      const data = await res.json();

      if (Array.isArray(data.messages)) {
        const parsedMessages: ChatMessage[] = data.messages.flatMap((msg: ChatMessage) => {
          if (msg.role === 'assistant') {
            try {
              const parsed = JSON.parse(msg.content as string) as {
                reply: string;
                images?: string[];
              };

              const replyMsg: ChatMessage = {
                role: 'assistant',
                content: parsed.reply || ''
              };

              const imageMsg: ChatMessage | null = parsed.images?.length
                ? {
                    role: 'assistant',
                    content: parsed.images.map((id: string) =>
                      `http://localhost:8000/images/${id}.JPEG`
                    )
                  }
                : null;

              return imageMsg ? [replyMsg, imageMsg] : [replyMsg];
            } catch (e) {
              // JSON 파싱 실패 → 일반 텍스트로 처리
              return [msg];
            }
          }

          // role: 'user'는 그대로 반환
          return [msg];
        });

        setMessages(parsedMessages);
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
      console.log(data)
      const answer = data.reply
      console.log('answer: ', answer)
      const images = data.images
      console.log('images: ', images)

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({ role: 'assistant', content: answer || '응답이 없습니다.' });
        if (images && images.length > 0) {
          const imageUrls = images.map((id: string) => `http://127.0.0.1:8000/images/${id}.JPEG`);
          updated.push({ role: 'assistant', content: imageUrls });
        }
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
