<template>
  <div class="breathing-exercise flex flex-col items-center justify-center py-8">
    <h3 class="text-xl font-medium mb-8 text-center">{{ currentExercise.name }}</h3>
    
    <div class="breathing-circle-container relative mb-8">
      <div 
        class="breathing-circle rounded-full bg-gradient-to-r from-primary-300 to-secondary-300"
        :class="{ 'animate-breath': isExerciseActive }"
        :style="{ 
          width: `${circleSize}px`, 
          height: `${circleSize}px`,
          transition: 'all 4s cubic-bezier(0.5, 0, 0.5, 1)'
        }"
      >
        <div class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          {{ phaseText }}
        </div>
      </div>
      <div class="instruction-text fixed-instruction text-lg font-medium">
        {{ instruction }}
      </div>
    </div>
    
    <div class="controls flex flex-col items-center space-y-6">
      <div class="timer text-2xl font-medium">
        {{ formatTime(timeRemaining) }}
      </div>
      
      <div class="buttons flex space-x-4">
        <button 
          v-if="!isExerciseActive"
          @click="startExercise"
          class="btn btn-primary px-6"
        >
          Start
        </button>
        <button 
          v-else
          @click="pauseExercise"
          class="btn btn-outline px-6"
        >
          {{ isPaused ? 'Resume' : 'Pause' }}
        </button>
        <button 
          v-if="isExerciseActive"
          @click="resetExercise"
          class="btn btn-accent px-6"
        >
          Reset
        </button>
      </div>
    </div>
    
    <!-- Exercise Selector -->
    <div class="exercise-selector mt-12 w-full max-w-md">
      <h4 class="font-medium mb-3">Choose Exercise:</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          v-for="exercise in exercises" 
          :key="exercise.id"
          @click="selectExercise(exercise)"
          class="exercise-button text-left p-3 rounded-lg transition-all duration-200"
          :class="{ 'selected': currentExercise.id === exercise.id }"
        >
          <div class="font-medium">{{ exercise.name }}</div>
          <div class="text-sm text-neutral-500">{{ exercise.description }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';

const exercises = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Inhale, hold, exhale, hold for equal counts',
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    pauseTime: 4,
    totalTime: 3 * 60 // 3 minutes
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    pauseTime: 0,
    totalTime: 4 * 60 // 4 minutes
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Long exhales to activate parasympathetic system',
    inhaleTime: 4,
    holdTime: 1,
    exhaleTime: 6,
    pauseTime: 1,
    totalTime: 5 * 60 // 5 minutes
  },
  {
    id: 'deep',
    name: 'Deep Breathing',
    description: 'Simple deep breaths to calm the nervous system',
    inhaleTime: 5,
    holdTime: 0,
    exhaleTime: 5,
    pauseTime: 0,
    totalTime: 3 * 60 // 3 minutes
  }
];

const currentExercise = ref(exercises[0]);
const isExerciseActive = ref(false);
const isPaused = ref(false);
const timeRemaining = ref(currentExercise.value.totalTime);
const currentPhase = ref('ready');
const phaseTimer = ref(null);
const circleSize = ref(200);

let intervalId = null;

const phaseText = computed(() => {
  switch (currentPhase.value) {
    case 'inhale': return 'Inhale';
    case 'hold': return 'Hold';
    case 'exhale': return 'Exhale';
    case 'pause': return 'Pause';
    default: return 'Ready';
  }
});

const instruction = computed(() => {
  const phases = {
    inhale: `Breathe in for ${currentExercise.value.inhaleTime} seconds`,
    hold: `Hold for ${currentExercise.value.holdTime} seconds`,
    exhale: `Breathe out for ${currentExercise.value.exhaleTime} seconds`,
    pause: `Pause for ${currentExercise.value.pauseTime} seconds`,
    ready: 'Press start when ready'
  };
  
  return phases[currentPhase.value];
});

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const selectExercise = (exercise) => {
  if (isExerciseActive.value) {
    resetExercise();
  }
  
  currentExercise.value = exercise;
  timeRemaining.value = exercise.totalTime;
};

