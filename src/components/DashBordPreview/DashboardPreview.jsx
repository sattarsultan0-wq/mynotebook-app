import "./DashboardPreview.css";

export default function DashboardPreview() {
  return (
    <section className="dashboard">

      <h2 className="dashboard-title">
        Your unified life dashboard
      </h2>

      <p className="dashboard-subtitle">
        Tasks, health, and finances — all connected with AI insights.
      </p>

      <div className="dashboard-grid">

        {/* TASKS */}
        <div className="dashboard-card tasks">
          <h3>MyTasks</h3>
          <ul>
            <li>Finish MyNotebook UI</li>
            <li>Study AI integration</li>
            <li>Workout session</li>
          </ul>
        </div>

        {/* HEALTH */}
        <div className="dashboard-card health">
          <h3>MyHealth</h3>
          <div className="dashboard-stat">Сон: 7.5ч</div>
          <div className="dashboard-stat">Шагов: 5.494</div>
          <div className="dashboard-stat">Результат: показатели на 24% выше пред.недели! Так держать!</div>
        </div>

        {/* FINANCE */}
        <div className="dashboard-card finance">
          <h3>MyFinance</h3>
          <div className="dashboard-stat">Расход: 143.000тг</div>
          <div className="dashboard-stat">Доход: 550.000тг</div>
          <div className="dashboard-stat">Резузльтат: в соотношении Д/Р ваши показатели выше на 17% чем в прошлом месяце!</div>
        </div>

      </div>

    </section>
  );
}