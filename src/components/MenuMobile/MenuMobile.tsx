import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import navItemsFn from "../../utils/ts/navItems";

import { RootState } from "../../store/store";

import "./MenuMobile.scss";

const MenuMobile: React.FC = () => {
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state: RootState) => state.mobileMenuState.isOpen);

  const navElement = useRef<HTMLElement>(null!);

  const navItems = useMemo(() => {
    return navItemsFn(dispatch);
  }, [dispatch]);

  const setNavHeight = useCallback(() => {
    const navItemss = Array.from(navElement.current.children);
    let vh = window.innerHeight * 0.01;
    for (const item of navItemss) {
      (item as HTMLElement).style.height = `${(100 * vh - 60) / 5}px`;
    }
  }, []);

  useEffect(() => {
    setNavHeight();
    window.addEventListener("resize", setNavHeight);
  }, [setNavHeight]);

  return (
    <nav className="menu-mobile" ref={navElement}>
      {navItems.map((item) => (
        <div
          className={"menu-mobile__item" + (isMobileMenuOpen ? " menu-mobile__item_open" : "")}
          onClick={item.onClick}
          key={item.title}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
};

export default MenuMobile;
