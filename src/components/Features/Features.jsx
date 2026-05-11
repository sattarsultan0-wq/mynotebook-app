import { useEffect, useRef } from "react";
import './Features.css'
import { AiOutlineArrowRight } from "react-icons/ai";



export default function Features() {
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

  const handleMouseMove = (e, index) => {
  const card = cardsRef.current[index]
  if (!card) return

  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  card.style.transform = `rotateX(${-(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg)`
}
const handleMouseLeave = (index) => {
  const card = cardsRef.current[index]
  if (!card) return

  card.style.transform = "rotateX(0deg) rotateY(0deg)"
}

  const features = [
    {
      title: "MyTasks",
      desc: "Plan, prioritize and automate your daily workflow with AI.",
    },
    {
      title: "MyHealth",
      desc: "Track habits, sleep, and your overall wellbeing.",
    },
    {
      title: "MyFinance",
      desc: "Control your expenses and reach your financial goals.",
    },
  ];

  return (
    <section className="features">
      <h2 className="features-title">Everything in one place</h2>

      <div className="features-grid">
        {features.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="feature-card"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <h3>{item.title} <AiOutlineArrowRight className="features__icons" /></h3>
            <p>{item.desc} </p>

          </div>
        ))}
      </div>
    </section>
  );
}