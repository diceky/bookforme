import React, { useEffect, useState } from 'react';
import Styles from "./Call.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import SendEmail from "./SendEmail";

const Call = ({ booking, callStatus, callMessage, callId, onFinish }) => {

    const [summary, setSummary] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [isStopping, setIsStopping] = useState(false);

    useEffect(() => {
        if (!callId) return;
        
        const eventSource = new EventSource(`${import.meta.env.VITE_SERVER_ENDOINT}/events/${callId}`);

        eventSource.onmessage = (event) => {

            try {
                const receivedData = JSON.parse(event.data);
                //console.log('Parsed message from server:', receivedData);

                if (receivedData.type === "webhook" && receivedData.data) {
                    setSummary(receivedData.data.summary);
                    setIsSuccessful(receivedData.data.analysis["is_reservation_successful"]);
                    setIsComplete(receivedData.data.completed);

                } else if (receivedData.type === "event_stream") {
                // loop through receivedData.event_stream_data and add to conversation if "category" is "call" and "level" is "info"
                    const newConversation = [...conversation];
                    if (Array.isArray(receivedData.data.event_stream_data)) {
                        receivedData.data.event_stream_data.forEach((item) => {
                            //console.log('Processing item:', item);
                            if (item.category === "call" && item.level === "info") {
                                if (!newConversation[item.id]) {
                                    newConversation[item.id] = [];
                                }
                                let sender = "default";
                                if(item.message.includes("Agent speech")) sender = "agent";
                                else if (item.message.includes("user speech")) sender = "receiver";
                                newConversation[item.id].push({
                                    sender:sender,
                                    content:item.message
                            });
                            }
                        });
                        setConversation(newConversation);
                    }
                }
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                console.error('Raw data that failed to parse:', event.data);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            console.error('EventSource readyState:', eventSource.readyState);
        };

        return () => {
            eventSource.close();
        };
    }, [callId]);

    const onStop = async () => {
        setIsStopping(true);

        const url = `${import.meta.env.VITE_SERVER_ENDOINT}/stop/${callId}`;

        try {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                console.log(response);
                if (response.status === "success") {
                    setIsComplete(true);
                } else {
                    console.error('Error stopping the call:', response.message);
                }
            });
        } catch (error) {
          console.error(error);
        }
    }

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
                        The call is being made right now 🤙 We will update you when it ends so <b>don't refresh the browser!</b> (calls typically take 2-3 minutes)
                    </p>
                    <div className={Styles.divider}></div>
                    <p className={Styles.title}>Follow the conversation in real time👇</p>
                    <div className={Styles.conversationWrapper}>
                        {Object.values(conversation).flat().filter(item => item.sender !== "default").map((item, index) => (
                            <p className={item.sender === "agent" ? Styles.agent : Styles.receiver} key={index}>{item.content}</p>
                        ))}
                    </div>
                    {!isComplete &&
                        <>
                            <BeatLoader
                                size={20}
                                aria-label="Loading Spinner"
                            />
                            <button className={Styles.back} onClick={onStop}>{isStopping ? "Stopping..." : "Stop call"}</button>
                        </>
                    }
                    {isComplete && !summary && 
                        <>
                            <div className={Styles.divider}></div>
                            <p className={Styles.title}>{isStopping ? "You have cancelled the call 🛑": "It seems the restaurant did not pick up the call. Please try again 🤞"}</p>
                            <p className={Styles.end}>THE END 👋</p>
                            <button className={Styles.back} onClick={onFinish}>Back to top</button>
                        </>
                    }
                    {isComplete && summary &&
                        <>
                            <div className={Styles.divider}></div>
                            <p className={Styles.title}>{isSuccessful ? "Congrats, the reservation was successful ✅" : "Sorry, we couldn't get you a table 🚫"}</p>
                            <p className={Styles.important}>{summary}</p>
                            <p className={Styles.end}>THE END 👋</p>
                            <div className={Styles.divider}></div>
                            <SendEmail summary={summary} booking={booking}/>
                            <div className={Styles.divider}></div>
                            <p className={Styles.title}>If you liked this app, please support us by buying us coffee 👇</p>
                            <a className={Styles.coffee} href="https://www.buymeacoffee.com/duhhhinc" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" /></a>
                            <button className={Styles.back} onClick={onFinish}>Back to top</button>
                        </>
                    }
                </>
            }
        </div>
    )
};
export default Call;