<template>
  <section class="pt-28 pb-12 px-6 text-center relative overflow-hidden">
    <!-- Background glow effects -->
    <div class="absolute inset-0 pointer-events-none" style="z-index: 0;">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
           style="background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%); filter: blur(40px);"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 rounded-full"
           style="background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%); filter: blur(60px);"></div>
    </div>

    <div class="relative" style="z-index: 1;">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
           style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); color: #3B82F6;">
        <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
        Vibe Coding × AI 创意项目
      </div>

      <h1 class="text-5xl font-bold mb-4 leading-tight tracking-tight" style="color: #F1F5F9;">
        发现 AI 驱动的<br>
        <span style="background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          创意项目
        </span>
      </h1>

      <p class="text-lg mb-8 max-w-xl mx-auto" style="color: #94A3B8;">
        收录全球 Vibe Coding 爱好者用 AI 工具构建的有趣项目，
        <br class="hidden sm:block">游戏、工具、创意装置，一网打尽。
      </p>

      <!-- Search -->
      <div class="relative max-w-md mx-auto">
        <div class="absolute left-4 top-1/2 -translate-y-1/2" style="color: #64748B;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="搜索项目名称、描述、工具..."
          class="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
          style="background: #1E293B; border: 1px solid #334155; color: #F1F5F9;"
          @focus="($event.target as HTMLElement).style.borderColor='#3B82F6'"
          @blur="($event.target as HTMLElement).style.borderColor='#334155'"
        />
        <div v-if="modelValue" class="absolute right-3 top-1/2 -translate-y-1/2">
          <button @click="$emit('update:modelValue', '')"
                  class="w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors"
                  style="background: #334155; color: #94A3B8;">
            ✕
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [v: string] }>()
</script>
