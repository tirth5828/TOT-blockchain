import { useState } from "react";
import { Link } from "react-scroll";
import logo from "../../assets/logohorizontal.png";
import "./information.css";
import Problem from "./problem";
import Solution from "./solution";
import Start from "./start";

const Information = () => {
  return (
    <div className="information">
      <div className="information-header" id="navBar">
        <img src={logo} className="logo" alt="Code fraggers logo" height={90} />
        <a href="#information-problem">Problem</a>
        <a href="#information-solution">Solution</a>
        <a href="#information-start">Start</a>
      </div>
      <div className="information-box">
        <div id="information-problem">
          <Problem />
        </div>
        <div id="information-solution">
          <Solution />
        </div>
        <div id="information-start">
          <Start />
        </div>
      </div>
    </div>
  );
};

export default Information;
