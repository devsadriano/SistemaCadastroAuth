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

  // Função de registro
  const register = async (credentials: LoginCredentials & { confirmPassword: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      clearError()

      // Validações básicas
      if (!credentials.email || !credentials.password || !credentials.confirmPassword) {
        const errorMsg = 'Todos os campos são obrigatórios'
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

      // Validar confirmação de senha
      if (credentials.password !== credentials.confirmPassword) {
        const errorMsg = 'As senhas não coincidem'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Validar força da senha
      if (credentials.password.length < 6) {
        const errorMsg = 'A senha deve ter pelo menos 6 caracteres'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Fazer registro com Supabase
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        let errorMessage = 'Erro ao criar conta'
        
        // Personalizar mensagens de erro
        switch (error.message) {
          case 'User already registered':
            errorMessage = 'Este e-mail já está cadastrado'
            break
          case 'Password should be at least 6 characters':
            errorMessage = 'A senha deve ter pelo menos 6 caracteres'
            break
          case 'Invalid email':
            errorMessage = 'E-mail inválido'
            break
          case 'Signup is disabled':
            errorMessage = 'Cadastro de novos usuários está desabilitado'
            break
          default:
            errorMessage = error.message
        }
        
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (data.user) {
        // Se o usuário foi criado com sucesso
        if (data.session) {
          // Se já está logado (confirmação automática)
          authState.value.user = data.user
          authState.value.session = data.session
          await router.push('/')
        } else {
          // Se precisa confirmar e-mail
          setError(null) // Limpar erro anterior
          return { 
            success: true, 
            error: 'Conta criada! Verifique seu e-mail para confirmar o cadastro.'
          }
        }
        
        return { success: true }
      }

      return { success: false, error: 'Erro desconhecido ao criar conta' }

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
    register,
    logout,
    checkAuth,
    initAuthListener,
    getUserProfile,
    clearError,
    setError,
  }
}