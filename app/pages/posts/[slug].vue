<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ChevronRight, 
  Share2, 
  Check, 
  Clock, 
  Calendar, 
  Sparkles, 
  Quote, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Bookmark,
  Copy,
  X,
  ExternalLink,
  MessageCircle
} from 'lucide-vue-next'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Nuxt Content v3 query
const { data: post } = await useAsyncData(`post-${slug.value}`, () => {
  return queryCollection('posts').where('slug', '=', slug.value).first()
})

const requestUrl = useRequestURL()

// Configuration Open Graph & Meta pour le partage sur les réseaux sociaux (WhatsApp, LinkedIn, Twitter/X, etc.)
useSeoMeta({
  title: () => post.value ? `${post.value.title} — Eden Research & Dev` : 'Eden Research & Dev',
  ogTitle: () => post.value ? post.value.title : 'Eden Research & Dev',
  description: () => post.value 
    ? `Département technique de Grow Tech | Eden Research & Dev : ${post.value.subtitle}` 
    : 'Département technique de Grow Tech : analyses technologiques approfondies et prospective.',
  ogDescription: () => post.value 
    ? `Département technique de Grow Tech | Eden Research & Dev : ${post.value.subtitle}` 
    : 'Département technique de Grow Tech : analyses technologiques approfondies et prospective.',
  ogImage: () => {
    if (!post.value) return `${requestUrl.origin}/images/ai-education.jpg`
    return post.value.coverImage.startsWith('http') 
      ? post.value.coverImage 
      : `${requestUrl.origin}${post.value.coverImage}`
  },
  ogUrl: () => `${requestUrl.origin}/posts/${post.value?.slug || ''}`,
  ogType: 'article',
  ogSiteName: 'Eden Research & Dev — Département technique de Grow Tech',
  twitterCard: 'summary_large_image',
  twitterTitle: () => post.value ? post.value.title : 'Eden Research & Dev',
  twitterDescription: () => post.value 
    ? `Département technique de Grow Tech | Eden Research & Dev : ${post.value.subtitle}` 
    : 'Département technique de Grow Tech',
  twitterImage: () => {
    if (!post.value) return `${requestUrl.origin}/images/ai-education.jpg`
    return post.value.coverImage.startsWith('http') 
      ? post.value.coverImage 
      : `${requestUrl.origin}${post.value.coverImage}`
  },
  articleAuthor: () => ["Meva'a Olivier (Département technique de Grow Tech)"],
})

// État du partage
const isShareModalOpen = ref(false)
const shareCopied = ref(false)

const getFullShareUrl = () => {
  if (import.meta.client) {
    return window.location.href
  }
  return `${requestUrl.origin}/posts/${post.value?.slug || ''}`
}

const handleShare = async () => {
  if (!post.value) return

  const url = getFullShareUrl()
  const title = post.value.title
  const text = `${post.value.title}\n\nDépartement technique de Grow Tech — Eden Research & Dev\n\n${post.value.subtitle}\n`

  // Si le navigateur mobile supporte l'API native (WhatsApp, SMS, etc.)
  if (navigator?.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      })
      return
    } catch {
      // Annulé par l'utilisateur ou non supporté
    }
  }

  // Sinon affichage du modal de partage avec options directes
  isShareModalOpen.value = true
}

const copyShareLink = async () => {
  const url = getFullShareUrl()
  if (navigator?.clipboard) {
    await navigator.clipboard.writeText(url)
    shareCopied.value = true
    setTimeout(() => {
      shareCopied.value = false
    }, 2500)
  }
}

const copyFormattedText = async () => {
  const url = getFullShareUrl()
  const formatted = `${post.value?.title}\n\nDépartement technique de Grow Tech — Eden Research & Dev\n${post.value?.subtitle}\n\nLire l'article complet : ${url}`
  if (navigator?.clipboard) {
    await navigator.clipboard.writeText(formatted)
    shareCopied.value = true
    setTimeout(() => {
      shareCopied.value = false
    }, 2500)
  }
}

const shareToWhatsApp = () => {
  const url = getFullShareUrl()
  const text = `*${post.value?.title}*\n\n_Département technique de Grow Tech • Eden Research & Dev_\n\n${post.value?.subtitle}\n\nLire l'analyse : ${url}`
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
}

