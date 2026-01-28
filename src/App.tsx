import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        
        <main>
          <Routes>

          </Routes>
        </main>
        
      </BrowserRouter>
    </>
  )
}

export default App