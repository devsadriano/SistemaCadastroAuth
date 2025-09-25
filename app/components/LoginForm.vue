<template>
  <div class="w-full max-w-md mx-auto bg-surface-primary rounded-2xl shadow-card border border-borderColor-surface p-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <span class="text-white font-bold text-lg">N</span>
      </div>
      <h2 class="text-2xl font-bold text-text-primary mb-2">
        {{ activeTab === 'login' ? 'Entrar na conta' : 'Criar nova conta' }}
      </h2>
      <p class="text-text-secondary text-sm">
        {{ activeTab === 'login' ? 'Acesse sua conta para continuar' : 'Preencha os dados para criar sua conta' }}
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex space-x-1 bg-surface-secondary rounded-lg p-1 mb-8">
      <button
        @click="activeTab = 'login'"
        :class="[
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeTab === 'login'
            ? 'bg-primary-500 text-text-inverse shadow-md'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
        ]"
      >
        Entrar
      </button>
      <button
        @click="activeTab = 'register'"
        :class="[
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeTab === 'register'
            ? 'bg-primary-500 text-text-inverse shadow-md'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
        ]"
      >
        Criar Conta
      </button>
    </div>

    <!-- Login Form -->
    <form v-if="activeTab === 'login'" @submit.prevent class="space-y-6">
      <!-- Email -->
      <BaseInput
        v-model="loginForm.email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        required
      >
        <template #iconLeft>
          <EnvelopeIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- Password -->
      <BaseInput
        v-model="loginForm.password"
        :type="showLoginPassword ? 'text' : 'password'"
        label="Senha"
        placeholder="Digite sua senha"
        required
      >
        <template #iconLeft>
          <LockClosedIcon class="w-5 h-5" />
        </template>
        <template #iconRight>
          <button
            type="button"
            @click="toggleLoginPassword"
            class="focus:outline-none hover:text-primary-500 transition-colors duration-200"
          >
            <EyeIcon v-if="showLoginPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </template>
      </BaseInput>

      <!-- Forgot Password Link -->
      <div class="text-right">
        <a href="#" class="text-sm text-primary-500 hover:text-primary-400 transition-colors duration-200">
          Esqueceu a senha?
        </a>
      </div>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        class="mt-8"
      >
        <template #icon-left>
          <ArrowRightOnRectangleIcon class="w-5 h-5" />
        </template>
        Entrar na conta
      </BaseButton>
    </form>

    <!-- Register Form -->
    <form v-if="activeTab === 'register'" @submit.prevent class="space-y-6">
      <!-- Email -->
      <BaseInput
        v-model="registerForm.email"
        type="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        required
      >
        <template #iconLeft>
          <EnvelopeIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- Password -->
      <BaseInput
        v-model="registerForm.password"
        :type="showRegisterPassword ? 'text' : 'password'"
        label="Senha"
        placeholder="Digite uma senha segura"
        required
      >
        <template #iconLeft>
          <LockClosedIcon class="w-5 h-5" />
        </template>
        <template #iconRight>
          <button
            type="button"
            @click="toggleRegisterPassword"
            class="focus:outline-none hover:text-primary-500 transition-colors duration-200"
          >
            <EyeIcon v-if="showRegisterPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </template>
      </BaseInput>

      <!-- Confirm Password -->
      <BaseInput
        v-model="registerForm.confirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        label="Confirmar Senha"
        placeholder="Digite a senha novamente"
        :error-message="confirmPasswordError"
        required
      >
        <template #iconLeft>
          <LockClosedIcon class="w-5 h-5" />
        </template>
        <template #iconRight>
          <button
            type="button"
            @click="toggleConfirmPassword"
            class="focus:outline-none hover:text-primary-500 transition-colors duration-200"
          >
            <EyeIcon v-if="showConfirmPassword" class="w-5 h-5" />
            <EyeSlashIcon v-else class="w-5 h-5" />
          </button>
        </template>
      </BaseInput>

      <!-- Submit Button -->
      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        class="mt-8"
      >
        <template #icon-left>
          <UserPlusIcon class="w-5 h-5" />
        </template>
        Criar conta
      </BaseButton>
    </form>

    <!-- Footer -->
    <div class="mt-8 text-center">
      <p class="text-text-muted text-sm">
        {{ activeTab === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?' }}
        <button
          @click="activeTab = activeTab === 'login' ? 'register' : 'login'"
          class="text-primary-500 hover:text-primary-400 font-medium transition-colors duration-200 ml-1"
        >
          {{ activeTab === 'login' ? 'Criar conta' : 'Fazer login' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'

// Estado das abas
const activeTab = ref('login')

// Estados dos formulários
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

// Estados de visibilidade das senhas
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Funções para toggle de visibilidade
const toggleLoginPassword = () => {
  showLoginPassword.value = !showLoginPassword.value
}

const toggleRegisterPassword = () => {
  showRegisterPassword.value = !showRegisterPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

// Validação de confirmação de senha
const confirmPasswordError = computed(() => {
  if (!registerForm.value.confirmPassword) return ''
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    return 'As senhas não coincidem'
  }
  return ''
})

// Limpar formulários ao trocar de aba
watch(activeTab, () => {
  loginForm.value = { email: '', password: '' }
  registerForm.value = { email: '', password: '', confirmPassword: '' }
  showLoginPassword.value = false
  showRegisterPassword.value = false
  showConfirmPassword.value = false
})
</script>

<style scoped>
/* Animações para transição das abas */
form {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect nos botões das abas */
button:not(.bg-primary-500):hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}
</style>