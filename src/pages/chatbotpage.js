import "../styles/chatbot.css";
import { Navbar, Footer } from "../components/index.js";
import { sendChatMessage } from "../api.js";

export async function renderChatbotPage() {
  const username = localStorage.getItem("username");
  return `
    ${Navbar(username)}
    <div class="bg-animation" id="bgAnimation"></div>

    <div class="chat-container">
        <!-- Header -->
        <div class="chat-header">
            <div class="bot-info">
                <div class="bot-avatar">🎮</div>
                <div class="bot-details">
                    <h2>GameBot Assistant</h2>
                    <div class="bot-status">
                        <div class="status-dot"></div>
                        <span>Online - Ready to help</span>
                    </div>
                </div>
            </div>
            <div class="chat-actions">
                <button class="action-btn" onclick="window.clearChat()" title="Clear Chat">🗑️</button>
            </div>
        </div>

        <!-- Messages Container -->
        <div class="messages-container" id="messagesContainer">
            <div class="welcome-message">
                <h3 class="welcome-title">🎮 Welcome to GameBot!</h3>
                <p class="welcome-subtitle">
                    I'm your personal gaming assistant. I can recommend games based on your preferences, 
                    help you discover new genres, and answer any gaming questions you have!
                </p>
            </div>
        </div>

        <!-- Input Container -->
        <div class="input-container">
            <div class="quick-actions">
            </div>
            <div class="input-wrapper">
                <textarea 
                    class="input-field" 
                    id="messageInput"
                    placeholder="Ask me about games, genres, or get personalized recommendations..."
                    rows="1"
                    onkeydown="window.handleKeyPress(event)"
                    oninput="window.adjustTextareaHeight()"
                ></textarea>
                <button class="send-btn" id="sendBtn" onclick="window.sendMessage()">
                    <span>➤</span>
                </button>
            </div>
        </div>

        <!-- Typing Indicator -->
        <div class="message bot-message" id="typingIndicator" style="display: none;">
            <div class="message-avatar">🎮</div>
            <div class="typing-indicator">
                <span style="color: rgba(255,255,255,0.7);">GameBot is thinking...</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    </div>
    ${Footer()}
    `;
}

// Placeholder functions to prevent errors for UI focus
window.adjustTextareaHeight = () => {
  const textarea = document.getElementById("messageInput");
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
};

window.handleKeyPress = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    window.sendMessage();
  }
};

window.clearChat = () => {
  console.log("Clear Chat clicked (placeholder)");
  const messagesContainer = document.getElementById("messagesContainer");
  if (messagesContainer) {
    messagesContainer.innerHTML = `
            <div class="welcome-message">
                <h3 class="welcome-title">🎮 Welcome to GameBot!</h3>
                <p class="welcome-subtitle">
                    I\'m your personal gaming assistant. I can recommend games based on your preferences, 
                    help you discover new genres, and answer any gaming questions you have!
                </p>
            </div>
        `;
  }
};

window.toggleTheme = () => {
  console.log("Toggle Theme clicked (placeholder)");
  alert("Theme toggling not implemented yet.");
};

window.sendQuickMessage = (message) => {
  console.log(`Quick Message sent: ${message} (placeholder)`);
  const messageInput = document.getElementById("messageInput");
  if (messageInput) {
    messageInput.value = message;
    window.sendMessage();
  }
};

window.sendMessage = async () => {
  const messageInput = document.getElementById("messageInput");
  if (messageInput) {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
      window.appendMessage(userMessage, "user-message");
      messageInput.value = "";
      window.adjustTextareaHeight();

      const typingIndicator = document.getElementById("typingIndicator");
      if (typingIndicator) typingIndicator.style.display = "flex";

      try {
        const botResponses = await sendChatMessage(userMessage);

        if (typingIndicator) typingIndicator.style.display = "none";

        if (botResponses && botResponses.length > 0) {
          window.appendMessage(botResponses[0].name, "bot-message");
        } else {
          window.appendMessage(
            "Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda mengulanginya atau bertanya tentang hal lain?",
            "bot-message"
          );
        }
      } catch (error) {
        if (typingIndicator) typingIndicator.style.display = "none";
        console.error("Failed to get bot response:", error);
        window.appendMessage(
          "Terjadi kesalahan saat memproses permintaan Anda. Mohon coba lagi nanti.",
          "bot-message"
        );
      }
    }
  }
};

window.appendMessage = (text, type) => {
  const messagesContainer = document.getElementById("messagesContainer");
  if (messagesContainer) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", type);

    const avatar = type === "user-message" ? "👤" : "🎮";

    messageElement.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">${text}</div>
        `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
};
