import { useState } from 'react'
import { HiPaperAirplane, HiPaperClip, HiMicrophone } from "react-icons/hi2";
import './Input.css'

const Input =(props) => {
    const{
        userMessage,
        inputPlain,
        hasMessages
    } = props
    const[input, setInput] = useState("")

    return(
        <div className={`chat__input ${hasMessages ? 'chat__input--active' : 'chat__input--empty'}`}>
            {!hasMessages && (
                <div className='chat__welcome'>
                    <h3>Привет, я Винстон</h3>
                    <p>Я помогу структурировать мысли, анализировать заметки и отвечать на вопросы.</p>
                </div>
            )}
            <div className='chat__input-shell'>
                <button className='chat__input-action chat__input-action--secondary' aria-label='Прикрепить файл'>
                    <HiPaperClip size={18} />
                </button>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Спроси у меня...' />
                <button className='chat__input-action chat__input-action--secondary' aria-label='Голосовой ввод'>
                    <HiMicrophone size={18} />
                </button>
                <button
                    onClick={() => {
                        const trimmedInput = input.trim()
                        if (!trimmedInput) return
                        setInput("")
                        userMessage(trimmedInput)
                    }}
                    className='chat__input-action chat__input-action--primary'
                    aria-label='Отправить сообщение'
                >
                    <HiPaperAirplane size={18} />
                </button>
            </div>
        </div>
    )
}

export default Input