<template>
  <main>
    <HeroSection v-model="searchQuery" />

    <FeaturedBanner :featured="featuredProjects" />

    <FilterBar
      v-model:category="selectedCategory"
      v-model:tool="selectedTool"
    />

    <!-- Results area -->
    <section class="px-6 pb-16">
      <div class="max-w-7xl mx-auto">
        <!-- Count -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm" style="color: #64748B;">
            共 <span style="color: #F1F5F9; font-weight: 600;">{{ filteredProjects.length }}</span> 个项目
            <span v-if="searchQuery || selectedCategory !== '全部' || selectedTool !== '全部'"
                  class="ml-2 text-xs font-mono"
                  style="color: #3B82F6;">(已筛选)</span>
          </p>
          <button
            v-if="searchQuery || selectedCategory !== '全部' || selectedTool !== '全部'"
            @click="clearFilters"
            class="text-xs px-3 py-1.5 rounded-lg transition-colors"
            style="background: rgba(59,130,246,0.1); color: #3B82F6; border: 1px solid rgba(59,130,246,0.2);"
          >
            清除筛选
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="i in 6" :key="i" class="rounded-xl h-64 animate-pulse" style="background: #1E293B;"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-20">
          <div class="text-4xl mb-4">⚠️</div>
          <p class="text-sm" style="color: #94A3B8;">{{ error }}</p>
        </div>

        <!-- Empty -->
        <div v-else-if="filteredProjects.length === 0" class="text-center py-20">
          <div class="text-4xl mb-4">🔍</div>
          <p class="font-medium mb-2" style="color: #94A3B8;">没有找到匹配的项目</p>
          <p class="text-sm" style="color: #64748B;">尝试修改搜索词或清除筛选条件</p>
        </div>

        <!-- Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <FooterSection />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { VibeProject } from '../types/project'
import HeroSection from '../components/HeroSection.vue'
import FeaturedBanner from '../components/FeaturedBanner.vue'
import FilterBar from '../components/FilterBar.vue'
import ProjectCard from '../components/ProjectCard.vue'
import FooterSection from '../components/FooterSection.vue'

const projects = ref<VibeProject[]>([])
const loading = ref(true)
const error = ref('')

const searchQuery = ref('')
const selectedCategory = ref('全部')
const selectedTool = ref('全部')

const featuredProjects = computed(() =>
  projects.value.filter(p => p.featured).slice(0, 3)
)

const filteredProjects = computed(() => {
  let list = projects.value
  if (selectedCategory.value !== '全部') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  if (selectedTool.value !== '全部') {
    list = list.filter(p => p.aiTools.includes(selectedTool.value))
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.aiTools.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
  }
  return list
})

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = '全部'
  selectedTool.value = '全部'
}

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL
    const res = await fetch(`${base}data/projects.json`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    projects.value = await res.json()
  } catch (e) {
    error.value = '加载项目数据失败，请刷新重试'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
