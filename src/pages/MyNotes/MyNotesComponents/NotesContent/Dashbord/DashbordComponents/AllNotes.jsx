import './styles/AllNotes.css'
import Note from './Note'

const AllNotes = (props) => {
    const{
        notes,
        setNotes,
        onDelete,
        noteModal
    } = props


  return(
    <div className='dashbord__allnotes__container'>
        <Note notes={notes} onDelete={onDelete} noteModal={noteModal} />
    </div>
  )
  
}

export default AllNotes