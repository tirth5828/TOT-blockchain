import React, { useEffect, useState } from "react";
import "./login.css";
import Logo from '../../assets/logohorizontal.png'
import { useNavigate } from "react-router-dom";
import Boy from "../body/boy";
import Container from "../body/container";
import useArcanaAuth from "../../arcanaAuth";
import Button from "../body/button";
import {ColorRing} from 'react-loader-spinner';
import Profile from "../profile/profile";
  
const LoginForm = () => {
    const [loading,setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email,setEmail] = useState('');
    const [account, setAccount] = useState('');

    const {
        initializeAuth,
        login,
        loginWithLink,
        isLoggedIn,
        getAccounts,
        logout,
        initialized,
    } = useArcanaAuth();

    const initialize = async()=>{
        await initializeAuth();
    }

    const handleLogout = async()=>{
        setLoggedIn(false);
        await logout();
    }
    const loginwithLink = async(email)=>{
        await loginWithLink(email);
        setLoggedIn(true);
    }
    useEffect(()=>{
        initialize();
    },[]);

    useEffect(()=>{
        const loadDetails = async()=>{
            if(initialized){
                const isLogged = await isLoggedIn();
                if(isLogged){
                    setLoggedIn(true);
                    const acc = await getAccounts();
                    setAccount(acc[0]);
                    setLoading(false);
                }
                else{
                    setLoading(false);
                }
            }
        };
        loadDetails();
    },[initialized]);
    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }

    const history = useNavigate();
    return (
        <>
            <div className="home">
                <Boy classname="img" fade={false} />
                <Container className="home--content" />
            </div>
            <section className="logincontainer">
                <h1 className="logoimg lgimg">
                    <img src={Logo} className="log" alt='Code fraggers logo' onClick={() => history("/")}></img>
                </h1>
                <div className="logincover">
                <h1 className="loginheading">Sign in</h1>
                    { loading?(
                        <div className="'loading" >
                            <ColorRing visible={true}/>
                        </div>
                    ):!loading && loggedIn?(
                        <Profile/>
                    ):
                    (
                        <div className="loginsubcon">
                                <p>Leetcode Username</p>
                                <input type="text" placeholder="User name" name="username" />
                            
                            <div>
                            <p>Email</p>
                                <input value={email} type='text' placeholder="enter email" onChange={handleEmailChange}/>                               
                                <button onClick={()=>{loginwithLink(email)}} className="button">
                                    Login with link
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>


        </>
    )
}

export default LoginForm;