import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children, showSidebar = false}) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar/>}

        <div className="flex-1 overflow-auto">
            <Navbar />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default Layout
