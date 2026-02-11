import React from 'react'
import Plots from "../components/Plots/Plots";
import Contact from "../components/Contact/ContactUs";
import GetStarted from "../components/GetStarted/GetStarted";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
const Website = () => {
    return (
        <div className="App">
            <div>
            <div className="white-gradient" />
                {/* <Header /> */}
                <Hero />
        
            </div>
            <Plots/>
            <Contact />
            <GetStarted />
            {/* <Footer /> */}
      
        </div>
    );
}

export default Website
