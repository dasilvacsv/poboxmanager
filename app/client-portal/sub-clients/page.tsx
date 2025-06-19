"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/lib/utils"
import { 
  UserPlus, 
  Users, 
  Building, 
  Package, 
  DollarSign, 
  Edit,
  Trash2,
  Eye,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Shield,
  Key,
  Save
} from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"

const mockSubClients = [
  {
    id: 1,
    codigo: "SC001",
    nombre: "Boutique Elena",
    contacto: "Elena Martínez",
    email: "elena@boutique-elena.com",
    telefono: "+1 305-555-0201",
    direccion: "789 Lincoln Road, Miami Beach, FL 33139",
    tipoNegocio: "Retail",
    fechaRegistro: "2024-01-10",
    estado: "activo",
    plan: "Básico",
    paquetesEnviados: 45,
    paquetesRecibidos: 12,
    facturasPendientes: 2,
    totalFacturado: 1250.75,
    limiteCredito: 2000.00,
    configuracion: {
      notificaciones: true,
      facturacionAutomatica: true,
      accesoPaquetes: true,
      accesoFacturas: true,
      accesoReportes: false
    }
  },
  {
    id: 2,
    codigo: "SC002",
    nombre: "Tech Solutions Miami",
    contacto: "Roberto García",
    email: "roberto@techsolutions.com",
    telefono: "+1 305-555-0202",
    direccion: "456 Brickell Ave, Suite 200, Miami, FL 33131",
    tipoNegocio: "Tecnología",
    fechaRegistro: "2024-01-05",
    estado: "activo",
    plan: "Premium",
    paquetesEnviados: 128,
    paquetesRecibidos: 34,
    facturasPendientes: 0,
    totalFacturado: 3850.25,
    limiteCredito: 5000.00,
    configuracion: {
      notificaciones: true,
      facturacionAutomatica: true,
      accesoPaquetes: true,
      accesoFacturas: true,
      accesoReportes: true
    }
  },
  {
    id: 3,
    codigo: "SC003",
    nombre: "Importadora Caribe",
    contacto: "Ana Rodríguez",
    email: "ana@importadoracaribe.com",
    telefono: "+1 305-555-0203",
    direccion: "321 NW 7th Street, Miami, FL 33125",
    tipoNegocio: "Importación",
    fechaRegistro: "2023-12-15",
    estado: "suspendido",
    plan: "Empresarial",
    paquetesEnviados: 89,
    paquetesRecibidos: 156,
    facturasPendientes: 5,
    totalFacturado: 2150.50,
    limiteCredito: 3000.00,
    configuracion: {
      notificaciones: false,
      facturacionAutomatica: false,
      accesoPaquetes: true,
      accesoFacturas: false,
      accesoReportes: false
    }
  }
]

