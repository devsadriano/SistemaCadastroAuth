/**
 * Composable para gerenciar notificações
 * Usa uma abordagem simples com estado reativo
 */
interface NotificationState {
  messages: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
    timestamp: number
  }>
}

export const useNotification = () => {
  // Estado global das notificações
  const notificationState = useState<NotificationState>('notifications.state', () => ({
    messages: []
  }))

  // Função para adicionar notificação
  const addNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    const notification = {
      id,
      type,
      message,
      timestamp: Date.now()
    }

    notificationState.value.messages.push(notification)

    // Auto-remover após alguns segundos
    setTimeout(() => {
      removeNotification(id)
    }, type === 'error' ? 6000 : 4000)

    // Feedback imediato no console para debug
    console.log(`🔔 ${type.toUpperCase()}: ${message}`)
  }

  // Função para remover notificação
  const removeNotification = (id: string) => {
    const index = notificationState.value.messages.findIndex(n => n.id === id)
    if (index > -1) {
      notificationState.value.messages.splice(index, 1)
    }
  }

  // Métodos básicos
  const success = async (message: string) => {
    addNotification('success', message)
  }

  const error = async (message: string) => {
    addNotification('error', message)
  }

  const info = async (message: string) => {
    addNotification('info', message)
  }

  const warning = async (message: string) => {
    addNotification('warning', message)
  }

  // Toast personalizado para operações CRUD
  const crud = {
    created: async (entity: string = 'item') => {
      await success(`${entity} criado com sucesso!`)
    },
    
    updated: async (entity: string = 'item') => {
      await success(`${entity} atualizado com sucesso!`)
    },
    
    deleted: async (entity: string = 'item') => {
      await success(`${entity} removido com sucesso!`)
    },
    
    error: async (action: string = 'operação', entity: string = 'item') => {
      await error(`Erro ao ${action} ${entity}. Tente novamente.`)
    }
  }

  // Toast para autenticação
  const auth = {
    loginSuccess: async () => {
      await success('Login realizado com sucesso!')
    },
    
    loginError: async () => {
      await error('Credenciais inválidas. Verifique seus dados.')
    },
    
    registerSuccess: async () => {
      await success('Conta criada com sucesso! Faça o login.')
    },
    
    registerError: async (message?: string) => {
      await error(message || 'Erro ao criar conta. Tente novamente.')
    },
    
    logoutSuccess: async () => {
      await info('Logout realizado com sucesso.')
    },
    
    sessionExpired: async () => {
      await warning('Sua sessão expirou. Faça o login novamente.')
    }
  }

  // Toast para validações
  const validation = {
    requiredFields: async () => {
      await warning('Preencha todos os campos obrigatórios.')
    },
    
    invalidEmail: async () => {
      await error('E-mail inválido.')
    },
    
    passwordMismatch: async () => {
      await error('As senhas não coincidem.')
    },
    
    weakPassword: async () => {
      await warning('A senha deve ter pelo menos 6 caracteres.')
    }
  }

  // Toast para conexão/rede
  const network = {
    offline: async () => {
      await error('Sem conexão com a internet.')
    },
    
    reconnected: async () => {
      await success('Conexão restabelecida!')
    },
    
    timeout: async () => {
      await error('Tempo limite excedido. Tente novamente.')
    }
  }

  return {
    // Estado
    notificationState: readonly(notificationState),
    
    // Métodos básicos
    success,
    error,
    info,
    warning,
    removeNotification,
    
    // Grupos especializados
    crud,
    auth,
    validation,
    network
  }
}