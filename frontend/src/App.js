import "./App.css";
// import Header from "./components/header/header";
import HomePage from "./components/body/homepage";
import SignupForm from "./components/signUp/SignupForm";
import LoginForm from "./components/signIn/login";
import Profile from "./components/profile/profile";
import CompanyLogin from "./components/company/companylogin";
import React, { Fragment, useEffect } from "react";
import CompanyProfile from "./components/company/companyprofile";
import Transactions from "./components/tansactions/transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Networks from './networks';
import AuthService from './arcanaAuth';

function App() {
	const username='';
	const auth =  AuthService.getInstance()

	useEffect(() =>{
		(async ()=> {
				await auth.init()
				const isLoggedIn = await auth.isLoggedIn()
				if(isLoggedIn
					 && auth.provider.chainId !== Networks.mantle_testnet.chainId){
					await AuthService.addNetwork(Networks.mantle_testnet);
					await AuthService.switchNetwork(Networks.mantle_testnet);
				}
		})();
	}, []);
	
	return (
		<Fragment>
			<body className="mainbody">
			<Router>
        		<Routes>
					<Route path="/login" caseSensitive={false} element={<LoginForm/>} />
					<Route path="/register" caseSensitive={false} 
					element={<SignupForm />} />
					<Route path="/profile" caseSensitive={false} element={<Profile/>} />
					<Route path="/company-login" caseSensitive={false} element={<CompanyLogin/>} />
					<Route path="/company-profile" caseSensitive={false} element={<CompanyProfile/>} />
					<Route path="/transactions" caseSensitive={false} element={<Transactions/>} />
					<Route exact path="/" caseSensitive={false} element={<HomePage/>} />
				</Routes>
			</Router>
			</body>
		</Fragment>
	);
}
export default App;
