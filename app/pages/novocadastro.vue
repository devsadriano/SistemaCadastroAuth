<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-primary mb-2">
          Novo Funcionário
        </h1>
        <p class="text-text-secondary">
          Cadastre um novo funcionário no sistema
        </p>
      </div>

      <!-- Formulário de Funcionário -->
      <FormFuncionario
        :is-novo="true"
        @submit="handleSubmitFuncionario"
        @cancel="handleCancelFuncionario"
      />
    </div>
  </div>
</template>

<script setup>
// Imports explícitos dos componentes
import FormFuncionario from '~/components/FormFuncionario.vue'

// Middleware de autenticação
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Meta tags específicas da página
useSeoMeta({
  title: 'Novo Funcionário',
  description: 'Página de cadastro de novos funcionários'
})

// Router para navegação
const router = useRouter()

// Função para lidar com o submit do formulário
const handleSubmitFuncionario = (dadosFuncionario) => {
  console.log('Dados do funcionário recebidos:', dadosFuncionario)
  // O FormFuncionario já lida com a persistência no Supabase
  // Aqui podemos apenas fazer log ou outras ações se necessário
}

// Função para lidar com o cancelamento
const handleCancelFuncionario = () => {
  console.log('Cadastro cancelado')
  router.push('/')
}
</script>

<style scoped>
/* Estilos específicos da página de cadastro */
</style>