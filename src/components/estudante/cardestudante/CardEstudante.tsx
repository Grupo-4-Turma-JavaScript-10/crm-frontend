import { useState } from "react";
import { Link } from "react-router-dom";
import type Estudantes from "../../../models/Estudantes";
import { deletar } from "../../../services/Service";
import { Pencil, Trash2 } from "lucide-react";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface CardProps {
  estudante: Estudantes;
  onAtualizar?: () => void; 
}

const coresAvatar = ["1E40AF", "047857", "B45309", "9D174D", "065F46", "9333EA"];

export default function CardEstudante({ estudante, onAtualizar }: CardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const corAvatar = coresAvatar[estudante.id % coresAvatar.length];

  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar este estudante?")) return;
    setIsDeleting(true);
    try {
      await deletar(`/estudante/${estudante.id}`, {});
      ToastAlerta("Estudante deletado com sucesso!", "success");
      onAtualizar?.();
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao deletar estudante.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-azulescuro rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="flex gap-4 p-4 items-center">
        <img
          src={
            estudante.avatar && estudante.avatar !== "initials"
              ? estudante.avatar
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(estudante.nome)}&background=${corAvatar}&color=ffffff&size=128`
          }
          alt={estudante.nome}
          className="h-16 w-16 rounded-full object-cover border-2 border-dourado"
        />
        <div>
          <h3 className="text-lg font-bold text-azulescuro">{estudante.nome}</h3>
          <p className="text-sm font-semibold text-preto">Email: {estudante.email}</p>
          <p className="text-sm font-semibold text-preto">Curso: {estudante.cursoInteresse}</p>
          <p className="text-sm font-semibold text-preto">Idade: {estudante.idade || "-"}</p>
          <p className="text-sm font-semibold text-preto">Endereço: {estudante.endereco || "-"}</p>
          <p className="text-sm font-semibold text-preto">Bolsa: {estudante.bolsa?.nome || "-"}</p>
        </div>
      </div>

      <div className="flex items-center p-2 gap-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            estudante.ativo ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {estudante.ativo ? "Ativo" : "Inativo"}
        </span>

        <Link
          to={`/editarEstudante/${estudante.id}`}
          className="flex items-center gap-1 bg-azulescuro text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          <Pencil size={16} /> Editar
        </Link>

        <button
          onClick={handleDeletar}
          disabled={isDeleting}
          className="flex items-center gap-1 ml-auto bg-dourado text-preto px-3 py-1 rounded hover:bg-red-800 hover:text-white transition"
        >
          {isDeleting ? "Deletando..." : <><Trash2 size={16} /> Deletar</>}
        </button>
      </div>
    </div>
  );
}
