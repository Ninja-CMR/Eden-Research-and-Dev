<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Mail,
  Sparkles,
  Search,
  X,
  BookOpen,
  Code2
} from 'lucide-vue-next'
import PostCard from '~/components/PostCard.vue'

const route = useRoute()
const requestUrl = useRequestURL()

// Fetch all posts using Nuxt Content v3
const { data: posts } = await useAsyncData('home-posts', () => {
  return queryCollection('posts').all()
})

// Featured hero post (default to entrepreneurship post or AI education)
const heroPost = computed(() => {
  if (!posts.value || posts.value.length === 0) return null
  return (
    posts.value.find(p => p.slug === 'creer-entreprise-cameroun-afrique-defis-fondations') ||
    posts.value.find(p => p.slug === 'intelligence-artificielle-milieu-scolaire') ||
    posts.value[0]
  )
})

// Filter & Search states
const activeCategory = ref('all')
const searchQuery = ref('')

// Synchroniser automatiquement avec l'URL (?filter=analysis / code / skill)
watchEffect(() => {
  const queryFilter = route.query.filter as string
  if (queryFilter && ['analysis', 'code', 'skill', 'all'].includes(queryFilter)) {
    activeCategory.value = queryFilter
  }
})

const categories = [
  { id: 'all', label: 'Toutes les publications' },
  { id: 'analysis', label: 'Analyses Stratégiques' },
  { id: 'code', label: 'Codes & Architecture' },
  { id: 'skill', label: 'Skills & Méthodes' },
]

const filteredPosts = computed(() => {
  if (!posts.value) return []
  
  return posts.value.filter(p => {
    // Si pas de recherche active, on exclut l'article hero pour ne pas faire doublon
    if (!searchQuery.value && p.slug === heroPost.value?.slug) {
      return false
    }

    // Filtre par catégorie
    const matchesCategory = activeCategory.value === 'all' || p.type === activeCategory.value
    if (!matchesCategory) return false

    // Filtre par recherche texte
    if (!searchQuery.value.trim()) return true
    const q = searchQuery.value.toLowerCase().trim()
    const matchTitle = p.title?.toLowerCase().includes(q)
    const matchSubtitle = p.subtitle?.toLowerCase().includes(q)
    const matchExcerpt = p.excerpt?.toLowerCase().includes(q)
    const matchTags = p.tags?.some(tag => tag.toLowerCase().includes(q))

    return matchTitle || matchSubtitle || matchExcerpt || matchTags
  })
})

useSeoMeta({
  title: 'Eden Research & Dev — Département technique de Grow Tech',
  ogTitle: 'Eden Research & Dev — Département technique de Grow Tech',
  description: 'Département technique de Grow Tech : laboratoire de recherche appliquée et prospective technologique en IA et ingénierie logicielle pour le Cameroun et l\'Afrique.',
  ogDescription: 'Département technique de Grow Tech : laboratoire de recherche appliquée et prospective technologique en IA et ingénierie logicielle pour le Cameroun et l\'Afrique.',
  ogImage: () => `${requestUrl.origin}/images/entrepreneurship-africa.jpg`,
  ogUrl: () => requestUrl.origin,
  ogType: 'website',
  ogSiteName: 'Eden Research & Dev — Département technique de Grow Tech',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Eden Research & Dev — Département technique de Grow Tech',
  twitterDescription: 'Département technique de Grow Tech : analyses technologiques approfondies et prospective.',
  twitterImage: () => `${requestUrl.origin}/images/entrepreneurship-africa.jpg`,
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

    <!-- 1. HERO SECTION -->
    <section v-if="heroPost" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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
              <NuxtLink :to="heroPost.path || `/posts/${heroPost.slug}`" class="hover:text-blue-600 transition-colors">
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
              :to="heroPost.path || `/posts/${heroPost.slug}`"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20"
            >
              <span>Lire l'analyse complète</span>
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
          </div>

        </div>

        <!-- Right Hero Card: Large Visual Presentation with Rounded Corners -->
        <div class="lg:col-span-5 bg-gradient-to-tr from-[#1a73e8] to-[#60a5fa] rounded-[32px] overflow-hidden relative shadow-md group min-h-[340px] lg:min-h-auto">
          <NuxtLink :to="heroPost.path || `/posts/${heroPost.slug}`" class="block w-full h-full relative">
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

    <!-- 2. PUBLICATIONS FEED (Google The Keyword Card Grid) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header & Filter / Search Controls -->
      <div class="space-y-6 mb-10 pb-6 border-b border-gray-100">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Publications &amp; Recherches</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Explorer les travaux d'Eden R&amp;D
            </h2>
            <p class="text-sm sm:text-base text-gray-500 mt-1 max-w-xl">
              Retrouvez l'ensemble de nos analyses, architectures logicielles et méthodes d'apprentissage.
            </p>
          </div>

          <!-- Instant Search Box -->
          <div class="relative w-full md:w-72">
            <Search class="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Rechercher une analyse, un tag..." 
              class="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 shadow-xs transition-all"
            />
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Filter Pills Bar & Counter -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              type="button"
              class="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
              :class="activeCategory === cat.id 
                ? 'bg-gray-900 text-white shadow-xs' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              {{ cat.label }}
            </button>
          </div>

          <div class="text-xs text-gray-400 font-medium">
            <span class="text-gray-700 font-semibold">{{ filteredPosts.length }}</span> publication{{ filteredPosts.length > 1 ? 's' : '' }}
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <PostCard 
          v-for="post in filteredPosts" 
          :key="post.id || post.slug" 
          :post="post" 
        />
      </div>

      <div v-else class="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
        <p class="text-gray-500 text-sm">Aucune publication trouvée dans cette catégorie pour le moment.</p>
      </div>

    </section>

    <!-- 3. NEWSLETTER SUBSCRIPTION BANNER (Google Inbox Banner Style) -->
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
