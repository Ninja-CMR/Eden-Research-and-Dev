<script setup lang="ts">
import { Globe, Github, Twitter, Linkedin } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200/80 text-gray-600 text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand column -->
        <div class="md:col-span-2 space-y-4">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img 
              src="/logoEden.png" 
              alt="Eden Research & Dev" 
              class="h-14 sm:h-20 w-auto object-contain"
            />
          </NuxtLink>
          <div class="space-y-1">
            <p class="text-sm font-medium text-gray-700">
              Département technique
            </p>
            <p class="text-xs text-gray-500">
              Propulsé par <b class="font-semibold text-gray-800">Grow Tech</b>
            </p>
          </div>
        </div>

        <!-- Piliers de contenu -->
        <div>
          <h4 class="font-bold text-gray-900 text-sm mb-4">Piliers Éditoriaux</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <NuxtLink to="/?filter=analysis" class="hover:text-blue-600 transition-colors">
                Analyses Prospectives
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/?filter=code" class="hover:text-blue-600 transition-colors">
                Architectures &amp; Codes
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/?filter=skill" class="hover:text-blue-600 transition-colors">
                Skills &amp; Méthodologies
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/posts/intelligence-artificielle-milieu-scolaire" class="hover:text-blue-600 transition-colors">
                Dossier : IA &amp; Éducation en Afrique
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Informations légales & Institutionnel -->
        <div>
          <h4 class="font-bold text-gray-900 text-sm mb-4">Ressources &amp; Contact</h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a href="#newsletter" class="hover:text-blue-600 transition-colors">Lettre d'information</a>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 transition-colors">Dépôt GitHub</a>
            </li>
            <li>
              <a href="#" class="hover:text-blue-600 transition-colors">Charte Éthique &amp; IA</a>
            </li>
            <li>
              <a href="#" class="hover:text-blue-600 transition-colors">Mentions Légales</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar (Google Style) -->
      <div class="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div class="flex flex-wrap items-center gap-6">
          <span class="font-semibold text-gray-700">Eden R&amp;D</span>
          <a href="#" class="hover:underline">Confidentialité</a>
          <a href="#" class="hover:underline">Conditions d'utilisation</a>
          <a href="#" class="hover:underline">Aide</a>
          <a href="#" class="hover:underline">À propos</a>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5 text-gray-500">
            <Globe class="w-3.5 h-3.5" />
            <span>Français (France)</span>
          </div>
          <div class="flex items-center gap-2 border-l border-gray-200 pl-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-full hover:bg-gray-200 transition-colors" title="GitHub">
              <Github class="w-4 h-4 text-gray-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-full hover:bg-gray-200 transition-colors" title="X / Twitter">
              <Twitter class="w-4 h-4 text-gray-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-full hover:bg-gray-200 transition-colors" title="LinkedIn">
              <Linkedin class="w-4 h-4 text-gray-600" />
            </a>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>
