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
    <div className="flex">
      <aside
        className={`
          flex 
          flex-col 
          h-screen 
          fixed md:static
          transition-transform duration-300
          sm:translate-x-0
          z-2
          border-r border-gray-200
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className={`
            flex 
            flex-col
            bg-no-repeat
            bg-top
            bg-contain
            overflow-hidden
          `}
          style={{ backgroundImage: `url(${canto})` }}
        >
          <img
            src={logo}
            alt="PathEduc Logo"
            className={`
              min-w-50 
              w-50
              scale-150
            `}
          />
        </div>

        <nav>
          <div
            className={`
              flex 
              items-center
              p-3
              text-lg
              gap-4 
              hover:bg-azulescuro
              hover:text-white
              rounded-xl
              transition-all
              duration-300
              ease-in-out
            `}
          >
            <img src={dashIco} alt="Dashboard Icon" className="w-7" />
            <h2>Dashboard</h2>
          </div>

          <div
            className={`
              flex 
              items-center 
              p-4 
              text-lg 
              gap-4
              hover:bg-azulescuro
              hover:text-white
              rounded-xl
              transition-all
              duration-300
              ease-in-out
            `}
          >
            <img src={estudantes} alt="Estudantes" className="w-7 scale-75" />
            <h2>Estudantes</h2>
          </div>

          <div
            className={`
              flex 
              items-center 
              p-4 
              text-lg 
              gap-4
              hover:bg-azulescuro
              hover:text-white
              rounded-xl
              transition-all
              duration-300
              ease-in-out
            `}
          >
            <img src={bolsa} alt="Bolsas" className="w-7 scale-75" />
            <h2>Bolsas</h2>
          </div>

          <div
            className={`
              flex 
              items-center 
              p-4 
              text-lg 
              gap-4
              hover:bg-azulescuro
              hover:text-white
              rounded-xl
              transition-all
              duration-300
              ease-in-out
            `}
          >
            <img src={vinculo} alt="Vinculo" className="w-7 scale-75" />
            <h2>Vinculos</h2>
          </div>
        </nav>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-0 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header
        className={`
          flex
          p-3
          items-center
          gap-10
          h-min
          w-full
          justify-end
          border-b border-gray-200
        `}
      >
        <button
          className="sm:hidden text-2xl mr-auto"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        <img src={notification} alt="Notificações" className="h-5" />

        <div className="flex items-center gap-2">
          <span className="text-right">
            <p>Admin User</p>
            <p className="text-gray-600 text-sm">Admin@educ.com</p>
          </span>

          <span
            className={`
              rounded-full
              bg-blue-200
              h-8
              aspect-square
              flex
              justify-center
              items-center
            `}
          >
            <img src={user} alt="User" className="h-4" />
          </span>
        </div>
      </header>
    </div>
  )
}

export default Navbar