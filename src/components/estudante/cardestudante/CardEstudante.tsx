import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import { atualizar } from "../../../services/Service";
import { FiTrash2, FiEdit } from "react-icons/fi";

interface CardProps {
  estudante: Estudantes;
  onAtualizar?: () => void;
}

function CardEstudante({ estudante, onAtualizar }: CardProps) {
  const [status, setStatus] = useState(estudante.ativo ? "ativo" : "inativo");
  const navigate = useNavigate();

  const handleStatusChange = async (novoStatus: string) => {
    try {
      const atualizado = { ...estudante, ativo: novoStatus === "ativo" };
      await atualizar("/estudante", atualizado, () => {}, {});
      setStatus(novoStatus);
      onAtualizar?.();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="border border-azulescuro rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="flex gap-4 p-4 items-center">
        <img
          src={
            estudante.avatar === "initials"
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(estudante.nome)}`
              : estudante.avatar
          }
          alt={estudante.nome}
          className="h-16 w-16 rounded-full object-cover border-2 border-dourado"
        />
        <div>
          <h3 className="text-lg font-bold text-azulescuro">{estudante.nome}</h3>
          <p className="text-sm font-semibold text-preto">Email: {estudante.email}</p>
          <p className="text-sm font-semibold text-preto">
            Curso: {estudante.cursoInteresse}
          </p>
          <p className="text-sm font-semibold text-preto">
            Idade: {estudante.idade || "-"}
          </p>
          <p className="text-sm font-semibold text-preto">
            Endereço: {estudante.endereco || "-"}
          </p>
          <p className="text-sm font-semibold text-preto">
            Bolsa: {estudante.bolsa ? "Sim" : "Não"}
          </p>
        </div>
      </div>

      <div className="flex items-center p-2 gap-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-1 text-xs font-semibold rounded border w-fit cursor-pointer"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        <button
          onClick={() => navigate(`/editarEstudante/${estudante.id}`)}
          className="ml-auto text-dourado bg-azulescuro hover:text-azulescuro hover:bg-dourado p-1 rounded transition"
          title="Editar"
        >
          <FiEdit size={18} />
        </button>

        <Link
          to={`/deletarEstudante/${estudante.id}`}
          className= "text-dourado bg-azulescuro hover:bg-red-800 p-1 rounded transition"
          title="Deletar"
        >
          <FiTrash2 size={18} />
        </Link>
      </div>
    </div>
  );
}

export default CardEstudante;

