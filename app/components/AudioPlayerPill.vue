<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Play, Pause, Volume2, RotateCcw } from 'lucide-vue-next'

const props = defineProps<{
  audioTime: string
  transcript: string
}>()

const isPlaying = ref(false)
const progress = ref(0)
const speed = ref(1)
const isExpanded = ref(false)
let synth: SpeechSynthesis | null = null
let utterance: SpeechSynthesisUtterance | null = null
let timer: NodeJS.Timeout | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    synth = window.speechSynthesis
  }
})

onUnmounted(() => {
  stopSpeech()
})

const stopSpeech = () => {
  if (synth) {
    synth.cancel()
  }
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isPlaying.value = false
  progress.value = 0
}

const togglePlay = () => {
  if (isPlaying.value) {
    pauseSpeech()
  } else {
    playSpeech()
  }
}

const playSpeech = () => {
  isExpanded.value = true
  if (!synth) {
    // Fallback simulation if speech synthesis not available in environment
    isPlaying.value = true
    startSimulatedProgress()
    return
  }

  synth.cancel()
  utterance = new SpeechSynthesisUtterance(props.transcript)
  utterance.lang = 'fr-FR'
  utterance.rate = speed.value

  const voices = synth.getVoices()
  const frenchVoice = voices.find(v => v.lang.startsWith('fr') || v.lang.includes('FR'))
  if (frenchVoice) {
    utterance.voice = frenchVoice
  }

  utterance.onend = () => {
    isPlaying.value = false
    progress.value = 100
    if (timer) clearInterval(timer)
  }

  utterance.onerror = () => {
    isPlaying.value = false
    if (timer) clearInterval(timer)
  }

  synth.speak(utterance)
  isPlaying.value = true
  startSimulatedProgress()
}

const pauseSpeech = () => {
  if (synth) {
    synth.cancel()
  }
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isPlaying.value = false
}

const startSimulatedProgress = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (isPlaying.value && progress.value < 100) {
      progress.value += 0.8
    } else if (progress.value >= 100) {
      isPlaying.value = false
      if (timer) clearInterval(timer)
    }
  }, 500)
}

const cycleSpeed = () => {
  if (speed.value === 1) speed.value = 1.25
  else if (speed.value === 1.25) speed.value = 1.5
  else speed.value = 1

  if (isPlaying.value) {
    playSpeech()
  }
}
</script>

<template>
  <div class="relative inline-flex items-center">
    <!-- Unexpanded Pill (Standard Google Keyword state) -->
    <button 
      v-if="!isExpanded"
      @click="togglePlay"
      type="button"
      class="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-50/80 hover:bg-blue-100 border border-blue-200/60 text-blue-800 text-sm font-medium transition-all shadow-sm hover:shadow"
    >
      <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
        <Play class="w-3 h-3 fill-current ml-0.5" />
      </div>
      <span class="tracking-tight">Écouter l'article audio ({{ audioTime }})</span>
    </button>

    <!-- Expanded Audio Player Widget -->
    <div 
      v-else
      class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-500 animate-fadeIn"
    >
      <!-- Play / Pause Button -->
      <button 
        @click="togglePlay"
        class="w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        :title="isPlaying ? 'Mettre en pause' : 'Reprendre la lecture'"
      >
        <Pause v-if="isPlaying" class="w-3.5 h-3.5 fill-current" />
        <Play v-else class="w-3.5 h-3.5 fill-current ml-0.5" />
      </button>

      <!-- Waveform Animation -->
      <div class="flex items-center gap-1 h-5 px-1">
        <span 
          v-for="i in 5" 
          :key="i"
          class="w-1 bg-white/90 rounded-full transition-all"
          :class="[
            isPlaying ? `audio-bar-${i}` : 'h-1.5 opacity-60'
          ]"
        ></span>
      </div>

      <!-- Label & Time -->
      <span class="text-xs font-semibold tracking-wide pr-1">
        {{ isPlaying ? 'En lecture...' : 'En pause' }}
      </span>

      <!-- Speed Toggle -->
      <button 
        @click="cycleSpeed"
        class="px-2 py-0.5 rounded-md bg-blue-700/80 hover:bg-blue-800 text-xs font-mono font-medium transition-colors"
        title="Vitesse de lecture"
      >
        {{ speed }}x
      </button>

      <!-- Collapse / Reset -->
      <button 
        @click="stopSpeech(); isExpanded = false"
        class="p-1 rounded-full hover:bg-blue-700/60 text-white/80 hover:text-white transition-colors"
        title="Fermer le lecteur"
      >
        <RotateCcw class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
