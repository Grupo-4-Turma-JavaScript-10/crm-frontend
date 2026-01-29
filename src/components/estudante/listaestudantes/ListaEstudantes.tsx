import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Estudantes from "../../../models/Estudantes";
import { buscar } from "../../../services/Service";
import CardEstudante from "../cardestudante/CardEstudante";
import ModalEstudante from "../modalestudante/ModalEstudante";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaEstudantes() {
  const [isLoading, setIsLoading] = useState(false);
  const [estudantes, setEstudantes] = useState<Estudantes[]>([]);

  useEffect(() => {
    carregarEstudantes();
  }, []);

  async function carregarEstudantes() {
    try {
      setIsLoading(true);
      const response = await buscar("/estudante");
      setEstudantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar estudantes", error);
      ToastAlerta("Erro ao carregar estudantes.", "error");
      setEstudantes([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-azulescuro">
          Lista de Estudantes
        </h2>
        <ModalEstudante
          onSuccess={carregarEstudantes}
          buttonClassName="bg-dourado text-preto hover:bg-azulescuro hover:text-white px-4 py-2 rounded transition"
        />
      </div>
      {isLoading && (
        <div className="flex justify-center w-full my-12">
          <SyncLoader color="#1E40AF" size={32} />
        </div>
      )}

      {!isLoading && estudantes.length === 0 && (
        <div className="flex justify-center w-full my-12">
          <span className="text-xl md:text-2xl font-medium text-azulescuro text-center">
            Nenhum estudante foi encontrado!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {estudantes.map((estudante) => (
          <CardEstudante
            key={estudante.id}
            estudante={estudante}
            onAtualizar={carregarEstudantes}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaEstudantes;
