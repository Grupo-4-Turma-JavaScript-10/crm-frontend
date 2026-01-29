import { useState } from 'react'
import { Plus } from '@phosphor-icons/react'

import { CardBolsa } from '../cardbolsa/CardBolsa'
import { DeletarBolsa } from '../deletarbolsa/DeletarBolsa'
import { FormBolsa, type BolsaFormData } from '../formbolsa/FormBolsa'

interface Bolsa {
  id: number
  nome: string
  instituicao: string
  percentual: number
  status: 'ATIVA' | 'INATIVA'
}

export function ListaBolsas() {
  const [bolsas, setBolsas] = useState<Bolsa[]>([
    {
      id: 1,
      nome: 'Bolsa Integral',
      instituicao: 'Tech School',
      percentual: 100,
      status: 'ATIVA'
    },
    {
      id: 2,
      nome: 'Bolsa Parcial',
      instituicao: 'Code Academy',
      percentual: 50,
      status: 'ATIVA'
    },
    {
      id: 3,
      nome: 'Desconto de Mérito',
      instituicao: 'UniDev',
      percentual: 25,
      status: 'INATIVA'
    }
  ])

  const [modalFormOpen, setModalFormOpen] = useState(false)
  const [bolsaSelecionada, setBolsaSelecionada] = useState<Bolsa | null>(null)
  const [bolsaParaDeletar, setBolsaParaDeletar] = useState<Bolsa | null>(null)

  function handleCreate() {
    setBolsaSelecionada(null)
    setModalFormOpen(true)
  }

  function handleEdit(bolsa: Bolsa) {
    setBolsaSelecionada(bolsa)
    setModalFormOpen(true)
  }

  function handleDelete(bolsa: Bolsa) {
    setBolsaParaDeletar(bolsa)
  }

  function handleSubmitForm(data: BolsaFormData) {
    if (bolsaSelecionada) {
      setBolsas(prev =>
        prev.map(b =>
          b.id === bolsaSelecionada.id
            ? { ...b, ...data }
            : b
        )
      )
    } else {
      setBolsas(prev => [
        ...prev,
        {
          id: Date.now(),
          ...data
        }
      ])
    }

    setModalFormOpen(false)
  }

  function confirmDelete() {
    if (!bolsaParaDeletar) return

    setBolsas(prev =>
      prev.filter(b => b.id !== bolsaParaDeletar.id)
    )

    setBolsaParaDeletar(null)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Gestão de Bolsas
        </h1>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Nova Bolsa
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        
        {/* Header da tabela */}
        <div className="grid grid-cols-5 px-6 py-3 text-xs font-semibold text-gray-500 border-b border-gray-200">
          <span>NOME</span>
          <span>INSTITUIÇÃO</span>
          <span>PORCENTAGEM</span>
          <span>STATUS</span>
          <span className="text-right">AÇÕES</span>
        </div>

        {/* Lista */}
        {bolsas.map(bolsa => (
          <CardBolsa
            key={bolsa.id}
            bolsa={bolsa}
            onView={() => {}}
            onEdit={() => handleEdit(bolsa)}
            onDelete={() => handleDelete(bolsa)}
          />
        ))}

        {bolsas.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Nenhuma bolsa cadastrada.
          </div>
        )}
      </div>

      {/* Modal Form */}
      {modalFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <FormBolsa
              initialData={bolsaSelecionada ?? undefined}
              onSubmit={handleSubmitForm}
              onCancel={() => setModalFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Delete */}
      <DeletarBolsa
        isOpen={!!bolsaParaDeletar}
        bolsaNome={bolsaParaDeletar?.nome ?? ''}
        onCancel={() => setBolsaParaDeletar(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
