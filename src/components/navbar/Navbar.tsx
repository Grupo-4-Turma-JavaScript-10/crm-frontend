import logo from "../../assets/path.png"
import dashIco from "../../assets/DashboardIco.png"
import estudantes from "../../assets/estudantes.png"
import bolsa from "../../assets/bolsaico.png"
import vinculo from "../../assets/chain.png"
import user from "../../assets/user.png"
import notification from "../../assets/notification.png"
import canto from "../../assets/canto.png"

import { useState } from "react"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[200px]
          flex
          flex-col
          border-r
          border-gray-200
          bg-white
          z-40
          transition-transform
          duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <div
          className="
            h-40
            flex
            items-center
            justify-center
            bg-no-repeat
            bg-top
            bg-contain
            overflow-hidden
          "
          style={{ backgroundImage: `url(${canto})` }}
        >
          <img
            src={logo}
            alt="PathEduc Logo"
            className="w-36"
          />
        </div>

        <nav className="flex flex-col gap-1 px-3">
          <div className="flex items-center gap-4 p-3 rounded-xl text-lg hover:bg-azulescuro hover:text-white transition">
            <img src={dashIco} alt="Dashboard" className="w-7" />
            <h2>Dashboard</h2>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl text-lg hover:bg-azulescuro hover:text-white transition">
            <img src={estudantes} alt="Estudantes" className="w-7 scale-75" />
            <h2>Estudantes</h2>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl text-lg hover:bg-azulescuro hover:text-white transition">
            <img src={bolsa} alt="Bolsas" className="w-7 scale-75" />
            <h2>Bolsas</h2>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-xl text-lg hover:bg-azulescuro hover:text-white transition">
            <img src={vinculo} alt="Vínculos" className="w-7 scale-75" />
            <h2>Vínculos</h2>
          </div>
        </nav>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-30 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header
        className="
          fixed
          top-0
          left-0
          sm:left-[200px]
          right-0
          h-16
          px-4
          flex
          items-center
          justify-end
          gap-10
          border-b
          border-gray-200
          bg-white
          z-50
        "
      >
        <button
          className="sm:hidden text-2xl mr-auto"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        <img src={notification} alt="Notificações" className="h-5" />

        <div className="flex items-center gap-2">
          <span className="text-right leading-tight">
            <p>Admin User</p>
            <p className="text-sm text-gray-600">Admin@educ.com</p>
          </span>

          <span className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
            <img src={user} alt="User" className="h-4" />
          </span>
        </div>
      </header>
    </>
  )
}

export default Navbar
