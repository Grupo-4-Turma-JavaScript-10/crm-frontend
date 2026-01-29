import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import { Home } from './pages/home/Home';
import Sobre from './pages/sobrenos/SobreNos';
import { FormBolsa } from './components/bolsa/formbolsa/FormBolsa';
import ListaBolsas from './components/bolsa/listabolsas/ListaBolsas';
import DeletarBolsa from './components/bolsa/deletarbolsa/DeletarBolsa';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <main className="sm:ml-50 mt-16">
          <Routes>
            <Route path='/home' element={<Home/>} /> 
            <Route path='/' element={<Home/>} />
            <Route path='/sobre' element={<Sobre/>} />
            <Route path='/bolsas' element={<ListaBolsas/>} />
            <Route path='/bolsascadastrar' element={<FormBolsa/>} />
            <Route path='/bolsaseditar/:id' element={<FormBolsa/>} />
            <Route path='/bolsasdeletar/:id' element={<DeletarBolsa/>} />
            <Route path='/deletarbolsa/:id' element={<DeletarBolsa/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;