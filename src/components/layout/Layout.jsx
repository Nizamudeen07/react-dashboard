import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="flex min-w-0 flex-1 flex-col md:ml-[260px]">
        <Header onMenuClick={openSidebar} />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-5 md:px-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
