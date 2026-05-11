import { useState } from 'react'
import './styles/AddNoteModal.css'


const AddNoteModal =(props) => {
    const{onAdd, toggleAddNote, toggle} = props

    const[note, setNote] = useState(
        {
            title: "",
            text: ""
        }
    )

    const clickSound = new Audio("/denielcz-immersivecontrol-button-click-sound-463065.mp3");

    const handleClick = () => {
        clickSound.currentTime = 0; // чтобы не лагал при частом клике
        clickSound.play();

        console.log("clicked");
    };

    return(
        <div className={`notes__modal-onadd ${toggleAddNote ? 'active' : ''}`} onClick={toggle}>
            <div className='modal__container' onClick={(e) => e.stopPropagation()}>
                <div className='modal__content'>
                    <div className='input__title'>
                        <input onChange={(e) => setNote({ ...note, title: e.target.value })} placeholder='untitle' value={note.title}/>
                        <button onClick={() => {

                            if (note.title.trim() === "" || note.text.trim() === "") {
                                alert("Ошибка: Заполните все поля (пробелы не считаются)");
                                return;
                            }       


                            onAdd(note)
                            setNote({
                                title: "",
                                text: ""
                            })

                            handleClick()
                        }}>Add</button>
                    </div>
                    <div><textarea onChange={(e) => setNote({ ...note, text: e.target.value })} placeholder='Введите текст' value={note.text}/></div>
                </div>
            </div>
        </div>
    )
}

export default AddNoteModal