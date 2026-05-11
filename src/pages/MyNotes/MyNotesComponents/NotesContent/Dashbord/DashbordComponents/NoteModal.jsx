import { useState, useEffect } from 'react'
import './styles/NoteModal.css'


const NoteModal =(props) => {
    const{
        el,
        isOpen,
        close,
        onEdit
    } = props

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {
        if (el) {
            setTitle(el.title)
            setText(el.text)
        }
    }, [el])

    const clickSound = new Audio("/denielcz-immersivecontrol-button-click-sound-463065.mp3");

    const handleClick = () => {
        clickSound.currentTime = 0; // чтобы не лагал при частом клике
        clickSound.play();

        console.log("clicked");
    };

    return(
        <div className={`note__modal ${isOpen ? 'active' : ''}`} onClick={() => {
                            handleClick()
                            const note = {
                                id: el.id,
                                title: title,
                                text: text
                            }
                            onEdit(note, false)
                        }}>
            <div className='modal__container' onClick={(e) => e.stopPropagation()}>
                <div className='modal__content'>
                    <div className='input__title'>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <button onClick={() => {
                            handleClick()
                            const note = {
                                id: el.id,
                                title: title,
                                text: text
                            }
                            onEdit(note, false)
                        }}>Save</button>
                    </div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
            </div>
        </div>
    )
}

export default NoteModal