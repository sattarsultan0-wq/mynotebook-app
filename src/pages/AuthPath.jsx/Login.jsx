import { useState, useRef, useEffect } from 'react'
import './Login.css'

const Login = (props) => {
    const{
        login,
        setLogin,
        select,
        toggle,
        authorization,
        isError,
        setIsError
    } = props

    const cardsRef = useRef([]);
    
      useEffect(() => {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("show");
                }
              });
            },
            { threshold: 0.2 }
          );
      
          cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
          });
      
          return () => observer.disconnect();
        }, []);


    return(
        <div className={select ? "auth__card" : "auth__card hidden"} ref={(el) => (cardsRef.current[0] = el)}>
            <h1 className="auth__title">Добро пожаловать!</h1>

            <div className="auth__input-group">
                <input
                type="text"
                className="auth__input"
                onChange={(e) => {
                  const value = e.target.value
                  if(!/^[a-z0-9_@.-]*$/.test(value))
                    return
                  setIsError(false)
                  setLogin({...login, login: value})
                }}
                value={login.login}
            />
                <label className={login.login ? "auth__label active" : "auth__label"}>
                    Введите логин
          </label>
          <span className={isError ? "auth__error active" : "auth__error"}>
            Неверный логин или пароль
          </span>
        </div>

        <div className="auth__input-group">
          <input
            type="password"
            className="auth__input"
            onChange={(e) => {
              const value = e.target.value
              if(!/^[A-Za-z0-9_]*$/.test(value))
                return
              setIsError(false)
              setLogin({...login, password: value})
            }}
            value={login.password}
          />
          <label className={login.password ? "auth__label active" : "auth__label"}>
            Введите пароль
          </label>
          <span className={isError ? "auth__error active" : "auth__error"}>
            Неверный логин или пароль
          </span>
        </div>

        <button onClick={() => {
          authorization()
        }} className="auth__button">
          Войти
        </button>

        <p className="auth__switch">Нет аккаунта?
          <span onClick={toggle}>
            Зарегистрироваться
          </span>
        </p>
      </div>
    )
}

export default Login