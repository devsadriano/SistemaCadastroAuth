<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Icon Left -->
      <div v-if="$slots.iconLeft" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="iconLeft" :class="iconClasses" />
      </div>

      <!-- Input -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- Icon Right -->
      <div v-if="$slots.iconRight || loading" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <div v-if="loading" class="animate-spin h-5 w-5 text-primary-500">
          <svg class="w-full h-full" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <slot v-else name="iconRight" :class="iconClasses" />
      </div>
    </div>

    <!-- Helper Text / Error -->
    <div v-if="helperText || errorMessage" :class="helperClasses">
      {{ errorMessage || helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface BaseInputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  autocomplete?: string
}

interface BaseInputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'input', event: Event): void
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  size: 'md',
  variant: 'default',
  autocomplete: 'off',
})

const emit = defineEmits<BaseInputEmits>()

// Slots
const slots = useSlots()

// Estado interno
const isFocused = ref<boolean>(false)

// ID único para o input
const inputId = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`)

// Handlers de eventos
const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleFocus = (event: FocusEvent): void => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent): void => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

// Classes computadas
const containerClasses = computed(() => [
  'w-full'
])

const labelClasses = computed(() => [
  'block text-sm font-medium text-text-primary mb-2 transition-colors duration-200',
  {
    'text-primary-500': isFocused.value && !props.errorMessage,
    'text-error-500': props.errorMessage,
  }
])

const inputClasses = computed(() => [
  // Classes base
  'block w-full rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary',
  
  // Tamanhos
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-3 text-base': props.size === 'md',
    'px-5 py-4 text-lg': props.size === 'lg',
  },
  
  // Padding para ícones
  {
    'pl-10': !!slots.iconLeft,
    'pr-10': !!slots.iconRight || props.loading,
  },
  
  // Variantes
  {
    // Default
    'bg-surface-primary border border-borderColor-surface text-text-primary placeholder-text-muted hover:border-borderColor-accent focus:border-primary-500 focus:ring-primary-500/20': 
      props.variant === 'default' && !props.errorMessage && !props.disabled,
    
    // Filled
    'bg-surface-secondary border-0 text-text-primary placeholder-text-muted hover:bg-surface-hover focus:bg-surface-primary focus:ring-primary-500/20': 
      props.variant === 'filled' && !props.errorMessage && !props.disabled,
    
    // Outlined
    'bg-transparent border-2 border-borderColor-surface text-text-primary placeholder-text-muted hover:border-primary-500 focus:border-primary-500 focus:ring-primary-500/20': 
      props.variant === 'outlined' && !props.errorMessage && !props.disabled,
  },
  
  // Estados de erro
  {
    'border-error-500 focus:border-error-500 focus:ring-error-500/20 bg-error-500/5': 
      props.errorMessage && !props.disabled,
  },
  
  // Estados
  {
    'opacity-60 cursor-not-allowed bg-surface-tertiary': props.disabled,
    'cursor-default': props.readonly,
  }
])

const iconClasses = computed(() => [
  'w-5 h-5 transition-colors duration-200',
  {
    'text-text-muted': !isFocused.value && !props.errorMessage,
    'text-primary-500': isFocused.value && !props.errorMessage,
    'text-error-500': props.errorMessage,
  }
])

const helperClasses = computed(() => [
  'mt-2 text-sm transition-colors duration-200',
  {
    'text-text-muted': !props.errorMessage,
    'text-error-500': props.errorMessage,
  }
])
</script>

<style scoped>
/* Animações e transições customizadas */
input:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Placeholder styling */
input::placeholder {
  transition: opacity 0.3s ease;
}

input:focus::placeholder {
  opacity: 0.5;
}
</style>