<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Breathing Exercises</h1>
    <p class="text-lg mb-8 text-neutral-600 max-w-3xl">Guided breathing exercises to help you relax, reduce stress and find your center.</p>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="card">
          <BreathingExercise />
        </div>
      </div>
      
      <div>
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Benefits of Breathing Exercises</h2>
          <ul class="space-y-3">
            <li v-for="(benefit, index) in benefits" :key="index" class="flex">
              <div class="text-primary-500 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="font-medium">{{ benefit.title }}</p>
                <p class="text-sm text-neutral-600">{{ benefit.description }}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-4">Tips for Practice</h2>
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
import BreathingExercise from '~/components/ui/BreathingExercise.vue';

useHead({
  title: 'Breathing Exercises'
});

const benefits = [
  {
    title: 'Reduces Stress and Anxiety',
    description: 'Deep breathing activates your parasympathetic nervous system, reducing stress hormones.'
  },
  {
    title: 'Improves Focus and Clarity',
    description: 'Regular breathing practice increases oxygen flow to your brain, enhancing mental clarity.'
  },
  {
    title: 'Boosts Immune Function',
    description: 'Proper breathing improves circulation and lymphatic flow, supporting immune health.'
  },
  {
    title: 'Enhances Sleep Quality',
    description: 'Calming breathing exercises before bed can help you fall asleep faster and sleep more deeply.'
  },
  {
    title: 'Regulates Emotions',
    description: 'Controlled breathing helps manage emotional responses and builds emotional resilience.'
  }
];

const tips = [
  {
    title: 'Find a Comfortable Position',
    description: 'Sit or lie down in a comfortable position where your body can relax fully.'
  },
  {
    title: 'Start Small',
    description: 'Begin with just 3-5 minutes per day and gradually increase your practice time.'
  },
  {
    title: 'Be Consistent',
    description: 'Practice at the same time each day to build a sustainable habit.'
  },
  {
    title: 'Be Patient',
    description: 'The benefits of breathing practices accumulate over time with regular practice.'
  }
];
</script>