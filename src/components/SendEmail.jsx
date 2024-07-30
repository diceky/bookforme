import React, {useState} from 'react';
import Styles from "./SendEmail.module.css";

const SendEmail = ({summary, booking}) => {
  const [newEmail, setNewEmail] = useState("");
  const [showMessage, setShowMessage] = useState("");

  const handleNewMessage = (event) => {
    setNewEmail(event.target.value);
  };

  const handleSendMessage = () => {
    if (newEmail !== "") {
      const url = `${import.meta.env.VITE_SERVER_ENDOINT}/email`;

      const body={
        email: newEmail,
        summary: summary,
        partyNum: booking.partyNum,
        date: `${booking.year}-${booking.month}-${booking.date} ${booking.hour}:${booking.minute===0 ? "00" : booking.minute}`,
        restaurantPhone: booking.restaurantPhone,
        firstName: booking.firstName,
        lastName: booking.lastName,
      };

      const callApi = async () => {
        
        try {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              //console.log(response);
              setShowMessage("Email sent ✅ Check your inbox.");
            });
        } catch (error) {
          console.error(error);
          setShowMessage(error);
        }
      };

      callApi();
      setShowMessage(true);
      setNewEmail("");
    }
  };

  return (
    <div className={Styles.wrapper}>
      <p className={Styles.title}>We can send you a summary of this call to your email:</p>
      <input className={Styles.input} placeholder="Your email address" value={newEmail} onChange={handleNewMessage}/>
      <button onClick={handleSendMessage} className={Styles.button}>Send email</button>
      {showMessage && <p className={Styles.message}>{showMessage}</p>}
    </div>
  )
};
export default SendEmail;