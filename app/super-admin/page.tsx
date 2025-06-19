"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, Plus, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function SuperAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [clients, setClients] = useState([
    {
      id: 1,
      empresa: "Miami Logistics Corp",
      contacto: "Carlos Rodriguez",
      email: "carlos@miamilogistics.com",
      plan: "Premium",
      sucursales: 3,
      usuarios: 25,
      estado: "Activo",
      fechaVencimiento: "2024-06-15",
      ingresosMensual: 2500.0,
    },
    {
      id: 2,
      empresa: "Orlando Express LLC",
      contacto: "Maria Gonzalez",
      email: "maria@orlandoexpress.com",
      plan: "Básico",
      sucursales: 1,
      usuarios: 8,
      estado: "Activo",
      fechaVencimiento: "2024-03-20",
      ingresosMensual: 850.0,
    },
    {
      id: 3,
      empresa: "Tampa Shipping Co",
      contacto: "Roberto Silva",
      email: "roberto@tampashipping.com",
      plan: "Demo",
      sucursales: 1,
      usuarios: 3,
      estado: "Pendiente",
      fechaVencimiento: "2024-02-01",
      ingresosMensual: 0.0,
    },
  ])

  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [isBillingDialogOpen, setIsBillingDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const [newClientForm, setNewClientForm] = useState({
    empresa: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    plan: "",
    sucursales: 1,
    usuarios: 1,
  })

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'superadmin') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const handleNewClientSubmit = () => {
    const newClient = {
      id: Date.now(),
      ...newClientForm,
      estado: "Pendiente",
      fechaVencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ingresosMensual: 0,
    }
    setClients((prev) => [...prev, newClient])
    setIsNewClientDialogOpen(false)
    setNewClientForm({
      empresa: "",
      contacto: "",
      email: "",
      telefono: "",
      direccion: "",
      plan: "",
      sucursales: 1,
      usuarios: 1,
    })
    toast({
      title: "Cliente creado",
      description: "El nuevo cliente ha sido creado y está pendiente de aprobación.",
    })
  }

  const handleApproveClient = (clientId: number) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId ? { ...client, estado: "Activo", ingresosMensual: Math.random() * 2000 + 500 } : client,
      ),
    )
    toast({
      title: "Cliente aprobado",
      description: "El cliente ha sido aprobado y activado exitosamente.",
    })
  }

  const handleRejectClient = (clientId: number) => {
    setClients((prev) => prev.filter((client) => client.id !== clientId))
    toast({
      title: "Cliente rechazado",
      description: "El cliente ha sido rechazado y eliminado del sistema.",
      variant: "destructive",
    })
  }

  const handleEditClient = (client: any) => {
    setSelectedClient(client)
    toast({
      title: "Editando cliente",
      description: `Editando información de ${client.empresa}`,
    })
  }

  const totalClients = clients.length
  const activeClients = clients.filter((c) => c.estado === "Activo").length
  const totalRevenue = clients.reduce((sum, c) => sum + c.ingresosMensual, 0)
  const pendingApprovals = clients.filter((c) => c.estado === "Pendiente").length

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <Building className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">PoboxManager Super Admin</h3>
            <p className="text-slate-500">Cargando panel de control...</p>
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Panel Super Administrador
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Gestión de clientes empresariales y suscripciones
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Clientes</p>
                    <p className="text-3xl font-bold text-blue-600">{totalClients}</p>
                    <p className="text-xs text-blue-500 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +15% este mes
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Clientes Activos</p>
                    <p className="text-3xl font-bold text-green-600">{activeClients}</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {Math.round((activeClients / totalClients) * 100)}% del total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Mensuales</p>
                    <p className="text-3xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</p>
                    <p className="text-xs text-purple-500 mt-1 flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Recurrente
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Pendientes Aprobación</p>
                    <p className="text-3xl font-bold text-orange-600">{pendingApprovals}</p>
                    <p className="text-xs text-orange-500 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Requieren atención
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
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
                <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex flex-col space-y-2">
                      <Plus className="w-6 h-6" />
                      <span>Nuevo Cliente</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="empresa">Empresa</Label>
                          <Input
                            id="empresa"
                            value={newClientForm.empresa}
                            onChange={(e) => setNewClientForm((prev) => ({ ...prev, empresa: e.target.value }))}
                            placeholder="Nombre de la empresa"
                          />
                        </div>
                        <div>
                          <Label htmlFor="contacto">Contacto</Label>
                          <Input
                            id="contacto"
                            value={newClientForm.contacto}
                            onChange={(e) => setNewClientForm((prev) => ({ ...prev, contacto: e.target.value }))}
                            placeholder="Persona de contacto"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newClientForm.email}
                            onChange={(e) => setNewClientForm((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="email@empresa.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            value={newClientForm.telefono}
                            onChange={(e) => setNewClientForm((prev) => ({ ...prev, telefono: e.target.value }))}
                            placeholder="+1 305-555-0123"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="direccion">Dirección</Label>
                        <Textarea
                          id="direccion"
                          value={newClientForm.direccion}
                          onChange={(e) => setNewClientForm((prev) => ({ ...prev, direccion: e.target.value }))}
                          placeholder="Dirección completa"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="plan">Plan</Label>
                          <Select
                            value={newClientForm.plan}
                            onValueChange={(value) => setNewClientForm((prev) => ({ ...prev, plan: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Básico">Básico</SelectItem>
                              <SelectItem value="Premium">Premium</SelectItem>
                              <SelectItem value="Empresarial">Empresarial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="sucursales">Sucursales</Label>
                          <Input
                            id="sucursales"
                            type="number"
                            min="1"
                            value={newClientForm.sucursales}
                            onChange={(e) =>
                              setNewClientForm((prev) => ({ ...prev, sucursales: Number.parseInt(e.target.value) }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="usuarios">Usuarios</Label>
                          <Input
                            id="usuarios"
                            type="number"
                            min="1"
                            value={newClientForm.usuarios}
                            onChange={(e) =>
                              setNewClientForm((prev) => ({ ...prev, usuarios: Number.parseInt(e.target.value) }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleNewClientSubmit}>Crear Cliente</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex flex-col space-y-2">
                      <CheckCircle className="w-6 h-6" />
                      <span>Aprobar Pendientes</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Clientes Pendientes de Aprobación</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      {clients
                        .filter((c) => c.estado === "Pendiente")
                        .map((client) => (
                          <div key={client.id} className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">{client.empresa}</h3>
                              <p className="text-sm text-gray-600">
                                {client.contacto} - {client.email}
                              </p>
                              <p className="text-sm text-gray-500">Plan: {client.plan}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveClient(client.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Aprobar
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleRejectClient(client.id)}>
                                Rechazar
                              </Button>
                            </div>
                          </div>
                        ))}
                      {clients.filter((c) => c.estado === "Pendiente").length === 0 && (
                        <p className="text-center text-gray-500 py-8">No hay clientes pendientes de aprobación</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <Button className="h-16 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex flex-col space-y-2">
                  <Settings className="w-6 h-6" />
                  <span>Gestionar Planes</span>
                </Button>

                <Dialog open={isBillingDialogOpen} onOpenChange={setIsBillingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex flex-col space-y-2">
                      <DollarSign className="w-6 h-6" />
                      <span>Ver Facturación</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Resumen de Facturación</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-green-600">
                              ${clients.reduce((sum, c) => sum + c.ingresosMensual, 0).toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600">Ingresos Totales</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">
                              {clients.filter((c) => c.estado === "Activo").length}
                            </div>
                            <p className="text-sm text-gray-600">Clientes Activos</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">
                              $
                              {(
                                clients.reduce((sum, c) => sum + c.ingresosMensual, 0) /
                                clients.filter((c) => c.estado === "Activo").length
                              ).toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600">Promedio por Cliente</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Facturación por Cliente</h3>
                        <div className="space-y-2">
                          {clients
                            .filter((c) => c.estado === "Activo")
                            .map((client) => (
                              <div key={client.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span>{client.empresa}</span>
                                <span className="font-semibold text-green-600">${client.ingresosMensual.toFixed(2)}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Clients Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800">Clientes Empresariales</CardTitle>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => setIsNewClientDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Empresa</TableHead>
                      <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursales</TableHead>
                      <TableHead className="font-semibold text-slate-700">Usuarios</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Vencimiento</TableHead>
                      <TableHead className="font-semibold text-slate-700">Ingresos</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{client.empresa}</div>
                            <div className="text-sm text-slate-500">{client.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">{client.contacto}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              client.plan === "Premium"
                                ? "bg-gradient-to-r from-purple-500 to-purple-600"
                                : client.plan === "Básico"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                  : "bg-gradient-to-r from-gray-500 to-gray-600"
                            } text-white shadow-lg`}
                          >
                            {client.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{client.sucursales}</TableCell>
                        <TableCell className="font-medium">{client.usuarios}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${
                              client.estado === "Activo"
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : client.estado === "Pendiente"
                                  ? "bg-gradient-to-r from-orange-500 to-orange-600"
                                  : "bg-gradient-to-r from-red-500 to-red-600"
                            } text-white shadow-lg`}
                          >
                            {client.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{client.fechaVencimiento}</TableCell>
                        <TableCell className="font-bold text-green-600">${client.ingresosMensual.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleEditClient(client)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                            {client.estado === "Pendiente" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-green-50 hover:text-green-600"
                                onClick={() => handleApproveClient(client.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
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