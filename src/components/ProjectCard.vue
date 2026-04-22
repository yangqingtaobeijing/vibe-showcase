<template>
  <div
    class="rounded-xl overflow-hidden flex flex-col cursor-pointer card-hover"
    style="background: #1E293B; border: 1px solid #334155;"
    @click="openProject"
  >
    <!-- Cover -->
    <div class="h-40 flex items-center justify-center relative overflow-hidden flex-shrink-0"
         :style="{ background: `linear-gradient(135deg, ${categoryColor}18, ${categoryColor}06)` }">
      <div class="text-5xl select-none">{{ categoryEmoji }}</div>
      <div class="absolute inset-0"
           :style="{ background: `radial-gradient(ellipse at 20% 50%, ${categoryColor}18 0%, transparent 65%)` }"></div>

      <!-- Category badge -->
      <div class="absolute top-3 left-3">
        <span class="text-xs px-2 py-0.5 rounded font-mono"
              :style="{ background: categoryColor + '22', color: categoryColor, border: `1px solid ${categoryColor}44` }">
          {{ project.category }}
        </span>
      </div>

      <!-- Source badge -->
      <div class="absolute top-3 right-3">
        <span class="text-xs px-2 py-0.5 rounded font-mono flex items-center gap-1"
              style="background: rgba(15,23,42,0.7); color: #94A3B8; border: 1px solid #334155;">
          {{ sourceIcon }} {{ project.source }}
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-4 flex flex-col flex-1">
      <h3 class="font-bold text-sm mb-1.5 leading-snug" style="color: #F1F5F9;">
        {{ project.name }}
      </h3>

      <p class="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style="color: #94A3B8;">
        {{ project.description }}
      </p>

      <!-- AI tool tags -->
      <div class="flex flex-wrap gap-1.5 mb-3">
        <span
          v-for="tool in project.aiTools"
          :key="tool"
          class="text-xs px-1.5 py-0.5 rounded font-mono"
          :style="{ background: getToolColor(tool) + '1A', color: getToolColor(tool), border: `1px solid ${getToolColor(tool)}33` }"
        >
          {{ tool }}
        </span>
      </div>

      <!-- Footer -->
      <button
        @click.stop="openProject"
        class="mt-auto w-full py-2 rounded-lg text-xs font-medium transition-all"
        style="background: rgba(59,130,246,0.08); color: #3B82F6; border: 1px solid rgba(59,130,246,0.15);"
        @mouseover="($event.currentTarget as HTMLElement).style.background='rgba(59,130,246,0.18)'"
        @mouseout="($event.currentTarget as HTMLElement).style.background='rgba(59,130,246,0.08)'"
      >
        访问项目 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VibeProject } from '../types/project'
import { CATEGORY_COLORS, CATEGORY_EMOJIS, AI_TOOL_COLORS, SOURCE_ICONS } from '../types/project'

const props = defineProps<{ project: VibeProject }>()

const categoryColor = computed(() => CATEGORY_COLORS[props.project.category] ?? '#64748B')
const categoryEmoji = computed(() => CATEGORY_EMOJIS[props.project.category] ?? '🌟')
const sourceIcon = computed(() => SOURCE_ICONS[props.project.source] ?? '🌐')

function getToolColor(tool: string): string {
  return AI_TOOL_COLORS[tool] ?? AI_TOOL_COLORS['其他']
}

function openProject() {
  window.open(props.project.url, '_blank')
}
</script>
