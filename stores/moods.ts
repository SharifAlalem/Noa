import { defineStore } from 'pinia';

export const useMoodStore = defineStore('moods', {
  state: () => ({
    entries: [] as MoodEntry[]
  }),
  
  getters: {
    recentEntries: (state) => {
      // Return entries sorted by date (newest first)
      return [...state.entries].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    },
    
    moodTrend: (state) => {
      if (state.entries.length < 3) return 'neutral';
      
      // Get the last 7 entries or all if less than 7
      const recentEntries = [...state.entries]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 7);
      
      // Map moods to numerical values
      const moodValues: Record<string, number> = {
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
      
      // Calculate average mood value
      const total = recentEntries.reduce((sum, entry) => {
        return sum + (moodValues[entry.mood] || 3);
      }, 0);
      
      const average = total / recentEntries.length;
      
      // Determine trend
      if (average >= 4) return 'positive';
      if (average >= 3) return 'neutral';
      return 'negative';
    }
  },
  
  actions: {
    addEntry(entry: MoodEntry) {
      this.entries.push({
        ...entry,
        id: Date.now().toString()
      });
    },
    
    deleteEntry(id: string) {
      const index = this.entries.findIndex(entry => entry.id === id);
      if (index !== -1) {
        this.entries.splice(index, 1);
      }
    }
  }
});

export interface MoodEntry {
  id?: string;
  mood: string;
  notes: string;
  timestamp: Date;
}