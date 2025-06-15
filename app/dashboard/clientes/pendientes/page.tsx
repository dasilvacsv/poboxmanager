"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Check, X, Eye, Clock, AlertCircle, User, FileText, Phone, MapPin, Filter, Calendar } from "lucide-react"

const mockPendientes = [
  {
    id: 1,
    nombre: "Pedro Jiménez",
    email: "pedro@email.com",
    telefono: "+1-305-789-0123",
    direccion: "456 SW 8th St, Miami, FL 33130",
    fechaSolicitud: "2024-01-16",
    tipo: "Individual",
    documentos: ["ID", "Comprobante de dirección"],
    estado: "Pendiente",
    notas: "",
    motivoSolicitud: "Necesito un casillero para recibir compras internacionales",
  },
  {
    id: 2,
    nombre: "Startup Tech LLC",
    email: "info@startuptech.com",
    telefono: "+1-305-890-1234",
    direccion: "789 Brickell Ave, Miami, FL 33131",
    fechaSolicitud: "2024-01-15",
    tipo: "Empresa",
    documentos: ["Registro mercantil", "ID representante", "Estados financieros"],
    estado: "En Revisión",
    notas: "Documentos bajo verificación por el equipo legal",
    motivoSolicitud: "Empresa de tecnología que necesita múltiples casilleros",
  },
  {
    id: 3,
    nombre: "Carmen Vega",
    email: "carmen@email.com",
    telefono: "+1-305-901-2345",
    direccion: "321 Ocean Dr, Miami Beach, FL 33139",
    fechaSolicitud: "2024-01-14",
    tipo: "Individual",
    documentos: ["ID"],
    estado: "Documentos Incompletos",
    notas: "Falta comprobante de dirección actualizado",
    motivoSolicitud: "Cliente frecuente de compras online",
  },
]

export default function ClientesPendientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pendientes, setPendientes] = useState(mockPendientes)
  const [selectedCliente, setSelectedCliente] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [accionNotas, setAccionNotas] = useState("")
  const [accionTipo, setAccionTipo] = useState("")

  const filteredPendientes = pendientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAprobar = (id: number) => {
    setPendientes((prev) => prev.filter((p) => p.id !== id))
    alert("Cliente aprobado exitosamente")
  }

  const handleRechazar = (id: number) => {
    if (!accionNotas.trim()) {
      alert("Por favor ingrese una razón para el rechazo")
      return
    }
    setPendientes((prev) => prev.filter((p) => p.id !== id))
    setIsDialogOpen(false)
    setAccionNotas("")
    alert("Cliente rechazado")
  }

  const openActionDialog = (cliente: any, accion: string) => {
    setSelectedCliente({ ...cliente, accion })
    setAccionTipo(accion)
    setIsDialogOpen(true)
  }

  const openViewDialog = (cliente: any) => {
    setSelectedCliente(cliente)
    setIsViewDialogOpen(true)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        )
      case "En Revisión":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Eye className="w-3 h-3 mr-1" />
            En Revisión
          </Badge>
        )
      case "Documentos Incompletos":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Incompletos
          </Badge>
        )
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Clientes Pendientes</h1>
          <p className="text-slate-600">Gestiona las solicitudes de registro pendientes de aprobación</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Total Pendientes</p>
                <p className="text-3xl font-bold text-yellow-900">{pendientes.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">En Revisión</p>
                <p className="text-3xl font-bold text-blue-900">{pendientes.filter((p) => p.estado === "En Revisión").length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50 border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Incompletos</p>
                <p className="text-3xl font-bold text-red-900">
                  {pendientes.filter((p) => p.estado === "Documentos Incompletos").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Individuales</p>
                <p className="text-3xl font-bold text-purple-900">{pendientes.filter((p) => p.tipo === "Individual").length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800">Lista de Solicitudes Pendientes</CardTitle>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar solicitudes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="font-semibold text-slate-700">Solicitante</TableHead>
                <TableHead className="font-semibold text-slate-700">Tipo</TableHead>
                <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                <TableHead className="font-semibold text-slate-700">Documentos</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Fecha Solicitud</TableHead>
                <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPendientes.map((cliente) => (
                <TableRow key={cliente.id} className="hover:bg-slate-50 border-slate-100">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600">
                        <AvatarFallback className="text-white font-semibold text-sm">
                          {getInitials(cliente.nombre)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-800">{cliente.nombre}</div>
                        <div className="text-sm text-slate-500">{cliente.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      cliente.tipo === "Empresa" 
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100" 
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }>
                      {cliente.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {cliente.telefono}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {cliente.direccion.split(',')[0]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cliente.documentos.map((doc) => (
                        <Badge key={doc} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(cliente.estado)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {cliente.fechaSolicitud}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => openViewDialog(cliente)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-green-50 hover:text-green-600"
                        onClick={() => handleAprobar(cliente.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600"
                        onClick={() => openActionDialog(cliente, "rechazar")}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Detalles de la Solicitud
            </DialogTitle>
          </DialogHeader>
          {selectedCliente && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                <Avatar className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600">
                  <AvatarFallback className="text-white font-bold text-lg">
                    {getInitials(selectedCliente.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedCliente.nombre}</h3>
                  <p className="text-slate-600">{selectedCliente.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{selectedCliente.tipo}</Badge>
                    {getEstadoBadge(selectedCliente.estado)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Teléfono</label>
                    <p className="text-slate-800">{selectedCliente.telefono}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Dirección</label>
                    <p className="text-slate-800">{selectedCliente.direccion}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Fecha de Solicitud</label>
                    <p className="text-slate-800">{selectedCliente.fechaSolicitud}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Documentos Presentados</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedCliente.documentos.map((doc: string) => (
                        <Badge key={doc} variant="outline" className="bg-slate-50 text-slate-700">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Motivo de la Solicitud</label>
                    <p className="text-slate-800 text-sm bg-slate-50 p-3 rounded-lg">{selectedCliente.motivoSolicitud}</p>
                  </div>
                </div>
              </div>
              
              {selectedCliente.notas && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Notas Adicionales</label>
                  <p className="text-slate-800 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">{selectedCliente.notas}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {accionTipo === "rechazar" ? "Rechazar Solicitud" : "Acción sobre Solicitud"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <p><strong>Cliente:</strong> {selectedCliente?.nombre}</p>
              <p><strong>Email:</strong> {selectedCliente?.email}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notas" className="text-sm font-medium text-slate-700">
                Razón del Rechazo *
              </Label>
              <Textarea
                id="notas"
                value={accionNotas}
                onChange={(e) => setAccionNotas(e.target.value)}
                placeholder="Ingrese la razón detallada para el rechazo de esta solicitud..."
                rows={4}
                className="border-slate-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleRechazar(selectedCliente?.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar Rechazo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}