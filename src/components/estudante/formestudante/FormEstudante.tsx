import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Estudantes from "../../../models/Estudantes";
import type Bolsa from "../../../models/Bolsa";
import AvatarSelector from "../../../assets/avatar/AvatarSelector";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { cadastrar, atualizar, buscarDireto } from "../../../services/Service";

function FormEstudante() {
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
    bolsa: null, // Bolsa começa como null
  });

  // Carregar bolsas do backend
  useEffect(() => {
    async function carregarBolsas() {
      try {
        const bolsas: Bolsa[] = await buscarDireto("/bolsa", {});
        console.log("Bolsas carregadas:", bolsas); // Debug
        setBolsasDisponiveis(bolsas);
      } catch (error) {
        console.error("Erro ao carregar bolsas:", error);
      }
    }
    carregarBolsas();
  }, []);

  // Carregar estudante se estiver editando
  useEffect(() => {
    async function carregarEstudante() {
      if (!id) return;
      try {
        const dados: Estudantes = await buscarDireto(`/estudante/${id}`, {});
        setEstudante(dados);
      } catch (error) {
        console.error("Erro ao carregar estudante:", error);
      }
    }
    carregarEstudante();
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setEstudante({
      ...estudante,
      [name]:
        name === "idade"
          ? Number(value)
          : name === "ativo"
          ? value === "true"
          : value,
    });
  }

  // Seleção de bolsa
  function handleBolsaChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const selecionada =
      bolsasDisponiveis.find((b) => b.id === Number(value)) ?? null;
    setEstudante({ ...estudante, bolsa: selecionada });
  }

  async function salvarEstudante(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...estudante,
        bolsaId: estudante.bolsa?.id ?? null, // evita NaN
      };

      if (id) {
        await atualizar("/estudante", payload, setEstudante, {});
        ToastAlerta("Estudante atualizado com sucesso!", "success");
      } else {
        await cadastrar("/estudante", payload, setEstudante, {});
        ToastAlerta("Estudante cadastrado com sucesso!", "success");
      }

      navigate("/estudante");
    } catch (error) {
      console.error(error);
      ToastAlerta(
        id ? "Erro ao atualizar estudante." : "Erro ao cadastrar estudante.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col mx-auto items-center">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={`https://api.dicebear.com/7.x/${estudante.avatar}/svg?seed=${
            estudante.nome || "User"
          }`}
          alt="Avatar"
          onClick={() => setModalOpen(true)}
          className="w-24 h-24 rounded-full border-4 border-dourado cursor-pointer hover:scale-105 transition"
        />
        <p className="text-sm mt-2 text-azulescuro">Clique para escolher</p>
      </div>

      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={salvarEstudante}
      >
        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do estudante"
            value={estudante.nome}
            onChange={atualizarEstado}
            required
            className="border-2 border-azulescuro rounded p-2"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email do estudante"
            value={estudante.email || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-azulescuro rounded p-2"
          />
        </div>

        {/* Endereço */}
        <div className="flex flex-col gap-2">
          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            placeholder="Endereço do estudante"
            value={estudante.endereco || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-azulescuro rounded p-2"
          />
        </div>

        {/* Idade */}
        <div className="flex flex-col gap-2">
          <label>Idade</label>
          <input
            type="number"
            name="idade"
            placeholder="Idade do estudante"
            value={estudante.idade || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-azulescuro rounded p-2"
          />
        </div>

        {/* Curso */}
        <div className="flex flex-col gap-2">
          <label>Curso</label>
          <input
            type="text"
            name="cursoInteresse"
            placeholder="Curso de interesse"
            value={estudante.cursoInteresse || ""}
            onChange={atualizarEstado}
            required
            className="border-2 border-azulescuro rounded p-2"
          />
        </div>

        {/* Ativo */}
        <div className="flex flex-col gap-2">
          <label>Estudante ativo?</label>
          <select
            name="ativo"
            value={String(estudante.ativo)}
            onChange={atualizarEstado}
            className="border-2 border-azulescuro rounded p-2"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        {/* Bolsa */}
        <div className="flex flex-col gap-2">
          <label>Bolsa</label>
          <select
            name="bolsa"
            value={estudante.bolsa?.id ?? ""}
            onChange={handleBolsaChange}
            className="border-2 border-azulescuro rounded p-2"
          >
            <option value="">-- Nenhuma --</option>
            {bolsasDisponiveis.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-azulescuro text-white py-2 rounded-lg hover:bg-dourado hover:text-preto transition flex justify-center"
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      {/* Modal Avatar */}
      <AvatarSelector
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(estilo) => setEstudante({ ...estudante, avatar: estilo })}
        nome={estudante.nome}
      />
    </div>
  );
}

export default FormEstudante;