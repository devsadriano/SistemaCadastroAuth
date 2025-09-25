<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-text-primary mb-2">
          Novo Cadastro
        </h1>
        <p class="text-text-secondary">
          Área para cadastrar novos usuários ou informações
        </p>
      </div>

      <!-- Content Card -->
      <div class="bg-surface-primary rounded-xl shadow-card border border-borderColor-surface p-8">
        <div class="text-center py-12">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlusIcon class="w-8 h-8 text-primary-500" />
          </div>
          
          <h2 class="text-xl font-semibold text-text-primary mb-2">
            Funcionalidade em Desenvolvimento
          </h2>
          
          <p class="text-text-secondary mb-8">
            Esta página estará disponível em breve com funcionalidades de cadastro.
          </p>

          <div class="flex flex-wrap gap-4 justify-center">
            <BaseButton
              variant="outline"
              @click="$router.push('/')"
            >
              <template #icon-left>
                <ArrowLeftIcon class="w-5 h-5" />
              </template>
              Voltar ao Início
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserPlusIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

// Middleware de autenticação
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Meta tags específicas da página
useSeoMeta({
  title: 'Novo Cadastro',
  description: 'Página de cadastro de novos usuários'
})
</script>

<style scoped>
/* Estilos específicos da página de cadastro */
</style>