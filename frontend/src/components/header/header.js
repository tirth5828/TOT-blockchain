// import React, {useEffect, useState} from "react";
import Logo from "../../assets/logohorizontal.png";
import { useContext } from "react";
import { AppContext } from "../context";
import './header.css';
import {useNavigate} from "react-router-dom";
import Button from "../body/button";
const Header = () =>{
    const history = useNavigate();
    // const username = props.username;
    // console.log("here "+username);
    const {leetcodeName,changeLeetcodeName} = useContext(AppContext);
    return (
    <header className="header">
    <div className="header--container">
        <h1 className="logoimg">
            <img src={Logo} className="log" alt='Code fraggers logo'></img>
        </h1>
        {/* <Button text="Sign in" type="primary-btn" className="signin" onClick={()=>history("/login")} /> */}
       {leetcodeName?(
                <button className="signIn" onClick={()=>history("/profile")} >
                   {leetcodeName} 
                </button>
            ):(
                <button className="signIn" onClick={()=>history("/login")} >
                  Sign in
                </button>
            )
        }
        
    </div>
    </header>)
};
export default Header;