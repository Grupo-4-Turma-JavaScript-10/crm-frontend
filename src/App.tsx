import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';
import { Home } from './pages/home/Home';
import Sobre from './pages/sobrenos/SobreNos';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <main className="sm:ml-[200px] mt-16">
          <Routes>
          <Route path='/home' element={<Home/>} /> 
          <Route path='/' element={<Home/>} />
          <Route path='/sobre' element={<Sobre/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App