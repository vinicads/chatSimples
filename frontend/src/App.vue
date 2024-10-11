<template>
  <div class="chat-app">
    <div v-if="!username" class="modal">
      <div class="modal-content">
        <h2>Bem-vindo ao Chat</h2>
        <input v-model="usernameInput" placeholder="Digite seu nome" />
        <button @click="confirmUsername">Entrar</button>
      </div>
    </div>

    <div v-else class="chat-container">
      <div class="chat-header">
        <h3>Chat Público</h3>
      </div>

      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="{ 'self-message': message.senderId === userId, 'other-message': message.senderId !== userId, 'Sistema': message.sender == 'Sistema' }"
        >
          <span v-if="message.sender && message.senderId !== userId && message.sender !== 'Sistema'" class="sender-name">
            {{ message.sender }}
          </span>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>

      <div class="chat-input">
        <input type="text" v-model="messageInput" @keyup.enter="sendMessage" placeholder="Digite sua mensagem..." />
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>



<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      messageInput: '',
      messages: [],
      userId: null,
      username: '',
      usernameInput: '',
    };
  },
  mounted() {
  this.socket = io('ws://localhost:3000');

  this.socket.on('connected', (id) => {
    this.userId = id;
  });

  this.socket.on('message', (message) => {
    this.messages.push(message);
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  });

  this.socket.on('user-joined', (message) => {
    this.messages.push({ sender: 'Sistema', content: message });
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  });

  this.socket.on('user-left', (message) => {
    this.messages.push({ sender: 'Sistema', content: message });
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  });
},
methods: {
  confirmUsername() {
    if (this.usernameInput) {
      this.username = this.usernameInput;
      this.socket.emit('register-name', this.username);
    }else{
      this.username = "Anonimo";
      this.socket.emit('register-name', this.username);
    }
  },
  sendMessage() {
    if (!this.messageInput) return;

    this.socket.emit('send-message', {
      senderId: this.userId,
      content: this.messageInput,
    });

    this.messages.push({
      sender: this.username,
      content: this.messageInput,
      senderId: this.userId,
    });

    this.messageInput = '';

    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  scrollToBottom() {
    const chatMessages = this.$el.querySelector('.chat-messages');
    if(chatMessages){
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  },
},

};
</script>

<style scoped>
.chat-app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 90vh;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  padding: 10px;
  background-color: #42b983;
  color: white;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.self-message {
  align-self: flex-end;
  background-color: #42b983;
  color: white;
  border-radius: 10px;
  padding: 8px;
  margin-left: auto;
}

.other-message {
  align-self: flex-start;
  background-color: #e0e0e0;
  color: black;
  border-radius: 10px;
  padding: 8px;
  margin-right: auto;
}

.sender-name {
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 3px;
  color: #555;
}

.message-content {
  word-wrap: break-word;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-right: 10px;
}

.chat-input button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 15px;
}

.modal-content input {
  padding: 10px;
  width: 50%;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.modal-content button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.Sistema{
  margin: 10px auto;
  text-align: center;
}

</style>