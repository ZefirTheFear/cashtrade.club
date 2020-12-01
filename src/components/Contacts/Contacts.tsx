import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import Map from "../Map/Map";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaClock } from "react-icons/fa";

import { RootState } from "../../store/store";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import { ReactComponent as Logo } from "../../assets/logo/logo-full.svg";

import "./Contacts.scss";

const Contacts: React.FC = () => {
  const contactsSection = useRef<HTMLElement>(null!);
  const isMount = useRef(false);

  const scrollToContacts = useSelector((state: RootState) => state.scrollState.scrollToContacts);

  const clickUnit = useCallback((link: string) => {
    window.open(link);
  }, []);

  const contacts = useMemo(() => {
    return [
      {
        title: "address",
        icon: <FaMapMarkerAlt />,
        desc: "Киев, ул. Симона Петлюры, 23"
      },
      {
        title: "phone",
        icon: <FaPhone />,
        desc: "(063) 123-10-23",
        link: "tel:+380631231023",
        onClick: () => null
      },
      // {
      //   title: "message",
      //   icon: <MdMessage />,
      //   desc: "t.me/tele-message",
      //   onClick: () => clickUnit("https://t.me/tele-message")
      // },
      // {
      //   title: "telegram",
      //   icon: <FaTelegramPlane />,
      //   desc: "t.me/tele-channel",
      //   onClick: () => clickUnit("https://t.me/tele-channel")
      // },
      {
        title: "schedule",
        icon: <FaClock />,
        desc: "Пн-Пт: 09-21, Сб-ВС: 10-20"
      }
    ];
  }, []);

  useEffect(() => {
    if (isMount.current && contactsSection.current) {
      scrollToNode(contactsSection.current);
    }
    isMount.current = true;
  }, [scrollToContacts]);

  return (
    <section className="contacts" ref={contactsSection}>
      <div className="contacts__inner">
        <div className="contacts__info">
          <div className="contacts__logo">
            <Logo />
          </div>
          <div>
            {contacts.map((item) => {
              if (item.title === "phone") {
                return (
                  <a
                    href={item.link}
                    className="contacts__info-unit contacts__info-unit_clickable"
                    key={item.title}
                  >
                    <span className="contacts__info-unit-icon">{item.icon}</span>
                    <span key={item.title}>{item.desc}</span>
                  </a>
                );
              }
              return (
                <div
                  className={
                    "contacts__info-unit" +
                    (item.onClick || item.link ? " contacts__info-unit_clickable" : "")
                  }
                  key={item.title}
                  onClick={item.onClick ?? undefined}
                >
                  <span className="contacts__info-unit-icon">{item.icon}</span>
                  <span key={item.title}>{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="contacts__map">
          <Map />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
