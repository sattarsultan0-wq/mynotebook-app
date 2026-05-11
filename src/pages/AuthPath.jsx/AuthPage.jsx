import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import Login from './Login'
import Registration from './Registration'
import RegLoading from './RegLoading'
import "./AuthPage.css";

function AuthPage() {
  
const[login, setLogin] = useState({ login: "", password: "" })
const[registration, setRegistration] = useState({ login: "", password: "" })
const[select, setSelect] = useState(true)
const[isErrorAuth, setIsErrorAuth] = useState(false)
const[isErrorReg, setIsErrorReg] = useState(false)
const[regLoading, setRegLoading] = useState(false)
const[authPreloader, setAuthPreloader] = useState(false)
const toggle = () => setSelect(!select)
const navigate = useNavigate()

const URL_REGISTER = "http://localhost:3000/register";
const URL_LOGIN = "http://localhost:3000/login";

const registerUser = () => {
  const login = registration.login
  const pass = registration.password
  if (!login || !pass) {
    alert("Заполните все поля")
    return
  }


  fetch(URL_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registration)
  })
    .then(async(response) => {
      const data = await response.json()
      if (!response.ok) {
        if(data.message === "Пользователь уже существует"){
          setIsErrorReg(true)
        }
        throw new Error(data.message)
      }
      return data
    })
    .then((data) => {
      console.log("Пользователь зарегистрирован")
      setRegLoading(true)
      setIsErrorReg(false)
    })
    .catch((error) => {
      console.error(error)
    })
}
const handleLoadingComplete = () => {
        setRegistration({...registration, login: "", password: ""})
        setRegLoading(false);
        setTimeout(()=>setSelect(true), 500)
    };

const authorization = () => {
  const log = login.login
  const pass = login.password
  if (!log || !pass) {
    alert("Заполните все поля")
    return
  }

  fetch(URL_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login)
  })
  .then(async response => {
    const data = await response.json()

    if (!response.ok) {
      setIsErrorAuth(true)
      return
    }

    return data
  })
  .then(data => {
    localStorage.setItem('token', data.token)
    setLogin({...login, login: "", password: ""})
    setAuthPreloader(true)
    setTimeout(()=>navigate('/mynotebook-demo'), 1500)
  })
  .catch(error => {
    console.log(error.message)
  })
}

  return (
    <div className="auth__container">
      <Login authorization={authorization} login={login} setLogin={setLogin} select={select} toggle={toggle} isError={isErrorAuth} setIsError={setIsErrorAuth}/>
      <Registration registerUser={registerUser} registration={registration} setRegistration={setRegistration} select={select} toggle={toggle} isError={isErrorReg} setIsError={setIsErrorReg}/>
      <RegLoading regLoading={regLoading} setRegLoading={setRegLoading} onComplete={handleLoadingComplete}/>
      <div className={authPreloader ? "auth__preloader active" : "auth__preloader"}></div>
    </div>
  );
}

export default AuthPage