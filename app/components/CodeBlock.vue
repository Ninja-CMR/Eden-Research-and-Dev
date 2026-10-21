<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Terminal, Code2 } from 'lucide-vue-next'

const props = defineProps<{
  code: string
  language?: string
  filename?: string
  explanation?: string
}>()

const copied = ref(false)

const copyCode = () => {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="my-6 rounded-2xl overflow-hidden border border-gray-800 bg-[#121824] shadow-xl text-white">
    <!-- Header bar -->
    <div class="flex items-center justify-between px-4 py-3 bg-[#1a2233] border-b border-gray-800/80">
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-1.5 mr-2">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-300 font-mono font-medium">
          <Code2 class="w-3.5 h-3.5 text-blue-400" />
          <span>{{ filename || 'snippet.' + (language || 'txt') }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span v-if="language" class="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-blue-300 font-semibold border border-gray-700">
          {{ language }}
        </span>
        <button 
          @click="copyCode"
          class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors border border-gray-700"
          :title="copied ? 'Copié !' : 'Copier le code'"
        >
          <component :is="copied ? Check : Copy" class="w-3.5 h-3.5" :class="copied ? 'text-emerald-400' : 'text-gray-300'" />
          <span>{{ copied ? 'Copié !' : 'Copier' }}</span>
        </button>
      </div>
    </div>

    <!-- Code body -->
    <div class="p-4 sm:p-5 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d131f]">
      <pre class="text-gray-200 selection:bg-blue-600/40 selection:text-white"><code>{{ code }}</code></pre>
    </div>

    <!-- Optional explanation footnote -->
    <div v-if="explanation" class="px-4 py-2.5 bg-[#141b2a] border-t border-gray-800/80 text-xs text-gray-400 flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
      <span>{{ explanation }}</span>
    </div>
  </div>
</template>
