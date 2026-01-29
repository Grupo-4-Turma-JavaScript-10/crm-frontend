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
      await buscar("/estudante", setEstudantes, {});
    } catch (error) {
      console.error("Erro ao buscar estudantes", error);
      ToastAlerta("Erro ao carregar estudantes.", "error");
      setEstudantes([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-azulescuro">
          Lista de Estudantes
        </h2>
        <ModalEstudante onSuccess={carregarEstudantes} />
      </div>

      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#1E40AF" size={32} />
        </div>
      )}

      {!isLoading && estudantes.length === 0 && (
        <span className="text-3xl text-center my-8 text-azulescuro">
          Nenhum estudante foi encontrado!
        </span>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
