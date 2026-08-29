import { useState, useRef, useEffect } from "react";
import { useChatBot } from "../../hooks/ChatBot/useChatBot";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faTimes,
  faPaperPlane,
  faChevronDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "./_chatbot.scss";

function ChatBot() {
  const {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    toggleChat,
    scrollToContact,
    scrollToPortfolio,
    shouldShowContactCTA,
  } = useChatBot();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
      
      // Réinitialise la hauteur du textarea après l'envoi
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Auto-resize dynamique du textarea
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    // Entrée = Envoi du message (sans Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleAction = (action) => {
    if (action === "contact") {
      scrollToContact();
    } else if (action === "portfolio") {
      scrollToPortfolio();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faComments} />
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <h3>Assistant virtuel</h3>
              <p>Axel Cella - Architecte de produits digitaux</p>
            </div>
            <button
              className="chatbot-close"
              onClick={toggleChat}
              aria-label="Fermer le chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.action && (
                    <button
                      className="message-action"
                      onClick={() => handleAction(message.action)}
                    >
                      {message.action === "contact"
                        ? "Aller au formulaire"
                        : "Voir le portfolio"}
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>En train d&apos;écrire...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {shouldShowContactCTA && (
            <div className="chatbot-cta">
              <p>Prêt à collaborer ?</p>
              <HashLink smooth to="#contact" onClick={() => scrollToContact()}>
                Remplir le formulaire de contact
              </HashLink>
            </div>
          )}

          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Tapez votre message..."
              className="chat-textarea"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Envoyer le message"
            >
              <FontAwesomeIcon icon={isLoading ? faSpinner : faPaperPlane} spin={isLoading} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;
