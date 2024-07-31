import React, { useState, useEffect } from 'react';
import Styles from "./Home.module.css";
import Form from "../components/Form";
import Call from "../components/Call";
import Welcome from "../components/Welcome";

const Home = () => {

  const [welcome, setWelcome] = useState(true);
  const [booking, setBooking] = useState({});
  const [callFlag, setCallFlag] = useState(false);
  const [callStatus, setCallStatus] = useState({});

  useEffect(() => {
    if (Object.keys(booking).length > 0) {

      const url = `${import.meta.env.VITE_SERVER_ENDOINT}/call`;

      const callApi = async () => {

        setCallFlag(true);
        
        try {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              setCallStatus(response);
            });
        } catch (error) {
          console.error(error);
        }
      };
      callApi();
    }
  }, [booking]);

  const onSubmit = (data) => {
    const datetime = new Date(data.datetime);
    const year = datetime.getFullYear();
    const month = datetime.getMonth();
    const date = datetime.getDate();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();

    setBooking({
      firstName: data.firstName,
      lastName: data.lastName,
      year: year,
      month: month + 1,
      date: date,
      hour: hour,
      minute: minute,
      restaurantPhone: data.restaurantPhone,
      partyNum: data.partyNum,
      language: data.language,
      planB: data.planB,
      userPhone: data.userPhone,
    });
  };

  const onProceed = () => {
    setWelcome(false);
  }

  const onFinish = () => {
    setWelcome(true);
    setCallFlag(false);
  }

  return (
    <div className={Styles.wrapper}>
      {welcome && <Welcome onButton={onProceed}/>}
      {!welcome && !callFlag && <Form onSubmit={onSubmit}/>}
      {!welcome && callFlag && <Call booking={booking} callStatus={callStatus.status} callMessage={callStatus.message} callId={callStatus["call_id"]} onFinish={onFinish}/>}
    </div>
  )
}

export default Home;