<template>
  <footer class="bg-neutral-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">Noa</h3>
          <p class="text-neutral-300">Your AI-powered wellness companion for mental and emotional health.</p>
        </div>
        <div>
          <h4 class="font-bold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in footerLinks" :key="item.path">
              <NuxtLink :to="item.path" class="text-neutral-300 hover:text-primary-400 transition-colors">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4">Contact</h4>
          <p class="text-neutral-300">Questions or feedback? Reach out to us.</p>
          <button class="btn btn-outline mt-4 border-white text-white hover:bg-white hover:text-neutral-800">Contact Support</button>
        </div>
      </div>
      <div class="border-t border-neutral-700 mt-8 pt-6 text-neutral-400 text-sm text-center">
        <p>&copy; {{ new Date().getFullYear() }} Noa Wellness. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mood Tracker', path: '/mood' },
  { name: 'Journal', path: '/journal' },
  { name: 'Breathing', path: '/breathing' },
  { name: 'Chat', path: '/chat' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
];
</script>