<template>
  <div :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="dropdownId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <!-- Dropdown Container -->
    <div class="relative">
      <Listbox v-model="selectedValue" :disabled="disabled">
        <div class="relative">
          <!-- Icon Left -->
          <div v-if="$slots.iconLeft" :class="['absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none icon-container', iconClasses]">
            <slot name="iconLeft" />
          </div>

          <!-- Dropdown Button -->
          <ListboxButton :class="buttonClasses">
            <span class="block truncate">
              {{ selectedValue || placeholder || 'Selecione uma opção' }}
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <!-- Dropdown Options -->
          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions :class="optionsClasses">
              <ListboxOption
                v-for="option in options"
                :key="option.value || option"
                :value="option.value || option"
                v-slot="{ active, selected }"
              >
                <li :class="getOptionClasses(active, selected)">
                  <span :class="getOptionTextClasses(selected)">
                    {{ option.label || option }}
                  </span>
                  <span v-if="selected" :class="selectedIconClasses">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <!-- Helper Text / Error -->
    <div v-if="helperText || errorMessage" :class="helperClasses">
      {{ errorMessage || helperText }}
    </div>
  </div>
</template>

<script setup>
// Imports explícitos do Headless UI
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

// Imports explícitos dos ícones
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  errorMessage: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'filled', 'outlined'].includes(value)
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

// Slots
const slots = useSlots()

// Estado interno
const isFocused = ref(false)

// ID único para o dropdown
const dropdownId = computed(() => `dropdown-${Math.random().toString(36).substring(2, 9)}`)

// Valor selecionado com v-model
const selectedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

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

const buttonClasses = computed(() => [
  // Classes base
  'relative w-full cursor-default rounded-lg py-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary',
  
  // Tamanhos
  {
    'px-3 py-2 text-sm': props.size === 'sm',
    'px-4 py-3 text-base': props.size === 'md',
    'px-5 py-4 text-lg': props.size === 'lg',
  },
  
  // Padding para ícones
  {
    'pl-10': !!slots.iconLeft,
    'pr-10': true, // Sempre tem espaço para o chevron
  },
  
  // Variantes
  {
    // Default
    'bg-surface-primary border border-borderColor-surface text-text-primary hover:border-borderColor-accent focus:border-primary-500 focus:ring-primary-500/20': 
      props.variant === 'default' && !props.errorMessage && !props.disabled,
    
    // Filled
    'bg-surface-secondary border-0 text-text-primary hover:bg-surface-hover focus:bg-surface-primary focus:ring-primary-500/20': 
      props.variant === 'filled' && !props.errorMessage && !props.disabled,
    
    // Outlined
    'bg-transparent border-2 border-borderColor-surface text-text-primary hover:border-primary-500 focus:border-primary-500 focus:ring-primary-500/20': 
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
  }
])

const optionsClasses = computed(() => [
  'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
])

const iconClasses = computed(() => [
  'w-5 h-5 transition-colors duration-200 text-slate-500'
])

const helperClasses = computed(() => [
  'mt-2 text-sm transition-colors duration-200',
  {
    'text-text-muted': !props.errorMessage,
    'text-error-500': props.errorMessage,
  }
])

const selectedIconClasses = computed(() => [
  'absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500'
])

// Função para classes das opções
const getOptionClasses = (active, selected) => [
  'relative cursor-default select-none py-2 pl-3 pr-9 transition-colors duration-150',
  {
    'bg-primary-100 text-primary-900': active,
    'text-text-primary': !active,
  }
]

// Função para classes do texto das opções
const getOptionTextClasses = (selected) => [
  'block truncate',
  {
    'font-medium': selected,
    'font-normal': !selected,
  }
]
</script>

<style scoped>
/* Animações customizadas */
.listbox-transition-enter-active,
.listbox-transition-leave-active {
  transition: all 0.2s ease-in-out;
}

.listbox-transition-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.listbox-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scroll customizado */
.max-h-60::-webkit-scrollbar {
  width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>