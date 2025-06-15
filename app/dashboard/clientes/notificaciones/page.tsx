"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Send, Eye, Bell, Mail, Smartphone, Filter, Calendar, Users } from "lucide-react"

const mockNotificaciones = [
  {
    id: 1,
    titulo: "Nuevo paquete recibido",
    mensaje: "Su paquete con tracking TRK123456 ha llegado a nuestras instalaciones y está listo para ser retirado.",
    tipo: "Email",
    destinatarios: ["roberto@email.com", "maria@email.com"],
    estado: "Enviado",
    fechaEnvio: "2024-01-16 10:30",
    categoria: "Paquetes",
    alcance: 2,
  },
  {
    id: 2,
    titulo: "Promoción especial - 20% descuento",
    mensaje: "Aprovecha nuestra promoción especial del 20% en todos los envíos este mes. Válido hasta el 31 de enero.",
    tipo: "SMS",
    destinatarios: ["+1-305-123-4567", "+1-305-234-5678", "+1-305-345-6789"],
    estado: "Programado",
    fechaEnvio: "2024-01-17 09:00",
    categoria: "Promociones",
    alcance: 3,
  },
  {
    id: 3,
    titulo: "Mantenimiento programado del sistema",
    mensaje: "El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM. Durante este tiempo no habrá acceso.",
    tipo: "Push",
    destinatarios: ["Todos los usuarios"],
    estado: "Borrador",
    fechaEnvio: "2024-01-18 08:00",
    categoria: "Sistema",
    alcance: 1250,
  },
  {
    id: 4,
    titulo: "Recordatorio de factura pendiente",
    mensaje: "Le recordamos que tiene una factura pendiente de pago por $125.50. Favor procesar el pago a la brevedad.",
    tipo: "Email",
    destinatarios: ["cliente@email.com"],
    estado: "Enviado",
    fechaEnvio: "2024-01-15 14:00",
    categoria: "Facturas",
    alcance: 1,
  },
]

