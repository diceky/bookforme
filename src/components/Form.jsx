import React from 'react';
import Styles from "./Form.module.css";
import { useForm } from "react-hook-form";

const Form = ({onSubmit}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

        <div className={Styles.twoColumn}>
          <div className={Styles.inputWrapper}>
            <label htmlFor="fname">First name</label>
            <input placeholder="John" id="fname" {...register("firstName", { required: true })} />
          </div>

          <div className={Styles.inputWrapper}>
            <label htmlFor="lname">Last name</label>
            <input placeholder="Doe" id="lname" {...register("lastName", { required: true })} />
          </div>
        </div>

        <div className={Styles.inputWrapper}>
          <label htmlFor="datetime">Date of reservation (in the restaurant's local time)</label>
          <input id="datetime" type="datetime-local" step="1800" {...register("datetime", { required: true })} />
        </div>

        <div className={Styles.inputWrapper}>
          <label htmlFor="rphone">Phone number of restaurant (with country code please!)</label>
          <input placeholder="+8112345678" id="rphone" {...register("restaurantPhone", { required: true })} />
        </div>

        <div className={Styles.inputWrapper}>
          <label htmlFor="pNum">Number of party</label>
          <select id="pNum" {...register("partyNum", { required: true })}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div className={Styles.inputWrapper}>
          <label htmlFor="lang">Language of the call</label>
          <select id="lang" {...register("language", { required: true })}>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese (Mandarin, Simplified)</option>
            <option value="ko">Korean</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div className={Styles.inputWrapper}>
          <label htmlFor="planB">If the slot is unavailable...</label>
          <select id="planB" {...register("planB", { required: true })}>
            <option value="1">Give up the reservation</option>
            <option value="2">Check for slots 1 hour before or after the desired slot</option>
            <option value="3">Other</option>
          </select>
        </div>


        <input type="submit" value="Make the call"/>
      </form>
  )
};
export default Form;