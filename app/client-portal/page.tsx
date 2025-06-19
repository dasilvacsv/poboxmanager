"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, DollarSign, MapPin, Settings, FileText, Building, CreditCard } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/utils"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/layout/Sidebar"

const mockClientData = {
  empresa: "Miami Logistics Corp",
  plan: "Premium",
  sucursales: [
    { id: 1, nombre: "Miami Central", direccion: "1234 Brickell Ave", activa: true },
    { id: 2, nombre: "Miami Airport", direccion: "5678 Airport Rd", activa: true },
    { id: 3, nombre: "Miami Beach", direccion: "9012 Ocean Dr", activa: false },
  ],
  paquetesRecientes: [
    {
      id: 1,
      tracking: "TRK001",
      descripcion: "Electrónicos",
      peso: "2.5 lbs",
      estado: "Entregado",
      fecha: "2024-01-15",
    },
    { id: 2, tracking: "TRK002", descripcion: "Documentos", peso: "0.5 lbs", estado: "En Bodega", fecha: "2024-01-14" },
    { id: 3, tracking: "TRK003", descripcion: "Ropa", peso: "1.8 lbs", estado: "En Tránsito", fecha: "2024-01-13" },
  ],
  facturas: [
    { id: 1, numero: "FAC-001", monto: 125.5, estado: "Pagada", fecha: "2024-01-10" },
    { id: 2, numero: "FAC-002", monto: 89.75, estado: "Pendiente", fecha: "2024-01-12" },
  ],
}

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [clientData, setClientData] = useState(mockClientData)
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false)
  const [isSucursalesDialogOpen, setIsSucursalesDialogOpen] = useState(false)
  const [isFacturasDialogOpen, setIsFacturasDialogOpen] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)

  const [newSucursal, setNewSucursal] = useState({
    nombre: "",
    direccion: "",
    activa: true,
  })

  const [configData, setConfigData] = useState({
    notificacionesEmail: true,
    notificacionesSMS: false,
    idioma: "es",
    moneda: "USD",
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

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de tracking",
        variant: "destructive",
      })
      return
    }

    // Simular búsqueda de paquete
    const mockResult = {
      tracking: trackingNumber,
      estado: "En Tránsito",
      descripcion: "Electrónicos",
      peso: "2.5 lbs",
      origen: "Miami, FL",
      destino: "Tu dirección",
      fechaEnvio: "2024-01-15",
      fechaEstimada: "2024-01-18",
      historial: [
        { fecha: "2024-01-15 10:00", evento: "Paquete recibido en bodega", ubicacion: "Miami Central" },
        { fecha: "2024-01-15 14:30", evento: "En proceso de clasificación", ubicacion: "Miami Central" },
        { fecha: "2024-01-16 09:00", evento: "En tránsito", ubicacion: "Centro de distribución" },
      ],
    }

    setTrackingResult(mockResult)
    toast({
      title: "Paquete encontrado",
      description: `Estado: ${mockResult.estado}`,
    })
  }

  const handleAddSucursal = () => {
    if (!newSucursal.nombre.trim() || !newSucursal.direccion.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    const newSuc = {
      id: Date.now(),
      ...newSucursal,
    }

    setClientData((prev) => ({
      ...prev,
      sucursales: [...prev.sucursales, newSuc],
    }))

    setNewSucursal({
      nombre: "",
      direccion: "",
      activa: true,
    })

    toast({
      title: "Sucursal agregada",
      description: "La nueva sucursal ha sido agregada exitosamente",
    })
  }

  const handleToggleSucursal = (id: number) => {
    setClientData((prev) => ({
      ...prev,
      sucursales: prev.sucursales.map((suc) => (suc.id === id ? { ...suc, activa: !suc.activa } : suc)),
    }))
  }

  const handlePayInvoice = (invoiceId: number) => {
    setClientData((prev) => ({
      ...prev,
      facturas: prev.facturas.map((factura) => (factura.id === invoiceId ? { ...factura, estado: "Pagada" } : factura)),
    }))

    toast({
      title: "Pago procesado",
      description: "La factura ha sido pagada exitosamente",
    })
  }

  const handleSaveConfig = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas",
    })
    setIsConfigDialogOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Building className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Portal del Cliente</h3>
            <p className="text-slate-500">Cargando tu panel...</p>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm lg:ml-0 ml-16">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Portal del Cliente
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Bienvenido, {clientData.empresa} - Plan {clientData.plan}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Sucursales Activas</p>
                    <p className="text-3xl font-bold text-green-600">
                      {clientData.sucursales.filter((s) => s.activa).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Paquetes Este Mes</p>
                    <p className="text-3xl font-bold text-blue-600">{clientData.paquetesRecientes.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pendientes</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {clientData.facturas.filter((f) => f.estado === "Pendiente").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Facturado</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ${clientData.facturas.reduce((sum, f) => sum + f.monto, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex flex-col space-y-2">
                      <Package className="w-6 h-6" />
                      <span>Rastrear Paquete</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Rastrear Paquete</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ingresa el número de tracking"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleTrackPackage}>
                          <Search className="w-4 h-4 mr-2" />
                          Buscar
                        </Button>
                      </div>

                      {trackingResult && (
                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">Tracking: {trackingResult.tracking}</h3>
                              <Badge
                                className={`${
                                  trackingResult.estado === "Entregado"
                                    ? "bg-green-500"
                                    : trackingResult.estado === "En Tránsito"
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                } text-white`}
                              >
                                {trackingResult.estado}
                              </Badge>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <p>Peso: {trackingResult.peso}</p>
                              <p>Descripción: {trackingResult.descripcion}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p>
                                <strong>Origen:</strong> {trackingResult.origen}
                              </p>
                              <p>
                                <strong>Fecha de envío:</strong> {trackingResult.fechaEnvio}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Destino:</strong> {trackingResult.destino}
                              </p>
                              <p>
                                <strong>Fecha estimada:</strong> {trackingResult.fechaEstimada}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Historial de seguimiento:</h4>
                            <div className="space-y-2">
                              {trackingResult.historial.map((evento: any, index: number) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                  <div>
                                    <p className="font-medium">{evento.evento}</p>
                                    <p className="text-sm text-gray-600">{evento.ubicacion}</p>
                                  </div>
                                  <p className="text-sm text-gray-500">{evento.fecha}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isSucursalesDialogOpen} onOpenChange={setIsSucursalesDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex flex-col space-y-2">
                      <MapPin className="w-6 h-6" />
                      <span>Gestionar Sucursales</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Gestión de Sucursales</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-4">Agregar Nueva Sucursal</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nombre">Nombre de la Sucursal</Label>
                            <Input
                              id="nombre"
                              value={newSucursal.nombre}
                              onChange={(e) => setNewSucursal((prev) => ({ ...prev, nombre: e.target.value }))}
                              placeholder="Ej: Miami Beach"
                            />
                          </div>
                          <div>
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input
                              id="direccion"
                              value={newSucursal.direccion}
                              onChange={(e) => setNewSucursal((prev) => ({ ...prev, direccion: e.target.value }))}
                              placeholder="Dirección completa"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button onClick={handleAddSucursal}>
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Sucursal
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Sucursales Existentes</h3>
                        <div className="space-y-2">
                          {clientData.sucursales.map((sucursal) => (
                            <div key={sucursal.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{sucursal.nombre}</h4>
                                <p className="text-sm text-gray-600">{sucursal.direccion}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Switch
                                  checked={sucursal.activa}
                                  onCheckedChange={() => handleToggleSucursal(sucursal.id)}
                                />
                                <Badge className={sucursal.activa ? "bg-green-500" : "bg-gray-500"}>
                                  {sucursal.activa ? "Activa" : "Inactiva"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isFacturasDialogOpen} onOpenChange={setIsFacturasDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex flex-col space-y-2">
                      <FileText className="w-6 h-6" />
                      <span>Ver Facturas</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Gestión de Facturas</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                              {clientData.facturas.filter((f) => f.estado === "Pagada").length}
                            </div>
                            <p className="text-sm text-gray-600">Facturas Pagadas</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-orange-600">
                              {clientData.facturas.filter((f) => f.estado === "Pendiente").length}
                            </div>
                            <p className="text-sm text-gray-600">Facturas Pendientes</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">
                              ${clientData.facturas.reduce((sum, f) => sum + f.monto, 0).toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600">Total Facturado</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        {clientData.facturas.map((factura) => (
                          <div key={factura.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{factura.numero}</h4>
                              <p className="text-sm text-gray-600">Fecha: {factura.fecha}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-bold text-lg">${factura.monto.toFixed(2)}</span>
                              <Badge className={factura.estado === "Pagada" ? "bg-green-500" : "bg-orange-500"}>
                                {factura.estado}
                              </Badge>
                              {factura.estado === "Pendiente" && (
                                <Button
                                  size="sm"
                                  onClick={() => handlePayInvoice(factura.id)}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <CreditCard className="w-4 h-4 mr-2" />
                                  Pagar
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex flex-col space-y-2">
                      <Settings className="w-6 h-6" />
                      <span>Configuración</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Configuración de Cuenta</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Notificaciones</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emailNotif">Notificaciones por Email</Label>
                              <p className="text-sm text-gray-600">Recibir actualizaciones por correo electrónico</p>
                            </div>
                            <Switch
                              id="emailNotif"
                              checked={configData.notificacionesEmail}
                              onCheckedChange={(checked) =>
                                setConfigData((prev) => ({ ...prev, notificacionesEmail: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="smsNotif">Notificaciones por SMS</Label>
                              <p className="text-sm text-gray-600">Recibir alertas por mensaje de texto</p>
                            </div>
                            <Switch
                              id="smsNotif"
                              checked={configData.notificacionesSMS}
                              onCheckedChange={(checked) =>
                                setConfigData((prev) => ({ ...prev, notificacionesSMS: checked }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Preferencias</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="idioma">Idioma</Label>
                            <Select
                              value={configData.idioma}
                              onValueChange={(value) => setConfigData((prev) => ({ ...prev, idioma: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="moneda">Moneda</Label>
                            <Select
                              value={configData.moneda}
                              onValueChange={(value) => setConfigData((prev) => ({ ...prev, moneda: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD ($)</SelectItem>
                                <SelectItem value="EUR">EUR (€)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveConfig}>Guardar Cambios</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">Mis Sucursales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.sucursales.map((sucursal) => (
                    <div key={sucursal.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{sucursal.nombre}</p>
                          <p className="text-sm text-slate-500">{sucursal.direccion}</p>
                        </div>
                      </div>
                      <Badge
                        className={`${
                          sucursal.activa
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-gray-500 to-gray-600"
                        } text-white shadow-lg`}
                      >
                        {sucursal.activa ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">Paquetes Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                        <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                        <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                        <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientData.paquetesRecientes.map((paquete) => (
                        <TableRow key={paquete.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                          <TableCell className="font-mono text-sm font-medium text-blue-600">{paquete.tracking}</TableCell>
                          <TableCell className="font-medium text-slate-800">{paquete.descripcion}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                paquete.estado === "Entregado"
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : paquete.estado === "En Bodega"
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                    : "bg-gradient-to-r from-yellow-500 to-orange-500"
                              } text-white shadow-lg`}
                            >
                              {paquete.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{paquete.fecha}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Estado de Facturas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Número</TableHead>
                      <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientData.facturas.map((factura) => (
                      <TableRow key={factura.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">{factura.numero}</TableCell>
                        <TableCell className="font-bold text-lg text-green-600">${factura.monto.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              factura.estado === "Pagada"
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : "bg-gradient-to-r from-orange-500 to-orange-600"
                            } text-white shadow-lg`}
                          >
                            {factura.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{factura.fecha}</TableCell>
                        <TableCell>
                          {factura.estado === "Pendiente" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                              onClick={() => handlePayInvoice(factura.id)}
                            >
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pagar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}