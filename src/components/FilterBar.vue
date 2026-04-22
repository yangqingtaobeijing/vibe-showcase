<template>
  <section class="px-6 mb-8 sticky top-16 z-40 py-3"
           style="background: rgba(15,23,42,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid #1E293B;">
    <div class="max-w-7xl mx-auto space-y-3">
      <!-- Category filter -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-mono mr-1" style="color: #64748B;">分类</span>
        <button
          v-for="cat in categories"
          :key="cat"
          @click="$emit('update:category', cat)"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          :style="getCategoryStyle(cat)"
        >
          {{ cat === '全部' ? '全部' : `${getCategoryEmoji(cat)} ${cat}` }}
        </button>
      </div>

      <!-- AI Tool filter -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-xs font-mono mr-1" style="color: #64748B;">工具</span>
        <button
          v-for="tool in tools"
          :key="tool"
          @click="$emit('update:tool', tool)"
          class="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
          :style="getToolStyle(tool)"
        >
          {{ tool }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CATEGORY_COLORS, CATEGORY_EMOJIS, AI_TOOL_COLORS } from '../types/project'

const props = defineProps<{
  category: string
  tool: string
}>()

defineEmits<{
  'update:category': [v: string]
  'update:tool': [v: string]
}>()

const categories = ['全部', '游戏', '工具', '创意', '聊天', '数据可视化', '生活']
const tools = ['全部', 'Cursor', 'Claude', 'ChatGPT', 'Bolt', 'v0', '其他']

function getCategoryEmoji(cat: string): string {
  return CATEGORY_EMOJIS[cat] ?? ''
}

function getCategoryStyle(cat: string): Record<string, string> {
  const isActive = props.category === cat
  const color = cat === '全部' ? '#3B82F6' : (CATEGORY_COLORS[cat] ?? '#64748B')
  if (isActive) {
    return {
      background: color + '22',
      color: color,
      border: `1px solid ${color}66`,
    }
  }
  return {
    background: 'transparent',
    color: '#64748B',
    border: '1px solid #334155',
  }
}

function getToolStyle(tool: string): Record<string, string> {
  const isActive = props.tool === tool
  const color = tool === '全部' ? '#3B82F6' : (AI_TOOL_COLORS[tool] ?? '#64748B')
  if (isActive) {
    return {
      background: color + '22',
      color: color,
      border: `1px solid ${color}66`,
    }
  }
  return {
    background: 'transparent',
    color: '#64748B',
    border: '1px solid #334155',
  }
}
</script>
