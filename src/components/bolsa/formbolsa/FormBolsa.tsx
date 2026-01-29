import { useState } from 'react'

export interface BolsaFormData {
  nome: string
  instituicao: string
  percentual: number
  status: 'ATIVA' | 'INATIVA'
}

interface FormBolsaProps {
  initialData?: BolsaFormData
  onSubmit: (data: BolsaFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function FormBolsa({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false
}: FormBolsaProps) {
  const [formData, setFormData] = useState<BolsaFormData>(() => ({
    nome: initialData?.nome ?? '',
    instituicao: initialData?.instituicao ?? '',
    percentual: initialData?.percentual ?? 0,
    status: initialData?.status ?? 'ATIVA'
  }))

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: name === 'percentual' ? Number(value) : value
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Bolsa
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Ex: Bolsa Integral"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Instituição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instituição
        </label>
        <input
          type="text"
          name="instituicao"
          value={formData.instituicao}
          onChange={handleChange}
          required
          placeholder="Ex: Tech School"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Percentual */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Percentual de Bolsa (%)
        </label>
        <input
          type="number"
          name="percentual"
          min={0}
          max={100}
          value={formData.percentual}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="ATIVA">Ativa</option>
          <option value="INATIVA">Inativa</option>
        </select>
      </div>

      {/* Ações */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
