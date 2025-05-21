// components/ChatInput.tsx
import { useState } from 'react';
import './ChatInput.css';

type Props = {
  onSend: (msg: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    const trimmed = text.trim();
    if (trimmed) {
      onSend(trimmed);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 개행 방지
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <div className="chat-input-inner">
        <textarea
          placeholder="메시지를 입력하세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}
