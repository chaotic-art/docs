<template>
  <header class="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo only - no text -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img 
              :src="isDark ? '/logo-light.svg' : '/logo-dark.svg'"
              alt=""
              class="h-8 w-auto"
              @error="onImageError"
            />
          </NuxtLink>
        </div>
        
        <!-- Navigation toggle for mobile -->
        <div class="flex items-center space-x-4">
          <ColorModeSwitch />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const onImageError = (event) => {
  // Fallback if SVG doesn't load
  console.log('Logo failed to load')
}
</script>