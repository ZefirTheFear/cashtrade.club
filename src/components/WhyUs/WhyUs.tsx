import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import { ReactComponent as ComfortImg } from "../../assets/imgs/whyUs/comfort.svg";
import { ReactComponent as FlexibilityImg } from "../../assets/imgs/whyUs/flexibility.svg";
import { ReactComponent as SecurityImg } from "../../assets/imgs/whyUs/shield.svg";

import { RootState } from "../../store/store";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import "./WhyUs.scss";

const WhyUs: React.FC = () => {
  const whyUsSection = useRef<HTMLElement>(null!);
  const isMount = useRef(false);

  const scrollToWhyUs = useSelector((state: RootState) => state.scrollState.scrollToWhyUs);

  const cardsData = useMemo(() => {
    return [
      {
        title: "Комфорт",
        img: <ComfortImg />,
        desc:
          "С нами у вас есть возможность забрать деньги в любом областном центре Украины или же получить их курьером по Киеву"
      },
      {
        title: "Гибкость",
        img: <FlexibilityImg />,
        desc:
          "Наш опыт и знания, а также персональный подход дают нам возможность предложить наиболее выгодные условия каждому клиенту"
      },
      {
        title: "Безопасность",
        img: <SecurityImg />,
        desc:
          "Успешное проведение операции - наша приоритетная задача. Следовательно, все сделки проводятся при личной встрече в одном из наших офисов"
      }
    ];
  }, []);

  useEffect(() => {
    if (isMount.current && whyUsSection.current) {
      scrollToNode(whyUsSection.current);
    }
    isMount.current = true;
  }, [scrollToWhyUs]);

  return (
    <section className="why-us" ref={whyUsSection}>
      <div className="why-us__inner">
        <h5 className="why-us__heading">Получите максимум от своих активов</h5>
        <p className="why-us__subheading">
          Наша компания является трейдером с безупречной репутацией. Мы предоставляем прозрачные
          условия и всегда находим компромисс с клиентом для достижения общего успеха.
        </p>
        <p className="why-us__subheading">
          Вот лишь несколько причин, почему вы должны выбрать 4k group
        </p>
        <div className="why-us__cards">
          {cardsData.map((card) => (
            <div key={card.title} className="why-us__card">
              <h6 className="why-us__card-title">{card.title}</h6>
              <div className="why-us__card-img">{card.img}</div>
              <p className="why-us__card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
