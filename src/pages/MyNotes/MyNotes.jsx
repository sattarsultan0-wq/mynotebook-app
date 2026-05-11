import {useState} from 'react'
import Header from './MyNotesComponents/Header/NotesHeader';
import NotesContent from './MyNotesComponents/NotesContent/NotesContent'
import './MyNotes.css'
import { useEffect } from 'react';


const MyNotes = () => {
  const[preloader, setPreloader] = useState(true)

  useEffect(() => {
    setTimeout(() => setPreloader(false), 700)
  }, [])


  return(
    <div className='notes__main'>
      <div className={preloader ? 'notes__main-preloader' : 'notes__main-preloader hidden'}></div>
      <Header />
      <NotesContent />
    </div>
  )
  
}

export default MyNotes