export default function NotificacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [notificaciones, setNotificaciones] = useState(mockNotificaciones)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    titulo: "",
    mensaje: "",
    tipo: "Email",
    categoria: "General",
    destinatarios: "",
    fechaEnvio: "",
  })

  const filteredNotificaciones = notificaciones.filter(
    (notif) =>
      notif.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando notificación:", formData)
    setIsDialogOpen(false)
    setFormData({
      titulo: "",
      mensaje: "",
      tipo: "Email",
      categoria: "General",
      destinatarios: "",
      fechaEnvio: "",
    })
  }

  const openViewDialog = (notificacion: any) => {
    setSelectedNotification(notificacion)
    setIsViewDialogOpen(true)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Enviado":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Enviado</Badge>
      case "Programado":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Programado</Badge>
      case "Borrador":
        return <Badge variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200">Borrador</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Email":
        return <Mail className="w-4 h-4" />
      case "SMS":
        return <Smartphone className="w-4 h-4" />
      case "Push":
        return <Bell className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Paquetes":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200"
      case "Promociones":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200"
      case "Sistema":
        return "bg-orange-100 text-orange-700 hover:bg-orange-200"
      case "Facturas":
        return "bg-green-100 text-green-700 hover:bg-green-200"
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Notificaciones</h1>
          <p className="text-slate-600">Gestiona las notificaciones enviadas a los clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Notificación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-slate-800">Nueva Notificación</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo" className="text-sm font-medium text-slate-700">Título</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => handleInputChange("titulo", e.target.value)}
                    placeholder="Título de la notificación"
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria" className="text-sm font-medium text-slate-700">Categoría</Label>
                  <Select value={formData.categoria} onValueChange={(value) => handleInputChange("categoria", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Paquetes">Paquetes</SelectItem>
                      <SelectItem value="Promociones">Promociones</SelectItem>
                      <SelectItem value="Sistema">Sistema</SelectItem>
                      <SelectItem value="Facturas">Facturas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje" className="text-sm font-medium text-slate-700">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={(e) => handleInputChange("mensaje", e.target.value)}
                  rows={4}
                  placeholder="Contenido de la notificación..."
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo" className="text-sm font-medium text-slate-700">Tipo de Notificación</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="Push">Push Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaEnvio" className="text-sm font-medium text-slate-700">Fecha y Hora de Envío</Label>
                  <Input
                    id="fechaEnvio"
                    type="datetime-local"
                    value={formData.fechaEnvio}
                    onChange={(e) => handleInputChange("fechaEnvio", e.target.value)}
                    className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinatarios" className="text-sm font-medium text-slate-700">Destinatarios</Label>
                <Textarea
                  id="destinatarios"
                  value={formData.destinatarios}
                  onChange={(e) => handleInputChange("destinatarios", e.target.value)}
                  rows={3}
                  placeholder="Lista de destinatarios (emails, teléfonos o 'Todos los usuarios')"
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="outline" onClick={handleSave} className="border-slate-300">
                Guardar Borrador
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Programar Envío
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Enviadas</p>
                <p className="text-3xl font-bold text-green-900">{notificaciones.filter((n) => n.estado === "Enviado").length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Programadas</p>
                <p className="text-3xl font-bold text-blue-900">{notificaciones.filter((n) => n.estado === "Programado").length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100/50 border-l-4 border-l-slate-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800 mb-1">Borradores</p>
                <p className="text-3xl font-bold text-slate-900">{notificaciones.filter((n) => n.estado === "Borrador").length}</p>
              </div>
              <div className="w-12 h-12 bg-slate-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Total</p>
                <p className="text-3xl font-bold text-purple-900">{notificaciones.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800">Lista de Notificaciones</CardTitle>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar notificaciones..."
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
                <TableHead className="font-semibold text-slate-700">Notificación</TableHead>
                <TableHead className="font-semibold text-slate-700">Tipo</TableHead>
                <TableHead className="font-semibold text-slate-700">Categoría</TableHead>
                <TableHead className="font-semibold text-slate-700">Alcance</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Fecha Envío</TableHead>
                <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotificaciones.map((notificacion) => (
                <TableRow key={notificacion.id} className="hover:bg-slate-50 border-slate-100">
                  <TableCell>
                    <div>
                      <div className="font-semibold text-slate-800 mb-1">{notificacion.titulo}</div>
                      <div className="text-sm text-slate-500 truncate max-w-xs">{notificacion.mensaje}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        {getTipoIcon(notificacion.tipo)}
                      </div>
                      <span className="font-medium text-slate-700">{notificacion.tipo}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoriaColor(notificacion.categoria)}>
                      {notificacion.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold text-slate-700">{notificacion.alcance}</span>
                      <span className="text-xs text-slate-500">usuarios</span>
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(notificacion.estado)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {notificacion.fechaEnvio}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => openViewDialog(notificacion)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
                        <Send className="w-4 h-4" />
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
              Detalles de la Notificación
            </DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{selectedNotification.titulo}</h3>
                <div className="flex items-center space-x-4 mb-3">
                  <Badge variant="outline" className={getCategoriaColor(selectedNotification.categoria)}>
                    {selectedNotification.categoria}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {getTipoIcon(selectedNotification.tipo)}
                    <span className="text-sm text-slate-600">{selectedNotification.tipo}</span>
                  </div>
                  {getEstadoBadge(selectedNotification.estado)}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-600">Mensaje</label>
                <p className="text-slate-800 bg-white p-4 rounded-lg border border-slate-200 mt-2">
                  {selectedNotification.mensaje}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-600">Fecha de Envío</label>
                  <p className="text-slate-800 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    {selectedNotification.fechaEnvio}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Alcance</label>
                  <p className="text-slate-800 flex items-center mt-1">
                    <Users className="w-4 h-4 mr-2 text-slate-500" />
                    {selectedNotification.alcance} usuarios
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-600">Destinatarios</label>
                <div className="bg-slate-50 p-3 rounded-lg mt-2">
                  {Array.isArray(selectedNotification.destinatarios) ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedNotification.destinatarios.map((dest: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-700">{selectedNotification.destinatarios}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}