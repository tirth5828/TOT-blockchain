import React, { useEffect, useState, useContext } from "react";
import "./login.css";
import Logo from '../../assets/logohorizontal.png'
import { useNavigate } from "react-router-dom";
import Boy from "../body/boy";
import Container from "../body/container";
import useArcanaAuth from "../../arcanaAuth";
import Button from "../body/button";
import {ColorRing} from 'react-loader-spinner';
import Profile from "../profile/profile";
import HomePage from "../body/homepage";
import { AppContext } from "../context";
import { Auth, useAuth } from "@arcana/auth-react";
import AuthService from '../../arcanaAuth';
import Networks from '../../networks';
import {registerUser, getUser} from "../../backend";


const LoginForm = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const {leetcodeName ,changeLeetcodeName,
        email,changeEmail, account, 
        changeAccount,initialized, loading,setLoading} = useContext(AppContext);

    const auth = AuthService.getInstance();
    const navigate = useNavigate();

    
    const loginwithLink = async(email)=>{
        await auth.loginWithLink(email);
        const acc = await auth.provider.request({method:"eth_accounts"});
        console.log("Account ", acc);
        changeAccount(acc[0]);
        registerUser(leetcodeName, email, account);
        navigate("/");
    }

    useEffect(()=>{
        (async() => {
            await auth.init()
            const isLoggedIn = await auth.isLoggedIn()
            console.log("Logged in", isLoggedIn);
            
            if(isLoggedIn){
                (async () => {
                    const userInfo = await auth.getUser();
                    const acc = userInfo.address;
                    console.log("Account of logged in : ", acc);
                    
                    const data = await getUser(acc);
                    console.log(data);
                    if(data !== null){
                        changeLeetcodeName(data.username);
                        changeEmail(data.email);
                        changeAccount(acc);
                    }
                    
                })();
                setLoggedIn(isLoggedIn);
                navigate("/")
            }
        })();
        
    },[]);



    const handleEmailChange = (event)=>{
        changeEmail(event.target.value);
    }
    const handleUserName = (e)=>{
        changeLeetcodeName(e.target.value);
    }

    return (
        <>
            {/* <div className="home">
                <Boy classname="img" fade={false} />
                <Container className="home--content" />
            </div>
            <section className="logincontainer">
                <h1 className="logoimg lgimg">
                    <img src={Logo} className="log" alt='Code fraggers logo' onClick={() => history("/")}></img>
                </h1>
                <div className="logincover">
                <h1 className="loginheading">Sign in</h1> */}
                    { auth.loading?(
                        <div className="'loading" >
                            <ColorRing visible={true}/>
                        </div>
                    ): loggedIn ?(
                        console.log("logged in"),
                        console.log("Leetcodeusername = ", leetcodeName)
                    ):
                    (
                        <div className="logincover">
                            <h1 className="loginheading">Sign in</h1> 
                            <div className="loginsubcon">
                                <p>Leetcode Username</p>
                                <input type="text" placeholder="User name" value={leetcodeName} onChange={handleUserName} />
                            <div>
                            <p>Email</p>
                            <input value={email} type='text' placeholder="enter email" onChange={handleEmailChange}/>                               
                            <button onClick={()=>{loginwithLink(email)}} className="button">
                                    Login with link
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                {/* </div>
            </section> */}


        </>
    )
}

export default LoginForm;