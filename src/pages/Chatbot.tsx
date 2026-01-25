import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Chatbot.css";

// AI-like response templates and data
const responseTemplates = {
  greetings: {
    patterns: [
      "Hello! I'm excited to chat with you about {topic}. How can I help?",
      "Hi there! {greeting_detail} What brings you here today?",
      "Hey! {personality} Let's talk about {topic} or anything else on your mind!",
    ],
    topics: ["web development", "my portfolio", "coding projects", "tech"],
    details: [
      "Nice to meet you!",
      "Welcome to my portfolio!",
      "I'm here to help!",
    ],
    personality: [
      "I'm passionate about creating amazing web experiences",
      "I love building interactive websites",
      "I'm always excited about new tech",
    ],
  },
  portfolio: {
    patterns: [
      "My portfolio showcases {project_type} built with {tech}. {call_to_action}",
      "I've created {number} projects including {examples}. {question}",
      "{enthusiasm} Check out my latest work in {area}!",
    ],
    project_types: [
      "modern web applications",
      "interactive portfolios",
      "responsive designs",
    ],
    tech: ["React and TypeScript", "cutting-edge CSS", "modern frameworks"],
    call_to_action: [
      "Want to see them?",
      "Take a look!",
      "I'd love to show you!",
    ],
    examples: ["e-commerce sites", "data visualizations", "mobile apps"],
    number: ["several", "multiple", "many"],
    enthusiasm: [
      "I'm really proud of",
      "I'm excited about",
      "I love showing off",
    ],
    area: ["front-end development", "UI/UX design", "web animations"],
    question: [
      "Which one interests you most?",
      "What type of project are you looking for?",
      "Anything specific you'd like to know?",
    ],
  },
  skills: {
    patterns: [
      "I specialize in {primary_skill} and have experience with {secondary_skills}. {learning}",
      "My expertise includes {tech_list}, and I'm always {growth_mindset}.",
      "{strength} in {area}, with a focus on {specialization}.",
    ],
    primary_skill: [
      "React development",
      "TypeScript programming",
      "modern web technologies",
    ],
    secondary_skills: [
      "CSS animations",
      "responsive design",
      "performance optimization",
    ],
    tech_list: [
      "React, TypeScript, and Node.js",
      "front-end frameworks and tools",
      "web development technologies",
    ],
    learning: [
      "learning new frameworks",
      "exploring emerging technologies",
      "staying up-to-date with trends",
    ],
    growth_mindset: [
      "learning something new",
      "expanding my skillset",
      "growing as a developer",
    ],
    strength: ["Strong foundation", "Deep knowledge", "Extensive experience"],
    area: [
      "front-end development",
      "web technologies",
      "user interface design",
    ],
    specialization: ["user experience", "performance", "accessibility"],
  },
  contact: {
    patterns: [
      "I'd love to connect! {contact_method} or {alternative}. {availability}",
      "Feel free to reach out {when}. {communication_style}",
      "Let's collaborate! {invitation}",
    ],
    contact_method: [
      "use the contact form",
      "send me an email",
      "connect on LinkedIn",
    ],
    alternative: [
      "check out my social links",
      "visit my GitHub",
      "leave a message",
    ],
    availability: [
      "I'm usually responsive within 24 hours",
      "I check messages regularly",
      "I'm always open to new opportunities",
    ],
    when: ["anytime", "when you're ready", "at your convenience"],
    communication_style: [
      "I'm friendly and approachable",
      "I enjoy discussing ideas",
      "I'm open to feedback",
    ],
    invitation: [
      "Tell me about your project!",
      "Share your thoughts!",
      "Let's start a conversation!",
    ],
  },
  default: {
    patterns: [
      "That's fascinating! {response} {follow_up}",
      "Interesting point! {acknowledgment} {question}",
      "{enthusiasm} {transition} What else is on your mind?",
      "I see! {understanding} {engagement}",
    ],
    response: [
      "I haven't thought about that before",
      "That's a great question",
      "You bring up a good point",
    ],
    follow_up: [
      "Tell me more about it.",
      "What made you ask that?",
      "I'd love to hear your thoughts.",
    ],
    acknowledgment: [
      "I appreciate you sharing that",
      "Thanks for bringing that up",
      "That's something worth exploring",
    ],
    question: [
      "How did you come across that?",
      "What's your experience with it?",
      "What interests you most about it?",
    ],
    enthusiasm: ["Wow!", "Cool!", "That's awesome!"],
    transition: ["Speaking of which,", "On that topic,", "That reminds me,"],
    understanding: [
      "I understand where you're coming from",
      "That makes sense",
      "I can see why you'd think that",
    ],
    engagement: [
      "Let's dive deeper!",
      "I'd like to know more.",
      "What are your thoughts on it?",
    ],
  },
};

