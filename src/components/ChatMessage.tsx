import './ChatMessage.css';

type Props = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ChatMessage({ role, content }: Props) {
    return (
        <div className={`message ${role}`}>
        <div className="bubble">{content}</div>
        </div>
    );
}
