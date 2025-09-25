<template>
  <div class="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-emerald-500/20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>
    </div>

    <!-- Login Form Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Back to Home Link -->
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-text-secondary hover:text-primary-500 transition-colors duration-200 group"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Voltar ao início
        </NuxtLink>
      </div>

      <!-- Login Form Component -->
      <LoginForm />

      <!-- Additional Links -->
      <div class="mt-8 text-center space-y-4">
        <div class="flex items-center justify-center space-x-4 text-text-muted text-sm">
          <a href="#" class="hover:text-primary-500 transition-colors duration-200">
            Ajuda
          </a>
          <span>•</span>
          <a href="#" class="hover:text-primary-500 transition-colors duration-200">
            Privacidade
          </a>
          <span>•</span>
          <a href="#" class="hover:text-primary-500 transition-colors duration-200">
            Termos
          </a>
        </div>
        
        <p class="text-text-muted text-xs">
          © {{ currentYear }} Sistema Cadastro. Todos os direitos reservados.
        </p>
      </div>
    </div>

    <!-- Floating Elements for Visual Appeal -->
    <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500/30 rounded-full animate-float"></div>
    <div class="absolute top-3/4 right-1/4 w-3 h-3 bg-emerald-500/30 rounded-full animate-float" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 right-1/3 w-1 h-1 bg-primary-400/40 rounded-full animate-float" style="animation-delay: 2s;"></div>
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import LoginForm from '~/components/LoginForm.vue'

// Definindo que esta página não usa layout
definePageMeta({
  layout: false
})

// Meta tags específicas da página
useSeoMeta({
  title: 'Login - Acesse sua conta',
  description: 'Faça login em sua conta ou crie uma nova conta no Sistema Cadastro',
  robots: 'noindex, nofollow' // Página de login não deve ser indexada
})

// Ano atual
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Animação de flutuação para elementos decorativos */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradiente de fundo animado */
.bg-gradient-to-br {
  animation: gradientShift 8s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background: linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%);
  }
  50% {
    background: linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #0a0a0a 100%);
  }
}

/* Efeito de blur no fundo */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Responsividade aprimorada */
@media (max-width: 480px) {
  .min-h-screen {
    padding: 1rem;
  }
}
</style>