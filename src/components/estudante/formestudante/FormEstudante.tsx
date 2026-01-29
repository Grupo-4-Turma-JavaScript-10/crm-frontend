import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Estudantes from "../../../models/Estudantes";
import type Bolsa from "../../../models/Bolsa";
import AvatarSelector from "../../../assets/avatar/AvatarSelector";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { cadastrar, atualizar, buscarDireto } from "../../../services/Service";

interface FormProps {
  onSuccess?: () => void;
  estudanteInicial?: Estudantes;
}

export default function FormEstudante({ onSuccess, estudanteInicial }: FormProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bolsasDisponiveis, setBolsasDisponiveis] = useState<Bolsa[]>([]);

  const [estudante, setEstudante] = useState<Estudantes>({
    id: 0,
    nome: "",
    email: "",
    endereco: "",
    idade: 0,
    cursoInteresse: "",
    ativo: true,
    avatar: "adventurer",
    bolsa: undefined, // objeto completo
    ...estudanteInicial,
  });

  // Carregar bolsas
  useEffect(() => {
    async function carregarBolsas() {
      try {
        const bolsas: Bolsa[] = await buscarDireto("/bolsa");
        setBolsasDisponiveis(bolsas);
      } catch (error) {
        console.error("Erro ao carregar bolsas:", error);
      }
    }
    carregarBolsas();
  }, []);

  // Carregar estudante para edição
  useEffect(() => {
    if (!id) return;
    async function carregarEstudante() {
      try {
        const dados: Estudantes = await buscarDireto(`/estudante/${id}`);
        setEstudante(dados);
      } catch (error) {
        console.error("Erro ao carregar estudante:", error);
      }
    }
    carregarEstudante();
  }, [id]);

  // Atualiza campos genéricos
  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    let novoValor: any = value;

    if (name === "idade") novoValor = Number(value);
    if (name === "ativo") novoValor = value === "true";

    setEstudante({ ...estudante, [name]: novoValor });
  }

  // Atualiza bolsa selecionada
  function handleBolsaChange(e: ChangeEvent<HTMLSelectElement>) {
    const selecionada = bolsasDisponiveis.find((b) => b.id === Number(e.target.value)) ?? undefined;
    setEstudante({ ...estudante, bolsa: selecionada });
  }

  // Salvar estudante (cadastro ou atualização)
  async function salvarEstudante(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Payload enviado ao backend
      const payload = {
        ...estudante,
        bolsaId: estudante.bolsa?.id ?? null, // apenas o id para o backend
      };

      if (id || estudante.id) {
        await atualizar("/estudante", payload);
        ToastAlerta("Estudante atualizado com sucesso!", "success");
      } else {
        await cadastrar("/estudante", payload);
        ToastAlerta("Estudante cadastrado com sucesso!", "success");
      }

      // Atualiza lista ou navega
      onSuccess ? onSuccess() : navigate("/estudante");
    } catch (error) {
      console.error(error);
      ToastAlerta(id ? "Erro ao atualizar estudante." : "Erro ao cadastrar estudante.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      <div className="flex flex-col items-center mb-6">
        <img
          src={`https://api.dicebear.com/7.x/${estudante.avatar}/svg?seed=${estudante.nome || "User"}`}
          alt="Avatar"
          onClick={() => setModalOpen(true)}
          className="w-24 h-24 rounded-full border-4 border-dourado cursor-pointer hover:scale-105 transition"
        />
        <p className="text-sm mt-2 text-azulescuro">Clique para escolher</p>
      </div>

      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={salvarEstudante}>
        <input type="text" name="nome" placeholder="Nome" value={estudante.nome} onChange={atualizarEstado} required className="border-2 border-azulescuro rounded p-2"/>
        <input type="email" name="email" placeholder="Email" value={estudante.email} onChange={atualizarEstado} required className="border-2 border-azulescuro rounded p-2"/>
        <input type="text" name="endereco" placeholder="Endereço" value={estudante.endereco} onChange={atualizarEstado} required className="border-2 border-azulescuro rounded p-2"/>
       <input
  type="number"
  name="idade"
  placeholder="Idade"
  value={estudante.idade || ""}
  onChange={atualizarEstado}
  required
  className="border-2 border-azulescuro rounded p-2"
/>

        <input type="text" name="cursoInteresse" placeholder="Curso" value={estudante.cursoInteresse} onChange={atualizarEstado} required className="border-2 border-azulescuro rounded p-2"/>

        <select name="ativo" value={String(estudante.ativo)} onChange={atualizarEstado} className="border-2 border-azulescuro rounded p-2">
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>

        <select name="bolsa" value={estudante.bolsa?.id ?? ""} onChange={handleBolsaChange} className="border-2 border-azulescuro rounded p-2">
          <option value="">-- Nenhuma --</option>
          {bolsasDisponiveis.map((b) => (
            <option key={b.id} value={b.id}>{b.nome}</option>
          ))}
        </select>

        <button type="submit" disabled={isLoading} className="mt-4 bg-azulescuro text-white py-2 rounded-lg hover:bg-dourado hover:text-preto transition flex justify-center">
          {isLoading ? <ClipLoader color="#ffffff" size={20}/> : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <AvatarSelector
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(estilo) => setEstudante({...estudante, avatar: estilo})}
        nome={estudante.nome}
      />
    </div>
  );
}
