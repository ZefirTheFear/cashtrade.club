import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";

import "./Hero.scss";

const Hero: React.FC = () => {
  const dispatch = useDispatch();

  const scrollToExchange = useCallback(() => {
    dispatch(scrollActions.scrollToExchange());
  }, [dispatch]);

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h4>4k group</h4>
          <p>Ваш надежный партнер в обменных операциях</p>
        </div>
      </div>
      <button className="hero__btn" onClick={scrollToExchange}>
        Оформить заявку
      </button>
    </section>
  );
};

export default Hero;
