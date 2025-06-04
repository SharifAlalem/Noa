import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    preferences: {
      notifications: true,
      theme: 'light',
      voiceEnabled: false,
      videoEnabled: false
    }
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.user,
    userInitials: (state) => {
      if (!state.user) return '';
      
      const { firstName, lastName } = state.user;
      return firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');
    }
  },
  
  actions: {
    login(userData: User) {
      this.user = userData;
    },
    
    logout() {
      this.user = null;
    },
    
    updatePreferences(newPreferences: Partial<Preferences>) {
      this.preferences = {
        ...this.preferences,
        ...newPreferences
      };
    }
  }
});

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Preferences {
  notifications: boolean;
  theme: 'light' | 'dark';
  voiceEnabled: boolean;
  videoEnabled: boolean;
}