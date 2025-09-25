<template>
  <div class="min-h-screen bg-background-primary flex flex-col">
    <!-- Header -->
    <TheHeader />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
// Imports explícitos dos componentes
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

// Meta tags globais para o layout
useSeoMeta({
  titleTemplate: '%s - Sistema Cadastro',
  description: 'Sistema moderno de cadastro e autenticação construído com Nuxt 4',
  ogDescription: 'Sistema moderno de cadastro e autenticação construído com Nuxt 4',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
/* Layout responsivo */
main {
  min-height: calc(100vh - 4rem - 200px); /* header height - footer height */
}

/* Smooth scroll para navegação */
html {
  scroll-behavior: smooth;
}
</style>