import React, { useEffect, useState, useContext } from "react";
import { Component } from "react";
// import Navbar from "./navbar";
import History from "../../assets/history.png"
import Bell from "../../assets/bell.png"
import "./profile.css";
import Logo from "../../assets/logohorizontal.png";
import Edit from "../../assets/arrow-left-thin.png";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const history = useNavigate();
    const {email, account, leetcodeName, updateUserProfile} = useContext(AppContext);
    const [profile, updateProfile] = useState({
        dp:'',
        easy:0,
        medium:0,
        hard:0,
    });

    const API_BASE_URL = "https://b150j.sse.codesandbox.io/"; // Replace with actual API base URL
    const USER_NAME = leetcodeName; // Replace with actual username

    const requestBody = {
        operationName: "getUserProfile",
        username: USER_NAME
    };

    const headers = {
        "Content-Type": "application/json"
    };

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(API_BASE_URL + "user-profile", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }

            const userProfile = await response.json();
            console.log(userProfile)
            updateProfile({
                dp:userProfile.data.matchedUser.profile.userAvatar,
                easy:userProfile.data.matchedUser.submitStats.totalSubmissionNum[1].count,
                medium:userProfile.data.matchedUser.submitStats.totalSubmissionNum[2].count,
                hard:userProfile.data.matchedUser.submitStats.totalSubmissionNum[3].count,
            })
            updateUserProfile({
                dp:profile.dp,
                easy:profile.easy,
                medium:profile.medium,
                hard:profile.hard,
            })

            console.log(profile);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        console.log(leetcodeName);
        console.log(account);
        fetchUserProfile();
        
    },[])
    return (
        <div className="profile" >
            {/* <Navbar /> */}
            <div className="navbar" >
            <div className="navbar-logo">
                <img src={Logo} className="logo" alt='Code fraggers logo' onClick={()=>history("/")} ></img>
            </div>
            <div className="navbar-li" >
                <ul className="list" >
                    <li>
                        <img src={History} />
                    </li>
                    <li>
                        <img src = {Bell} />
                    </li>
                    <li>
                        <img src = {profile.dp} className="navbar-dp" width={30} height={30}  />
                    </li>
                </ul>
            </div>

        </div>

            <div className="profile-container">
                <div className="container-left" >
                    <img className="dp" src={profile.dp} ></img>
                    <div className="info">
                        <div className="name" >
                            {leetcodeName}
                        </div>
                        <div className="description">
                            I am a sophomore studing at Indian Institute of Information Technology, Vadodara
                        </div>
                        <button className="edit" ><img src={Edit} /> Edit Profile</button>
                    </div>
                </div>
                <div className="container-right">
                    <div className="heading-container"><h2>Profile</h2></div>
                    <div className="container-right-bottom" >
                    <div className="streak-container">
                        <h3>Streak</h3>
                        <div>streak</div>
                    </div>
                    {/* <div className="achievements-container">
                        <h3>achievements</h3>
                        <div>achieveneijfie...</div>
                    </div> */}
                    <div className="email-container">
                        <h3>Email</h3>
                        <div>{email}</div>
                    </div>
                    <div className="address-container">
                        <h3>Metamask public Address</h3>
                        <div>{account}</div>
                    </div>
                    </div>
                </div>
            </div>
            
            {/* <h1>This is profile page</h1> */}
        </div>
    )
}
export default Profile;
 // const getdata=()=>{
    //     fetch("https://leetcode-stats-api.herokuapp.com/Hetvi_Soni")
    //     .then((response)=>response.json()).then((json)=>{
    //         console.log(json.easySolved);
    //     })
    // }