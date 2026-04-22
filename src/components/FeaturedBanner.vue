<template>
  <section class="px-6 mb-10">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-lg">✨</span>
        <h2 class="text-sm font-semibold tracking-widest uppercase font-mono" style="color: #3B82F6;">
          今日发现
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="project in featured"
          :key="project.id"
          class="relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
          style="border: 1px solid #334155; background: #1E293B;"
          @click="openProject(project.url)"
          @mouseover="($event.currentTarget as HTMLElement).style.borderColor='#3B82F6'; ($event.currentTarget as HTMLElement).style.transform='translateY(-2px)'"
          @mouseout="($event.currentTarget as HTMLElement).style.borderColor='#334155'; ($event.currentTarget as HTMLElement).style.transform='translateY(0)'"
        >
          <!-- Cover / Placeholder -->
          <div class="h-36 flex items-center justify-center relative overflow-hidden"
               :style="{ background: `linear-gradient(135deg, ${getCategoryColor(project.category)}22, ${getCategoryColor(project.category)}08)` }">
            <div class="text-5xl">{{ getCategoryEmoji(project.category) }}</div>
            <!-- Decorative pattern -->
            <div class="absolute inset-0 opacity-10"
                 :style="{ background: `radial-gradient(circle at 30% 50%, ${getCategoryColor(project.category)} 0%, transparent 60%)` }"></div>
            <div class="absolute top-3 right-3">
              <span class="text-xs px-2 py-0.5 rounded font-mono"
                    :style="{ background: getCategoryColor(project.category) + '22', color: getCategoryColor(project.category), border: `1px solid ${getCategoryColor(project.category)}44` }">
                {{ project.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-bold text-base mb-1.5 group-hover:text-blue-400 transition-colors" style="color: #F1F5F9;">
              {{ project.name }}
            </h3>
            <p class="text-xs leading-relaxed line-clamp-2 mb-3" style="color: #94A3B8;">
              {{ project.description }}
            </p>

            <!-- AI tools -->
            <div class="flex items-center gap-1.5 flex-wrap mb-3">
              <span
                v-for="tool in project.aiTools"
                :key="tool"
                class="text-xs px-2 py-0.5 rounded font-mono"
                :style="{ background: getToolColor(tool) + '22', color: getToolColor(tool) }"
              >
                {{ tool }}
              </span>
            </div>

            <button
              @click.stop="openProject(project.url)"
              class="w-full py-2 rounded-lg text-xs font-medium transition-colors"
              style="background: rgba(59,130,246,0.1); color: #3B82F6; border: 1px solid rgba(59,130,246,0.2);"
              @mouseover="($event.currentTarget as HTMLElement).style.background='rgba(59,130,246,0.2)'"
              @mouseout="($event.currentTarget as HTMLElement).style.background='rgba(59,130,246,0.1)'"
            >
              访问项目 →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { VibeProject } from '../types/project'
import { CATEGORY_COLORS, CATEGORY_EMOJIS, AI_TOOL_COLORS } from '../types/project'

defineProps<{ featured: VibeProject[] }>()

function openProject(url: string) {
  window.open(url, '_blank')
}

function getCategoryColor(cat: string): string {
  return CATEGORY_COLORS[cat] ?? '#64748B'
}

function getCategoryEmoji(cat: string): string {
  return CATEGORY_EMOJIS[cat] ?? '🌟'
}

function getToolColor(tool: string): string {
  return AI_TOOL_COLORS[tool] ?? AI_TOOL_COLORS['其他']
}
</script>
