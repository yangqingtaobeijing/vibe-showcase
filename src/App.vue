<template>
  <NavBar :count="projectCount" />
  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'

const projectCount = ref(0)

onMounted(async () => {
  try {
    const base = import.meta.env.BASE_URL
    const res = await fetch(`${base}data/projects.json`)
    if (res.ok) {
      const data = await res.json()
      projectCount.value = data.length
    }
  } catch {
    // ignore
  }
})
</script>
