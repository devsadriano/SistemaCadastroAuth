export default defineNuxtPlugin(() => {
  const { initAuthListener, checkAuth } = useAuth()
  
  // Inicializar o listener de mudanças de estado de autenticação
  initAuthListener()
  
  // Verificar se o usuário está autenticado ao carregar a aplicação
  checkAuth()
})