<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Mood Tracker</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 order-2 lg:order-1">
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Your Mood History</h2>
          <div v-if="moodEntries.length > 0">
            <div class="mb-6">
              <MoodChart :mood-data="moodEntries" />
            </div>
            <div class="space-y-4">
              <div 
                v-for="(entry, index) in moodEntries.slice(0, displayCount)" 
                :key="index" 
                class="p-4 bg-neutral-50 rounded-lg animate-fadeIn"
              >
                <div class="flex justify-between items-start">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">{{ getMoodEmoji(entry.mood) }}</div>
                    <div>
                      <div class="font-medium">{{ getMoodLabel(entry.mood) }}</div>
                      <div class="text-sm text-neutral-500">{{ formatDate(entry.timestamp) }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="entry.notes" class="mt-3 text-neutral-700">
                  {{ entry.notes }}
                </div>
              </div>
              
              <button 
                v-if="moodEntries.length > displayCount" 
                @click="displayCount += 5"
                class="w-full py-2 text-center text-primary-500 hover:text-primary-600 font-medium"
              >
                Show More
              </button>
            </div>
          </div>
          <div v-else class="text-center py-8 text-neutral-500">
            <p>No mood entries yet. Start tracking to see your history.</p>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Insights</h2>
          <div v-if="moodEntries.length >= 3" class="space-y-4">
            <div class="p-4 bg-neutral-50 rounded-lg">
              <h3 class="font-medium">Mood Patterns</h3>
              <p class="text-neutral-700">Your mood has been generally {{ dominantMood }} over the past week.</p>
            </div>
            <div class="p-4 bg-neutral-50 rounded-lg">
              <h3 class="font-medium">Potential Triggers</h3>
              <p class="text-neutral-700">Work-related stress seems to be affecting your mood. Consider scheduling regular breaks.</p>
            </div>
            <div class="p-4 bg-neutral-50 rounded-lg">
              <h3 class="font-medium">Suggestions</h3>
              <div class="space-y-2 mt-2">
                <NuxtLink to="/breathing" class="block p-3 bg-white rounded-md hover:bg-primary-50 transition-colors">
                  <div class="font-medium text-primary-500">Try a breathing exercise</div>
                  <div class="text-sm text-neutral-600">A 5-minute session can help reduce stress</div>
                </NuxtLink>
                <NuxtLink to="/journal" class="block p-3 bg-white rounded-md hover:primary-50 transition-colors">
                  <div class="font-medium text-primary-500">Journal your thoughts</div>
                  <div class="text-sm text-neutral-600">Express your feelings about work pressure</div>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-neutral-500">
            <p>Track at least 3 moods to see personalized insights.</p>
          </div>
        </div>
      </div>
      
      <div class="order-1 lg:order-2">
        <div class="card sticky top-20">
          <h2 class="text-xl font-bold mb-4">Check In</h2>
          <MoodSelector @save="addMoodEntry" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MoodSelector from '~/components/ui/MoodSelector.vue';
import MoodChart from '~/components/ui/MoodChart.vue';

useHead({
  title: 'Mood Tracker'
});

// Normally this would come from a store or API
const moodEntries = ref([
  {
    mood: 'good',
    notes: 'Had a productive day at work, feeling accomplished.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    mood: 'stressed',
    notes: 'Deadline approaching, feeling the pressure.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    mood: 'okay',
    notes: 'Nothing special today, just an average day.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    mood: 'anxious',
    notes: 'Worried about the upcoming presentation.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
]);

const displayCount = ref(5);

const dominantMood = computed(() => {
  if (moodEntries.value.length === 0) return 'neutral';
  
  const moodCounts = {};
  moodEntries.value.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  let maxCount = 0;
  let dominantMood = '';
  
  for (const mood in moodCounts) {
    if (moodCounts[mood] > maxCount) {
      maxCount = moodCounts[mood];
      dominantMood = mood;
    }
  }
  
  return getMoodLabel(dominantMood).toLowerCase();
});

const addMoodEntry = (entry) => {
  moodEntries.value.unshift(entry);
};

const getMoodEmoji = (mood) => {
  const emojis = {
    'great': '😄',
    'good': '🙂',
    'okay': '😐',
    'down': '😔',
    'stressed': '😫',
    'anxious': '😰',
    'angry': '😠',
    'sad': '😢',
    'tired': '😴',
    'grateful': '🙏'
  };
  
  return emojis[mood] || '😐';
};

const getMoodLabel = (mood) => {
  const labels = {
    'great': 'Great',
    'good': 'Good',
    'okay': 'Okay',
    'down': 'Down',
    'stressed': 'Stressed',
    'anxious': 'Anxious',
    'angry': 'Angry',
    'sad': 'Sad',
    'tired': 'Tired',
    'grateful': 'Grateful'
  };
  
  return labels[mood] || 'Neutral';
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>