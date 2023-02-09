import {AuthProvider} from "@arcana/auth";
import { useState } from "react";

const appID = "088f7bcaf4cdef82c1a53ec4b0f9a07dcf9736f3";
let auth;
function useArcanaAuth(){
    const [initialized, setInitialized]= useState(false);
    const initializeAuth = async()=>{
        if(!auth){
            auth = new AuthProvider(`${appID}`);
            await auth.init({appMode:2});
            setInitialized(true);
        }
    }
    const login = async(socialType)=>{
        if(initialized){
            await auth.loginWithSocial(socialType);
        }
    }

    const loginWithLink = async(email)=>{
        if(initialized){
            await auth.loginWithLink(email);
        }
    }
    const isLoggedIn = async()=>{
        if(initialized){
            return await auth.isLoggedIn()
        }
    }
    const getAccounts = async()=>{
        if(initialized){
            return await auth.provider.request({method:"eth_accounts"});
        }
    }
    const logout = async()=>{
        if(initialized){
            return await auth.logout();
        }
    }
    return {
        initializeAuth,
        login,
        loginWithLink,
        isLoggedIn,
        getAccounts,
        logout,
        initialized,
    };
}
export default useArcanaAuth;
