import "./App.css";
// import Header from "./components/header/header";
import HomePage from "./components/body/homepage";
import SignupForm from "./components/signUp/SignupForm";
import LoginForm from "./components/signIn/login";
import Profile from "./components/profile/profile";
import CompanyLogin from "./components/company/companylogin";
import React, { Fragment } from "react";
import CompanyProfile from "./components/company/companyprofile";
import Transactions from "./components/tansactions/transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Information from "./components/information/information";
function App() {
  const username = "";
  return (
    <Fragment>
      <body className="mainbody">
        <Router>
          <Routes>
            <Route
              path="/login"
              caseSensitive={false}
              element={<LoginForm />}
            />
            <Route
              path="/register"
              caseSensitive={false}
              element={<SignupForm />}
            />
            <Route
              path="/profile"
              caseSensitive={false}
              element={<Profile />}
            />
            <Route
              path="/company-login"
              caseSensitive={false}
              element={<CompanyLogin />}
            />
            <Route
              path="/company-profile"
              caseSensitive={false}
              element={<CompanyProfile />}
            />
            <Route
              path="/transactions"
              caseSensitive={false}
              element={<Transactions />}
            />
            <Route path="/home" caseSensitive={false} element={<HomePage />} />
            <Route
              exact
              path="/"
              caseSensitive={false}
              element={<Information />}
            />
          </Routes>
        </Router>
      </body>
    </Fragment>
  );
}
export default App;
