<template>
  <div class="bg-surface-primary rounded-xl shadow-card border border-borderColor-surface p-8">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-text-primary mb-2">
        {{ props.isNovo ? 'Cadastrar Novo Funcionário' : 'Editar Funcionário' }}
      </h2>
      <p class="text-text-secondary text-sm">
        {{ props.isNovo ? 'Preencha os dados para cadastrar um novo funcionário' : 'Altere os dados do funcionário' }}
      </p>
    </div>

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nome -->
      <BaseInput
        v-model="formData.nome"
        type="text"
        label="Nome"
        placeholder="Digite o nome completo"
        required
        :disabled="loading"
      >
        <template #iconLeft>
          <UserIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- Cargo -->
      <BaseDropdown
        v-model="formData.cargo"
        label="Cargo"
        placeholder="Selecione o cargo do funcionário"
        :options="cargoOptions"
        required
        :disabled="loading"
      >
        <template #iconLeft>
          <BriefcaseIcon class="w-5 h-5" />
        </template>
      </BaseDropdown>

      <!-- Endereço -->
      <BaseInput
        v-model="formData.endereco"
        type="text"
        label="Endereço"
        placeholder="Digite o endereço (opcional)"
        :disabled="loading"
      >
        <template #iconLeft>
          <MapPinIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- E-mail -->
      <BaseInput
        v-model="formData.email"
        type="email"
        label="E-mail"
        placeholder="Digite o e-mail (opcional)"
        :disabled="loading"
      >
        <template #iconLeft>
          <EnvelopeIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- Salário -->
      <BaseInput
        v-model="formData.salario"
        type="number"
        label="Salário"
        placeholder="Digite o salário"
        required
        :disabled="loading"
      >
        <template #iconLeft>
          <CurrencyDollarIcon class="w-5 h-5" />
        </template>
      </BaseInput>

      <!-- Botões -->
      <div class="flex flex-col sm:flex-row gap-4 pt-6">
        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          full-width
          :loading="loading"
        >
          <template #icon-left>
            <CheckIcon v-if="props.isNovo" class="w-5 h-5" />
            <PencilIcon v-else class="w-5 h-5" />
          </template>
          <span v-if="loading">
            {{ props.isNovo ? 'Salvando...' : 'Atualizando...' }}
          </span>
          <span v-else>
            {{ props.isNovo ? 'Salvar Funcionário' : 'Editar Funcionário' }}
          </span>
        </BaseButton>

        <BaseButton
          type="button"
          variant="outline"
          size="lg"
          full-width
          @click="handleCancel"
          :disabled="loading"
        >
          <template #icon-left>
            <XMarkIcon class="w-5 h-5" />
          </template>
          Cancelar
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  UserIcon,
  BriefcaseIcon,
  MapPinIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  CheckIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'
import BaseDropdown from '~/components/BaseDropdown.vue'

// Props
const props = defineProps({
  isNovo: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['submit', 'cancel'])

// Debug: Verificar valor da prop
console.log('FormFuncionario - isNovo:', props.isNovo)

// Opções de cargo para o dropdown
const cargoOptions = [
  'Analista de RH',
  'Desenvolvedor Fullstack',
  'Gerente de Projetos',
  'Designer UX/UI',
  'Assistente Administrativo',
  'Engenheiro de Software',
  'Coordenador de Marketing',
  'Técnico de Suporte',
  'Analista Financeiro',
  'Diretor Comercial'
]

// Estado do formulário
const formData = ref({
  nome: '',
  cargo: '',
  endereco: '',
  email: '',
  salario: ''
})

// Estado de loading
const loading = ref(false)

// Validação do formulário
const isFormValid = computed(() => {
  return formData.value.nome.trim() !== '' && 
         formData.value.cargo.trim() !== '' && 
         formData.value.salario !== '' && 
         Number(formData.value.salario) > 0
})

// Função para lidar com o submit
const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true
  
  try {
    // Preparar dados para envio
    const dataToSubmit = {
      nome: formData.value.nome.trim(),
      cargo: formData.value.cargo.trim(),
      endereco: formData.value.endereco.trim() || null,
      email: formData.value.email.trim() || null,
      salario: Number(formData.value.salario)
    }

    console.log(props.isNovo ? 'Salvando novo funcionário:' : 'Editando funcionário:', dataToSubmit)

    // Emitir evento para componente pai
    emit('submit', dataToSubmit)

  } catch (error) {
    console.error('Erro ao processar formulário:', error)
  } finally {
    loading.value = false
  }
}

// Função para cancelar
const handleCancel = () => {
  console.log('Cancelando operação')
  emit('cancel')
}

// Função para limpar formulário
const clearForm = () => {
  formData.value = {
    nome: '',
    cargo: '',
    endereco: '',
    email: '',
    salario: ''
  }
}

// Expor funções para componente pai
defineExpose({
  clearForm
})
</script>

<style scoped>
/* Animações para o formulário */
form {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efeitos nos inputs */
:deep(.BaseInput) {
  transition: transform 0.2s ease-in-out;
}

:deep(.BaseInput:focus-within) {
  transform: translateY(-2px);
}

/* Validação visual */
.form-group.invalid {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>