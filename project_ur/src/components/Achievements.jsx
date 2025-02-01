import React from "react";
import "./Achievements.css";

const Achievements = ({ achievements }) => {
  return (
    <div className="achievements-container">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`achievement-card ${achievement.unlocked ? "unlocked" : ""}`}
        >
          <h3>{achievement.name}</h3>
          <p>{achievement.description}</p>
          {achievement.unlocked && <span>✅ Desbloqueado</span>}
        </div>
      ))}
    </div>
  );
};

export default Achievements;
