import React from "react";
import { useState } from "react";
const AppContext = React.createContext();

const AppProvider = ({children})=>{
    const [leetcodeName, setLeetcodeName] = useState('');
    const [email,setEmail] = useState('');
    const [account,setAccount]=useState('');
    
    const changeEmail=(email)=>{
        setEmail(email);
    }
    const changeLeetcodeName=(name)=>{
        setLeetcodeName(name);
    }
    const changeAccount=(account)=>{
        setAccount(account);
    }

    
   
    return (
        <AppContext.Provider value={{leetcodeName,changeLeetcodeName,email,changeEmail, account,changeAccount}} > {children}</AppContext.Provider>
    )
};

export {AppContext,AppProvider};