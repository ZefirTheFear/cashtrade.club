import React, { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

import Header from "./components/Header/Header";
import MenuMobile from "./components/MenuMobile/MenuMobile";
import Hero from "./components/Hero/Hero";
import WhyUs from "./components/WhyUs/WhyUs";
import Calculator from "./components/Calculator/Calculator";
import Exchange from "./components/Exchange/Exchange";
import Contacts from "./components/Contacts/Contacts";

import "./App.scss";

const App: React.FC = () => {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <div className="app">
      <Header />
      <MenuMobile />
      <Hero />
      <WhyUs />
      <Calculator />
      <Exchange />
      <Contacts />
    </div>
  );
};

export default App;
