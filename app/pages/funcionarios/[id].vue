<template>
  <div class="min-h-screen bg-background-primary py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-text-primary">
              Editar Funcionário
            </h1>
            <p class="text-text-secondary mt-2">
              Visualize e edite as informações do funcionário
            </p>
          </div>
          
          <!-- Botão Voltar -->
          <BaseButton
            variant="outline"
            @click="$router.push('/')"
          >
            <template #icon-left>
              <ArrowLeftIcon class="w-5 h-5" />
            </template>
            Voltar
          </BaseButton>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingPage" class="flex items-center justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p class="text-text-secondary">Carregando dados do funcionário...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="pageError" class="text-center py-12">
        <div class="bg-error-50 border border-error-200 rounded-lg p-6 max-w-md mx-auto">
          <ExclamationTriangleIcon class="h-12 w-12 text-error-500 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-error-800 mb-2">
            Funcionário não encontrado
          </h3>
          <p class="text-error-600 text-sm mb-4">
            {{ pageError }}
          </p>
          <BaseButton
            variant="primary"
            @click="$router.push('/')"
          >
            Voltar à lista
          </BaseButton>
        </div>
      </div>

      <!-- Formulário -->
      <div v-else-if="funcionario" class="bg-surface-primary rounded-xl shadow-card border border-borderColor-surface p-8">
        <!-- FormFuncionario com dados preenchidos -->
        <FormFuncionario
          :is-novo="false"
          :funcionario-data="funcionario"
          @submit="handleSubmitEdit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseButton from '~/components/BaseButton.vue'
import FormFuncionario from '~/components/FormFuncionario.vue'

// Meta da página
definePageMeta({
  layout: 'default'
})

// Composables
const route = useRoute()
const router = useRouter()
const { funcionarios, obterFuncionario, buscarFuncionarios, loading } = useFuncionarios()
const { error: notifyError } = useNotification()

// Estado da página
const isLoadingPage = ref(true)
const pageError = ref(null)
const funcionario = ref(null)

// Obter ID da rota
const funcionarioId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : null
})

// Função para carregar dados do funcionário
const carregarFuncionario = async () => {
  try {
    isLoadingPage.value = true
    pageError.value = null

    // Validar ID
    if (!funcionarioId.value || isNaN(funcionarioId.value)) {
      pageError.value = 'ID do funcionário inválido'
      return
    }

    console.log('Buscando funcionário com ID:', funcionarioId.value)

    // Primeiro, tentar buscar do estado global (cache)
    let funcionarioEncontrado = obterFuncionario(funcionarioId.value)

    // Se não encontrou no cache, buscar todos os funcionários
    if (!funcionarioEncontrado) {
      console.log('Funcionário não encontrado no cache, buscando todos...')
      
      const result = await buscarFuncionarios()
      
      if (result.success) {
        // Tentar encontrar novamente após buscar
        funcionarioEncontrado = obterFuncionario(funcionarioId.value)
      } else {
        pageError.value = result.error || 'Erro ao carregar dados'
        await notifyError('Erro ao carregar dados do funcionário')
        return
      }
    }

    // Verificar se encontrou o funcionário
    if (funcionarioEncontrado) {
      funcionario.value = funcionarioEncontrado
      console.log('Funcionário carregado:', funcionarioEncontrado)
    } else {
      pageError.value = `Funcionário com ID ${funcionarioId.value} não foi encontrado`
      await notifyError('Funcionário não encontrado')
    }

  } catch (err) {
    console.error('Erro ao carregar funcionário:', err)
    pageError.value = 'Erro interno ao carregar funcionário'
    await notifyError('Erro interno ao carregar dados')
  } finally {
    isLoadingPage.value = false
  }
}

// Função para lidar com submit (edição)
const handleSubmitEdit = async (dadosEditados) => {
  console.log('Dados editados recebidos:', dadosEditados)
  console.log('Funcionário original:', funcionario.value)
  
  // Navegar de volta para a página inicial após sucesso
  // O FormFuncionario já lida com a persistência e notificações
  router.push('/')
}

// Função para cancelar edição
const handleCancel = () => {
  console.log('Edição cancelada')
  router.push('/')
}

// Carregar dados quando o componente montar
onMounted(() => {
  carregarFuncionario()
})

// Recarregar se o ID mudar (navegação)
watch(funcionarioId, (novoId) => {
  if (novoId) {
    carregarFuncionario()
  }
})
</script>

<style scoped>
/* Animação para loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transições suaves */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>