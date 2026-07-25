import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { HiClipboardDocument, HiHandThumbUp, HiHandThumbDown } from 'react-icons/hi2';
import './Content.css'

const Content =(props) => {
    const{
        chat,
        preloader
    } = props

    const [feedbackState, setFeedbackState] = useState({})
    const [copiedId, setCopiedId] = useState(null)

    const handleCopy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedId(id)
            setTimeout(() => setCopiedId(null), 1200)
        } catch (error) {
            console.error('Не удалось скопировать текст:', error)
        }
    }

    return (
        <div className='chat__content'>
            <div className='chat__container'>
                {chat.map((el) => (
                    <div key={el.id} className={`message__wrapper ${el.role}`}>
                        <div className='message'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{el.message}</ReactMarkdown>
                        </div>
                        {el.role === 'model' && el.message && (
                            <div className='message__actions'>
                                <button
                                    className={`message__action ${copiedId === el.id ? 'message__action--active' : ''}`}
                                    onClick={() => handleCopy(el.message, el.id)}
                                    aria-label='Копировать ответ'
                                >
                                    <HiClipboardDocument size={16} />
                                </button>
                                <button
                                    className={`message__action ${feedbackState[el.id] === 'like' ? 'message__action--active' : ''}`}
                                    onClick={() => setFeedbackState((prev) => ({ ...prev, [el.id]: 'like' }))}
                                    aria-label='Нравится ответ'
                                >
                                    <HiHandThumbUp size={16} />
                                </button>
                                <button
                                    className={`message__action ${feedbackState[el.id] === 'dislike' ? 'message__action--active' : ''}`}
                                    onClick={() => setFeedbackState((prev) => ({ ...prev, [el.id]: 'dislike' }))}
                                    aria-label='Не нравится ответ'
                                >
                                    <HiHandThumbDown size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={preloader ? 'chat__preloader' : 'chat__preloader hidden'}>
                <div className='chat__preloader-container'>

                </div>
            </div>
        </div>
    )
}

export default Content