import { Trash, X } from '@phosphor-icons/react'

interface DeletarBolsaProps {
  isOpen: boolean
  bolsaNome: string
  onConfirm: () => void
  onCancel: () => void
}

export function DeletarBolsa({
  isOpen,
  bolsaNome,
  onConfirm,
  onCancel
}: DeletarBolsaProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <Trash size={22} />
            <h2 className="text-lg font-semibold">
              Deletar Bolsa
            </h2>
          </div>

          <button onClick={onCancel}>
            <X size={20} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Conteúdo */}
        <p className="text-sm text-gray-600 mb-6">
          Tem certeza que deseja excluir a bolsa{' '}
          <span className="font-semibold text-gray-800">
            {bolsaNome}
          </span>
          ?  
          <br />
          <span className="text-gray-500">
            Essa ação não poderá ser desfeita.
          </span>
        </p>

        {/* Ações */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-sm border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
