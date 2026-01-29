import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormEstudante from "../formestudante/FormEstudante";
import { cadastrar, atualizar } from "../../../services/Service";
import type Estudantes from "../../../models/Estudantes";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalProps {
  onSuccess?: () => void;
  estudanteParaEditar?: Estudantes;
}

function ModalEstudante({ onSuccess, estudanteParaEditar }: ModalProps) {
  async function handleSubmit(estudante: Estudantes) {
    try {
      if (estudante.id) {
        await atualizar("/estudante", estudante, () => {}, {});
        ToastAlerta("Estudante atualizado!", "success");
      } else {
        await cadastrar("/estudante", estudante, () => {}, {});
        ToastAlerta("Estudante cadastrado!", "success");
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao salvar estudante", "error");
    }
  }

  return (
    <Popup
      trigger={
        <button className="border rounded px-4 py-2 bg-azulescuro text-white hover:bg-dourado hover:text-preto transition">
          {estudanteParaEditar ? "Editar Estudante" : "Cadastrar Estudante"}
        </button>
      }
      modal
      nested
      contentStyle={{
        background: "#fff",
        borderRadius: "1rem",
        padding: "2rem",
        width: "480px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      {(close: () => void) => (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-azulescuro">
              {estudanteParaEditar ? "Editar Estudante" : "Cadastrar Estudante"}
            </h2>
            <button
              onClick={close}
              className="text-2xl font-bold text-azulescuro hover:text-dourado transition"
            >
              &times;
            </button>
          </div>

          <FormEstudante
            estudanteInicial={estudanteParaEditar}
            onSubmit={async (estudante) => {
              await handleSubmit(estudante);
              close(); // fecha o modal após salvar
            }}
          />
        </div>
      )}
    </Popup>
  );
}

export default ModalEstudante;
