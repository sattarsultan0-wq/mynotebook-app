import { useEffect, useState } from "react";
import { BiLayer } from "react-icons/bi";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1400);
    const t2 = setTimeout(() => onFinish(), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${fade ? "fade" : ""}`}>
      <BiLayer className="logo-icon" />
    </div>
  );
}