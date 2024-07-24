import React, {useEffect, useState} from 'react';
import Styles from "./Call.module.css";

const Call = ({booking, callStatus, callMessage, callId}) => {

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
            Making call to {booking.restaurantPhone} ... 📞
        </p>
        <p className={Styles.updates}>
            Call Message: {callMessage}<br/>
            Call ID: {callId}
        </p>
        {callStatus==="success" && 
            <>
                <p className={Styles.updates}>
                    We will update you once the call has ended so stay there 🤙
                </p>
                <div className={Styles.divider}></div>
            </>
        }
        {summary && 
                <p className={Styles.updates}>
                    {summary}
                </p>
        }
        {transcript && transcript.map((value, index) => <p className={Styles.updates}>{JSON.stringify(value, null, 2)}</p>)}
    </div>
  )
};
export default Call;