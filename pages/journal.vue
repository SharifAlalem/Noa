<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Journal</h1>
    <p class="text-lg mb-8 text-neutral-600 max-w-3xl">Express your thoughts and feelings in a private space with guided prompts to encourage reflection.</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div v-if="activeEntry" class="card mb-8 animate-fadeIn">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">{{ isNewEntry ? 'New Entry' : 'Edit Entry' }}</h2>
            <button 
              @click="closeEntry"
              class="text-neutral-500 hover:text-neutral-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="mb-4">
            <label class="label">Title</label>
            <input 
              v-model="activeEntry.title" 
              type="text" 
              class="input" 
              placeholder="Give your entry a title"
            />
          </div>
          
          <div class="mb-4">
            <label class="label">Prompt</label>
            <div class="p-4 bg-primary-50 rounded-lg mb-2 text-neutral-700">
              {{ activeEntry.prompt || selectedPrompt }}
            </div>
            <button 
              v-if="!activeEntry.prompt"
              @click="newPrompt"
              class="text-sm text-primary-500 hover:text-primary-600"
            >
              Get a different prompt
            </button>
          </div>
          
          <div class="mb-6">
            <label class="label">Your Thoughts</label>
            <textarea 
              v-model="activeEntry.content" 
              class="input h-64 resize-none"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="label">How are you feeling?</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="mood in moods" 
                :key="mood.value"
                @click="activeEntry.mood = mood.value"
                class="py-1 px-3 rounded-full text-sm font-medium transition-colors"
                :class="activeEntry.mood === mood.value ? 
                  'bg-primary-400 text-white' : 
                  'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'"
              >
                {{ mood.emoji }} {{ mood.label }}
              </button>
            </div>
          </div>
          
          <div class="flex justify-end gap-3">
            <button 
              @click="closeEntry"
              class="btn border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button 
              @click="saveEntry"
              class="btn btn-primary"
              :disabled="!activeEntry.title || !activeEntry.content"
            >
              Save Entry
            </button>
          </div>
        </div>
        
        <div v-else class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Your Journal Entries</h2>
            <button 
              @click="createNewEntry"
              class="btn btn-primary"
            >
              New Entry
            </button>
          </div>
          
          <div v-if="entries.length > 0" class="space-y-4">
            <div 
              v-for="entry in entries" 
              :key="entry.id"
              class="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
              @click="editEntry(entry)"
            >
              <div class="flex justify-between">
                <h3 class="font-medium">{{ entry.title }}</h3>
                <span class="text-sm text-neutral-500">{{ formatDate(entry.date) }}</span>
              </div>
              <p class="text-neutral-600 line-clamp-2 mt-2">{{ entry.content }}</p>
              <div class="flex justify-between items-center mt-3">
                <div class="flex items-center">
                  <span class="mr-1">{{ getMoodEmoji(entry.mood) }}</span>
                  <span class="text-sm text-neutral-500">{{ getMoodLabel(entry.mood) }}</span>
                </div>
                <button 
                  @click.stop="deleteEntry(entry.id)"
                  class="text-neutral-400 hover:text-error-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-8 text-neutral-500">
            <p>No journal entries yet. Create your first entry to get started.</p>
            <button 
              @click="createNewEntry"
              class="btn btn-primary mt-4"
            >
              Create First Entry
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Benefits of Journaling</h2>
          <ul class="space-y-3">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex">
              <div class="text-primary-500 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-neutral-700">{{ benefit }}</p>
            </li>
          </ul>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Journal Tips</h2>
          <ul class="space-y-4">
            <li v-for="(tip, index) in tips" :key="index" class="p-3 bg-neutral-50 rounded-lg">
              <p class="font-medium">{{ tip.title }}</p>
              <p class="text-sm text-neutral-600">{{ tip.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

useHead({
  title: 'Journal'
});

// Sample data - in a real app, this would come from a database
const entries = ref([
  {
    id: 1,
    title: 'Finding Balance',
    content: 'Today I realized I need to create more balance between work and personal time. I\'ve been working too much and neglecting self-care...',
    prompt: 'What area of your life needs more attention right now?',
    mood: 'reflective',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Morning Gratitude',
    content: 'I\'m grateful for the sunshine today, my morning coffee, and the supportive message from my friend...',
    prompt: 'List three things you\'re grateful for today.',
    mood: 'grateful',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 3,
    title: 'Work Challenges',
    content: 'The project deadline is causing me a lot of stress. I need to remember to breathe and take one task at a time...',
    prompt: 'What\'s challenging you right now, and how can you approach it differently?',
    mood: 'stressed',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
]);

const activeEntry = ref(null);
const isNewEntry = ref(false);
const nextId = computed(() => Math.max(0, ...entries.value.map(e => e.id)) + 1);

const journalPrompts = [
  'What made you smile today?',
  'What\'s something you\'re looking forward to?',
  'What\'s a challenge you\'re facing, and how might you overcome it?',
  'If you could talk to your past self, what advice would you give?',
  'What are three things you\'re grateful for today?',
  'Describe a moment when you felt proud of yourself recently.',
  'What\'s something you want to improve about yourself?',
  'What boundaries do you need to set or maintain?',
  'Describe a recent situation from someone else\'s perspective.',
  'What would make today a good day for you?'
];

const selectedPrompt = ref(journalPrompts[Math.floor(Math.random() * journalPrompts.length)]);

const newPrompt = () => {
  const currentPrompt = selectedPrompt.value;
  let newPrompt;
  
  // Ensure we get a different prompt
  do {
    newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  } while (newPrompt === currentPrompt && journalPrompts.length > 1);
  
  selectedPrompt.value = newPrompt;
};

const moods = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'reflective', label: 'Reflective', emoji: '🤔' },
  { value: 'inspired', label: 'Inspired', emoji: '✨' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'stressed', label: 'Stressed', emoji: '😫' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'angry', label: 'Angry', emoji: '😠' }
];

const createNewEntry = () => {
  // Select a random prompt
  selectedPrompt.value = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  
  activeEntry.value = {
    id: nextId.value,
    title: '',
    content: '',
    prompt: null, // Will use selectedPrompt until saved
    mood: 'reflective',
    date: new Date()
  };
  
  isNewEntry.value = true;
};

const editEntry = (entry) => {
  activeEntry.value = { ...entry };
  isNewEntry.value = false;
};

const closeEntry = () => {
  activeEntry.value = null;
};

const saveEntry = () => {
  if (!activeEntry.value.title || !activeEntry.value.content) return;
  
  // For new entries, save the selected prompt
  if (isNewEntry.value && !activeEntry.value.prompt) {
    activeEntry.value.prompt = selectedPrompt.value;
  }
  
  const entryIndex = entries.value.findIndex(e => e.id === activeEntry.value.id);
  
  if (entryIndex >= 0) {
    // Update existing entry
    entries.value[entryIndex] = { ...activeEntry.value };
  } else {
    // Add new entry
    entries.value.unshift({ ...activeEntry.value });
  }
  
  // Close the editor
  activeEntry.value = null;
};

const deleteEntry = (id) => {
  if (confirm('Are you sure you want to delete this journal entry?')) {
    entries.value = entries.value.filter(e => e.id !== id);
  }
};

const getMoodEmoji = (mood) => {
  const found = moods.find(m => m.value === mood);
  return found ? found.emoji : '😐';
};

const getMoodLabel = (mood) => {
  const found = moods.find(m => m.value === mood);
  return found ? found.label : 'Neutral';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const benefits = [
  'Reduces stress and anxiety by expressing emotions',
  'Improves self-awareness and emotional intelligence',
  'Helps identify patterns in thoughts and behaviors',
  'Enhances problem-solving through reflection',
  'Boosts mood and promotes positive thinking',
  'Strengthens memory and cognitive processing'
];

const tips = [
  {
    title: 'Write Freely',
    description: 'Don\'t worry about grammar or spelling. Just let your thoughts flow naturally.'
  },
  {
    title: 'Be Consistent',
    description: 'Try to journal at the same time each day to build a sustainable habit.'
  },
  {
    title: 'Be Honest',
    description: 'Your journal is private. Be honest with yourself about your feelings.'
  },
  {
    title: 'Review Past Entries',
    description: 'Periodically review old entries to recognize patterns and growth.'
  }
];
</script>