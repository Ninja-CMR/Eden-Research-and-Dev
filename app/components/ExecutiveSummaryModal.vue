<script setup lang="ts">
import { ref } from 'vue'
import { FileText, X, CheckCircle2, AlertTriangle, Sparkles, Copy, Check } from 'lucide-vue-next'
import type { ExecutiveSummaryPoint } from '~/types/post'

const props = defineProps<{
  summary: ExecutiveSummaryPoint[]
  postTitle: string
}>()

const isOpen = ref(false)
const copied = ref(false)

const copySummary = () => {
  const text = props.summary
    .map((s, idx) => `${idx + 1}. ${s.title}\n${s.description}`)
    .join('\n\n')
  
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(`Résumé Exécutif : ${props.postTitle}\n\n${text}`)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div>
    <!-- Trigger Pill Button (Google The Keyword look) -->
    <button 
      @click="isOpen = true"
      type="button"
      class="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-800 text-sm font-medium transition-all shadow-sm hover:shadow"
    >
      <div class="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <FileText class="w-3.5 h-3.5" />
      </div>
      <span class="tracking-tight">Lire le résumé exécutif ({{ summary.length }} points)</span>
    </button>

    <!-- Modal Drawer Backdrop -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm animate-fadeIn"
      @click.self="isOpen = false"
    >
      <div 
        class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-gray-100 relative max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="flex items-start justify-between pb-5 border-b border-gray-100 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles class="w-5 h-5" />
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600">Synthèse Décideur &amp; Enseignant</span>
              <h3 class="text-xl font-extrabold text-gray-900 tracking-tight">
                Résumé Exécutif en {{ summary.length }} Points Clés
              </h3>
            </div>
          </div>

          <button 
            @click="isOpen = false"
            class="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            title="Fermer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- 3-point Highlights -->
        <div class="space-y-4 mb-6">
          <div 
            v-for="(point, idx) in summary"
            :key="idx"
            class="p-4 sm:p-5 rounded-2xl border transition-all"
            :class="[
              point.impact === 'positive' 
                ? 'bg-emerald-50/50 border-emerald-200/70' 
                : point.impact === 'negative'
                ? 'bg-amber-50/50 border-amber-200/70'
                : 'bg-blue-50/50 border-blue-200/70'
            ]"
          >
            <div class="flex items-start gap-3">
              <div class="mt-0.5">
                <CheckCircle2 v-if="point.impact === 'positive'" class="w-5 h-5 text-emerald-600" />
                <AlertTriangle v-else-if="point.impact === 'negative'" class="w-5 h-5 text-amber-600" />
                <Sparkles v-else class="w-5 h-5 text-blue-600" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <h4 class="font-bold text-gray-900 text-base">
                    {{ point.title }}
                  </h4>
                  <span 
                    class="text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
                    :class="[
                      point.impact === 'positive' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : point.impact === 'negative'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    ]"
                  >
                    {{ point.impact === 'positive' ? 'Opportunité' : point.impact === 'negative' ? 'Vigilance' : 'Mutation' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">
                  {{ point.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <button 
            @click="copySummary"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
          >
            <component :is="copied ? Check : Copy" class="w-4 h-4" :class="copied ? 'text-emerald-600' : 'text-gray-500'" />
            <span>{{ copied ? 'Copié dans le presse-papier !' : 'Copier ces 3 points' }}</span>
          </button>

          <button 
            @click="isOpen = false"
            class="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
          >
            Continuer la lecture complète
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
