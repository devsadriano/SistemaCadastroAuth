<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Welcome Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-text-primary mb-4">
          Bem-vindo ao Sistema!
        </h1>
        <p class="text-text-secondary text-lg">
          Você está logado com sucesso.
        </p>
      </div>

      <!-- User Info Card -->
      <div v-if="user" class="bg-surface-primary rounded-xl shadow-card border border-borderColor-surface p-6 mb-8">
        <h2 class="text-2xl font-semibold text-text-primary mb-4">
          Informações do Usuário
        </h2>
        <div class="space-y-2">
          <p class="text-text-secondary">
            <span class="font-medium">E-mail:</span>
            {{ user.email }}
          </p>
          <p class="text-text-secondary">
            <span class="font-medium">ID:</span>
            {{ user.id }}
          </p>
          <p class="text-text-secondary">
            <span class="font-medium">Último acesso:</span>
            {{ formatDate(user.last_sign_in_at) }}
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 justify-center mb-8">
        <BaseButton
          variant="primary"
          size="lg"
          @click="$router.push('/novocadastro')"
        >
          <template #icon-left>
            <UserPlusIcon class="w-5 h-5" />
          </template>
          Novo Cadastro
        </BaseButton>
        
        <BaseButton
          variant="outline"
          size="lg"
          @click="handleLogout"
          :loading="loading"
        >
          <template #icon-left>
            <ArrowLeftOnRectangleIcon class="w-5 h-5" />
          </template>
          {{ loading ? 'Saindo...' : 'Sair da Conta' }}
        </BaseButton>
      </div>

      <!-- Tabela de Funcionários -->
      <FuncionariosTable @ver-detalhes="handleVerDetalhesFuncionario" />
    </div>
  </div>
</template>

<script setup>
import { UserPlusIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseButton from '~/components/BaseButton.vue'
import FuncionariosTable from '~/components/FuncionariosTable.vue'

// Middleware de autenticação
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Composable de autenticação
const { user, logout, loading } = useAuth()

// Meta tags específicas da página
useSeoMeta({
  title: 'Início',
  description: 'Página inicial do Sistema de Cadastro'
})

// Função para formatar data
const formatDate = (dateString) => {
  if (!dateString) return 'Não disponível'
  return new Date(dateString).toLocaleString('pt-BR')
}

// Função de logout
const handleLogout = async () => {
  await logout()
}

// Função para ver detalhes de um funcionário
const handleVerDetalhesFuncionario = (funcionario) => {
  console.log('Detalhes do funcionário solicitados:', funcionario)
  // Aqui você pode implementar a navegação para uma página de detalhes
  // ou abrir um modal com os detalhes do funcionário
  alert(`Detalhes do funcionário: ${funcionario.nome}\nCargo: ${funcionario.cargo}\nE-mail: ${funcionario.email || 'Não informado'}`)
}
</script>

<style scoped>
/* Estilos específicos da página inicial */
</style>