import blob1 from "../../assets/blob1.png";
import "./problem.css";

const Problem = () => {
  return (
    <div className="problem">
      <div className="problem-title">Problem Statement</div>
      <div className="problem-statement">
        <div className="problem-statement-text">
          The problem this project aims to address is the difficulty that
          companies face in identifying and hiring individuals with specific
          coding skills. Many companies struggle to find candidates with the
          necessary skills for their open positions, and the hiring process can
          be time-consuming and expensive. At the same time, many individuals
          who possess coding skills may have difficulty showcasing their
          abilities to potential employers or earning recognition for their
          skills.
        </div>
        <img src={blob1} alt="blob" />
      </div>
    </div>
  );
};

export default Problem;
