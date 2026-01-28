import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar/Navbar';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <main>
          <Routes>

          </Routes>
        </main>
        
      </BrowserRouter>
    </>
  )
}

export default App