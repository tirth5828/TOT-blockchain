import bell from "../../assets/bell.png";
import { useState } from "react";

const Menu = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="menu">
      <div className="menu-image">
        <img src={bell} onClick={() => setShow(!show)} />
      </div>
      {show && (
        <div className="dropdown">
          <div className="link">beghh</div>
          <div className="link">beghh</div>
        </div>
      )}
    </div>
  );
};

export default Menu;
