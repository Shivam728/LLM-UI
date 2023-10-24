import { useEffect, useState } from "react";
import Ai from "../assets/ai";

const ChatMessage = ({ message }) => {
    const [text, setText] = useState(null);

    useEffect(() => {
        if (typeof message === "string") {
            setText(message);
        } else {
            if (message.options) {
                setText(`${message.question} ${message.options.join(", ")}`);
            } else {
                setText(message.question)
            }
        }
    }, [message]);

    return (
        <div className={`chat-message chatai`}>
            <div className="chat-message-center">
                <div className={`avatar chatai`}>
                    <Ai />
                </div>
                <div className="message">{text}</div>
            </div>
        </div>
    );
};

export default ChatMessage;
