<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { POSTS, type PostCategory } from '~/data/posts'
import { Search, Sparkles, Filter, BookOpen, Code, Compass, ArrowRight, Clock } from 'lucide-vue-next'

const route = useRoute()

// Active filter category
const selectedCategory = ref<string>((route.query.filter as string) || 'all')
const searchQuery = ref<string>('')

// Featured post is the main article (IA en milieu scolaire)
const featuredPost = computed(() => POSTS.find(p => p.featured) || POSTS[0])

// Filtered posts for the catalogue
const filteredPosts = computed(() => {
  return POSTS.filter(post => {
    // Category match
    const matchesCategory = selectedCategory.value === 'all' || post.type === selectedCategory.value
    // Search query match
    const query = searchQuery.value.toLowerCase().trim()
    const matchesSearch = !query || 
      post.title.toLowerCase().includes(query) ||
      post.subtitle.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query)) ||
      post.excerpt.toLowerCase().includes(query)
    
    return matchesCategory && matchesSearch
  })
})

const setCategory = (cat: string) => {
  selectedCategory.value = cat
}
</script>

<template>
  <div>
    <!-- Hero Banner / Featured Story (Google The Keyword Style) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div class="relative bg-gradient-to-br from-[#f8fafd] to-[#f1f5f9] border border-gray-200/80 rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12 shadow-xs">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Text Content -->
          <div class="lg:col-span-7 space-y-4">
            
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 tracking-wide uppercase">
                <Sparkles class="w-3.5 h-3.5 text-blue-600" />
                Publication Majeure
              </span>
              <span class="text-xs text-gray-400">•</span>
              <span class="text-xs text-gray-500 font-medium">{{ featuredPost.readTime }}</span>
            </div>

            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              <NuxtLink :to="`/posts/${featuredPost.slug}`" class="hover:text-blue-600 transition-colors">
                {{ featuredPost.title }}
              </NuxtLink>
            </h1>

            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {{ featuredPost.subtitle }}
            </p>

            <!-- Meta Author & CTA -->
            <div class="pt-4 flex flex-wrap items-center gap-4">
              <div class="flex items-center gap-3">
                <img 
                  :src="featuredPost.author.avatar" 
                  :alt="featuredPost.author.name" 
                  class="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <div class="font-bold text-gray-900 text-sm">{{ featuredPost.author.name }}</div>
                  <div class="text-xs text-gray-500">{{ featuredPost.publishedAt }}</div>
                </div>
              </div>

              <NuxtLink 
                :to="`/posts/${featuredPost.slug}`"
                class="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-600/20"
              >
                <span>Lire l'analyse complète</span>
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
            </div>

          </div>

          <!-- Featured Image Card -->
          <div class="lg:col-span-5">
            <NuxtLink :to="`/posts/${featuredPost.slug}`" class="block group relative aspect-[16/11] rounded-2xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200/50">
              <img 
                :src="featuredPost.coverImage" 
                :alt="featuredPost.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-950/20 via-transparent to-transparent"></div>
            </NuxtLink>
          </div>
        </div>

      </div>
    </section>

    <!-- Catalogue & Filtering Section -->
    <section id="catalogue" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Filter Bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-gray-100">
        
        <!-- Category Pills -->
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button 
            @click="setCategory('all')"
            class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all"
            :class="selectedCategory === 'all' ? 'bg-gray-900 text-white shadow-xs' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            Tous les formats ({{ POSTS.length }})
          </button>
          
          <button 
            @click="setCategory('analysis')"
            class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
            :class="selectedCategory === 'analysis' ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'"
          >
            <BookOpen class="w-3.5 h-3.5" />
            <span>Analyses</span>
          </button>

          <button 
            @click="setCategory('code')"
            class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
            :class="selectedCategory === 'code' ? 'bg-purple-600 text-white shadow-xs' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'"
          >
            <Code class="w-3.5 h-3.5" />
            <span>Codes &amp; Scripts</span>
          </button>

          <button 
            @click="setCategory('skill')"
            class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
            :class="selectedCategory === 'skill' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>Skills &amp; Méthodes</span>
          </button>
        </div>

        <!-- Search input -->
        <div class="relative w-full md:w-72">
          <Search class="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher une analyse, un tag..."
            class="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 bg-gray-50/50"
          />
        </div>

      </div>

      <!-- Articles Grid -->
      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        <PostCard 
          v-for="post in filteredPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>

      <!-- Empty state if search yields no result -->
      <div v-else class="text-center py-16">
        <div class="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
          <Search class="w-6 h-6" />
        </div>
        <h3 class="text-base font-bold text-gray-900 mb-1">Aucune publication trouvée</h3>
        <p class="text-xs text-gray-500 mb-4">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
        <button 
          @click="selectedCategory = 'all'; searchQuery = ''"
          class="px-4 py-2 rounded-full bg-gray-900 text-white text-xs font-semibold"
        >
          Réinitialiser les filtres
        </button>
      </div>

    </section>

    <!-- Lab Philosophy Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="rounded-3xl bg-[#f8f9fa] border border-gray-200/80 p-8 sm:p-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div class="space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 class="font-bold text-gray-900 text-lg">Analyses Systémiques</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Décrypter les mutations de l'IA sans parti-pris : impacts réels, dilemmes sociétaux et prospective technologique documentée.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 class="font-bold text-gray-900 text-lg">Codes Source Ouverts</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Passer de la théorie à la pratique avec des implémentations complètes, des architectures de sécurité et des scripts prêts au déploiement.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 class="font-bold text-gray-900 text-lg">Skills Réutilisables</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Méthodes pas-à-pas, matrices de prompts et compétences clés pour transformer l'intelligence artificielle en partenaire de réflexion.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Newsletter CTA -->
    <NewsletterBox />
  </div>
</template>
