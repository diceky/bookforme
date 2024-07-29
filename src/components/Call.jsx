import React, {useEffect, useState} from 'react';
import Styles from "./Call.module.css";
import BeatLoader from "react-spinners/BeatLoader";

const Call = ({booking, callStatus, callMessage, callId, onFinish}) => {

    const [summary, setSummary] = useState("");
    const [transcript, setTranscript] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_ENDOINT}/events/${callId}`);

        eventSource.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            console.log('Message from server ', receivedData);
            setSummary(receivedData.summary);
            setTranscript(receivedData.transcripts);
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
            Setting up the call to {booking.restaurantPhone} ... 📞
        </p>
        <p className={Styles.updates}>
            Call status: {callMessage ? callMessage : "waiting..."}<br/>
            Call ID: {callId ? callId : "waiting..."}
        </p>
        {callStatus==="success" && 
            <>
                <p className={Styles.updates}>
                    The call is being made right now 🤙 We will update you when it ends so <b>don't refresh the browser!</b> (calls typically take 3-5 minutes)
                </p>
                <div className={Styles.divider}></div>
            </>
        }
        {!summary && 
            <BeatLoader
            size={20}
            aria-label="Loading Spinner"
          />
    
        }
        {summary && 
                <>
                    <p className={Styles.title}>Here's the result of the call 👇</p>
                    <p className={Styles.summary}>{summary}</p>
                </>
        }
        {transcript && transcript.map((value, index) => <p className={Styles.updates} key={index}>{JSON.stringify(value, null, 2)}</p>)}
        {summary && <p className={Styles.end}>THE END 👋</p>}
        {summary && <button className={Styles.back} onClick={onFinish}>Back to top</button>}
    </div>
  )
};
export default Call;