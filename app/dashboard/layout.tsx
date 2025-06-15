"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Home,
  Settings,
  Users,
  UserCheck,
  Package,
  FileText,
  Mail,
  BarChart3,
  Warehouse,
  ChevronDown,
  ChevronRight,
  LogOut,
  Search,
  Bell,
  User,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MenuItem {
  title: string
  icon: React.ReactNode
  href?: string
  children?: MenuItem[]
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    title: "Configuración",
    icon: <Settings className="w-5 h-5" />,
    children: [
      { title: "Información de la Empresa", icon: null, href: "/dashboard/opciones/empresa" },
      { title: "Sucursales", icon: null, href: "/dashboard/opciones/sucursales" },
      { title: "Configuración Mensajes", icon: null, href: "/dashboard/opciones/mensajes" },
      { title: "Métodos de Pago", icon: null, href: "/dashboard/opciones/pagos" },
      { title: "Configuración de Correo", icon: null, href: "/dashboard/opciones/correo" },
      { title: "Direcciones", icon: null, href: "/dashboard/opciones/direcciones" },
      { title: "Email", icon: null, href: "/dashboard/opciones/email" },
      { title: "Formulario de Registro", icon: null, href: "/dashboard/opciones/registro" },
    ],
  },
  {
    title: "Usuarios",
    icon: <Users className="w-5 h-5" />,
    href: "/dashboard/usuarios",
  },
  {
    title: "Clientes",
    icon: <UserCheck className="w-5 h-5" />,
    children: [
      { title: "Reales", icon: null, href: "/dashboard/clientes/reales" },
      { title: "Empresas", icon: null, href: "/dashboard/clientes/empresas" },
      { title: "Clientes Pendientes", icon: null, href: "/dashboard/clientes/pendientes", badge: "3" },
      { title: "Notificaciones", icon: null, href: "/dashboard/clientes/notificaciones" },
    ],
  },
  {
    title: "Paquetes",
    icon: <Package className="w-5 h-5" />,
    children: [{ title: "Inventario", icon: null, href: "/dashboard/paquetes/inventario" }],
  },
  {
    title: "Facturación",
    icon: <FileText className="w-5 h-5" />,
    children: [
      { title: "Ver Facturas Pendientes", icon: null, href: "/dashboard/facturacion/pendientes", badge: "5" },
      { title: "Ver Facturas Pagadas", icon: null, href: "/dashboard/facturacion/pagadas" },
      { title: "Buscar Tracking", icon: null, href: "/dashboard/facturacion/tracking" },
    ],
  },
  {
    title: "Email",
    icon: <Mail className="w-5 h-5" />,
    href: "/dashboard/email",
  },
  {
    title: "Reportes",
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { title: "Reporte de facturación", icon: null, href: "/dashboard/reportes/facturacion" },
      { title: "Reporte específico", icon: null, href: "/dashboard/reportes/especifico" },
      { title: "Reporte Detallado", icon: null, href: "/dashboard/reportes/detallado" },
    ],
  },
  {
    title: "Servicios de Bodega",
    icon: <Warehouse className="w-5 h-5" />,
    children: [
      { title: "Registro Paquetes Sin Dueño", icon: null, href: "/dashboard/bodega/sin-dueno" },
      { title: "Bodega reporte", icon: null, href: "/dashboard/bodega/reporte" },
    ],
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/25 animate-pulse">
              <Package className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">PoboxManager</h3>
            <p className="text-slate-500">Cargando aplicación...</p>
          </div>
        </div>
      </div>
    )
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const isActive = pathname === item.href

    return (
      <div key={item.title} className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={`group w-full flex items-center justify-between px-4 py-3.5 text-left text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 rounded-2xl transition-all duration-300 ease-out hover:shadow-sm border border-transparent hover:border-slate-200/50 ${
              level > 0 ? "ml-4" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <div className={`transition-all duration-300 ease-out ${isExpanded ? 'rotate-180 text-blue-600' : 'group-hover:rotate-12'}`}>
              <ChevronDown className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <Link
            href={item.href || "#"}
            className={`group flex items-center justify-between px-4 py-3.5 text-slate-600 hover:text-slate-800 rounded-2xl transition-all duration-300 ease-out hover:shadow-md border border-transparent ${
              level > 0 ? "ml-4" : ""
            } ${
              isActive 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/30 hover:shadow-xl transform hover:scale-[1.02]" 
                : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:border-slate-200/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`transition-all duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            {item.badge && (
              <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                isActive 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-red-100 text-red-600 group-hover:bg-red-500 group-hover:text-white'
              } transition-all duration-200`}>
                {item.badge}
              </div>
            )}
          </Link>
        )}
        {hasChildren && isExpanded && (
          <div className="mt-2 mb-2 space-y-1 overflow-hidden">
            <div className="animate-in slide-in-from-top-2 duration-300">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 flex flex-col transition-transform duration-300 ease-out`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white to-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">PoboxManager</h1>
                <p className="text-sm text-slate-500">Panel de Control</p>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/50 hover:shadow-md transition-all duration-300">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 ring-2 ring-blue-200">
              <AvatarFallback className="text-white font-semibold bg-transparent">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">Administrador</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">En línea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="space-y-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-200/50 bg-gradient-to-r from-white to-slate-50">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full flex items-center gap-3 h-12 border-slate-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:border-red-200 hover:text-red-600 transition-all duration-300 rounded-xl font-medium group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {pathname === '/dashboard' ? 'Dashboard' : 
                   pathname.split('/').pop()?.replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 group-hover:text-slate-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 w-80 transition-all duration-300 hover:bg-slate-50 focus:bg-white backdrop-blur-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="relative hover:bg-slate-100 rounded-xl p-3 group transition-all duration-200">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-xs text-white flex items-center justify-center font-medium shadow-lg">3</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="hover:bg-slate-100 rounded-xl p-3 group transition-all duration-200">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="animate-in fade-in-50 duration-500">
            {children}
          </div>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #94a3b8, #64748b);
        }
      `}</style>
    </div>
  )
}