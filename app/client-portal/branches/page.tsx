"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Plus, Edit, Trash2, Settings, Building, Phone, Mail, Clock, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

interface Sucursal {
  id: number
  nombre: string
  codigo: string
  direccion: string
  telefono: string
  email: string
  estado: 'Activa' | 'Inactiva' | 'Mantenimiento'
  plan: string
  costoExtra: number
  paquetesRecibidos: number
  ultimaActividad: string
  fechaCreacion: string
  horarioAtencion: string
  responsable: string
}

const mockSucursales: Sucursal[] = [
  {
    id: 1,
    nombre: "Miami Central",
    codigo: "MIA-001",
    direccion: "1234 Brickell Ave, Miami, FL 33131",
    telefono: "+1 305-555-0123",
    email: "central@miamilogistics.com",
    estado: "Activa",
    plan: "Premium",
    costoExtra: 0,
    paquetesRecibidos: 1247,
    ultimaActividad: "2024-01-15 14:30",
    fechaCreacion: "2023-01-15",
    horarioAtencion: "8:00 AM - 6:00 PM",
    responsable: "Carlos Rodriguez"
  },
  {
    id: 2,
    nombre: "Miami Airport",
    codigo: "MIA-002",
    direccion: "5678 Airport Rd, Miami, FL 33142",
    telefono: "+1 305-555-0124",
    email: "airport@miamilogistics.com",
    estado: "Activa",
    plan: "Básico",
    costoExtra: 5.00,
    paquetesRecibidos: 892,
    ultimaActividad: "2024-01-15 12:15",
    fechaCreacion: "2023-06-20",
    horarioAtencion: "6:00 AM - 10:00 PM",
    responsable: "Maria Gonzalez"
  },
  {
    id: 3,
    nombre: "Miami Beach",
    codigo: "MIA-003",
    direccion: "9012 Ocean Dr, Miami Beach, FL 33139",
    telefono: "+1 305-555-0125",
    email: "beach@miamilogistics.com",
    estado: "Mantenimiento",
    plan: "Premium",
    costoExtra: 3.50,
    paquetesRecibidos: 456,
    ultimaActividad: "2024-01-10 09:45",
    fechaCreacion: "2023-09-10",
    horarioAtencion: "9:00 AM - 5:00 PM",
    responsable: "Roberto Silva"
  }
]

