// import React from 'react'
// import './Hero.css'
// import {HiLocationMarker} from 'react-icons/hi'
// import CountUp from "react-countup"
// const Hero = () => {
//   return (
//       <section className="hero-wrapper">
//           <div className="paddings innerWidth flexCenter hero-container ">
//               {/* Leftside */}
//               <div className="flexColStart hero-left">
//                   <div className="hero-title">
//                       <div className="orange-circle"/>
//                       <h1>
//                           Discover <br />Plots
//                 That Suits
//                       <br/>Your Need
//                       </h1>
//                   </div>
//                   <div className="flexColStart hero-description">
//                       <span className='secondaryText'>
//                           Find a variety of properties at best prices
//                       </span>
//                       <span className='secondaryText'>
//                           Forget all difficulties in finding suitable plot for you!
//                       </span>
//                       <h3 className='secondaryText'>Trusted Platform Hamara Hyderabad</h3>
//                   </div>
//                   {/* Statistics to include(including styling) */}
//                   {/* <div className="flexColStart stats"> */}
//                       {/* <div className="flexColStart stat">
//                       <span><CountUp start={1000} end={9000} duration={4} />
//                           <span>+</span>
//                       </span>
//                       <span>Premium Product</span>
//                   </div> */}
//                   {/* <div className="flexColStart stat">
//                        <span><CountUp start={1950} end={2000} duration={4} />
//                           <span>+</span>
//                       </span>
//                       <span><b>Happy Customers</b></span>
//                   </div> */}
//                   {/* <div className="flexColStart stat">
//                        <span><CountUp  end={28}  />
//                           <span>+</span>
//                       </span>
//                       <span>Award Winnings</span>
//                   </div> */}
//                   {/* </div> */}
                  
//                   {/* SearchbartobeinHomepage */}
//                   {/* 
//                   </div> */}
//               </div>
//               {/* Right side */}
//               <div className="hero-right">
//                   <div className="image-container">
//                       <img src="./charminar.jpg" alt="bg"/>
//                   </div>
//               </div>
//           </div>
//    </section>
//   )
// }

// export default Hero
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            >
              Discover <br />
              Most Suitable
              <br /> Property
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Find a variety of plots that suit you </span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>

          {/* <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" />
            <button className="button">Search</button>
          </div> */}

<div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={4800} end={5000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Plots Sold/Bought</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1000} end={1500} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customer</span>
            </div>

            {/* <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Awards Winning</span>
            </div>
          </div> */}
        </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
              
            }}
            className="image-container"
          >
            <img src="./charminar.jpg" alt="houses" />
          </motion.div>
        </div>
              </div>
    </section>
  );
};

export default Hero;