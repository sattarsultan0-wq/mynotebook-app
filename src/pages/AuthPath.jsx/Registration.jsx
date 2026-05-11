import { useState, useEffect } from 'react'
import './Registration.css'

const Registration = (props) => {
    const{
        registration,
        setRegistration,
        select,
        toggle,
        registerUser,
        isError,
        setIsError
    } = props
    const[passError, setPassError] = useState(false)
    const[confirmPass, setConfirmPass] = useState("")
    const[confirmSelect, setConfirmSelect] = useState(false)
    const pass = registration.password
    useEffect(() => {
      setConfirmSelect(false)
    }, [])
    useEffect(() => {
      if(pass.length >= 1){
        setPassError(true)
      }
      if(pass.length >= 8 || pass.length == 0){
        setPassError(false)
      }

    }, [registration.password])


    return(
        <div className={select ? "registration__card" : "registration__card active"}>
            <h1 className="registration__title">Регистрация</h1>

            <div className="registration__input-group">
                <input
                type="text"
                className="registration__input"
                onChange={(e) => {
                  const value = e.target.value
                  if(!/^[a-z0-9_@.-]*$/.test(value))
                    return
                  setRegistration({...registration, login: value})
                  if(isError)
                    setIsError(false)
                }}
                value={registration.login}
            />
                <label className={registration.login ? "registration__label active" : "registration__label"}>
                    Придумайте логин
          </label>
          <span className={isError ? "registration__error active" : "registration__error"}>
            Такой пользователь уже существует
          </span>
        </div>

        <div className="registration__input-group">
          <input
            type="password"
            className="registration__input"
            onChange={(e) => {
              const value = e.target.value
              if(!/^[A-Za-z0-9_@.,-]*$/.test(value))
                return
              setRegistration({...registration, password: value})
            }}
            value={registration.password}
          />
          <label className={registration.password ? "registration__label active" : "registration__label"}>
            Придумайте пароль
          </label>
          <span className={passError ? "registration__error-pass active" : "registration__error-pass"}>
            Пароль должен состоять минимум из 8 символов
          </span>
          
        </div>
        <div className="registration__input-group">
          <input
            type="password"
            className="registration__input"
            onChange={(e) => {
              const value = e.target.value
              if(!/^[A-Za-z0-9_@.,-]*$/.test(value))
                return
              setConfirmPass(value)
            }}
            value={confirmPass}
          />
          <label className={confirmPass ? "registration__label active" : "registration__label"}>
            Потвердите пароль
          </label>
          <span className={confirmSelect ? "registration__confirm-pass active" : "registration__confirm-pass"}>
            Пароль не совпадает
          </span>
          
        </div>

        <button onClick={() => {
          if(confirmPass === registration.password){
            setConfirmSelect(false)
            setConfirmPass("")
            registerUser()
          } else{
            setConfirmSelect(true)
          }
        }} className="registration__button">
          Регистрация
        </button>

        <p className="registration__switch">Прошли регистрацию?
          <span onClick={toggle}>
            Войти
          </span>
        </p>
      </div>
    )
}

export default Registration