export default function ClientBranches() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [sucursales, setSucursales] = useState<Sucursal[]>(mockSucursales)
  const [selectedSucursal, setSelectedSucursal] = useState<Sucursal | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)

  const [editForm, setEditForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    horarioAtencion: "",
    responsable: "",
    costoExtra: 0
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

  const handleEditSucursal = (sucursal: Sucursal) => {
    setSelectedSucursal(sucursal)
    setEditForm({
      nombre: sucursal.nombre,
      direccion: sucursal.direccion,
      telefono: sucursal.telefono,
      email: sucursal.email,
      horarioAtencion: sucursal.horarioAtencion,
      responsable: sucursal.responsable,
      costoExtra: sucursal.costoExtra
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (!selectedSucursal) return

    setSucursales(prev => prev.map(suc => 
      suc.id === selectedSucursal.id 
        ? { ...suc, ...editForm }
        : suc
    ))

    setIsEditDialogOpen(false)
    toast({
      title: "Sucursal actualizada",
      description: `${editForm.nombre} ha sido actualizada exitosamente`
    })
  }

  const handleToggleStatus = (id: number) => {
    setSucursales(prev => prev.map(suc => 
      suc.id === id 
        ? { 
            ...suc, 
            estado: suc.estado === 'Activa' ? 'Inactiva' : 'Activa' as Sucursal['estado']
          }
        : suc
    ))

    const sucursal = sucursales.find(s => s.id === id)
    toast({
      title: "Estado actualizado",
      description: `${sucursal?.nombre} ha sido ${sucursal?.estado === 'Activa' ? 'desactivada' : 'activada'}`
    })
  }

  const handleDeleteSucursal = (id: number) => {
    const sucursal = sucursales.find(s => s.id === id)
    setSucursales(prev => prev.filter(s => s.id !== id))
    
    toast({
      title: "Sucursal eliminada",
      description: `${sucursal?.nombre} ha sido eliminada del sistema`
    })
  }

  const getStatusBadgeClass = (estado: Sucursal['estado']) => {
    switch (estado) {
      case 'Activa':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'Mantenimiento':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
      default:
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
    }
  }

  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case 'Premium':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
      case 'Básico':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Gestión de Sucursales</h3>
            <p className="text-slate-500">Cargando tus sucursales...</p>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Mis Sucursales
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Administra todas tus ubicaciones y configuraciones
              </p>
            </div>
            <Button 
              onClick={() => router.push('/client-portal/branches/add')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Sucursal
            </Button>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Sucursales</p>
                    <p className="text-3xl font-bold text-blue-600">{sucursales.length}</p>
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
                    <p className="text-sm font-medium text-slate-600 mb-1">Sucursales Activas</p>
                    <p className="text-3xl font-bold text-green-600">
                      {sucursales.filter(s => s.estado === 'Activa').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Paquetes Totales</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {sucursales.reduce((sum, s) => sum + s.paquetesRecibidos, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">En Mantenimiento</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {sucursales.filter(s => s.estado === 'Mantenimiento').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sucursales Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sucursales.map((sucursal) => (
              <Card key={sucursal.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-800">{sucursal.nombre}</CardTitle>
                      <p className="text-sm text-slate-500 font-mono">{sucursal.codigo}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusBadgeClass(sucursal.estado)}>
                        {sucursal.estado}
                      </Badge>
                      <Badge className={getPlanBadgeClass(sucursal.plan)}>
                        {sucursal.plan}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{sucursal.direccion}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{sucursal.telefono}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{sucursal.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{sucursal.horarioAtencion}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{sucursal.paquetesRecibidos}</p>
                      <p className="text-xs text-slate-500">Paquetes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">${sucursal.costoExtra}</p>
                      <p className="text-xs text-slate-500">Costo Extra</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSucursal(sucursal)}
                      className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(sucursal.id)}
                      className={`flex-1 ${
                        sucursal.estado === 'Activa' 
                          ? 'hover:bg-red-50 hover:text-red-600 hover:border-red-200' 
                          : 'hover:bg-green-50 hover:text-green-600 hover:border-green-200'
                      }`}
                    >
                      {sucursal.estado === 'Activa' ? 'Desactivar' : 'Activar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Detalles de Sucursales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                      <TableHead className="font-semibold text-slate-700">Responsable</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                      <TableHead className="font-semibold text-slate-700">Costo Extra</TableHead>
                      <TableHead className="font-semibold text-slate-700">Última Actividad</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sucursales.map((sucursal) => (
                      <TableRow key={sucursal.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{sucursal.nombre}</div>
                            <div className="text-sm text-slate-500 font-mono">{sucursal.codigo}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">{sucursal.responsable}</TableCell>
                        <TableCell>
                          <Badge className={getPlanBadgeClass(sucursal.plan)}>
                            {sucursal.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(sucursal.estado)}>
                            {sucursal.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-blue-600">{sucursal.paquetesRecibidos}</TableCell>
                        <TableCell className="font-bold text-green-600">${sucursal.costoExtra}</TableCell>
                        <TableCell className="text-slate-600">{sucursal.ultimaActividad}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSucursal(sucursal)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(sucursal.id)}
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSucursal(sucursal.id)}
                              className="hover:bg-red-50 hover:text-red-600"
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
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Sucursal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Sucursal</Label>
                  <Input
                    id="nombre"
                    value={editForm.nombre}
                    onChange={(e) => setEditForm(prev => ({ ...prev, nombre: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input
                    id="responsable"
                    value={editForm.responsable}
                    onChange={(e) => setEditForm(prev => ({ ...prev, responsable: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Textarea
                  id="direccion"
                  value={editForm.direccion}
                  onChange={(e) => setEditForm(prev => ({ ...prev, direccion: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={editForm.telefono}
                    onChange={(e) => setEditForm(prev => ({ ...prev, telefono: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horario">Horario de Atención</Label>
                  <Input
                    id="horario"
                    value={editForm.horarioAtencion}
                    onChange={(e) => setEditForm(prev => ({ ...prev, horarioAtencion: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="costo">Costo Extra ($)</Label>
                  <Input
                    id="costo"
                    type="number"
                    step="0.01"
                    value={editForm.costoExtra}
                    onChange={(e) => setEditForm(prev => ({ ...prev, costoExtra: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}