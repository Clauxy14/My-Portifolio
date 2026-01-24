import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Chatbot.css";

const responses = {
  hello: "Hello! How can I help you today?",
  portfolio: "Check out my portfolio section to see my latest projects!",
  skills: "I specialize in React, TypeScript, and modern web development.",
  contact: "Feel free to reach out via the contact form!",
  default: "That's interesting! Tell me more.",
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm a simple chatbot. Ask me about the portfolio!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);

      const response = getResponse(input.toLowerCase());
      const botMessage = { text: response, sender: "bot" };
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, 500);

      setInput("");
    }
  };

  const getResponse = (message: string) => {
    if (message.includes("hello") || message.includes("hi"))
      return responses.hello;
    if (message.includes("portfolio")) return responses.portfolio;
    if (message.includes("skills") || message.includes("tech"))
      return responses.skills;
    if (message.includes("contact")) return responses.contact;
    return responses.default;
  };

  return (
    <>
      <Header />
      <main className="chatbot">
        <div className="container">
          <h1>Chat with Me</h1>
          <div className="chat-window">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Chatbot;
