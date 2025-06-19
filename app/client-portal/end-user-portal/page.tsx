"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/lib/utils"
import { 
  Eye, 
  Users, 
  Settings, 
  Link,
  Copy,
  QrCode,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Palette,
  Layout,
  Bell,
  UserPlus,
  Edit,
  Trash2,
  Save,
  X,
  Package,
  FileText,
  Calendar,
  Phone,
  MapPin
} from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"

const mockPortalConfig = {
  enabled: true,
  url: "https://portal.miamilogistics.com/clients",
  customDomain: "",
  branding: {
    logo: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    companyName: "Miami Logistics Corp",
    welcomeMessage: "Bienvenido a nuestro portal de clientes. Aquí podrás rastrear tus paquetes y gestionar tu cuenta."
  },
  features: {
    packageTracking: true,
    invoiceHistory: true,
    profileUpdate: true,
    notifications: false,
    paymentMethods: true,
    supportChat: false
  },
  authentication: {
    selfRegistration: false,
    emailVerification: true,
    passwordReset: true,
    twoFactor: false
  },
  customization: {
    layout: "modern",
    theme: "light",
    language: "es",
    currency: "USD"
  }
}

const mockEndUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+1 305-555-0101",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    packagesCount: 15,
    totalSpent: 1250.50
  },
  {
    id: 2,
    name: "María González",
    email: "maria@email.com",
    phone: "+1 305-555-0102",
    status: "active",
    lastLogin: "2024-01-14 09:15",
    packagesCount: 8,
    totalSpent: 680.25
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos@email.com",
    phone: "+1 305-555-0103",
    status: "inactive",
    lastLogin: "2024-01-10 16:45",
    packagesCount: 3,
    totalSpent: 185.00
  }
]

