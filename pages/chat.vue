<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Chat with Noa</h1>
    <p class="text-lg mb-8 text-neutral-600 max-w-3xl">Have a supportive conversation with your AI wellness companion.</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="card mb-8">
          <div class="chat-container bg-neutral-50 rounded-lg p-4 mb-4 h-[500px] overflow-y-auto">
            <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center text-neutral-500">
              <div class="text-5xl mb-4">👋</div>
              <p class="text-lg font-medium mb-2">Welcome to Noa Chat</p>
              <p>Start a conversation with your AI wellness companion.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="flex"
                :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
              >
                <div 
                  v-if="message.sender !== 'user'" 
                  class="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0"
                >
                  N
                </div>
                
                <div 
                  class="max-w-[75%] p-3 rounded-lg shadow-sm"
                  :class="message.sender === 'user' ? 
                    'bg-primary-100 text-neutral-800' : 
                    'bg-white text-neutral-800'"
                >
                  <p>{{ message.text }}</p>
                </div>
                
                <div 
                  v-if="message.sender === 'user'" 
                  class="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-white font-bold ml-2 flex-shrink-0"
                >
                  Y
                </div>
              </div>
              
              <div v-if="isTyping" class="flex justify-start">
                <div class="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold mr-2 flex-shrink-0">
                  N
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm min-w-[60px]">
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex items-end gap-2">
            <div class="flex-grow relative">
              <textarea 
                v-model="userInput" 
                class="input min-h-[60px] py-3 pr-10 resize-none"
                placeholder="Type your message here..."
                @keydown.enter.prevent="handleEnterKey"
                :disabled="isTyping"
              ></textarea>
              <div 
                v-if="userInput.length > 0"
                @click="clearInput"
                class="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button 
                @click="sendMessage()"
                class="btn btn-primary"
                :disabled="!userInput.trim() || isTyping"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Conversation Starters</h2>
          <div class="space-y-2">
            <button 
              v-for="(starter, index) in conversationStarters" 
              :key="index"
              @click="sendMessage(starter)"
              class="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              :disabled="isTyping"
            >
              {{ starter }}
            </button>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-4">About Noa AI</h2>
          <div class="text-neutral-700 space-y-4">
            <p>Noa is your AI wellness companion, designed to support your mental and emotional wellbeing through thoughtful conversations.</p>
            <p>Our AI is trauma-informed and focused on helping you process emotions, gain insights, and develop healthy coping strategies.</p>
            <div class="mt-4 p-3 bg-neutral-50 rounded-lg">
              <p class="text-sm font-medium mb-1">Privacy Note</p>
              <p class="text-xs text-neutral-600">Your conversations are private and securely stored. You can delete your chat history at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

useHead({
  title: 'Chat with Noa'
});

const messages = ref([]);
const userInput = ref('');
const isTyping = ref(false);

const conversationStarters = [
  'I\'ve been feeling stressed lately',
  'How can I improve my sleep?',
  'I want to practice more mindfulness',
  'I\'m having trouble with motivation',
  'How can I manage anxiety?'
];

// Send initial greeting
onMounted(() => {
  if (messages.value.length === 0) {
    messages.value.push({
      text: "Hi there! I'm Noa, your AI wellness companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    });
  }
});

const handleEnterKey = (e) => {
  if (!e.shiftKey && !isTyping.value) {
    sendMessage();
  }
};

const sendMessage = async (text = null) => {
  const messageText = text || userInput.value.trim();
  
  if (!messageText || isTyping.value) return;
  
  // Add user message
  messages.value.push({
    text: messageText,
    sender: 'user',
    timestamp: new Date()
  });
  
  // Clear input if it's from the text field
  if (!text) {
    userInput.value = '';
  }
  
  // Scroll to bottom
  scrollToBottom();
  
  // Show typing indicator
  isTyping.value = true;
  
  try {
    // Call the API
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        message: messageText
      }
    });

    isTyping.value = false;

    if (response.error) {
      messages.value.push({
        text: response.error,
        sender: 'ai',
        timestamp: new Date()
      });
      return;
    }

    messages.value.push({
      text: response.response,
      sender: 'ai',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error sending message:', error);
    isTyping.value = false;
    messages.value.push({
      text: "I'm sorry, but I'm having trouble connecting right now. Please try again in a moment.",
      sender: 'ai',
      timestamp: new Date()
    });
  }
  
  // Scroll to bottom after new message
  scrollToBottom();
};

const clearInput = () => {
  userInput.value = '';
};

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.chat-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
};

// Watch for changes to messages and scroll to bottom
watch(messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}

.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #e2e8f0;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>