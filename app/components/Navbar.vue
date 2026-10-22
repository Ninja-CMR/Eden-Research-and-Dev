<script setup lang="ts">
import { ref } from 'vue'
import { Sparkles, Menu, X, ArrowUpRight, Search } from 'lucide-vue-next'
const isMobileMenuOpen = ref(false)
const isNewsletterOpen = ref(false)
const emailInput = ref('')
const subscribed = ref(false)


const handleSubscribe = () => {
  if (emailInput.value) {
    subscribed.value = true
    setTimeout(() => {
      subscribed.value = false
      emailInput.value = ''
      isNewsletterOpen.value = false
    }, 2500)
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        
        <!-- Brand Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group py-1" title="Accueil Eden Research & Dev">
          <img 
            src="/logoEden.png" 
            alt="Eden Research & Dev" 
            class="h-11 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </NuxtLink>

        <!-- Desktop Navigation Categories -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink 
            to="/?filter=analysis" 
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            Analyses
          </NuxtLink>
          <NuxtLink 
            to="/?filter=code" 
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            Codes
          </NuxtLink>
          <NuxtLink 
            to="/?filter=skill" 
            class="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            Skills
          </NuxtLink>
          <NuxtLink 
            to="/posts/intelligence-artificielle-milieu-scolaire" 
            class="px-4 py-2 rounded-full text-sm font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100/70 transition-colors flex items-center gap-1"
          >
            <span>À la une</span>
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="hidden sm:flex items-center gap-3">
          <NuxtLink 
            to="/#catalogue"
            class="p-2.5 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            title="Rechercher"
          >
            <Search class="w-4 h-4" />
          </NuxtLink>

          <button 
            @click="isNewsletterOpen = true"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-600/25"
          >
            <span>Newsletter</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>

      </div>
    </div>

    <!-- Mobile Dropdown Navigation -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
      <NuxtLink 
        to="/?filter=analysis" 
        @click="isMobileMenuOpen = false"
        class="block px-4 py-3 rounded-2xl text-base font-medium text-gray-800 hover:bg-gray-50"
      >
        Analyses
      </NuxtLink>
      <NuxtLink 
        to="/?filter=code" 
        @click="isMobileMenuOpen = false"
        class="block px-4 py-3 rounded-2xl text-base font-medium text-gray-800 hover:bg-gray-50"
      >
        Codes
      </NuxtLink>
      <NuxtLink 
        to="/?filter=skill" 
        @click="isMobileMenuOpen = false"
        class="block px-4 py-3 rounded-2xl text-base font-medium text-gray-800 hover:bg-gray-50"
      >
        Skills
      </NuxtLink>
      <NuxtLink 
        to="/posts/intelligence-artificielle-milieu-scolaire" 
        @click="isMobileMenuOpen = false"
        class="block px-4 py-3 rounded-2xl text-base font-medium text-blue-700 bg-blue-50"
      >
        À la une : IA &amp; Éducation en Afrique
      </NuxtLink>
      <div class="pt-2">
        <button 
          @click="isNewsletterOpen = true; isMobileMenuOpen = false"
          class="w-full py-3 rounded-2xl bg-blue-600 text-white font-medium text-center shadow-sm"
        >
          S'inscrire à la Newsletter
        </button>
      </div>
    </div>

    <!-- Newsletter Modal Popup -->
    <div 
      v-if="isNewsletterOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
      @click.self="isNewsletterOpen = false"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative">
        <button 
          @click="isNewsletterOpen = false" 
          class="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <Sparkles class="w-6 h-6" />
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-2">
          Recevez les analyses Eden R&amp;D
        </h3>
        <p class="text-sm text-gray-600 mb-6">
          Une synthèse hebdomadaire sans compromis : nouveaux modèles d'IA, codes décortiqués et méthodologies de pointe.
        </p>

        <form v-if="!subscribed" @submit.prevent="handleSubscribe" class="space-y-3">
          <input 
            v-model="emailInput"
            type="email" 
            required
            placeholder="votre.email@domaine.com"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
          />
          <button 
            type="submit"
            class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
          >
            S'inscrire gratuitement
          </button>
        </form>

        <div v-else class="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium text-center">
          🎉 Merci ! Vous êtes désormais inscrit aux publications Eden R&amp;D.
        </div>

        <p class="text-xs text-gray-400 mt-4 text-center">
          Aucun spam. Désabonnement en 1 clic.
        </p>
      </div>
    </div>
  </header>
</template>
