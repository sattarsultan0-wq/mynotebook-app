import './styles/Note.css'
import { HiDocumentText } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";



const Note = (props) => {
    const{
        notes,
        onDelete,
        noteModal
    } = props



  return(
    <>
    {notes.map((el) => (
        <div className='note__container' key={el.id} onClick={() => noteModal(el)}>
            <div className='dashbord__note'>
                <HiDocumentText className='note__icon'/>
                <div className='note__content'>
                    <h3 className='note__title'>{el.title}</h3>
                    <p>{el.text}</p>
                </div>
                <div className='note__delete-container'>
                    <MdDeleteOutline onClick={(e) => {
                        e.stopPropagation()
                        onDelete(el.id)}} className='note__delete-icon'/>
            </div>
        </div>
    </div>
    ))}
    </>
  )
  
}

export default Note


