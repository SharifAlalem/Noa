<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <span class="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">Noa</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="text-neutral-600 hover:text-primary-500 font-medium transition-colors"
          active-class="text-primary-500 font-semibold"
        >
          {{ item.name }}
        </NuxtLink>
        <button 
          class="btn btn-primary"
          @click="toggleUserMenu"
        >
          Profile
        </button>
      </nav>

      <!-- Mobile menu button -->
      <button 
        class="md:hidden text-neutral-600"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span v-if="!isMobileMenuOpen">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden bg-white shadow-lg animate-fadeIn"
    >
      <div class="container mx-auto px-4 py-2">
        <nav class="flex flex-col space-y-3 py-3">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-neutral-600 hover:text-primary-500 py-2 font-medium transition-colors"
            active-class="text-primary-500 font-semibold"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <button 
            class="btn btn-primary w-full mt-2"
            @click="toggleUserMenu"
          >
            Profile
          </button>
        </nav>
      </div>
    </div>

    <!-- User Menu (simple implementation) -->
    <div 
      v-if="isUserMenuOpen" 
      class="absolute right-4 top-16 bg-white shadow-xl rounded-lg p-4 w-64 animate-fadeIn"
    >
      <div class="flex flex-col space-y-2">
        <div class="flex items-center space-x-3 p-2 border-b border-neutral-200 pb-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <div class="font-medium">User Name</div>
            <div class="text-sm text-neutral-500">user@example.com</div>
          </div>
        </div>
        <NuxtLink to="/profile" class="p-2 hover:bg-neutral-100 rounded-md transition-colors" @click="isUserMenuOpen = false">
          Profile Settings
        </NuxtLink>
        <NuxtLink to="/preferences" class="p-2 hover:bg-neutral-100 rounded-md transition-colors" @click="isUserMenuOpen = false">
          Preferences
        </NuxtLink>
        <button class="p-2 text-left hover:bg-neutral-100 rounded-md transition-colors text-error-500">
          Sign Out
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Mood Tracker', path: '/mood' },
  { name: 'Journal', path: '/journal' },
  { name: 'Breathing', path: '/breathing' },
  { name: 'Chat', path: '/chat' },
];

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
  // Close mobile menu if it's open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

// Close menus when clicking outside
onClickOutside(isUserMenuOpen, () => {
  isUserMenuOpen.value = false;
});
</script>