<template>
  <div class="chat-widget" :class="{ open: isOpen }">
    <div class="chat-toggle" @click="toggleChat">💬</div>

    <div class="chat-container" v-if="isOpen">
      <div class="chat-header">
        <div class="title">Bank Assistant</div>
        <button class="close-btn" @click="isOpen = false">✖</button>
      </div>

      <div class="chat-messages" ref="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.type]"
        >
          <div class="avatar" v-if="msg.type === 'bot'">🤖</div>
          <div class="text">
            {{ msg.text }}
            <div v-if="msg.options" class="inline-options">
              <button
                v-for="(option, idx) in msg.options"
                :key="idx"
                :disabled="msg.disabled"
                :class="{ selected: option === msg.selectedOption }"
                @click="selectOption(option, msg)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      messages: [],
      currentPromptId: "start",
      prompts: {}, // will be loaded dynamically
    };
  },
  mounted() {
    this.loadPrompts().then(() => {
      this.showPrompt(this.currentPromptId);
    });
  },
  methods: {
    async loadPrompts() {
      try {
        // Example: fetch JSON from your backend or GitHub Pages
        const res = await fetch(
          "https://bilawalHussain5646.github.io/prompts/bank-prompts.json"
        );
        this.prompts = await res.json();
      } catch (err) {
        console.error("Error loading prompts:", err);
      }
    },

    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && this.messages.length === 0) {
        this.showPrompt(this.currentPromptId);
      }
    },

    selectOption(option, msg) {
      msg.selectedOption = option;
      msg.disabled = true;
      this.messages.push({ text: option, type: "user" });

      const promptObj = this.prompts[this.currentPromptId];
      const nextId = promptObj.optionsMap?.[option];
      if (nextId) this.showPrompt(nextId);
    },

    showPrompt(promptId) {
      const prompt = this.prompts[promptId];
      if (!prompt) return;

      this.currentPromptId = promptId;

      const typingMsg = { text: "", type: "bot", typing: true };
      this.messages.push(typingMsg);
      this.scrollToBottom();

      setTimeout(() => {
        const index = this.messages.indexOf(typingMsg);
        if (index !== -1) this.messages.splice(index, 1);

        const botMsg = {
          text: prompt.text,
          type: "bot",
          options: prompt.options,
          disabled: false,
          selectedOption: null,
        };
        this.messages.push(botMsg);
        this.scrollToBottom();
      }, 1000);
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messages;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
/* same styles you had */
</style>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}
.chat-toggle:hover {
  transform: scale(1.1);
}

.chat-container {
  width: 360px;
  max-height: 520px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
}

.chat-header {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: #fff;
  padding: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}
.chat-header .close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: #f5f7ff;
  scroll-behavior: smooth;
}
.message {
  display: flex;
  align-items: flex-end;
  max-width: 85%;
}
.message.bot {
  justify-content: flex-start;
}
.message.user {
  justify-content: flex-end;
  align-self: flex-end;
}
.avatar {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}
.text {
  padding: 0.7rem 1rem;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-width: 80%;
  font-size: 0.95rem;
}
.message.bot .text {
  background: #e3e9ff;
  color: #1b1f3b;
}
.message.user .text {
  background: #2575fc;
  color: white;
}

/* Options */
.inline-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 6px;
}
.inline-options button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  background: #6a11cb;
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}
.inline-options button:hover:not(:disabled) {
  background: #2575fc;
}
.inline-options button:disabled {
  background: #a0a0a0;
  cursor: not-allowed;
}
.inline-options button.selected {
  background: #ff9800;
  color: white;
}
</style>
