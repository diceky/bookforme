import React, { useState, useEffect } from 'react';
import Styles from "./Home.module.css";
import Form from "../components/Form";
import Call from "../components/Call";

const Home = () => {

  const [booking, setBooking] = useState({});
  const [callFlag, setCallFlag] = useState(false);
  const [callStatus, setCallStatus] = useState({});

  useEffect(() => {
    if (Object.keys(booking).length > 0) {

      const url = `${import.meta.env.VITE_SERVER_ENDOINT}/call`;

      const callApi = async () => {
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
              setCallFlag(true);
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

    const planB = data.planB === 1 ? "Give up the reservation" : "Check for slots 1 hour before or after the desired slot";

    setBooking({
      firstName: data.firstName,
      lastName: data.lastName,
      year: year,
      month: month,
      date: date,
      hour: hour,
      minute: minute,
      restaurantPhone: data.restaurantPhone,
      partyNum: data.partyNum,
      language: data.language,
      planB: planB,
    });
  };

  return (
    <div className={Styles.wrapper}>
      {!callFlag ? <Form onSubmit={onSubmit} /> : <Call booking={booking} callStatus={callStatus.status} callMessage={callStatus.message} callId={callStatus["call_id"]}/>}
    </div>
  )
}

export default Home;