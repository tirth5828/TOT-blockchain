import Boy from "./boy";
import Container from "./container";
import './homepage.css';
import Header from "../header/header";
// import { Fragment } from "react";

const HomePage = () => {
    // console.log(username);
    return (
        <section>
            <Header />
            <div className="home">
                <Boy classname="img" fade={true} />
                <Container className="home--content" />
            </div>
        </section>
    )
}
export default HomePage;