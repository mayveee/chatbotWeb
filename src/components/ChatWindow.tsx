// components/ChatWindow.tsx
import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import TopBar from './TopBar';
import ChatInput from './ChatInput';
import './ChatWindow.css';

type Props = {
  messages: { role: 'user' | 'assistant'; content: string }[];
  onSend: (msg: string) => void;
  onMenuClick: () => void;
  sidebarOpen: boolean;
};

export default function ChatWindow({ messages, onSend, onMenuClick, sidebarOpen }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chat-window ${sidebarOpen ? 'shifted' : ''}`}>
      <TopBar onMenuClick={onMenuClick} />
      <div className="chat-messages">
        <div className="message-list">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} content={m.content} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <ChatInput onSend={onSend} />
    </div>
  );
}
