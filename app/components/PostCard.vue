<script setup lang="ts">
import { Clock, ArrowRight, Code, Sparkles, BookOpen } from 'lucide-vue-next'
import type { Post } from '~/data/posts'

const props = defineProps<{
  post: Post
}>()

const getCategoryBadgeClass = (type: string) => {
  switch (type) {
    case 'analysis':
      return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'code':
      return 'bg-purple-50 text-purple-700 border-purple-100'
    case 'skill':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-100'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'analysis':
      return BookOpen
    case 'code':
      return Code
    case 'skill':
      return Sparkles
    default:
      return BookOpen
  }
}
</script>

<template>
  <article class="keyword-card group flex flex-col bg-white border border-gray-100 hover:border-gray-200 shadow-xs overflow-hidden">
    <!-- Card Image with Google-style pill mask -->
    <NuxtLink :to="`/posts/${post.slug}`" class="block relative aspect-[16/10] overflow-hidden bg-gray-100 m-3 rounded-2xl">
      <img 
        :src="post.coverImage" 
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />
      <div class="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 shadow-xs border" :class="getCategoryBadgeClass(post.type)">
        <component :is="getTypeIcon(post.type)" class="w-3.5 h-3.5" />
        <span>{{ post.categoryLabel }}</span>
      </div>
    </NuxtLink>

    <!-- Card Content -->
    <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-500 mb-2.5 font-medium">
          <span>{{ post.publishedAt }}</span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <Clock class="w-3 h-3 text-gray-400" />
            {{ post.readTime }}
          </span>
        </div>

        <h3 class="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
          <NuxtLink :to="`/posts/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>

        <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
          {{ post.excerpt }}
        </p>
      </div>

      <!-- Card Footer with Author and CTA -->
      <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <img 
            :src="post.author.avatar" 
            :alt="post.author.name"
            class="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100"
          />
          <span class="text-xs font-semibold text-gray-700">
            {{ post.author.name }}
          </span>
        </div>

        <NuxtLink 
          :to="`/posts/${post.slug}`"
          class="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform"
        >
          <span>Lire</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
