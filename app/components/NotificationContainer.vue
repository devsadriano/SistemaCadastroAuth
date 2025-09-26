<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="getNotificationClasses(notification.type)"
        class="max-w-sm p-4 rounded-lg shadow-lg border backdrop-blur-sm"
      >
        <div class="flex items-start">
          <!-- Ícone -->
          <div class="flex-shrink-0">
            <CheckCircleIcon v-if="notification.type === 'success'" class="h-5 w-5 text-success-500" />
            <XCircleIcon v-else-if="notification.type === 'error'" class="h-5 w-5 text-error-500" />
            <InformationCircleIcon v-else-if="notification.type === 'info'" class="h-5 w-5 text-primary-500" />
            <ExclamationTriangleIcon v-else-if="notification.type === 'warning'" class="h-5 w-5 text-warning-500" />
          </div>

          <!-- Mensagem -->
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium">
              {{ notification.message }}
            </p>
          </div>

          <!-- Botão fechar -->
          <button
            @click="removeNotification(notification.id)"
            class="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
// Imports explícitos dos ícones
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Usar o composable de notificações
const { notificationState, removeNotification } = useNotification()

// Computada para as notificações
const notifications = computed(() => notificationState.value.messages)

// Função para classes CSS baseadas no tipo
const getNotificationClasses = (type) => {
  const classes = {
    success: 'bg-success-50 border-success-200 text-success-800',
    error: 'bg-error-50 border-error-200 text-error-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800'
  }
  return classes[type] || classes.info
}
</script>

<style scoped>
/* Animações para as notificações */
.notification-enter-active {
  transition: all 0.4s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>