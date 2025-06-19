import React, { useState, useEffect } from 'react'
import { cn, MenuItem } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
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
  LogOut,
  Search,
  Bell,
  User,
  Menu,
  X,
  Target,
  Building,
  MapPin,
  CreditCard,
  Shield,
  Eye,
  UserPlus
} from 'lucide-react'

interface SidebarProps {
  userType: 'superadmin' | 'admin' | 'client'
  currentPath: string
}

const Sidebar: React.FC<SidebarProps> = ({ userType, currentPath }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  const superAdminMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/super-admin",
    },
    {
      title: "Gestión de Clientes",
      icon: <Building className="w-5 h-5" />,
      children: [
        { title: "Panel Principal", icon: null, href: "/super-admin" },
        { title: "Aprobar Clientes", icon: null, href: "/super-admin/clients/approve" },
        { title: "Gestionar Planes", icon: null, href: "/super-admin/plans" },
        { title: "Facturación Global", icon: null, href: "/super-admin/billing" },
      ],
    },
    {
      title: "Configuración",
      icon: <Settings className="w-5 h-5" />,
      children: [
        { title: "Configuración Sistema", icon: null, href: "/super-admin/settings" },
        { title: "Usuarios Admin", icon: null, href: "/super-admin/users" },
        { title: "Reportes Globales", icon: null, href: "/super-admin/reports" },
      ],
    },
  ]

  const clientMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/client-portal",
    },
    {
      title: "Mis Paquetes",
      icon: <Package className="w-5 h-5" />,
      children: [
        { title: "Rastrear Paquete", icon: null, href: "/client-portal/tracking" },
        { title: "Historial", icon: null, href: "/client-portal/history" },
      ],
    },
    {
      title: "Sucursales",
      icon: <MapPin className="w-5 h-5" />,
      children: [
        { title: "Mis Sucursales", icon: null, href: "/client-portal/branches" },
        { title: "Agregar Sucursal", icon: null, href: "/client-portal/branches/add" },
      ],
    },
    {
      title: "Sub-Clientes",
      icon: <UserPlus className="w-5 h-5" />,
      children: [
        { title: "Gestionar Sub-Clientes", icon: null, href: "/client-portal/sub-clients" },
        
      ],
    },
    {
      title: "Facturación",
      icon: <FileText className="w-5 h-5" />,
      children: [
        { title: "Ver Facturas", icon: null, href: "/client-portal/invoices" },
        { title: "Métodos de Pago", icon: null, href: "/client-portal/payment-methods" },
      ],
    },
    {
      title: "Configuración",
      icon: <Settings className="w-5 h-5" />,
      children: [
        { title: "Perfil Empresa", icon: null, href: "/client-portal/profile" },
        { title: "Notificaciones", icon: null, href: "/client-portal/notifications" },
        { title: "Portal Cliente Final", icon: null, href: "/client-portal/end-user-portal" },
      ],
    },
  ]

  const adminMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      title: "Gestión de Planes",
      icon: <Target className="w-5 h-5" />,
      children: [
        { title: "Crear Planes", icon: null, href: "/dashboard/planes/crear" },
        { title: "Gestionar Planes", icon: null, href: "/dashboard/planes" },
        { title: "Asignar a Sucursales", icon: null, href: "/dashboard/planes/asignar" },
      ],
    },
    {
      title: "Paquetes",
      icon: <Package className="w-5 h-5" />,
      children: [
        { title: "Estados de Paquetes", icon: null, href: "/dashboard/paquetes/estados" },
        { title: "Inventario", icon: null, href: "/dashboard/paquetes/inventario" },
        { title: "Registro Rápido", icon: null, href: "/dashboard/paquetes/registro" },
      ],
    },
    {
      title: "Facturación",
      icon: <FileText className="w-5 h-5" />,
      children: [
        { title: "Facturación Automática", icon: null, href: "/dashboard/facturacion/automatica" },
        { title: "Ver Facturas Pendientes", icon: null, href: "/dashboard/facturacion/pendientes", badge: "5" },
        { title: "Ver Facturas Pagadas", icon: null, href: "/dashboard/facturacion/pagadas" },
        { title: "Buscar Tracking", icon: null, href: "/dashboard/facturacion/tracking" },
      ],
    },
    {
      title: "Configuración",
      icon: <Settings className="w-5 h-5" />,
      children: [
        { title: "Información de la Empresa", icon: null, href: "/dashboard/opciones/empresa" },
        { title: "Sucursales", icon: null, href: "/dashboard/opciones/sucursales" },
        { title: "Configuración Mensajes", icon: null, href: "/dashboard/opciones/mensajes" },
        { title: "Notificaciones", icon: null, href: "/dashboard/opciones/notificaciones" },
        { title: "Integraciones", icon: null, href: "/dashboard/opciones/integraciones" },
        { title: "Métodos de Pago", icon: null, href: "/dashboard/opciones/pagos" },
        { title: "Configuración de Correo", icon: null, href: "/dashboard/opciones/correo" },
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

  const getMenuItems = () => {
    switch (userType) {
      case 'superadmin':
        return superAdminMenuItems
      case 'client':
        return clientMenuItems
      default:
        return adminMenuItems
    }
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userType")
    router.push("/")
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const isActive = currentPath === item.href

    return (
      <div key={item.title} className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "group w-full flex items-center justify-between px-4 py-3.5 text-left text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 rounded-2xl transition-all duration-300 ease-out hover:shadow-sm border border-transparent hover:border-slate-200/50",
              level > 0 && "ml-4"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <div
              className={cn(
                "transition-all duration-300 ease-out",
                isExpanded ? "rotate-180 text-blue-600" : "group-hover:rotate-12"
              )}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            onClick={() => router.push(item.href || "#")}
            className={cn(
              "group w-full flex items-center justify-between px-4 py-3.5 text-slate-600 hover:text-slate-800 rounded-2xl transition-all duration-300 ease-out hover:shadow-md border border-transparent",
              level > 0 && "ml-4",
              isActive
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/30 hover:shadow-xl transform hover:scale-[1.02]"
                : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 hover:border-slate-200/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "transition-all duration-200",
                isActive ? "scale-110" : "group-hover:scale-110"
              )}>
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            {item.badge && (
              <div
                className={cn(
                  "px-2 py-1 text-xs font-semibold rounded-full transition-all duration-200",
                  isActive
                    ? "bg-white bg-opacity-20 text-white"
                    : "bg-red-100 text-red-600 group-hover:bg-red-500 group-hover:text-white"
                )}
              >
                {item.badge}
              </div>
            )}
          </button>
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

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'superadmin':
        return 'Super Administrador'
      case 'client':
        return 'Cliente'
      default:
        return 'Administrador'
    }
  }

  const getUserTypeColor = () => {
    switch (userType) {
      case 'superadmin':
        return 'from-purple-500 to-indigo-600'
      case 'client':
        return 'from-green-500 to-emerald-600'
      default:
        return 'from-blue-500 to-indigo-600'
    }
  }

  return (
    <>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-lg border"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative z-50 w-80 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-slate-200/50 flex flex-col transition-transform duration-300 ease-out h-full",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white to-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={cn(
                  "w-12 h-12 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg",
                  `bg-gradient-to-br ${getUserTypeColor()} shadow-blue-500/25`
                )}>
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  PoboxManager
                </h1>
                <p className="text-sm text-slate-500">{getUserTypeLabel()}</p>
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
            <div className={cn(
              "w-12 h-12 bg-gradient-to-br rounded-full ring-2 ring-blue-200 flex items-center justify-center font-semibold text-white",
              `bg-gradient-to-br ${getUserTypeColor()}`
            )}>
              {userType === 'superadmin' ? 'SA' : userType === 'client' ? 'CL' : 'AD'}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">{getUserTypeLabel()}</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-500">En línea</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          <div className="space-y-2">
            {getMenuItems().map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* Logout button */}
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
    </>
  )
}

export default Sidebar