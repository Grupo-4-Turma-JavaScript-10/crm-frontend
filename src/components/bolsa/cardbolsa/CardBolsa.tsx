import { Eye, PencilSimple, Trash } from '@phosphor-icons/react'

interface Bolsa {
  id: number
  nome: string
  instituicao: string
  percentual: number
  status: 'ATIVA' | 'INATIVA' | 'CONCEDIDA'
}

interface CardBolsaProps {
  bolsa: Bolsa
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

export function CardBolsa({
  bolsa,
  onView,
  onEdit,
  onDelete
}: CardBolsaProps) {
  return (
    <div className="grid grid-cols-5 items-center px-6 py-4 bg-white border-b border-gray-200 text-sm">
      
      {/* Nome */}
      <span className="text-gray-900 font-medium">
        {bolsa.nome}
      </span>

      {/* Instituição */}
      <span className="text-gray-500">
        {bolsa.instituicao}
      </span>

      {/* Percentual */}
      <span className="font-semibold text-blue-600">
        {bolsa.percentual}%
      </span>

      {/* Status */}
      <span
        className={`w-fit px-3 py-1 rounded-full text-xs font-medium
          ${
            bolsa.status === 'ATIVA'
              ? 'bg-green-100 text-green-600'
              : 'bg-green-50 text-green-500'
          }
        `}
      >
        {bolsa.status === 'ATIVA' ? 'Ativo' : 'Inativo'}
      </span>

      {/* Ações */}
      <div className="flex gap-4 text-gray-400">
        {onView && (
          <button onClick={() => onView(bolsa.id)}>
            <Eye size={18} className="hover:text-blue-600 transition" />
          </button>
        )}

        {onEdit && (
          <button onClick={() => onEdit(bolsa.id)}>
            <PencilSimple size={18} className="hover:text-gray-700 transition" />
          </button>
        )}

        {onDelete && (
          <button onClick={() => onDelete(bolsa.id)}>
            <Trash size={18} className="hover:text-red-500 transition" />
          </button>
        )}
      </div>
    </div>
  )
}
