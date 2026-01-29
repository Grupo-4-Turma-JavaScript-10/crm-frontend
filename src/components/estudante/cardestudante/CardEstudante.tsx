import { useState } from "react";
import { Link } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import { atualizar } from "../../../services/Service";

interface CardProps {
  estudante: Estudantes;
  onAtualizar?: () => void;
}

function CardEstudante({ estudante, onAtualizar }: CardProps) {
  const [status, setStatus] = useState(estudante.ativo ? "ativo" : "inativo");

  const handleStatusChange = async (novoStatus: string) => {
    try {
      // Prepara o objeto seguro para enviar ao backend
      const atualizado = {
        ...estudante,
        ativo: novoStatus === "ativo",
        bolsaId: estudante.bolsa?.id ?? null, // <-- evita NaN
      };

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
            Bolsa: {estudante.bolsa ? estudante.bolsa.nome : "-"}
          </p>
        </div>
      </div>

      <div className="flex items-center p-2">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-1 text-xs font-semibold rounded border w-fit cursor-pointer"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        <Link
          to={`/deletarEstudante/${estudante.id}`}
          className="ml-auto bg-dourado text-preto hover:bg-red-800 hover:text-white px-4 py-1 rounded transition"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardEstudante;