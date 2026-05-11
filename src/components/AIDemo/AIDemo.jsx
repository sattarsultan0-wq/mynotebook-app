import { useEffect, useRef, useState } from "react";
import "./AIDemo.css";

const messagesData = [
  { role: "user", text: "Запланируй мой день" },
  {
    role: "ai",
    text: "Конечно. С 10:00 до 13:00 сосредоточьтесь на основной работе, в 18:00 — в спортзале, а вечером пересмотрите свои задачи.",
  },
  { role: "user", text: "Сколько я потратил в этом месяце?" },
  {
    role: "ai",
    text: "В этом месяце вы потратили 343.540 тенге. Большая часть расходов приходится на еду (45%) и подписки (20%). Я помогу вам составить стратегию по оптимизации ваших расходов...",
  },
];

export default function AIDemo() {
  const sectionRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔥 запускаем ТОЛЬКО когда блок в зоне видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect(); // запускаем один раз
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ⏳ typewriter только после старта
  useEffect(() => {
    if (!started) return;
    if (currentIndex >= messagesData.length) return;

    const message = messagesData[currentIndex];

    let i = 0;
    setTypedText("");

    const typing = setInterval(() => {
      i++;
      setTypedText(message.text.slice(0, i));

      if (i >= message.text.length) {
        clearInterval(typing);

        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, message]);
          setCurrentIndex((prev) => prev + 1);
        }, 500);
      }
    }, 18);

    return () => clearInterval(typing);
  }, [started, currentIndex]);

  return (
    <section className="ai-demo" ref={sectionRef}>
      <h2 className="ai-title">Your AI assistant inside MyNotebook</h2>

      <div className="chat-box">
        {visibleMessages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            {msg.text}
          </div>
        ))}

        {started && currentIndex < messagesData.length && (
          <div className={`msg ${messagesData[currentIndex].role} typing`}>
            {typedText}
            <span className="cursor">|</span>
          </div>
        )}
      </div>
    </section>
  );
}