const personalityTraits = [
  "I'm passionate about creating beautiful, functional websites.",
  "I believe in writing clean, maintainable code.",
  "I'm always excited about new web technologies.",
  "I love solving complex problems with elegant solutions.",
  "I'm committed to creating great user experiences.",
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your AI portfolio assistant. I can tell you about my projects, skills, or anything else! What would you like to know? 🚀",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = {
        text: input,
        sender: "user" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Update conversation history
      setConversationHistory((prev) => [
        ...prev.slice(-9),
        input.toLowerCase(),
      ]);

      setIsTyping(true);
      const currentInput = input;
      setInput("");

      setTimeout(
        () => {
          const response = generateResponse(currentInput, conversationHistory);
          const botMessage = {
            text: response,
            sender: "bot" as const,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        },
        1500 + Math.random() * 1000,
      ); // Longer delay for "thinking"
    }
  };

  const generateResponse = (userMessage: string, history: string[]): string => {
    const lowerMessage = userMessage.toLowerCase();
    let category = "default";

    // Determine category based on keywords
    if (
      lowerMessage.match(
        /\b(hello|hi|hey|greetings|good morning|good evening)\b/,
      )
    ) {
      category = "greetings";
    } else if (
      lowerMessage.match(/\b(portfolio|projects|work|showcase|examples)\b/)
    ) {
      category = "portfolio";
    } else if (
      lowerMessage.match(/\b(skills|tech|technologies|expertise|experience)\b/)
    ) {
      category = "skills";
    } else if (
      lowerMessage.match(/\b(contact|reach|connect|email|message)\b/)
    ) {
      category = "contact";
    }

    // Check conversation history for context
    const recentTopics = history.slice(-3);
    if (
      recentTopics.some((msg) => msg.includes("portfolio")) &&
      lowerMessage.includes("more")
    ) {
      category = "portfolio";
    }

    const templates =
      responseTemplates[category as keyof typeof responseTemplates];
    const pattern =
      templates.patterns[Math.floor(Math.random() * templates.patterns.length)];

    // Fill in template placeholders
    let response = pattern;

    // Replace placeholders with random options
    Object.keys(templates).forEach((key) => {
      if (
        key !== "patterns" &&
        Array.isArray(templates[key as keyof typeof templates])
      ) {
        const options = templates[key as keyof typeof templates] as string[];
        const placeholder = `{${key}}`;
        if (response.includes(placeholder)) {
          const replacement =
            options[Math.floor(Math.random() * options.length)];
          response = response.replace(placeholder, replacement);
        }
      }
    });

    // Add personality occasionally
    if (Math.random() < 0.3) {
      response +=
        " " +
        personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
    }

    return response;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Header />
      <main className="chatbot">
        <div className="container">
          <h1>AI Chat Assistant</h1>
          <div className="chat-window">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="timestamp">{formatTime(msg.timestamp)}</span>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <span className="typing-text">AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about the portfolio..."
              />
              <button onClick={handleSend} disabled={!input.trim() || isTyping}>
                {isTyping ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Chatbot;
