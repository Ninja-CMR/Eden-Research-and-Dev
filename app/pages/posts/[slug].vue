<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPostBySlug } from '~/data/posts'
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
const post = computed(() => getPostBySlug(slug.value))

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
    <section class="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      <div class="flex flex-wrap items-center gap-3 py-2">
        <!-- Pill 1: Audio Player -->
        <AudioPlayerPill 
          :audio-time="post.audioTime" 
          :transcript="post.audioTranscript" 
        />

        <!-- Pill 2: 3-point Executive Summary -->
        <ExecutiveSummaryModal 
          :summary="post.executiveSummary" 
          :post-title="post.title" 
        />
      </div>
    </section>

    <!-- Main Editorial Article Content -->
    <article class="max-w-3xl mx-auto px-4 sm:px-6 text-gray-800">
      
      <!-- Intro Paragraph (Editorial Lead) -->
      <div class="text-lg sm:text-xl font-normal text-gray-800 leading-relaxed mb-12 border-l-4 border-blue-600 pl-5 py-1">
        {{ post.content.intro }}
      </div>

      <!-- Sections -->
      <div class="space-y-12">
        <section 
          v-for="section in post.content.sections" 
          :key="section.id"
          :id="section.id"
          class="scroll-mt-24 space-y-5"
        >
          <!-- Section Title -->
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-2">
            {{ section.title }}
          </h2>

          <!-- Section Lead -->
          <p v-if="section.lead" class="text-base sm:text-lg font-medium text-gray-700 leading-relaxed italic">
            {{ section.lead }}
          </p>

          <!-- Paragraphs -->
          <p 
            v-for="(p, pIdx) in section.paragraphs" 
            :key="pIdx"
            class="text-base sm:text-[17px] text-gray-700 leading-[1.75]"
          >
            {{ p }}
          </p>

          <!-- Bullets -->
          <div v-if="section.bullets" class="space-y-4 my-6">
            <div 
              v-for="(b, bIdx) in section.bullets" 
              :key="bIdx"
              class="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-100/80 space-y-1.5"
            >
              <h3 class="font-bold text-gray-900 text-base flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                {{ b.title }}
              </h3>
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed pl-4">
                {{ b.text }}
              </p>
            </div>
          </div>

          <!-- Callout / Quotes / Warnings -->
          <div v-if="section.callout" class="my-8">
            <!-- Quote Callout -->
            <div 
              v-if="section.callout.type === 'quote'"
              class="relative p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-100"
            >
              <Quote class="w-8 h-8 text-blue-400/80 mb-3" />
              <blockquote class="text-lg sm:text-xl font-medium text-gray-900 italic leading-relaxed mb-3">
                « {{ section.callout.text }} »
              </blockquote>
              <div v-if="section.callout.author" class="text-xs font-bold text-blue-700 uppercase tracking-wider">
                — {{ section.callout.author }}
              </div>
            </div>

            <!-- Warning Callout -->
            <div 
              v-else-if="section.callout.type === 'warning'"
              class="p-6 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5"
            >
              <AlertCircle class="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 v-if="section.callout.title" class="font-bold text-amber-900 text-base mb-1">
                  {{ section.callout.title }}
                </h4>
                <p class="text-sm sm:text-base text-amber-800 leading-relaxed">
                  {{ section.callout.text }}
                </p>
              </div>
            </div>
          </div>

          <!-- Comparison Table -->
          <div v-if="section.table" class="my-8 overflow-hidden rounded-2xl border border-gray-200 shadow-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-100 text-gray-900 font-bold border-b border-gray-200">
                  <tr>
                    <th 
                      v-for="(header, hIdx) in section.table.headers" 
                      :key="hIdx"
                      class="px-4 py-3.5"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr 
                    v-for="(row, rIdx) in section.table.rows" 
                    :key="rIdx"
                    class="hover:bg-gray-50/70 transition-colors"
                  >
                    <td class="px-4 py-3.5 font-bold text-gray-900 whitespace-nowrap">
                      {{ row[0] }}
                    </td>
                    <td class="px-4 py-3.5 text-emerald-800 bg-emerald-50/30">
                      {{ row[1] }}
                    </td>
                    <td class="px-4 py-3.5 text-amber-800 bg-amber-50/30">
                      {{ row[2] }}
                    </td>
                    <td class="px-4 py-3.5 text-blue-800 bg-blue-50/30 font-medium">
                      {{ row[3] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Code Snippet -->
          <div v-if="section.codeSnippet" class="my-6">
            <CodeBlock 
              :code="section.codeSnippet.code"
              :language="section.codeSnippet.language"
              :filename="section.codeSnippet.filename"
              :explanation="section.codeSnippet.explanation"
            />
          </div>

        </section>
      </div>

      <!-- Conclusion Card -->
      <div class="my-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200/60 space-y-4">
        <div class="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <span>Synthèse &amp; Conclusion</span>
        </div>
        
        <h3 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {{ post.content.conclusion.title }}
        </h3>

        <p class="text-base text-gray-700 leading-relaxed">
          {{ post.content.conclusion.text }}
        </p>

        <!-- Key Takeaways Checklist -->
        <div class="pt-4 border-t border-blue-200/50 space-y-2.5">
          <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">
            Ce qu'il faut retenir (Key Takeaways) :
          </h4>
          <div 
            v-for="(t, tIdx) in post.content.conclusion.takeaways" 
            :key="tIdx"
            class="flex items-start gap-2.5 text-sm text-gray-800"
          >
            <CheckCircle2 class="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>{{ t }}</span>
          </div>
        </div>
      </div>

      <!-- "Posted in" Tags (Google The Keyword look) -->
      <div class="pt-8 pb-12 border-t border-gray-100">
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
