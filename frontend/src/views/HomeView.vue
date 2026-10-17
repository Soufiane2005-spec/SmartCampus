<template>
  <main class="home">
    <h1>SmartCampus</h1>
    <p v-if="loading">Vérification de l’API...</p>
    <p v-else-if="apiOk">API OK</p>
    <p v-else>{{ errorMessage }}</p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const loading = ref(true)
const apiOk = ref(false)
const errorMessage = ref('API indisponible')

onMounted(async () => {
  try {
    const response = await fetch('/api/health')
    if (!response.ok) {
      throw new Error('Health check failed')
    }

    const data = (await response.json()) as { status?: string }
    apiOk.value = data.status === 'ok'
  } catch {
    apiOk.value = false
    errorMessage.value = 'API indisponible'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: 3rem auto;
  padding: 0 1rem;
  text-align: center;
}
</style>
