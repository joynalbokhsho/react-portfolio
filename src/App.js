import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import Footer from "./components/footer/Footer";
import Lanyard from "./components/lanyard/Lanyard";
import AnimatedCursor from "react-animated-cursor";


const App = () => {

  return (
    <>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        hasBlendMode={true}
        innerStyle={{
          backgroundColor: "#fff",
        }}
        outerStyle={{
          border: "3px solid #fff",
        }}
      />
      <Header  />
      <Nav />
      <About  />
      <Lanyard />
      <Experience  />
      <Contact  />
      <Footer />
    </>
  );
}

export default App;
