import { Link } from "react-router-dom";
import type Bolsa from "../../../models/Bolsa";

interface CardBolsaProps {
    bolsa: Bolsa;
}

function CardBolsa({ bolsa }: CardBolsaProps) {
    return (
        <div className="grid grid-cols-6 items-center px-6 py-4 bg-white border-b border-gray-200 text-sm hover:bg-gray-50 transition">
            
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

            {/* Curso */}
            <span className="text-gray-700">
                {bolsa.curso}
            </span>

            {/* Estudantes */}
            <span className="text-gray-600">
                {bolsa.Estudante?.length || 0} estudante(s)
            </span>

            {/* Ações */}
            <div className="flex gap-2 justify-end">
                <Link
                    to={`/editarbolsa/${bolsa.id}`}
                    className="px-3 py-1.5 text-xs font-medium text-slate-100 bg-indigo-400 hover:bg-indigo-800 rounded transition"
                >
                    Editar
                </Link>
                <Link
                    to={`/deletarbolsa/${bolsa.id}`}
                    className="px-3 py-1.5 text-xs font-medium text-slate-100 bg-red-400 hover:bg-red-700 rounded transition"
                >
                    Deletar
                </Link>
            </div>
        </div>
    );
}

export default CardBolsa;