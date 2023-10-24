import "./home.css";
import { useState } from "react";
import ChatMessage from "../../components/chatMessage";
import questions from "../../utils/questions";
import Loader from "../../components/Loader";
import {
  PDFDownloadLink,
  Text,
  Document,
  View,
  Page,
} from "@react-pdf/renderer";

function Frontend() {
  const [topic, setTopic] = useState("");
  const [exp, setExp] = useState("");
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("called");
    setLoading(true);

    if (input && input.length) {
      setChatLog((log) => [...log, input]);
    }

    //fetch response from api
    setAnswer("");
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question:
            input.length !== 0
              ? input
              : `What is the learning path for ${topic} as I have experience of ${exp} years?`,
        }),
      });

      const data = await response.json();
      if (input && input.length && data.length) {
        setChatLog((log) => [...log, data]);
      } else {
        setAnswer(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader isLoading={loading} />
      <div className="container">
        <aside className="sidemenu">
          <section className="chatbox">
            <form onSubmit={handleSubmit}>
              <div className="chat-log">
                <ChatMessage message={questions.topic} />
              </div>
              <input
                value={topic}
                onChange={(e) => {
                  setInput("");
                  setTopic(e.target.value);
                }}
                rows="1"
                className="chat-input-textarea"
                required
              />
              <div className="chat-log">
                <ChatMessage message={questions.experience} />
              </div>
              <input
                value={exp}
                onChange={(e) => {
                  setInput("");
                  setExp(e.target.value);
                }}
                rows="1"
                className="chat-input-textarea"
                required
              />
              <div>
                <button type="submit">Get Answer</button>
                {answer && (
                  <PDFDownloadLink
                    document={
                      <Document>
                        <Page>
                          <View>
                            <Text>{answer}</Text>
                          </View>
                        </Page>
                      </Document>
                    }
                    fileName="answer.pdf"
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "#4a4a4a",
                      backgroundColor: "#f2f2f2",
                      border: "1px solid #4a4a4a",
                    }}
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download Pdf"
                    }
                  </PDFDownloadLink>
                )}
              </div>
            </form>
            {answer.length !== 0 && (
              <div className="chat-log">
                <ChatMessage message={answer} />
              </div>
            )}
          </section>
        </aside>
        <section>
          {chatLog.map((msg, index) => {
            return <ChatMessage message={msg} key={msg + index} />;
          })}
          <form
            style={{ position: "fixed", bottom: 0, width: "100%" }}
            onSubmit={handleSubmit}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="1"
              className="chat-input-textarea"
            />
          </form>
        </section>
      </div>
    </>
  );
}

export default Frontend;
