export interface Funcionario {
  id: number
  nome: string
  cargo: string
  endereco: string | null
  email: string | null
  salario: number
  created_at: string | null
}

export interface CreateFuncionarioData {
  nome: string
  cargo: string
  endereco?: string | null
  email?: string | null
  salario: number
}

export interface UpdateFuncionarioData extends Partial<CreateFuncionarioData> {
  id: number
}

export interface FuncionarioFilters {
  nome?: string
  cargo?: string
  email?: string
}