import right from "../../assets/right.svg";
import blob1 from "../../assets/blob1.png";
import "./start.css";

const Start = () => {
  return (
    <div className="start">
      <div className="start-title">Visit the Site!</div>
      <div className="start-button">
        <img src={blob1} alt="blob" />
        <div className="start-button-box">
          <a href="/home" id="start-button">
            Get Started
            <img src={right} alt="enter" height={50} width={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Start;
