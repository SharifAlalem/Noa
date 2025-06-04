<template>
  <div>
    <section class="bg-gradient-to-b from-primary-50 to-secondary-50 py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-neutral-800">Your AI Wellness Companion</h1>
            <p class="text-lg mb-6 text-neutral-600">Noa helps you nurture your mental and emotional health through personalized support, guided exercises, and AI-powered conversations.</p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/mood" class="btn btn-primary">Check In Now</NuxtLink>
              <NuxtLink to="/chat" class="btn btn-outline">Talk with Noa</NuxtLink>
            </div>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img 
              src="https://images.pexels.com/photos/4101142/pexels-photo-4101142.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Person meditating" 
              class="rounded-xl shadow-lg max-w-full h-auto"
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">How Noa Supports You</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="card hover:shadow-lg transition-all duration-300">
            <div class="text-3xl mb-4 text-primary-500">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-neutral-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-secondary-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-6">Start Your Wellness Journey</h2>
        <p class="text-center text-lg mb-12 max-w-2xl mx-auto">Choose a path that resonates with how you're feeling right now.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink to="/mood" class="wellness-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div class="text-4xl mb-4">😊</div>
            <h3 class="text-xl font-bold mb-2">Track Your Mood</h3>
            <p class="text-neutral-600 mb-4">Log how you're feeling and track patterns over time to gain insights into your emotional wellbeing.</p>
            <span class="mt-auto text-primary-500 font-medium flex items-center">
              Start tracking
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </NuxtLink>
          
          <NuxtLink to="/breathing" class="wellness-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div class="text-4xl mb-4">🧘</div>
            <h3 class="text-xl font-bold mb-2">Breathing Exercises</h3>
            <p class="text-neutral-600 mb-4">Guided breathing techniques to help you relax, reduce stress and find your center.</p>
            <span class="mt-auto text-primary-500 font-medium flex items-center">
              Start breathing
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </NuxtLink>
          
          <NuxtLink to="/journal" class="wellness-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div class="text-4xl mb-4">📔</div>
            <h3 class="text-xl font-bold mb-2">Journal Your Thoughts</h3>
            <p class="text-neutral-600 mb-4">Express yourself freely in a private space with guided prompts to encourage reflection.</p>
            <span class="mt-auto text-primary-500 font-medium flex items-center">
              Start writing
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 class="text-3xl font-bold mb-4">Talk with Noa AI</h2>
            <p class="text-lg mb-6 text-neutral-600">Our AI-powered companion provides trauma-informed conversations, personalized guidance, and a non-judgmental space to express yourself.</p>
            <div class="bg-neutral-100 p-4 rounded-lg mb-6">
              <div class="flex items-start mb-4">
                <div class="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                  N
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <p>Hi there! How are you feeling today? I'm here to listen and support you.</p>
                </div>
              </div>
              <div class="flex items-start justify-end">
                <div class="bg-primary-100 p-3 rounded-lg shadow-sm">
                  <p>I've been feeling a bit overwhelmed lately with work and life.</p>
                </div>
                <div class="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-white font-bold ml-3 flex-shrink-0">
                  Y
                </div>
              </div>
            </div>
            <NuxtLink to="/chat" class="btn btn-primary">Start a Conversation</NuxtLink>
          </div>
          <div class="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/3851622/pexels-photo-3851622.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Person using smartphone" 
              class="rounded-xl shadow-lg max-w-full h-auto"
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-primary-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Start Your Wellness Journey Today</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">Take the first step toward better mental and emotional health with Noa's personalized support.</p>
        <NuxtLink to="/mood" class="btn btn-primary px-8 py-3 text-lg">Begin Now</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Home'
});

const features = [
  {
    icon: '😊',
    title: 'Mood Tracking',
    description: 'Log and visualize your emotional patterns to gain insights into your mental wellbeing.'
  },
  {
    icon: '🧘',
    title: 'Breathing Exercises',
    description: 'Guided breathing techniques to reduce stress and anxiety in moments of need.'
  },
  {
    icon: '📔',
    title: 'Journaling',
    description: 'Express your thoughts and feelings with AI-guided prompts for deeper reflection.'
  },
  {
    icon: '💬',
    title: 'AI Conversations',
    description: 'Trauma-informed discussions with a compassionate AI companion available 24/7.'
  }
];
</script>

<style scoped>
.wellness-card {
  height: 100%;
}
</style>