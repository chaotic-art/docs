<template>
  <header class="app-header">
    <div class="header-content">
      <NuxtLink to="/" class="logo-link">
        <img 
          :src="isDark ? '/logo-light.svg' : '/logo-dark.svg'" 
          alt="Chaotic" 
          class="logo"
        />
      </NuxtLink>
      <div class="title">Chaotic Docs</div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>

<style scoped>
.app-header {
  padding: 1rem;
  border-bottom: 1px solid var(--ui-border-accented);
}
.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.logo {
  height: 40px;
  width: auto;
}
.title {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
