import React, { useState, useEffect } from 'react';
import Styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css'

const Form = ({ onSubmit }) => {

  const [isTriggered, setIsTriggered] = useState(false);
  const [next, setNext] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors, isValidating },
  } = useForm();

  const onBack = () => {
    setNext(false);
  }

  const onNext = () => {
    setIsTriggered(true);
    trigger(["restaurantPhone", "datetime", "partyNum", "language", "planB"]);
  }

  useEffect(() => {
    if (isTriggered 
      && !isValidating
      && !errors?.restaurantPhone
      && !errors?.datetime
      && !errors?.partyNum
      && !errors?.language
      && !errors?.planB) {
        setIsTriggered(false);
        setNext(true);
      }
  }, [isValidating, errors, isTriggered]);

  return (
    <>
      <form id="form" onSubmit={handleSubmit(onSubmit)}></form>
      {!next && (
        <>
          <p className={Styles.title}>Okay, first tell us about the reservation.</p>

          <div className={Styles.inputWrapper}>
            <label htmlFor="rphone">Phone number of restaurant (with country code)</label>
            {/* <input form="form" placeholder="+8112345678" id="rphone" {...register("restaurantPhone", { required: "This is required" })} /> */}
            <PhoneInputWithCountry
              international
              id="rphone"
              name="restaurantPhone"
              defaultCountry="JP"
              control={control}
              rules={{ required: "This is required" }} />
            <p className={Styles.error}>{errors?.restaurantPhone?.message}</p>
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="datetime">Date of reservation (in the restaurant's local time)</label>
            <input form="form" id="datetime" type="datetime-local" {...register("datetime", { required: "This is required" })} />
            <p className={Styles.error}>{errors?.datetime?.message}</p>
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="pNum">Number of party</label>
            <select form="form" id="pNum" {...register("partyNum", { required: "This is required" })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <p className={Styles.error}>{errors?.partyNum?.message}</p>
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="lang">Language of the call</label>
            <select form="form" id="lang" {...register("language", { required: "This is required" })}>
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="zh">Chinese (Mandarin, Simplified)</option>
              <option value="ko">Korean</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
            <p className={Styles.error}>{errors?.language?.message}</p>
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="planB">If the slot is unavailable...</label>
            <select form="form" id="planB" {...register("planB", { required: "This is required" })}>
              <option value="1">Give up the reservation</option>
              <option value="2">Check for slots 1 hour before or after the desired slot</option>
            </select>
            <p className={Styles.error}>{errors?.planB?.message}</p>
          </div>


          <button className={Styles.next} onClick={onNext}>Next</button>
        </>
      )}
      {next && (
        <>
          <p className={Styles.title}>Tell us a little bit about you as well to inform the restaurant.</p>

          <div className={Styles.twoColumn}>
            <div className={Styles.inputWrapper}>
              <label htmlFor="fname">First name</label>
              <input form="form" placeholder="John" id="fname" {...register("firstName", { required: "This is required" })} />
              <p className={Styles.error}>{errors?.firstName?.message}</p>
            </div>

            <div className={Styles.inputWrapper}>
              <label htmlFor="lname">Last name</label>
              <input form="form" placeholder="Doe" id="lname" {...register("lastName", { required: "This is required" })} />
              <p className={Styles.error}>{errors?.lastName?.message}</p>
            </div>
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="uphone">Your phone number</label>
            {/* <input form="form" placeholder="09012345678" id="uphone" {...register("userPhone", { required: "This is required" })} /> */}
            <PhoneInputWithCountry
              international
              id="uphone"
              name="userPhone"
              defaultCountry="JP"
              control={control}
              rules={{ required: "This is required" }} />
            <p className={Styles.error}>{errors?.userPhone?.message}</p>
          </div>

          <div className={Styles.termsWrapper}>
              <input form="form" type="checkbox" id="terms" {...register("terms", { required: "This is required" })} />
              <label htmlFor="terms">I understand that this is a GenAI experiment and that I am solely responsible for any trouble or damage caused by this AI reservation process 😉</label>
              <p className={Styles.error}>{errors?.terms?.message}</p>
            </div>

          <input form="form" type="submit" value="Make the call" className={Styles.submit}/>
          <button className={Styles.back} onClick={onBack}>Back</button>
        </>
      )}
    </>
  )
};
export default Form;