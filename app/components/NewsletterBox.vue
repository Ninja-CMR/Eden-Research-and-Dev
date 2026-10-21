<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, Mail, CheckCircle2 } from 'lucide-vue-next'

const email = ref('')
const isSuccess = ref(false)

const subscribe = () => {
  if (email.value) {
    isSuccess.value = true
    setTimeout(() => {
      isSuccess.value = false
      email.value = ''
    }, 4000)
  }
}
</script>

<template>
  <section class="my-16 max-w-5xl mx-auto px-4 sm:px-6">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#f8f9fa] to-[#edf2f7] border border-gray-200/80 p-8 sm:p-12 text-center shadow-xs">
      
      <!-- Subtle background circles -->
      <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-100/50 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold mb-4">
          <Sparkles class="w-3.5 h-3.5" />
          <span>Veille &amp; Prospective Technologique</span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Recevez les dernières publications d'Eden R&amp;D
        </h2>

        <p class="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
          Inscrivez-vous pour recevoir directement nos analyses exclusives, nos implémentations de code commentées et nos fiches de compétences en IA.
        </p>

        <!-- Form -->
        <form v-if="!isSuccess" @submit.prevent="subscribe" class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <div class="relative w-full">
            <Mail class="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              v-model="email"
              type="email" 
              required
              placeholder="votre.email@domaine.com" 
              class="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white text-sm text-gray-900 shadow-xs"
            />
          </div>
          <button 
            type="submit"
            class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95 whitespace-nowrap"
          >
            S'inscrire
          </button>
        </form>

        <div v-else class="p-4 rounded-2xl bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-sm font-semibold inline-flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 class="w-5 h-5" />
          <span>Félicitations ! Vous êtes bien inscrit aux prochaines éditions.</span>
        </div>

        <p class="text-xs text-gray-500 mt-5 leading-normal">
          Vos informations sont traitées dans le strict respect de votre vie privée. Désinscription immédiate en 1 clic à tout moment.
        </p>
      </div>
    </div>
  </section>
</template>
