<template>
  <header class="bg-surface-primary border-b border-borderColor-surface shadow-surface">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">N</span>
            </div>
            <span class="text-text-primary font-semibold text-xl">Sistema Cadastro</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/" 
            class="text-text-secondary hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            active-class="text-emerald-500"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/novocadastro" 
            class="text-text-secondary hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            active-class="text-emerald-500"
          >
            Novo Cadastro
          </NuxtLink>
        </div>

        <!-- Action Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Botões quando não logado -->
          <template v-if="!isAuthenticated">
            <BaseButton variant="ghost" size="sm" @click="$router.push('/login')">
              <template #icon-left>
                <UserIcon class="w-4 h-4" />
              </template>
              Entrar
            </BaseButton>
            <BaseButton variant="primary" size="sm" @click="$router.push('/login')">
              <template #icon-left>
                <UserPlusIcon class="w-4 h-4" />
              </template>
              Cadastrar
            </BaseButton>
          </template>
          
          <!-- Botões quando logado -->
          <template v-else>
            <div class="flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon class="w-4 h-4 text-primary-600" />
                </div>
                <span class="text-text-secondary text-sm">
                  Olá, <span class="font-medium text-text-primary">{{ user?.email?.split('@')[0] || 'Usuário' }}</span>!
                </span>
              </div>
              <BaseButton 
                variant="outline" 
                size="sm" 
                @click="handleLogout"
                :loading="loading"
              >
                <template #icon-left>
                  <ArrowLeftOnRectangleIcon class="w-4 h-4" />
                </template>
                {{ loading ? 'Saindo...' : 'Sair' }}
              </BaseButton>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-text-secondary hover:text-text-primary focus:outline-none focus:text-text-primary transition-colors duration-200"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-borderColor-surface mt-2 pt-4 pb-4">
        <div class="space-y-2">
          <NuxtLink 
            to="/" 
            @click="closeMobileMenu"
            class="block text-text-secondary hover:text-emerald-500 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            active-class="text-emerald-500"
          >
            Início
          </NuxtLink>
          <NuxtLink 
            to="/novocadastro" 
            @click="closeMobileMenu"
            class="block text-text-secondary hover:text-emerald-500 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            active-class="text-emerald-500"
          >
            Novo Cadastro
          </NuxtLink>
        </div>
        <div class="mt-4 pt-4 border-t border-borderColor-surface space-y-2">
          <!-- Botões quando não logado -->
          <template v-if="!isAuthenticated">
            <BaseButton variant="ghost" size="sm" full-width @click="handleMobileLogin">
              <template #icon-left>
                <UserIcon class="w-4 h-4" />
              </template>
              Entrar
            </BaseButton>
            <BaseButton variant="primary" size="sm" full-width @click="handleMobileLogin">
              <template #icon-left>
                <UserPlusIcon class="w-4 h-4" />
              </template>
              Cadastrar
            </BaseButton>
          </template>
          
          <!-- Botões quando logado -->
          <template v-else>
            <div class="flex items-center justify-center space-x-2 px-3 py-2">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <UserIcon class="w-4 h-4 text-primary-600" />
              </div>
              <div class="text-center">
                <div class="text-text-secondary text-sm">Olá,</div>
                <div class="font-medium text-text-primary text-sm">{{ user?.email?.split('@')[0] || 'Usuário' }}!</div>
              </div>
            </div>
            <BaseButton 
              variant="outline" 
              size="sm" 
              full-width 
              @click="handleLogout"
              :loading="loading"
            >
              <template #icon-left>
                <ArrowLeftOnRectangleIcon class="w-4 h-4" />
              </template>
              {{ loading ? 'Saindo...' : 'Sair da Conta' }}
            </BaseButton>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// Imports explícitos dos ícones
import { UserIcon, UserPlusIcon, Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseButton from '~/components/BaseButton.vue'

// Composable de autenticação
const { isAuthenticated, user, logout, loading } = useAuth()
const router = useRouter()

// Estado do menu mobile
const isMobileMenuOpen = ref(false)

// Funções para controle do menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Função de logout
const handleLogout = async () => {
  await logout()
  closeMobileMenu()
}

// Função para ir para login no mobile
const handleMobileLogin = () => {
  router.push('/login')
  closeMobileMenu()
}

// Fechar menu mobile ao redimensionar tela
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      isMobileMenuOpen.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* Animações customizadas para o header */
.router-link-exact-active {
  color: #10b981;
}

/* Efeito hover no logo */
.logo-hover:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>