const startExercise = () => {
  if (isPaused.value) {
    isPaused.value = false;
    return;
  }
  
  isExerciseActive.value = true;
  startBreathingCycle();
  
  intervalId = setInterval(() => {
    if (timeRemaining.value <= 0) {
      completeExercise();
      return;
    }
    
    timeRemaining.value--;
  }, 1000);
};

const pauseExercise = () => {
  isPaused.value = !isPaused.value;
  
  if (isPaused.value) {
    clearInterval(intervalId);
    clearTimeout(phaseTimer.value);
  } else {
    startExercise();
    continuePhaseFromCurrent();
  }
};

const resetExercise = () => {
  isExerciseActive.value = false;
  isPaused.value = false;
  currentPhase.value = 'ready';
  timeRemaining.value = currentExercise.value.totalTime;
  
  clearInterval(intervalId);
  clearTimeout(phaseTimer.value);
};

const completeExercise = () => {
  resetExercise();
  // Could add completion feedback here
};

const startBreathingCycle = () => {
  if (isPaused.value) return;
  
  const cycle = () => {
    // Inhale phase
    currentPhase.value = 'inhale';
    circleSize.value = 260; // Expand
    
    phaseTimer.value = setTimeout(() => {
      if (isPaused.value) return;
      
      // Hold phase (if applicable)
      if (currentExercise.value.holdTime > 0) {
        currentPhase.value = 'hold';
        
        phaseTimer.value = setTimeout(() => {
          if (isPaused.value) return;
          
          // Exhale phase
          currentPhase.value = 'exhale';
          circleSize.value = 200; // Contract
          
          phaseTimer.value = setTimeout(() => {
            if (isPaused.value) return;
            
            // Pause phase (if applicable)
            if (currentExercise.value.pauseTime > 0) {
              currentPhase.value = 'pause';
              
              phaseTimer.value = setTimeout(() => {
                if (isPaused.value) return;
                
                // Restart cycle if time remains
                if (timeRemaining.value > 0) {
                  cycle();
                }
              }, currentExercise.value.pauseTime * 1000);
            } else {
              // No pause, restart cycle if time remains
              if (timeRemaining.value > 0) {
                cycle();
              }
            }
          }, currentExercise.value.exhaleTime * 1000);
        }, currentExercise.value.holdTime * 1000);
      } else {
        // No hold, go straight to exhale
        currentPhase.value = 'exhale';
        circleSize.value = 200; // Contract
        
        phaseTimer.value = setTimeout(() => {
          if (isPaused.value) return;
          
          // Pause phase (if applicable)
          if (currentExercise.value.pauseTime > 0) {
            currentPhase.value = 'pause';
            
            phaseTimer.value = setTimeout(() => {
              if (isPaused.value) return;
              
              // Restart cycle if time remains
              if (timeRemaining.value > 0) {
                cycle();
              }
            }, currentExercise.value.pauseTime * 1000);
          } else {
            // No pause, restart cycle if time remains
            if (timeRemaining.value > 0) {
              cycle();
            }
          }
        }, currentExercise.value.exhaleTime * 1000);
      }
    }, currentExercise.value.inhaleTime * 1000);
  };
  
  cycle();
};

const continuePhaseFromCurrent = () => {
  // This would need to calculate remaining time in the current phase
  // For simplicity, we'll just start a new cycle
  startBreathingCycle();
};

onUnmounted(() => {
  clearInterval(intervalId);
  clearTimeout(phaseTimer.value);
});
</script>

<style scoped>
.breathing-circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  position: relative;
  margin-bottom: 80px;
}

.breathing-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(74, 194, 154, 0.3);
  position: relative;
  z-index: 1;
}

.fixed-instruction {
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  text-align: center;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.exercise-button {
  background-color: white;
  border: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.exercise-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.exercise-button.selected {
  border-color: theme('colors.primary.400');
  background-color: theme('colors.primary.50');
}
</style>