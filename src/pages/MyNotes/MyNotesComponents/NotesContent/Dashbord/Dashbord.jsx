import { useEffect, useState } from 'react'
import './Dashbord.css'
import Header from './DashbordComponents/Header'
import AddButton from './DashbordComponents/AddButton'
import AllNotes from './DashbordComponents/AllNotes'
import AddNoteModal from './DashbordComponents/AddNoteModal'
import NoteModal from './DashbordComponents/NoteModal'


const Dashbord = () => {
  const[notes, setNotes] = useState([])
  const[selectNote, setSelectNote] = useState(null)
  const[isOpen, setIsOpen] = useState(false)

  const[toggleAddNote, setToggleAddNote] = useState(false)
  const toggle = () => setToggleAddNote(!toggleAddNote)


  const URL = "http://localhost:3000/notes"

  useEffect(() => {
    const USER_TOKEN = localStorage.getItem('token')
    if(USER_TOKEN) {
      fetch(URL, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${USER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((notes) => setNotes(notes))
    }
  }, [])

  const onAdd = (note) => {
    const USER_TOKEN = localStorage.getItem('token')
    if(USER_TOKEN) {
      fetch(URL, {
      method: "POST",
      headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${USER_TOKEN}`
                },
      body: JSON.stringify(note)
    })
    .then((response) => response.json())
    .then((savedNote) => setNotes([...notes, savedNote]))
    }
  }

  const onDelete = async (id) => {
  const prevNotes = notes;

  // оптимистично удаляем
  setNotes(prev => prev.filter(note => note.id !== id));

  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }
  } catch (error) {
    // 🔥 ВАЖНО: откат
    setNotes(prevNotes);

    alert(error.message);
  }
};

  const noteModal = (note) => {
    setSelectNote(note)
    setIsOpen(true)
  }
const onEdit = (note, value) => {
  fetch(`${URL}/${note.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
  })
    .then(res => res.json())
    .then(savedNote => {
      setNotes(prev =>
        prev.map(n => n.id === savedNote.id ? savedNote : n)
      )
      setIsOpen(value)
    })
}

  return(
    <div className='notes__dashbord'>
              <Header />
              <div className='dashbord__content'>
                <div className='dashbord__content-container'>
                  <AddButton toggle={toggle}/>
                  <AllNotes noteModal={noteModal} notes={notes} setNotes={setNotes} onDelete={onDelete} />
                  <AddNoteModal onAdd={onAdd} toggleAddNote={toggleAddNote} toggle={toggle}/>
                  {isOpen && selectNote && (
                    <NoteModal 
                    el={selectNote}
                    isOpen={isOpen}
                    onEdit={onEdit}
                    />
                  )}
                </div>
              </div>
            </div>
  )
  
}

export default Dashbord