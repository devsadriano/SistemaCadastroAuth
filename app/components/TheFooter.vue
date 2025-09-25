<template>
  <footer class="bg-surface-primary border-t border-borderColor-surface mt-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">N</span>
            </div>
            <span class="text-text-primary font-semibold text-xl">Sistema Cadastro</span>
          </div>
          <p class="text-text-secondary text-sm leading-relaxed max-w-md">
            Sistema moderno de cadastro e autenticação construído com Nuxt 4, 
            Tailwind CSS, Headless UI e Heroicons. Design responsivo e acessível.
          </p>
          <div class="flex items-center space-x-4 mt-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-muted hover:text-emerald-500 transition-colors duration-200"
            >
              <span class="sr-only">GitHub</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-text-muted hover:text-emerald-500 transition-colors duration-200"
            >
              <span class="sr-only">Twitter</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Navegação
          </h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink 
                to="/" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Página Inicial
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/novocadastro" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Novo Cadastro
              </NuxtLink>
            </li>
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3 class="text-text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Suporte
          </h3>
          <ul class="space-y-3">
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Documentação
              </a>
            </li>
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Política de Privacidade
              </a>
            </li>
            <li>
              <a 
                href="#" 
                class="text-text-secondary hover:text-emerald-500 text-sm transition-colors duration-200"
              >
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-borderColor-surface mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-6">
            <p class="text-text-muted text-sm">
              © {{ currentYear }} Sistema Cadastro. Todos os direitos reservados.
            </p>
          </div>
          <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2 text-text-muted text-sm">
              <span>Construído com</span>
              <HeartIcon class="w-4 h-4 text-red-500" />
              <span>usando</span>
              <span class="text-emerald-500 font-medium">Nuxt 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Imports explícitos dos ícones
import { HeartIcon } from '@heroicons/vue/24/solid'

// Ano atual
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Animações para links */
a:hover {
  transform: translateX(2px);
  transition: transform 0.2s ease-in-out;
}

/* Gradiente sutil no fundo */
footer {
  background: linear-gradient(180deg, 
    theme('colors.surface.primary') 0%, 
    theme('colors.surface.secondary') 100%
  );
}
</style>