export default function EndUserPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [portalConfig, setPortalConfig] = useState(mockPortalConfig)
  const [endUsers, setEndUsers] = useState(mockEndUsers)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditingBranding, setIsEditingBranding] = useState(false)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    temporaryPassword: ""
  })

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'

    if (!auth || storedUserType !== 'client') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const handleConfigChange = (section: string, key: string, value: any) => {
    setPortalConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleSaveConfig = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios en el portal han sido guardados exitosamente.",
    })
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(portalConfig.url)
    toast({
      title: "URL copiada",
      description: "La URL del portal ha sido copiada al portapapeles.",
    })
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos.",
        variant: "destructive"
      })
      return
    }

    const user = {
      id: Date.now(),
      ...newUser,
      status: "active" as const,
      lastLogin: "Nunca",
      packagesCount: 0,
      totalSpent: 0
    }

    setEndUsers(prev => [...prev, user])
    setNewUser({ name: "", email: "", phone: "", temporaryPassword: "" })
    setIsAddUserDialogOpen(false)
    
    toast({
      title: "Usuario agregado",
      description: "El nuevo usuario ha sido creado exitosamente.",
    })
  }

  const handleDeleteUser = (userId: number) => {
    setEndUsers(prev => prev.filter(user => user.id !== userId))
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado del sistema.",
    })
  }

  const handleToggleUserStatus = (userId: number) => {
    setEndUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' as const }
          : user
      )
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando portal...</h3>
            <p className="text-slate-500">Preparando configuración</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar userType={userType} currentPath={pathname} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 sm:px-6 py-4 shadow-sm lg:ml-0 ml-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Portal Cliente Final
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Configura y gestiona el acceso de tus clientes finales
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${portalConfig.enabled ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white shadow-lg`}>
                {portalConfig.enabled ? 'Activo' : 'Inactivo'}
              </Badge>
              <Button
                onClick={handleCopyUrl}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar URL
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200/50 px-4 sm:px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Resumen', icon: Eye },
              { id: 'config', label: 'Configuración', icon: Settings },
              { id: 'branding', label: 'Marca', icon: Palette },
              { id: 'users', label: 'Usuarios', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Usuarios Activos</p>
                        <p className="text-3xl font-bold text-green-600">
                          {endUsers.filter(user => user.status === 'active').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Total Usuarios</p>
                        <p className="text-3xl font-bold text-blue-600">{endUsers.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <UserPlus className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Paquetes Rastreados</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {endUsers.reduce((sum, user) => sum + user.packagesCount, 0)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Portal</p>
                        <p className="text-3xl font-bold text-orange-600">
                          ${endUsers.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portal Preview */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Vista Previa del Portal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-dashed border-slate-300">
                    <div className="max-w-md mx-auto">
                      {/* Mock Portal Interface */}
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div 
                          className="h-16 flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: portalConfig.branding.primaryColor }}
                        >
                          {portalConfig.branding.companyName}
                        </div>
                        <div className="p-6">
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-semibold text-slate-800">Portal de Clientes</h3>
                            <p className="text-sm text-slate-600 mt-2">{portalConfig.branding.welcomeMessage}</p>
                          </div>
                          <div className="space-y-3">
                            <div className="h-8 bg-slate-100 rounded"></div>
                            <div className="h-8 bg-slate-100 rounded"></div>
                            <div 
                              className="h-10 rounded flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: portalConfig.branding.secondaryColor }}
                            >
                              Iniciar Sesión
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-sm text-slate-500">Vista previa del portal</p>
                      <p className="text-xs text-slate-400 mt-1">{portalConfig.url}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'config' && (
            <>
              {/* Portal Configuration */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Configuración General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div>
                      <h4 className="font-semibold text-slate-800">Activar Portal</h4>
                      <p className="text-sm text-slate-600">Permite el acceso de clientes finales al portal</p>
                    </div>
                    <Switch
                      checked={portalConfig.enabled}
                      onCheckedChange={(checked) => setPortalConfig(prev => ({ ...prev, enabled: checked }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="portal-url">URL del Portal</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="portal-url"
                          value={portalConfig.url}
                          onChange={(e) => setPortalConfig(prev => ({ ...prev, url: e.target.value }))}
                          className="flex-1"
                        />
                        <Button
                          onClick={handleCopyUrl}
                          variant="outline"
                          size="icon"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="custom-domain">Dominio Personalizado (Opcional)</Label>
                      <Input
                        id="custom-domain"
                        value={portalConfig.customDomain}
                        onChange={(e) => setPortalConfig(prev => ({ ...prev, customDomain: e.target.value }))}
                        placeholder="portal.tuempresa.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features Configuration */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-green-600" />
                    Funcionalidades Habilitadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(portalConfig.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800 capitalize">
                            {feature === 'packageTracking' ? 'Rastreo de Paquetes' :
                             feature === 'invoiceHistory' ? 'Historial de Facturas' :
                             feature === 'profileUpdate' ? 'Actualizar Perfil' :
                             feature === 'notifications' ? 'Notificaciones' :
                             feature === 'paymentMethods' ? 'Métodos de Pago' :
                             'Chat de Soporte'}
                          </div>
                          <div className="text-sm text-slate-500">
                            {feature === 'packageTracking' ? 'Permite rastrear paquetes en tiempo real' :
                             feature === 'invoiceHistory' ? 'Acceso al historial de facturación' :
                             feature === 'profileUpdate' ? 'Actualización de datos personales' :
                             feature === 'notifications' ? 'Sistema de notificaciones' :
                             feature === 'paymentMethods' ? 'Gestión de métodos de pago' :
                             'Chat de soporte en línea'}
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => handleConfigChange('features', feature, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authentication Settings */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    Configuración de Autenticación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(portalConfig.authentication).map(([setting, enabled]) => (
                      <div key={setting} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800 capitalize">
                            {setting === 'selfRegistration' ? 'Auto-registro' :
                             setting === 'emailVerification' ? 'Verificación de Email' :
                             setting === 'passwordReset' ? 'Recuperar Contraseña' :
                             'Autenticación de Dos Factores'}
                          </div>
                          <div className="text-sm text-slate-500">
                            {setting === 'selfRegistration' ? 'Los usuarios pueden registrarse solos' :
                             setting === 'emailVerification' ? 'Verificar email al registrarse' :
                             setting === 'passwordReset' ? 'Permite restablecer contraseñas' :
                             'Seguridad adicional con 2FA'}
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={(checked) => handleConfigChange('authentication', setting, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveConfig}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </>
          )}

          {activeTab === 'branding' && (
            <>
              {/* Branding Configuration */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-orange-600" />
                    Personalización de Marca
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingBranding(!isEditingBranding)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    {isEditingBranding ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditingBranding ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="company-name">Nombre de la Empresa</Label>
                          <Input
                            id="company-name"
                            value={portalConfig.branding.companyName}
                            onChange={(e) => handleConfigChange('branding', 'companyName', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="logo-url">URL del Logo</Label>
                          <Input
                            id="logo-url"
                            value={portalConfig.branding.logo}
                            onChange={(e) => handleConfigChange('branding', 'logo', e.target.value)}
                            placeholder="https://ejemplo.com/logo.png"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="primary-color">Color Primario</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="primary-color"
                              type="color"
                              value={portalConfig.branding.primaryColor}
                              onChange={(e) => handleConfigChange('branding', 'primaryColor', e.target.value)}
                              className="w-16"
                            />
                            <Input
                              value={portalConfig.branding.primaryColor}
                              onChange={(e) => handleConfigChange('branding', 'primaryColor', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="secondary-color">Color Secundario</Label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              id="secondary-color"
                              type="color"
                              value={portalConfig.branding.secondaryColor}
                              onChange={(e) => handleConfigChange('branding', 'secondaryColor', e.target.value)}
                              className="w-16"
                            />
                            <Input
                              value={portalConfig.branding.secondaryColor}
                              onChange={(e) => handleConfigChange('branding', 'secondaryColor', e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="welcome-message">Mensaje de Bienvenida</Label>
                        <Textarea
                          id="welcome-message"
                          value={portalConfig.branding.welcomeMessage}
                          onChange={(e) => handleConfigChange('branding', 'welcomeMessage', e.target.value)}
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            handleSaveConfig()
                            setIsEditingBranding(false)
                          }}
                          className="bg-gradient-to-r from-orange-500 to-orange-600"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Guardar Cambios
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEditingBranding(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-slate-500 mb-2">Nombre de la Empresa</div>
                            <div className="text-lg font-semibold text-slate-800">{portalConfig.branding.companyName}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-500 mb-2">Colores</div>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: portalConfig.branding.primaryColor }}
                                ></div>
                                <span className="text-sm text-slate-600">Primario</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: portalConfig.branding.secondaryColor }}
                                ></div>
                                <span className="text-sm text-slate-600">Secundario</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-500 mb-2">Mensaje de Bienvenida</div>
                          <div className="text-slate-700 p-4 bg-slate-50 rounded-xl">
                            {portalConfig.branding.welcomeMessage}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Customization Options */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-purple-600" />
                    Opciones de Personalización
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="layout">Diseño</Label>
                      <Select 
                        value={portalConfig.customization.layout}
                        onValueChange={(value) => handleConfigChange('customization', 'layout', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Moderno</SelectItem>
                          <SelectItem value="classic">Clásico</SelectItem>
                          <SelectItem value="minimal">Minimalista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="theme">Tema</Label>
                      <Select 
                        value={portalConfig.customization.theme}
                        onValueChange={(value) => handleConfigChange('customization', 'theme', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Oscuro</SelectItem>
                          <SelectItem value="auto">Automático</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Idioma</Label>
                      <Select 
                        value={portalConfig.customization.language}
                        onValueChange={(value) => handleConfigChange('customization', 'language', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Moneda</Label>
                      <Select 
                        value={portalConfig.customization.currency}
                        onValueChange={(value) => handleConfigChange('customization', 'currency', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="MXN">MXN ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'users' && (
            <>
              {/* Users Management */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Gestión de Usuarios Finales
                  </CardTitle>
                  <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Agregar Usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="user-name">Nombre Completo *</Label>
                          <Input
                            id="user-name"
                            value={newUser.name}
                            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Juan Pérez"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-email">Email *</Label>
                          <Input
                            id="user-email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="juan@email.com"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-phone">Teléfono</Label>
                          <Input
                            id="user-phone"
                            type="tel"
                            value={newUser.phone}
                            onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+1 305-555-0123"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="user-password">Contraseña Temporal</Label>
                          <Input
                            id="user-password"
                            type="password"
                            value={newUser.temporaryPassword}
                            onChange={(e) => setNewUser(prev => ({ ...prev, temporaryPassword: e.target.value }))}
                            placeholder="Contraseña temporal"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddUser}>
                          Crear Usuario
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-200">
                          <TableHead className="font-semibold text-slate-700">Usuario</TableHead>
                          <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                          <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                          <TableHead className="font-semibold text-slate-700">Último Acceso</TableHead>
                          <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                          <TableHead className="font-semibold text-slate-700">Total Gastado</TableHead>
                          <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {endUsers.map((user) => (
                          <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800">{user.name}</div>
                                  <div className="text-sm text-slate-500">{user.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-3 h-3 text-blue-600" />
                                  <span className="text-slate-600">{user.email}</span>
                                </div>
                                {user.phone && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-3 h-3 text-green-600" />
                                    <span className="text-slate-600">{user.phone}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${
                                  user.status === 'active'
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-gray-500 to-gray-600'
                                } text-white shadow-lg cursor-pointer`}
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === 'active' ? 'Activo' : 'Inactivo'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-600">{user.lastLogin}</TableCell>
                            <TableCell className="font-medium text-blue-600">{user.packagesCount}</TableCell>
                            <TableCell className="font-bold text-green-600">${user.totalSpent.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-red-50 hover:text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}