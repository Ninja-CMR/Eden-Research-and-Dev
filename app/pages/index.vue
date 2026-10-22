<script setup lang="ts">
import { ref, computed } from 'vue'
import { POSTS } from '~/data/posts'
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Mail 
} from 'lucide-vue-next'

const requestUrl = useRequestURL()

// Featured article on AI in education
const heroPost = computed(() => {
  return POSTS.find(p => p.slug === 'intelligence-artificielle-milieu-scolaire') || POSTS[0]
})

useSeoMeta({
  title: 'Eden Research & Dev — Département technique de Grow Tech',
  ogTitle: 'Eden Research & Dev — Département technique de Grow Tech',
  description: 'Département technique de Grow Tech : laboratoire de recherche appliquée et prospective technologique en IA et ingénierie logicielle.',
  ogDescription: 'Département technique de Grow Tech : laboratoire de recherche appliquée et prospective technologique en IA et ingénierie logicielle.',
  ogImage: () => `${requestUrl.origin}/images/ai-education.jpg`,
  ogUrl: () => requestUrl.origin,
  ogType: 'website',
  ogSiteName: 'Eden Research & Dev — Département technique de Grow Tech',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Eden Research & Dev — Département technique de Grow Tech',
  twitterDescription: 'Département technique de Grow Tech : analyses technologiques approfondies et prospective.',
  twitterImage: () => `${requestUrl.origin}/images/ai-education.jpg`,
})

// Newsletter inline state
const inlineEmail = ref('')
const inlineSuccess = ref(false)

const handleInlineSubscribe = () => {
  if (inlineEmail.value) {
    inlineSuccess.value = true
    setTimeout(() => {
      inlineSuccess.value = false
      inlineEmail.value = ''
    }, 4000)
  }
}
</script>

<template>
  <div class="space-y-16 lg:space-y-24 pb-20">

    <!-- 1. HERO SECTION (Focus exclusif : IA en milieu scolaire) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <!-- Left Hero Card: Soft Pastel Ice-Blue Background -->
        <div class="lg:col-span-7 bg-[#eef3fc] rounded-[32px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between border border-[#dbe6f6] shadow-xs relative overflow-hidden transition-all duration-300">
          
          <div class="space-y-5">
            <!-- Category Tag Pill -->
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-blue-700 shadow-xs border border-blue-100">
                {{ heroPost.categoryLabel }}
              </span>
              <span class="text-xs text-gray-400">•</span>
              <span class="text-xs font-semibold text-gray-500">{{ heroPost.readTime }}</span>
            </div>

            <!-- Massive Editorial Title -->
            <h1 class="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-900 tracking-tight leading-[1.14]">
              <NuxtLink :to="`/posts/${heroPost.slug}`" class="hover:text-blue-600 transition-colors">
                {{ heroPost.title }}
              </NuxtLink>
            </h1>

            <!-- Subtitle / Excerpt -->
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {{ heroPost.subtitle }}
            </p>
          </div>

          <!-- Bottom Action: CTA -->
          <div class="pt-8 sm:pt-10 flex items-center justify-between border-t border-blue-200/50 mt-6">
            <NuxtLink 
              :to="`/posts/${heroPost.slug}`"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20"
            >
              <span>Lire l'analyse complète</span>
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>

        </div>

        <!-- Right Hero Card: Large Visual Presentation with Rounded Corners -->
        <div class="lg:col-span-5 bg-gradient-to-tr from-[#1a73e8] to-[#60a5fa] rounded-[32px] overflow-hidden relative shadow-md group min-h-[340px] lg:min-h-auto">
          <NuxtLink :to="`/posts/${heroPost.slug}`" class="block w-full h-full relative">
            <img 
              :src="heroPost.coverImage" 
              :alt="heroPost.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            <!-- Soft gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent"></div>

            <!-- Floating Pill Badge on Image -->
            <div class="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
              <div class="flex items-center gap-2 backdrop-blur-md bg-black/40 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-medium">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Édition Spéciale Eden R&amp;D</span>
              </div>
              <div class="backdrop-blur-md bg-white/20 hover:bg-white/30 text-white p-2 rounded-full border border-white/30 transition-all">
                <ArrowUpRight class="w-4 h-4" />
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- 2. NEWSLETTER SUBSCRIPTION BANNER (Google Inbox Banner Style) -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[#fef9f3] to-[#faf3e8] border border-[#f2e6d5] p-8 sm:p-12 text-center shadow-xs">
        
        <!-- Soft decorative circles -->
        <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-100/60 blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-blue-100/50 blur-2xl pointer-events-none"></div>

        <div class="relative z-10 max-w-2xl mx-auto space-y-4">
          
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Recevez les publications d'Eden R&amp;D dans votre boîte mail
          </h2>

          <p class="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            Une sélection hebdomadaire rigoureuse : dossiers d'impact, architectures de sécurité et méthodes d'apprentissage prêtes à l'emploi.
          </p>

          <!-- Form matching Google's clean pill input -->
          <form v-if="!inlineSuccess" @submit.prevent="handleInlineSubscribe" class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div class="relative w-full">
              <Mail class="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                v-model="inlineEmail"
                type="email" 
                required
                placeholder="votre.email@domaine.com" 
                class="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white text-sm text-gray-900 shadow-xs"
              />
            </div>
            <button 
              type="submit"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              S'inscrire
            </button>
          </form>

          <div v-else class="p-4 rounded-2xl bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-sm font-semibold inline-flex items-center gap-2">
            <CheckCircle2 class="w-5 h-5 text-emerald-600" />
            <span>Merci ! Vous recevrez nos prochaines analyses par e-mail.</span>
          </div>

          <p class="text-xs text-gray-400 pt-2">
            Zéro spam. Désabonnement en 1 clic à tout moment. Respect de la vie privée.
          </p>

        </div>
      </div>
    </section>

  </div>
</template>
