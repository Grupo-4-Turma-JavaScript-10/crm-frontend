import ListaEstudantes from "./components/estudante/listaestudantes/ListaEstudantes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ListaEstudantes />
    </BrowserRouter>
  );
}

export default App;
