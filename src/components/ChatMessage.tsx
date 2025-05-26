// components/ChatMessage.tsx
import './ChatMessage.css';

type Props = {
  role: 'user' | 'assistant';
  content: string | string[];
};

export default function ChatMessage({ role, content }: Props) {
  const isTyping = content === '...';

  console.log('🔍 ChatMessage content:', content);
  const isImageArray = Array.isArray(content) && content.every((c) =>
    typeof c === 'string' && (c.endsWith('.JPEG') || c.endsWith('.jpg') || c.endsWith('.png'))
  );
  return (
    <div className={`message ${role}`}>
      {isImageArray ? (
        <div className="image-list-wrapper">
          {content.map((imgSrc, idx) => (
            <div key={idx} className={`chat-image-wrapper ${role}`}>
              <img src={imgSrc} alt={`image-${idx}`} className="chat-image-box" />
            </div>
          ))}
      </div>
      ) : (
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
      )}
    </div>
  );
}
