import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import MyNotes from './pages/MyNotes/MyNotes'
import AuthPage from './pages/AuthPath.jsx/AuthPage'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mynotebook-demo" element={<MyNotes />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
  )
}

export default App