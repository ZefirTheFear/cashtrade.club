import React, { useRef, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../Spinner/Spinner";
import Modal from "../Modal/Modal";
import { ReactComponent as SWWImg } from "../../assets/errorImgs/client-server-error.svg";
import { ReactComponent as SuccessImg } from "../../assets/success/success.svg";

import { RootState } from "../../store/store";
import * as scrollActions from "../../store/actions/scrollActions/scrollActionCreators";

import { scrollToNode } from "../../utils/ts/helperFunctions";

import "./Exchange.scss";

const Exchange: React.FC = () => {
  const dispatch = useDispatch();

  const exchangeSection = useRef<HTMLElement>(null!);
  const isMount = useRef(false);

  const scrollToExchange = useSelector((state: RootState) => state.scrollState.scrollToExchange);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);

  const [isSomethingWentWrong, setIsSomethingWentWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingDataSuccess, setIsSendingDataSuccess] = useState(false);

  const scrollToContacts = useCallback(() => {
    dispatch(scrollActions.scrollToContacts());
  }, [dispatch]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.name === "name") {
        setName(e.target.value);
      }
      if (e.target.name === "number") {
        setNumber(e.target.value);
      }
      if (e.target.name === "comment") {
        setComment(e.target.value);
      }
    },
    []
  );

  const onFocusInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setIsNameValid(true);
    } else {
      setIsNumberValid(true);
    }
  }, []);

  const sendData = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      let isFormValid = true;
      if (name.length === 0) {
        setIsNameValid(false);
        isFormValid = false;
      }
      if (number.length < 10) {
        setIsNumberValid(false);
        isFormValid = false;
      }
      if (!isFormValid) {
        return setIsLoading(false);
      }

      try {
        // const response = await fetch(
        //   `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=174294535&parse_mode=html&text=${encodeURI(
        //     `<u><b>4K GROUP</b></u>\n<i>имя:</i> <b>${name}</b>\n<i>номер:</i> <u><b>${number}</b></u>${
        //       comment.length > 0 ? `\n<i>комментарий:</i> <b>${comment}</b>` : ``
        //     }`
        //   )}`
        const response = await fetch(
          `https://api.telegram.org/bot957327615:AAH0MITHU3soRisXfcZZmnHSgI9RqoqBTdo/sendMessage?chat_id=448641137&parse_mode=html&text=${encodeURI(
            `<u><b>4K GROUP</b></u>\n<i>имя:</i> <b>${name}</b>\n<i>номер:</i> <u><b>${number}</b></u>${
              comment.length > 0 ? `\n<i>комментарий:</i> <b>${comment}</b>` : ``
            }`
          )}`
        );
        if (response.status !== 200) {
          setIsLoading(false);
          return setIsSomethingWentWrong(true);
        }
        setName("");
        setNumber("");
        setComment("");
        setIsLoading(false);
        setIsSendingDataSuccess(true);
      } catch (error) {
        setIsLoading(false);
        return setIsSomethingWentWrong(true);
      }
    },
    [name, number, comment]
  );

  const closeSWWModal = useCallback(() => {
    setIsSomethingWentWrong(false);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setIsSendingDataSuccess(false);
  }, []);

  useEffect(() => {
    if (isMount.current && exchangeSection.current) {
      scrollToNode(exchangeSection.current);
    }
    isMount.current = true;
  }, [scrollToExchange]);

  return (
    <>
      {isLoading && <Spinner />}
      {isSomethingWentWrong && (
        <Modal
          Img={SWWImg}
          closeModal={closeSWWModal}
          msg={"что-то пошло не так. попробуйте еще раз"}
        />
      )}
      {isSendingDataSuccess && (
        <Modal Img={SuccessImg} closeModal={closeSuccessModal} msg={"данные отправлены"} />
      )}
      <section className="exchange" ref={exchangeSection}>
        <div className="exchange__inner">
          <div className="exchange__desc">
            Для совершения обмена оставьте заявку и мы вам перезвоним. Или свяжитесь с нами по
            данным из&nbsp;
            <span className="exchange__contact-link" onClick={scrollToContacts}>
              контактов&nbsp;
            </span>
          </div>
          <form className="exchange__form" onSubmit={sendData}>
            <div className="exchange__required">* - обязательные поля</div>
            <div className="exchange__inputs">
              <div className="exchange__form-group">
                <input
                  type="text"
                  className={"exchange__input" + (isNameValid ? "" : " exchange__input_invalid")}
                  placeholder="имя*"
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={onChange}
                  onFocus={onFocusInput}
                />
                {isNameValid ? null : <small>надо как-то себя назвать</small>}
              </div>
              <div className="exchange__form-group">
                <input
                  type="tel"
                  className={"exchange__input" + (isNumberValid ? "" : " exchange__input_invalid")}
                  placeholder="телефон*"
                  autoComplete="off"
                  name="number"
                  value={number}
                  onChange={onChange}
                  onFocus={onFocusInput}
                />
                {isNumberValid ? null : <small>минимум 10 знаков</small>}
              </div>
            </div>
            <div className="exchange__comment">
              <textarea
                placeholder="Комментарий"
                name="comment"
                rows={3}
                value={comment}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="exchange__btn">
              отправить
            </button>
          </form>
          <p className="exchange__error">
            (если мы вам не перезваниваем, то, вероятно, вы ошиблись при указании номера. попробуйте
            еще раз)
          </p>
        </div>
      </section>
    </>
  );
};

export default Exchange;
