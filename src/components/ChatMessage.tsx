// components/ChatMessage.tsx
import './ChatMessage.css';

type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  const isTyping = content === '...';

  return (
    <div className={`message ${role}`}>
      <div className="bubble">
        {isTyping ? (
          <div className="dot-bounce">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
