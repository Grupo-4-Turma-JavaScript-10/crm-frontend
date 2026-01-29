import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Estudante from "../../../models/Estudantes";
import { deletar, buscar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarEstudante() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [estudante, setEstudante] = useState<Estudante | null>(null);

  // Buscar estudante do backend, incluindo a bolsa
  useEffect(() => {
    if (!id) return;

    const carregarEstudante = async () => {
      try {
        const response = await buscar(`/estudante/${id}`);
        setEstudante(response.data);
      } catch (error) {
        ToastAlerta("Erro ao carregar estudante.", "error");
        console.error(error);
      }
    };

    carregarEstudante();
  }, [id]);

  const deletarEstudante = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      await deletar(`/estudante/${id}`, {});
      ToastAlerta("Estudante apagado com sucesso!", "success");
      navigate("/estudante");
    } catch (error) {
      ToastAlerta("Erro ao deletar o estudante.", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const retornar = () => navigate("/estudante");

  if (!estudante) return null;

  return (
    <div className="container w-full max-w-lg mx-auto mt-12">
      <h1 className="text-4xl text-center font-bold text-azulescuro mb-6">
        Deletar Estudante
      </h1>

      <p className="text-center text-lg font-medium mb-6">
        Você tem certeza de que deseja apagar o estudante abaixo?
      </p>

      <div className="border rounded-2xl shadow-md overflow-hidden bg-white">
        {/* Header */}
        <div className="bg-azulescuro text-white font-bold text-xl py-3 px-6">
          Informações do Estudante
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex flex-col gap-3">
          <p>
            <span className="font-semibold">Nome:</span> {estudante.nome}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {estudante.email}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span> {estudante.endereco}
          </p>
          <p>
            <span className="font-semibold">Idade:</span> {estudante.idade || "-"}
          </p>
          <p>
            <span className="font-semibold">Curso:</span> {estudante.cursoInteresse}
          </p>
          <p>
            <span className="font-semibold">Bolsa:</span> {estudante.bolsa ? estudante.bolsa.nome : "-"}
          </p>
        </div>


        <div className="flex">
          <button
            onClick={retornar}
            className="w-1/2 bg-dourado text-preto hover:bg-azulescuro hover:text-white py-3 font-semibold transition"
          >
            Não
          </button>

          <button
            onClick={deletarEstudante}
            className="w-1/2 bg-dourado text-preto hover:bg-red-800 hover:text-white py-3 font-semibold flex items-center justify-center transition"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : "Sim"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarEstudante;
