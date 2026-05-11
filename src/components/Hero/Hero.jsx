import { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Hero.css'

export default function Hero() {
  const navigate = useNavigate()

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


  return (
    <div className="hero">
      <div className="hero-content">

        <h1 className="hero-title" ref={(el) => (cardsRef.current[0] = el)}>
          Welcome to
          <br />
          <span className="gradient-text">
           MyNoteBook AI
          </span>
        </h1>

        <p className="hero-subtitle" ref={(el) => (cardsRef.current[1] = el)}>
          One smart workspace for tasks, health, and finances — powered by AI.
        </p>

        <div className="hero-buttons">
          <button onClick={()=> navigate("/auth")} className="btn primary" ref={(el) => (cardsRef.current[2] = el)}>Get Started</button>
          <button onClick={()=> navigate("/mynotebook-demo")} className="btn secondary" ref={(el) => (cardsRef.current[3] = el)}>Try Demo</button>
        </div>

      </div>
    </div>
  );
}