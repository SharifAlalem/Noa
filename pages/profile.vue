<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Profile Settings</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-6">Personal Information</h2>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="label">First Name</label>
                <input type="text" class="input" v-model="profile.firstName" />
              </div>
              <div>
                <label class="label">Last Name</label>
                <input type="text" class="input" v-model="profile.lastName" />
              </div>
            </div>
            
            <div>
              <label class="label">Email</label>
              <input type="email" class="input" v-model="profile.email" />
            </div>
            
            <div>
              <label class="label">Phone (optional)</label>
              <input type="tel" class="input" v-model="profile.phone" />
            </div>
          </div>
          
          <div class="mt-8">
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-bold mb-6">Preferences</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="font-medium mb-3">Appearance</h3>
              <div class="flex space-x-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="light"
                    v-model="preferences.theme"
                    class="form-radio text-primary-400"
                  />
                  <span>Light</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="dark"
                    v-model="preferences.theme"
                    class="form-radio text-primary-400"
                  />
                  <span>Dark</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="theme" 
                    value="system"
                    v-model="preferences.theme"
                    class="form-radio text-primary-400"
                  />
                  <span>System</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium mb-3">Notifications</h3>
              <div class="space-y-3">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.notifyReminders"
                    class="form-checkbox text-primary-400"
                  />
                  <span>Daily check-in reminders</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.notifyTips"
                    class="form-checkbox text-primary-400"
                  />
                  <span>Wellness tips</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.notifyJournal"
                    class="form-checkbox text-primary-400"
                  />
                  <span>Journal reminders</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium mb-3">AI Features</h3>
              <div class="space-y-3">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.voiceEnabled"
                    class="form-checkbox text-primary-400"
                  />
                  <span>Enable voice responses (ElevenLabs)</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.videoEnabled"
                    class="form-checkbox text-primary-400"
                  />
                  <span>Enable video agent (Tavus)</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="mt-8">
            <button class="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
      
      <div>
        <div class="card mb-8">
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold mb-4">
              US
            </div>
            <h2 class="text-xl font-bold">User Sample</h2>
            <p class="text-neutral-500">user@example.com</p>
            
            <button class="btn btn-outline mt-6 w-full">Change Profile Picture</button>
          </div>
        </div>
        
        <div class="card mb-8">
          <h2 class="text-xl font-bold mb-4">Account</h2>
          <div class="space-y-4">
            <button class="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors flex justify-between items-center">
              <span>Change Password</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button class="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors flex justify-between items-center">
              <span>Privacy Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button class="w-full text-left p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors flex justify-between items-center">
              <span>Export Your Data</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div class="mt-6 pt-6 border-t border-neutral-200">
            <button class="w-full text-left text-error-500 hover:text-error-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

useHead({
  title: 'Profile Settings'
});

const profile = ref({
  firstName: 'User',
  lastName: 'Sample',
  email: 'user@example.com',
  phone: ''
});

const preferences = ref({
  theme: 'light',
  notifyReminders: true,
  notifyTips: true,
  notifyJournal: false,
  voiceEnabled: false,
  videoEnabled: false
});
</script>