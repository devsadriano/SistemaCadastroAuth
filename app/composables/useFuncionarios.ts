import type { Funcionario } from '~/types/funcionario'

interface FuncionariosState {
  funcionarios: Funcionario[]
  loading: boolean
  error: string | null
}

export const useFuncionarios = () => {
  const supabase = useSupabaseClient()

  // Estado global dos funcionários
  const funcionariosState = useState<FuncionariosState>('funcionarios.state', () => ({
    funcionarios: [],
    loading: false,
    error: null
  }))

  // Estados computados
  const funcionarios = computed(() => funcionariosState.value.funcionarios)
  const loading = computed(() => funcionariosState.value.loading)
  const error = computed(() => funcionariosState.value.error)

  // Função para limpar erro
  const clearError = () => {
    funcionariosState.value.error = null
  }

  // Função para definir loading
  const setLoading = (value: boolean) => {
    funcionariosState.value.loading = value
  }

  // Função para definir erro
  const setError = (error: string | null) => {
    funcionariosState.value.error = error
  }

  // Função para buscar todos os funcionários
  const buscarFuncionarios = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true)
      clearError()

      console.log('Iniciando busca de funcionários...')

      // Buscar funcionários no Supabase
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar funcionários:', error)
        
        let errorMessage = 'Erro ao carregar funcionários'
        
        // Personalizar mensagens de erro
        switch (error.code) {
          case 'PGRST116':
            errorMessage = 'Tabela funcionários não encontrada'
            break
          case '42P01':
            errorMessage = 'Tabela funcionários não existe no banco de dados'
            break
          case '42501':
            errorMessage = 'Sem permissão para acessar os dados'
            break
          default:
            errorMessage = error.message || 'Erro desconhecido ao carregar funcionários'
        }
        
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (data) {
        funcionariosState.value.funcionarios = data
        console.log(`${data.length} funcionários carregados com sucesso`)
        return { success: true }
      }

      return { success: false, error: 'Nenhum dado retornado' }

    } catch (err: any) {
      console.error('Erro interno ao buscar funcionários:', err)
      const errorMessage = err.message || 'Erro interno do servidor'
      setError(errorMessage)
      return { success: false, error: errorMessage }
      
    } finally {
      setLoading(false)
    }
  }

  // Função para obter um funcionário por ID
  const obterFuncionario = (id: number): Funcionario | undefined => {
    return funcionariosState.value.funcionarios.find(f => f.id === id)
  }

  // Função para criar um novo funcionário
  const criarFuncionario = async (dadosFuncionario: Omit<Funcionario, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string; data?: Funcionario }> => {
    try {
      setLoading(true)
      clearError()

      console.log('Criando novo funcionário:', dadosFuncionario)

      // Validações básicas
      if (!dadosFuncionario.nome?.trim()) {
        const errorMsg = 'Nome é obrigatório'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      if (!dadosFuncionario.cargo?.trim()) {
        const errorMsg = 'Cargo é obrigatório'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      if (!dadosFuncionario.salario || dadosFuncionario.salario <= 0) {
        const errorMsg = 'Salário deve ser maior que zero'
        setError(errorMsg)
        return { success: false, error: errorMsg }
      }

      // Validar e-mail se fornecido
      if (dadosFuncionario.email && dadosFuncionario.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(dadosFuncionario.email)) {
          const errorMsg = 'Formato de e-mail inválido'
          setError(errorMsg)
          return { success: false, error: errorMsg }
        }
      }

      // Inserir no Supabase
      const { data, error } = await supabase
        .from('funcionarios')
        .insert({
          nome: dadosFuncionario.nome.trim(),
          cargo: dadosFuncionario.cargo.trim(),
          endereco: dadosFuncionario.endereco?.trim() || null,
          email: dadosFuncionario.email?.trim() || null,
          salario: dadosFuncionario.salario
        } as any)
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar funcionário:', error)
        
        let errorMessage = 'Erro ao criar funcionário'
        
        // Personalizar mensagens de erro
        switch (error.code) {
          case '23505':
            errorMessage = 'Já existe um funcionário com estes dados'
            break
          case '42501':
            errorMessage = 'Sem permissão para criar funcionário'
            break
          case '23514':
            errorMessage = 'Dados inválidos fornecidos'
            break
          default:
            errorMessage = error.message || 'Erro desconhecido ao criar funcionário'
        }
        
        setError(errorMessage)
        return { success: false, error: errorMessage }
      }

      if (data) {
        // Adicionar o novo funcionário ao estado local
        funcionariosState.value.funcionarios.unshift(data as Funcionario)
        console.log('Funcionário criado com sucesso:', data)
        return { success: true, data: data as Funcionario }
      }

      return { success: false, error: 'Nenhum dado retornado após criação' }

    } catch (err: any) {
      console.error('Erro interno ao criar funcionário:', err)
      const errorMessage = err.message || 'Erro interno do servidor'
      setError(errorMessage)
      return { success: false, error: errorMessage }
      
    } finally {
      setLoading(false)
    }
  }

  // Função para obter total de funcionários
  const totalFuncionarios = computed(() => funcionariosState.value.funcionarios.length)

  return {
    // Estados
    funcionarios: readonly(funcionarios),
    loading: readonly(loading),
    error: readonly(error),
    totalFuncionarios: readonly(totalFuncionarios),
    
    // Ações
    buscarFuncionarios,
    obterFuncionario,
    criarFuncionario,
    clearError,
    setError,
  }
}