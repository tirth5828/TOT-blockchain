import blob1 from "../../assets/blob1.png";
import "./solution.css";

const Solution = () => {
  return (
    <div className="solution">
      <div className="solution-title">Solution</div>
      <div className="solution-statement">
        <div className="solution-statement-text">
          The goal of this project is to provide a platform that enables users
          to register their coding profiles, complete coding challenges for
          tokens, along with collecting their skill statistics. This information
          can then be sold to businesses that are seeking individuals with
          specific programming skills, facilitating their hiring process.
          Through the platform, users can also exhibit their abilities and thus
          improve their chances of getting hired.
        </div>
        <img src={blob1} alt="blob" />
      </div>
    </div>
  );
};

export default Solution;
