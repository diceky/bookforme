import React, { useEffect, useState } from 'react';
import Styles from "./Call.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import SendEmail from "./SendEmail";

const Call = ({ booking, callStatus, callMessage, callId, onFinish }) => {

    const [summary, setSummary] = useState("");
    const [transcript, setTranscript] = useState([]);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_ENDOINT}/events/${callId}`);

        eventSource.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            console.log('Message from server ', receivedData);
            setSummary(receivedData.summary);
            setTranscript(receivedData.transcripts);
            setIsSuccessful(receivedData.analysis["is_reservation_successful"]);
            setIsComplete(receivedData.completed);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
        };

        return () => {
            eventSource.close();
        };
    }, [callId]);

    return (
        <div className={Styles.wrapper}>
            <p className={Styles.updates}>
                Hey {booking.firstName} 🚀 Let's get you a table for {booking.partyNum} people on {booking.year}-{booking.month}-{booking.date} {booking.hour}:{booking.minute===0 ? "00" : booking.minute}.
            </p>
            <p className={Styles.updates}>
                Setting up the call to {booking.restaurantPhone} ... 📞
            </p>
            <p className={Styles.updates}>
                Call status: {callMessage ? callMessage : "waiting..."}<br />
                Call ID: {callId ? callId : "waiting..."}
            </p>
            {!callStatus && 
                <BeatLoader
                size={20}
                aria-label="Loading Spinner"
            />
            }
            {callStatus === "error" && 
                <p className={Styles.end}>Sorry, there was an error in making the call. Please try again 🤳</p>
            }
            {callStatus === "success" &&
                <>
                    <p className={Styles.important}>
                        The call is being made right now 🤙 We will update you when it ends so <b>don't refresh the browser!</b> (calls typically take 3-5 minutes)
                    </p>
                    <div className={Styles.divider}></div>
                    {!isComplete &&
                        <BeatLoader
                            size={20}
                            aria-label="Loading Spinner"
                        />
                    }
                    {isComplete && !summary && 
                        <>
                            <p className={Styles.title}>It seems the restaurant did not pick up the call. Please try again 🤞</p>
                            <p className={Styles.end}>THE END 👋</p>
                            <button className={Styles.back} onClick={onFinish}>Back to top</button>
                        </>
                    }
                    {isComplete && summary &&
                        <>
                            <p className={Styles.title}>{isSuccessful ? "Congrats, the reservation was successful ✅" : "Sorry, we couldn't get you a table 🚫"}</p>
                            <p className={Styles.summary}>{summary}</p>
                            {transcript && transcript.map((value, index) => <p className={Styles.updates} key={index}>{JSON.stringify(value, null, 2)}</p>)}
                            <p className={Styles.end}>THE END 👋</p>
                            <div className={Styles.divider}></div>
                            <SendEmail summary={summary} booking={booking}/>
                            <button className={Styles.back} onClick={onFinish}>Back to top</button>
                        </>
                    }
                </>
            }
        </div>
    )
};
export default Call;