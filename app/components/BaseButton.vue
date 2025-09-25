<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

interface BaseButtonEmits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
})

const emit = defineEmits<BaseButtonEmits>()

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => [
  // Classes base
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary',
  
  // Tamanhos
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-3 text-base': props.size === 'md',
    'px-6 py-4 text-lg': props.size === 'lg',
  },
  
  // Largura total
  {
    'w-full': props.fullWidth,
  },
  
  // Variantes
  {
    // Primary
    'bg-primary-500 text-text-inverse hover:bg-primary-600 hover:shadow-hover focus:ring-primary-500 shadow-primary': 
      props.variant === 'primary' && !props.disabled && !props.loading,
    
    // Secondary
    'bg-surface-primary text-text-primary border border-borderColor-surface hover:bg-surface-hover hover:shadow-surface focus:ring-secondary-500': 
      props.variant === 'secondary' && !props.disabled && !props.loading,
    
    // Outline
    'border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-text-inverse hover:shadow-hover focus:ring-primary-500': 
      props.variant === 'outline' && !props.disabled && !props.loading,
    
    // Ghost
    'text-text-primary hover:bg-surface-hover hover:text-primary-500 focus:ring-secondary-500': 
      props.variant === 'ghost' && !props.disabled && !props.loading,
    
    // Danger
    'bg-error-500 text-text-inverse hover:bg-error-600 hover:shadow-md focus:ring-error-500 shadow-md': 
      props.variant === 'danger' && !props.disabled && !props.loading,
  },
  
  // Estados
  {
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-wait opacity-75': props.loading,
    'hover:scale-105': !props.disabled && !props.loading,
  }
])

const textClasses = computed(() => [
  {
    'animate-pulse': props.loading,
  }
])
</script>

<style scoped>
/* Animações customizadas para o botão */
.hover\:shadow-hover:hover {
  box-shadow: 0 12px 35px rgba(249, 115, 22, 0.4);
}

.shadow-primary {
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
}

.shadow-surface {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}
</style>