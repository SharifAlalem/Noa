<template>
  <div class="mood-chart">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps({
  moodData: {
    type: Array,
    required: true
  }
});

// Map mood values to numerical values for the chart
const moodToValue = {
  'great': 5,
  'good': 4,
  'okay': 3,
  'down': 2,
  'stressed': 2,
  'anxious': 2,
  'angry': 1,
  'sad': 1,
  'tired': 2,
  'grateful': 4
};

// Process data for the chart
const chartData = computed(() => {
  // Sort entries by date
  const sortedEntries = [...props.moodData].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );
  
  // Format dates for labels
  const labels = sortedEntries.map(entry => 
    new Date(entry.timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  );
  
  // Map mood values
  const values = sortedEntries.map(entry => moodToValue[entry.mood] || 3);
  
  return {
    labels,
    datasets: [
      {
        label: 'Mood',
        data: values,
        borderColor: '#4AC29A',
        backgroundColor: 'rgba(74, 194, 154, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#4AC29A',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };
});

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 6,
      grid: {
        display: false
      },
      ticks: {
        callback: function(value) {
          const labels = {
            1: 'Low',
            2: 'Down',
            3: 'Neutral',
            4: 'Good',
            5: 'Great'
          };
          return labels[value] || '';
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          const value = context.raw;
          const labels = {
            1: 'Very Low',
            2: 'Low',
            3: 'Neutral',
            4: 'Good',
            5: 'Great'
          };
          return `Mood: ${labels[value] || 'Unknown'}`;
        }
      }
    },
    legend: {
      display: false
    }
  }
};
</script>

<style scoped>
.mood-chart {
  height: 300px;
}
</style>