const shareToLinkedIn = () => {
  const url = getFullShareUrl()
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const shareToTwitter = () => {
  const url = getFullShareUrl()
  const text = `${post.value?.title} — Département technique de Grow Tech`
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
}
</script>

<template>
  <div v-if="post" class="min-h-screen pb-20">
    
    <!-- Top Editorial Header & Breadcrumb -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
      
      <!-- Breadcrumb (Google The Keyword look) -->
      <nav class="flex items-center gap-1.5 text-xs text-gray-500 mb-6 font-medium" aria-label="Fil d'ariane">
        <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Accueil</NuxtLink>
        <ChevronRight class="w-3.5 h-3.5 text-gray-400" />
        <NuxtLink :to="`/?filter=${post.type}`" class="hover:text-blue-600 transition-colors">{{ post.categoryLabel }}</NuxtLink>
        <ChevronRight class="w-3.5 h-3.5 text-gray-400" />
        <span class="text-gray-800 truncate max-w-[200px] sm:max-w-xs">{{ post.tags[0] }}</span>
      </nav>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-gray-900 tracking-tight leading-[1.12] mb-6">
        {{ post.title }}
      </h1>

      <!-- Subtitle / Chapo -->
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal mb-8">
        {{ post.subtitle }}
      </p>

      <!-- Author Metadata & Share Bar (Google The Keyword look) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-gray-100">
        
        <!-- Author Info -->
        <div class="flex items-center gap-3">
          <img 
            :src="post.author.avatar" 
            :alt="post.author.name" 
            class="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100 shadow-xs"
          />
          <div>
            <div class="font-bold text-gray-900 text-sm leading-snug">
              {{ post.author.name }}
            </div>
            <div class="text-xs text-gray-500 flex items-center gap-2">
              <span>{{ post.author.role }}</span>
              <span>•</span>
              <span>{{ post.publishedAt }}</span>
              <span>•</span>
              <span class="font-medium text-blue-600">{{ post.readTime }}</span>
            </div>
          </div>
        </div>

        <!-- Share & Interaction Actions -->
        <div class="flex items-center gap-2">
          <button 
            @click="handleShare"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Partager cet article"
          >
            <component :is="shareCopied ? Check : Share2" class="w-3.5 h-3.5" :class="shareCopied ? 'text-emerald-600' : 'text-gray-500'" />
            <span>{{ shareCopied ? 'Lien copié !' : 'Partager' }}</span>
          </button>
        </div>

      </div>

    </section>

    <!-- Large Rounded Hero Illustration (Google The Keyword centerpiece) -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
      <div class="relative aspect-[16/9] overflow-hidden rounded-3xl lg:rounded-[36px] bg-[#fdf8f5] border border-gray-200/70 shadow-sm">
        <img 
          :src="post.coverImage" 
          :alt="post.title" 
          class="w-full h-full object-cover"
        />
      </div>
    </section>

    <!-- Dual Action Pills (Listen to Audio + Read 3-point Summary) -->
    <section v-if="post.audioTime || (post.executiveSummary && post.executiveSummary.length)" class="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      <div class="flex flex-wrap items-center gap-3 py-2">
        <!-- Pill 1: Audio Player -->
        <AudioPlayerPill 
          v-if="post.audioTime && post.audioTranscript"
          :audio-time="post.audioTime" 
          :transcript="post.audioTranscript" 
        />

        <!-- Pill 2: 3-point Executive Summary -->
        <ExecutiveSummaryModal 
          v-if="post.executiveSummary && post.executiveSummary.length"
          :summary="post.executiveSummary" 
          :post-title="post.title" 
        />
      </div>
    </section>

    <!-- Main Editorial Article Content -->
    <article class="max-w-3xl mx-auto px-4 sm:px-6 text-gray-800">
      
      <!-- ContentRenderer from Nuxt Content -->
      <div class="article-content">
        <ContentRenderer :value="post" />
      </div>

      <!-- "Posted in" Tags (Google The Keyword look) -->
      <div v-if="post.tags && post.tags.length" class="pt-8 pb-12 mt-12 border-t border-gray-100">
        <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Posté dans :
        </h4>
        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink 
            v-for="tag in post.tags" 
            :key="tag"
            :to="`/?filter=all`"
            class="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>

    </article>


    <!-- Newsletter Box -->
    <NewsletterBox />

    <!-- Share Modal Dialog -->
    <div 
      v-if="isShareModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fadeIn"
      @click.self="isShareModalOpen = false"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 relative space-y-6">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-2 border-b border-gray-100">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Share2 class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-900 leading-tight">Partager cette publication</h3>
              <p class="text-xs text-gray-500">Département technique de Grow Tech</p>
            </div>
          </div>
          <button 
            @click="isShareModalOpen = false"
            class="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Social Share Grid -->
        <div class="grid grid-cols-3 gap-3">
          <!-- WhatsApp (Top priority in Africa/Cameroon) -->
          <button 
            @click="shareToWhatsApp"
            class="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all border border-emerald-100 hover:scale-[1.02] cursor-pointer"
          >
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <MessageCircle class="w-5 h-5" />
            </div>
            <span class="text-xs font-bold">WhatsApp</span>
          </button>

          <!-- LinkedIn -->
          <button 
            @click="shareToLinkedIn"
            class="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 transition-all border border-blue-100 hover:scale-[1.02] cursor-pointer"
          >
            <div class="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-xs">
              <ExternalLink class="w-5 h-5" />
            </div>
            <span class="text-xs font-bold">LinkedIn</span>
          </button>

          <!-- X / Twitter -->
          <button 
            @click="shareToTwitter"
            class="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all border border-gray-200 hover:scale-[1.02] cursor-pointer"
          >
            <div class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xs">
              <span class="font-black text-sm">𝕏</span>
            </div>
            <span class="text-xs font-bold">X (Twitter)</span>
          </button>
        </div>

        <!-- Copy Link & Copy Formatted Post Actions -->
        <div class="space-y-2.5 pt-2 border-t border-gray-100">
          <!-- Direct URL Copy -->
          <div class="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 pl-3.5">
            <input 
              :value="getFullShareUrl()" 
              readonly 
              class="w-full bg-transparent text-xs text-gray-600 focus:outline-none select-all"
            />
            <button 
              @click="copyShareLink"
              class="px-4 py-2 rounded-xl bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              {{ shareCopied ? 'Copié !' : 'Copier' }}
            </button>
          </div>

          <!-- Copy formatted paragraph with Grow Tech & Department name -->
          <button 
            @click="copyFormattedText"
            class="w-full py-2.5 px-4 rounded-2xl border border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 text-xs text-gray-700 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Copy class="w-3.5 h-3.5 text-blue-600" />
            <span>Copier le texte formaté avec Grow Tech</span>
          </button>
        </div>

      </div>
    </div>

  </div>

  <!-- 404 Fallback if slug not found -->
  <div v-else class="max-w-md mx-auto px-4 py-20 text-center">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Article non trouvé</h2>
    <p class="text-sm text-gray-600 mb-6">La publication demandée n'existe pas ou a été déplacée.</p>
    <NuxtLink to="/" class="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm">
      Retour à l'accueil
    </NuxtLink>
  </div>
</template>
