<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Modal -->
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div 
            v-if="isOpen"
            class="bg-surface-primary rounded-xl shadow-xl border border-borderColor-surface max-w-md w-full mx-auto"
            @click.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-borderColor-surface">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <component 
                    :is="iconComponent" 
                    class="w-8 h-8"
                    :class="iconColorClass"
                  />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text-primary">
                    {{ title }}
                  </h3>
                  <p v-if="subtitle" class="text-sm text-text-secondary mt-1">
                    {{ subtitle }}
                  </p>
                </div>
              </div>
              
              <!-- Close Button -->
              <button
                @click="handleCancel"
                class="text-text-secondary hover:text-text-primary transition-colors duration-200 p-1 rounded-full hover:bg-surface-hover"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <p class="text-text-primary">
                {{ message }}
              </p>
              
              <!-- Informações adicionais -->
              <div v-if="details" class="mt-4 p-3 bg-surface-secondary rounded-lg">
                <p class="text-sm text-text-secondary">
                  {{ details }}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex flex-col sm:flex-row gap-3 p-6 pt-0">
              <BaseButton
                variant="outline"
                size="lg"
                full-width
                @click="handleCancel"
                :disabled="loading"
              >
                {{ cancelText }}
              </BaseButton>
              
              <BaseButton
                :variant="confirmVariant"
                size="lg"
                full-width
                @click="handleConfirm"
                :loading="loading"
                :disabled="loading"
              >
                <template #icon-left>
                  <component :is="confirmIconComponent" class="w-5 h-5" />
                </template>
                {{ loading ? loadingText : confirmText }}
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  TrashIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

// Imports explícitos dos componentes
import BaseButton from '~/components/BaseButton.vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmar ação'
  },
  subtitle: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'warning', // 'warning', 'danger', 'info', 'success'
    validator: (value) => ['warning', 'danger', 'info', 'success'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  loadingText: {
    type: String,
    default: 'Processando...'
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['confirm', 'cancel', 'close'])

// Estados computados baseados no tipo
const iconComponent = computed(() => {
  switch (props.type) {
    case 'danger':
      return ExclamationTriangleIcon
    case 'info':
      return InformationCircleIcon
    case 'success':
      return CheckCircleIcon
    case 'warning':
    default:
      return ExclamationCircleIcon
  }
})

const iconColorClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'text-error-500'
    case 'info':
      return 'text-primary-500'
    case 'success':
      return 'text-success-500'
    case 'warning':
    default:
      return 'text-warning-500'
  }
})

const confirmVariant = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'danger'
    case 'info':
      return 'primary'
    case 'success':
      return 'success'
    case 'warning':
    default:
      return 'warning'
  }
})

const confirmIconComponent = computed(() => {
  switch (props.type) {
    case 'danger':
      return TrashIcon
    case 'info':
      return InformationCircleIcon
    case 'success':
      return CheckCircleIcon
    case 'warning':
    default:
      return ExclamationTriangleIcon
  }
})

// Funções de controle
const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && !props.loading) {
    handleCancel()
  }
}

// Controle de teclado
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen && !props.loading) {
    handleCancel()
  }
}

// Adicionar/remover listener de teclado
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown)
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})

// Cleanup ao desmontar componente
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Garantir que o modal apareça sobre outros elementos */
.z-50 {
  z-index: 50;
}
</style>