export default function SubClients() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [subClients, setSubClients] = useState(mockSubClients)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const [newSubClient, setNewSubClient] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    tipoNegocio: "",
    plan: "Básico",
    limiteCredito: 1000.00,
    configuracion: {
      notificaciones: true,
      facturacionAutomatica: true,
      accesoPaquetes: true,
      accesoFacturas: true,
      accesoReportes: false
    }
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

  const handleAddSubClient = () => {
    if (!newSubClient.nombre || !newSubClient.contacto || !newSubClient.email) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos.",
        variant: "destructive"
      })
      return
    }

    const subClient = {
      id: Date.now(),
      codigo: `SC${String(subClients.length + 1).padStart(3, '0')}`,
      ...newSubClient,
      fechaRegistro: new Date().toISOString().split('T')[0],
      estado: "activo" as const,
      paquetesEnviados: 0,
      paquetesRecibidos: 0,
      facturasPendientes: 0,
      totalFacturado: 0
    }

    setSubClients(prev => [...prev, subClient])
    setNewSubClient({
      nombre: "",
      contacto: "",
      email: "",
      telefono: "",
      direccion: "",
      tipoNegocio: "",
      plan: "Básico",
      limiteCredito: 1000.00,
      configuracion: {
        notificaciones: true,
        facturacionAutomatica: true,
        accesoPaquetes: true,
        accesoFacturas: true,
        accesoReportes: false
      }
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Sub-cliente agregado",
      description: "El nuevo sub-cliente ha sido creado exitosamente.",
    })
  }

  const handleEditSubClient = (client: any) => {
    setSelectedClient(client)
    setIsEditDialogOpen(true)
  }

  const handleConfigureSubClient = (client: any) => {
    setSelectedClient(client)
    setIsConfigDialogOpen(true)
  }

  const handleDeleteSubClient = (clientId: number) => {
    setSubClients(prev => prev.filter(client => client.id !== clientId))
    toast({
      title: "Sub-cliente eliminado",
      description: "El sub-cliente ha sido eliminado del sistema.",
    })
  }

  const handleToggleStatus = (clientId: number) => {
    setSubClients(prev => 
      prev.map(client => 
        client.id === clientId 
          ? { ...client, estado: client.estado === 'activo' ? 'suspendido' : 'activo' as const }
          : client
      )
    )
  }

  const handleSaveConfig = () => {
    if (selectedClient) {
      setSubClients(prev => 
        prev.map(client => 
          client.id === selectedClient.id ? selectedClient : client
        )
      )
      setIsConfigDialogOpen(false)
      toast({
        title: "Configuración guardada",
        description: "Los permisos han sido actualizados exitosamente.",
      })
    }
  }

  const filteredSubClients = subClients.filter(client => {
    const matchesSearch = client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "todos" || client.estado === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalSubClients = subClients.length
  const activeSubClients = subClients.filter(c => c.estado === 'activo').length
  const totalPackages = subClients.reduce((sum, c) => sum + c.paquetesEnviados + c.paquetesRecibidos, 0)
  const totalRevenue = subClients.reduce((sum, c) => sum + c.totalFacturado, 0)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando sub-clientes...</h3>
            <p className="text-slate-500">Preparando gestión de sub-clientes</p>
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
                Gestión de Sub-Clientes
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Administra y configura el acceso de tus sub-clientes
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                {totalSubClients} Total
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                {activeSubClients} Activos
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Sub-Clientes</p>
                    <p className="text-3xl font-bold text-blue-600">{totalSubClients}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Sub-Clientes Activos</p>
                    <p className="text-3xl font-bold text-green-600">{activeSubClients}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Paquetes Gestionados</p>
                    <p className="text-3xl font-bold text-purple-600">{totalPackages}</p>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Generados</p>
                    <p className="text-3xl font-bold text-orange-600">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar sub-clientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="activo">Activos</SelectItem>
                      <SelectItem value="suspendido">Suspendidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Agregar Sub-Cliente
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Sub-Cliente</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nombre">Nombre del Negocio *</Label>
                            <Input
                              id="nombre"
                              value={newSubClient.nombre}
                              onChange={(e) => setNewSubClient(prev => ({ ...prev, nombre: e.target.value }))}
                              placeholder="Boutique Elena"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contacto">Persona de Contacto *</Label>
                            <Input
                              id="contacto"
                              value={newSubClient.contacto}
                              onChange={(e) => setNewSubClient(prev => ({ ...prev, contacto: e.target.value }))}
                              placeholder="Elena Martínez"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newSubClient.email}
                              onChange={(e) => setNewSubClient(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="elena@boutique-elena.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input
                              id="telefono"
                              value={newSubClient.telefono}
                              onChange={(e) => setNewSubClient(prev => ({ ...prev, telefono: e.target.value }))}
                              placeholder="+1 305-555-0201"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="direccion">Dirección</Label>
                          <Textarea
                            id="direccion"
                            value={newSubClient.direccion}
                            onChange={(e) => setNewSubClient(prev => ({ ...prev, direccion: e.target.value }))}
                            placeholder="789 Lincoln Road, Miami Beach, FL 33139"
                            rows={2}
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="tipoNegocio">Tipo de Negocio</Label>
                            <Select 
                              value={newSubClient.tipoNegocio}
                              onValueChange={(value) => setNewSubClient(prev => ({ ...prev, tipoNegocio: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Retail">Retail</SelectItem>
                                <SelectItem value="Tecnología">Tecnología</SelectItem>
                                <SelectItem value="Importación">Importación</SelectItem>
                                <SelectItem value="Servicios">Servicios</SelectItem>
                                <SelectItem value="Manufactura">Manufactura</SelectItem>
                                <SelectItem value="Otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="plan">Plan</Label>
                            <Select 
                              value={newSubClient.plan}
                              onValueChange={(value) => setNewSubClient(prev => ({ ...prev, plan: value }))}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Básico">Básico</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="Empresarial">Empresarial</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="limiteCredito">Límite de Crédito</Label>
                            <Input
                              id="limiteCredito"
                              type="number"
                              step="0.01"
                              value={newSubClient.limiteCredito}
                              onChange={(e) => setNewSubClient(prev => ({ ...prev, limiteCredito: parseFloat(e.target.value) || 0 }))}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold text-slate-800 mb-4">Permisos Iniciales</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(newSubClient.configuracion).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-medium">
                                  {key === 'notificaciones' ? 'Notificaciones' :
                                   key === 'facturacionAutomatica' ? 'Facturación Automática' :
                                   key === 'accesoPaquetes' ? 'Acceso a Paquetes' :
                                   key === 'accesoFacturas' ? 'Acceso a Facturas' :
                                   'Acceso a Reportes'}
                                </span>
                                <Switch
                                  checked={value}
                                  onCheckedChange={(checked) => 
                                    setNewSubClient(prev => ({
                                      ...prev,
                                      configuracion: { ...prev.configuracion, [key]: checked }
                                    }))
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddSubClient}>
                          Crear Sub-Cliente
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sub-Clients Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Lista de Sub-Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Sub-Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                      <TableHead className="font-semibold text-slate-700">Facturado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Pendientes</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubClients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold">
                              {client.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{client.nombre}</div>
                              <div className="text-sm text-slate-500">{client.codigo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{client.contacto}</div>
                            <div className="text-sm text-slate-500">{client.email}</div>
                            {client.telefono && (
                              <div className="text-sm text-slate-500">{client.telefono}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              client.plan === 'Empresarial'
                                ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                                : client.plan === 'Premium'
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                                  : 'bg-gradient-to-r from-green-500 to-green-600'
                            } text-white shadow-lg`}
                          >
                            {client.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              client.estado === 'activo'
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : 'bg-gradient-to-r from-red-500 to-red-600'
                            } text-white shadow-lg cursor-pointer`}
                            onClick={() => handleToggleStatus(client.id)}
                          >
                            {client.estado === 'activo' ? 'Activo' : 'Suspendido'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-semibold text-blue-600">
                              {client.paquetesEnviados + client.paquetesRecibidos}
                            </div>
                            <div className="text-xs text-slate-500">
                              {client.paquetesEnviados}↗ {client.paquetesRecibidos}↙
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-green-600">
                          ${client.totalFacturado.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {client.facturasPendientes > 0 ? (
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                              {client.facturasPendientes}
                            </Badge>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleEditSubClient(client)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-purple-50 hover:text-purple-600"
                              onClick={() => handleConfigureSubClient(client)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeleteSubClient(client.id)}
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

          {/* Configuration Dialog */}
          <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Configurar Permisos - {selectedClient?.nombre}
                </DialogTitle>
              </DialogHeader>
              {selectedClient && (
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="text-sm font-medium text-slate-500 mb-1">Código</div>
                      <div className="font-semibold text-slate-800">{selectedClient.codigo}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="text-sm font-medium text-slate-500 mb-1">Plan Actual</div>
                      <div className="font-semibold text-slate-800">{selectedClient.plan}</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Key className="w-4 h-4 text-orange-600" />
                      Permisos de Acceso
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(selectedClient.configuracion).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div>
                            <div className="font-medium text-slate-800">
                              {key === 'notificaciones' ? 'Notificaciones' :
                               key === 'facturacionAutomatica' ? 'Facturación Automática' :
                               key === 'accesoPaquetes' ? 'Acceso a Paquetes' :
                               key === 'accesoFacturas' ? 'Acceso a Facturas' :
                               'Acceso a Reportes'}
                            </div>
                            <div className="text-sm text-slate-500">
                              {key === 'notificaciones' ? 'Recibir notificaciones por email y SMS' :
                               key === 'facturacionAutomatica' ? 'Generar facturas automáticamente' :
                               key === 'accesoPaquetes' ? 'Ver y gestionar paquetes' :
                               key === 'accesoFacturas' ? 'Ver historial de facturación' :
                               'Acceso a reportes y estadísticas'}
                            </div>
                          </div>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => 
                              setSelectedClient(prev => ({
                                ...prev,
                                configuracion: { ...prev.configuracion, [key]: checked }
                              }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Límites y Restricciones</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="limite-credito">Límite de Crédito</Label>
                        <Input
                          id="limite-credito"
                          type="number"
                          step="0.01"
                          value={selectedClient.limiteCredito}
                          onChange={(e) => setSelectedClient(prev => ({ 
                            ...prev, 
                            limiteCredito: parseFloat(e.target.value) || 0 
                          }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="plan-config">Plan</Label>
                        <Select 
                          value={selectedClient.plan}
                          onValueChange={(value) => setSelectedClient(prev => ({ ...prev, plan: value }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Básico">Básico</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Empresarial">Empresarial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveConfig} className="bg-gradient-to-r from-purple-500 to-purple-600">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}