<template>
  <div class="mood-selector">
    <h3 class="text-xl font-medium mb-4">How are you feeling today?</h3>
    <div class="grid grid-cols-3 md:grid-cols-5 gap-4">
      <button 
        v-for="mood in moods" 
        :key="mood.value"
        @click="selectMood(mood.value)"
        class="mood-button flex flex-col items-center p-3 rounded-lg transition-all duration-200"
        :class="{ 'selected': selectedMood === mood.value }"
      >
        <div class="text-3xl mb-2">{{ mood.emoji }}</div>
        <div class="text-sm font-medium">{{ mood.label }}</div>
      </button>
    </div>
    <div v-if="selectedMood" class="mt-6 animate-fadeIn">
      <label class="label">What's contributing to this feeling?</label>
      <textarea 
        v-model="notes"
        class="input h-24 resize-none"
        placeholder="Share any thoughts or context about how you're feeling..."
      ></textarea>
      <div class="flex justify-end mt-4">
        <button 
          @click="saveMood"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Saving...</span>
          <span v-else>Save Mood</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialMood: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['save']);

const selectedMood = ref(props.initialMood);
const notes = ref('');
const isLoading = ref(false);

const moods = [
  { value: 'great', label: 'Great', emoji: '😄' },
  { value: 'good', label: 'Good', emoji: '🙂' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'down', label: 'Down', emoji: '😔' },
  { value: 'stressed', label: 'Stressed', emoji: '😫' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'angry', label: 'Angry', emoji: '😠' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
];

const selectMood = (mood) => {
  selectedMood.value = mood;
};

const saveMood = async () => {
  if (!selectedMood.value) return;
  
  isLoading.value = true;
  
  try {
    // In a real app, this would be an API call to save the mood
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    emit('save', {
      mood: selectedMood.value,
      notes: notes.value,
      timestamp: new Date()
    });
    
    // Reset the form
    notes.value = '';
  } catch (error) {
    console.error('Error saving mood:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.mood-button {
  background-color: white;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.mood-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mood-button.selected {
  border-color: theme('colors.primary.400');
  background-color: theme('colors.primary.50');
}
</style>