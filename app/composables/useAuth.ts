import type { User } from '@supabase/supabase-js'

interface LoginCredentials {
  email: string
  password: string
}

interface AuthState {
  user: User | null
  session: any | null
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()

  // Estado global da autenticação
  const authState = useState<AuthState>('auth.state', () => ({
    user: null,
    session: null,
    loading: false,
    error: null
  }))

  // Estados computados
  const isAuthenticated = computed(() => !!authState.value.user)
  const user = computed(() => authState.value.user)
  const loading = computed(() => authState.value.loading)
  const error = computed(() => authState.value.error)

  // Função para limpar erro
  const clearError = () => {
    authState.value.error = null
  }

  // Função para definir loading
  const setLoading = (value: boolean) => {
    authState.value.loading = value
  }

  // Função para definir erro
  const setError = (error: string | null) => {
    authState.value.error = error
  }

  // Função de login
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      clearError()

      // Validações básicas
      if (!credentials.email || !credentials.password) {
        const errorMsg = 'E-mail e senha são obrigatórios'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Validar formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(credentials.email)) {
        const errorMsg = 'Formato de e-mail inválido'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Fazer login com Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        let errorMessage = 'Erro ao fazer login'
        
        // Personalizar mensagens de erro
        switch (error.message) {
          case 'Invalid login credentials':
            errorMessage = 'E-mail ou senha incorretos'
            break
          case 'Email not confirmed':
            errorMessage = 'E-mail não confirmado. Verifique sua caixa de entrada'
            break
          case 'Too many requests':
            errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos'
            break
          default:
            errorMessage = error.message
        }
        
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (data.user && data.session) {
        authState.value.user = data.user
        authState.value.session = data.session
        
        // Redirecionar para página inicial
        await router.push('/')
        
        return { success: true }
      }

      return { success: false, error: 'Erro desconhecido ao fazer login' }

    } catch (err: any) {
      const errorMessage = err.message || 'Erro interno do servidor'
      setError(errorMessage)
      return { success: false, error: errorMessage }
      
    } finally {
      setLoading(false)
    }
  }

  // Função de logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erro ao fazer logout:', error)
      }

      // Limpar estado local
      authState.value.user = null
      authState.value.session = null
      
      // Redirecionar para página de login
      await router.push('/login')
      
    } catch (err) {
      console.error('Erro interno ao fazer logout:', err)
    } finally {
      setLoading(false)
    }
  }

  // Função para verificar se o usuário está autenticado
  const checkAuth = async (): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        authState.value.user = session.user
        authState.value.session = session
      } else {
        authState.value.user = null
        authState.value.session = null
      }
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err)
      authState.value.user = null
      authState.value.session = null
    }
  }

  // Listener para mudanças de autenticação
  const initAuthListener = () => {
    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        authState.value.user = session.user
        authState.value.session = session
      } else {
        authState.value.user = null
        authState.value.session = null
      }
    })
  }

  // Função para obter perfil do usuário
  const getUserProfile = async () => {
    if (!authState.value.user) return null

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authState.value.user.id)
        .single()

      if (error) {
        console.error('Erro ao buscar perfil:', error)
        return null
      }

      return data
    } catch (err) {
      console.error('Erro interno ao buscar perfil:', err)
      return null
    }
  }

  return {
    // Estados
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    loading: readonly(loading),
    error: readonly(error),
    
    // Ações
    login,
    logout,
    checkAuth,
    initAuthListener,
    getUserProfile,
    clearError,
    setError,
  }
}