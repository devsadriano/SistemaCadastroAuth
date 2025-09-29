<template>
  <div class="bg-surface-primary rounded-xl shadow-card border border-borderColor-surface overflow-hidden">
    <!-- Header da Tabela -->
    <div class="px-6 py-4 border-b border-borderColor-surface">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-text-primary">
          Lista de Funcionários
        </h2>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-text-secondary">
            {{ loading ? 'Carregando...' : `Total: ${totalFuncionarios}` }}
          </span>
          <BaseButton
            variant="primary"
            size="sm"
            @click="handleRecarregar"
            :loading="loading"
          >
            <template #icon-left>
              <ArrowPathIcon class="w-4 h-4" />
            </template>
            {{ loading ? 'Carregando...' : 'Recarregar' }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="inline-flex items-center space-x-2 text-text-secondary">
        <div class="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full"></div>
        <span>Carregando funcionários...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-6">
      <div class="bg-error-50 border border-error-200 rounded-lg p-4">
        <div class="flex items-center space-x-2">
          <ExclamationCircleIcon class="w-5 h-5 text-error-500 flex-shrink-0" />
          <div>
            <h3 class="text-error-800 font-medium text-sm">Erro ao carregar funcionários</h3>
            <p class="text-error-600 text-sm mt-1">{{ error }}</p>
          </div>
        </div>
        <div class="mt-4">
          <BaseButton
            variant="outline"
            size="sm"
            @click="handleRecarregar"
          >
            <template #icon-left>
              <ArrowPathIcon class="w-4 h-4" />
            </template>
            Tentar novamente
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="funcionarios.length === 0" class="p-8 text-center">
      <div class="flex flex-col items-center space-y-3">
        <UserGroupIcon class="w-12 h-12 text-text-muted" />
        <div>
          <h3 class="text-text-primary font-medium">Nenhum funcionário encontrado</h3>
          <p class="text-text-secondary text-sm mt-1">
            Não há funcionários cadastrados no sistema.
          </p>
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-surface-secondary">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Cargo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              E-mail
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-surface-primary divide-y divide-borderColor-surface">
          <tr 
            v-for="funcionario in funcionarios" 
            :key="funcionario.id"
            class="hover:bg-surface-hover transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon class="w-4 h-4 text-primary-600" />
                </div>
                <div class="ml-3">
                  <div class="text-sm font-medium text-text-primary">
                    {{ funcionario.nome }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {{ funcionario.cargo }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
              {{ funcionario.email || 'Não informado' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-2">
                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="handleEditarFuncionario(funcionario)"
                >
                  <template #icon-left>
                    <PencilIcon class="w-4 h-4" />
                  </template>
                  <span class="ml-2">Editar</span>
                </BaseButton>
                
                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="handleDeletarFuncionario(funcionario)"
                  class="text-error-500 hover:text-error-600 hover:bg-error-50"
                >
                  <template #icon-left>
                    <TrashIcon class="w-4 h-4" />
                  </template>
                  <span class="ml-2">Deletar</span>
                </BaseButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer da Tabela -->
    <div v-if="funcionarios.length > 0" class="px-6 py-3 bg-surface-secondary border-t border-borderColor-surface">
      <div class="flex justify-between items-center text-sm text-text-secondary">
        <span>Mostrando {{ funcionarios.length }} funcionário(s)</span>
        <span>Última atualização: {{ formatarDataAtualização() }}</span>
      </div>
    </div>

    <!-- Modal de Confirmação para Deletar -->
    <ConfirmModal
      :is-open="deleteModal.isOpen"
      :title="deleteModal.title"
      :message="deleteModal.message"
      :details="deleteModal.details"
      type="danger"
      confirm-text="Deletar"
      cancel-text="Cancelar"
      loading-text="Deletando..."
      :loading="deleteModal.loading"
      @confirm="confirmarDelecao"
      @cancel="cancelarDelecao"
    />
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  UserIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseButton from '~/components/BaseButton.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'

// Composable de funcionários
const { funcionarios, loading, error, totalFuncionarios, buscarFuncionarios, deletarFuncionario, clearError } = useFuncionarios()

// Composable de notificações
const { success, error: notificationError } = useNotification()

// Router para navegação
const router = useRouter()

// Estado do modal de deletar
const deleteModal = ref({
  isOpen: false,
  loading: false,
  title: '',
  message: '',
  details: '',
  funcionarioId: null,
  funcionarioNome: ''
})

// Função para recarregar dados
const handleRecarregar = async () => {
  clearError()
  const result = await buscarFuncionarios()
  if (result.success) {
    console.log('Funcionários recarregados com sucesso!')
  } else {
    console.error('Erro ao recarregar funcionários:', result.error)
  }
}

// Função para editar funcionário
const handleEditarFuncionario = (funcionario) => {
  console.log('Editando funcionário:', funcionario.nome)
  router.push(`/funcionarios/${funcionario.id}`)
}

// Função para iniciar processo de deletar funcionário
const handleDeletarFuncionario = (funcionario) => {
  console.log('Solicitando deleção do funcionário:', funcionario.nome)
  
  deleteModal.value = {
    isOpen: true,
    loading: false,
    title: 'Deletar Funcionário',
    message: `Tem certeza que deseja deletar o funcionário "${funcionario.nome}"?`,
    details: `Esta ação não pode ser desfeita. Todos os dados do funcionário serão removidos permanentemente do sistema.`,
    funcionarioId: funcionario.id,
    funcionarioNome: funcionario.nome
  }
}

// Função para confirmar deleção
const confirmarDelecao = async () => {
  if (!deleteModal.value.funcionarioId) return
  
  deleteModal.value.loading = true
  
  try {
    console.log('Confirmando deleção do funcionário ID:', deleteModal.value.funcionarioId)
    
    const result = await deletarFuncionario(deleteModal.value.funcionarioId)
    
    if (result.success) {
      await success(`Funcionário "${deleteModal.value.funcionarioNome}" deletado com sucesso!`)
      cancelarDelecao()
    } else {
      await notificationError(result.error || 'Erro ao deletar funcionário')
      deleteModal.value.loading = false
    }
  } catch (err) {
    console.error('Erro ao deletar funcionário:', err)
    await notificationError('Erro interno. Tente novamente.')
    deleteModal.value.loading = false
  }
}

// Função para cancelar deleção
const cancelarDelecao = () => {
  deleteModal.value = {
    isOpen: false,
    loading: false,
    title: '',
    message: '',
    details: '',
    funcionarioId: null,
    funcionarioNome: ''
  }
}

// Função para formatar data de atualização
const formatarDataAtualização = () => {
  return new Date().toLocaleString('pt-BR')
}

// Carregar dados ao montar o componente
onMounted(async () => {
  console.log('Componente FuncionariosTable montado, carregando dados...')
  await handleRecarregar()
})
</script>

<style scoped>
/* Animações customizadas */
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

tbody tr {
  animation: fadeIn 0.3s ease-in-out;
}

/* Hover effects */
tbody tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Scroll customizado */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>