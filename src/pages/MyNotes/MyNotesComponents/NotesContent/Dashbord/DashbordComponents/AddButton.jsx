import './styles/AddButton.css'

const AddButton = (props) => {
  const{toggle} = props

  return(
    <button onClick={toggle} className='dashbord__content__container__btn-add-notes'>+ Добавить заметку</button>
  )
  
}

export default AddButton