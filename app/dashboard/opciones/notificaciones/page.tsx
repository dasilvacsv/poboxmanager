"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bell, Mail, Settings, Send, Users, Package, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      tipo: "Paquete",
      titulo: "Paquete listo para recoger",
      mensaje: "Su paquete TRK123456 está listo para recoger en Miami Central",
      destinatario: "juan@email.com",
      estado: "Enviado",
      fecha: "2024-01-15 10:30",
      canal: "Email",
    },
    {
      id: 2,
      tipo: "Factura",
      titulo: "Factura vencida",
      mensaje: "Su factura FAC-001 está vencida. Por favor proceda al pago.",
      destinatario: "maria@empresa.com",
      estado: "Pendiente",
      fecha: "2024-01-15 09:15",
      canal: "SMS",
    },
    {
      id: 3,
      tipo: "Sistema",
      titulo: "Mantenimiento programado",
      mensaje: "El sistema estará en mantenimiento el domingo de 2-4 AM",
      destinatario: "Todos los usuarios",
      estado: "Programado",
      fecha: "2024-01-20 02:00",
      canal: "Push",
    },
  ])

  const [settings, setSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    autoNotifyPackages: true,
    autoNotifyInvoices: true,
    autoNotifySystem: false,
  })

  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [newNotification, setNewNotification] = useState({
    tipo: "",
    titulo: "",
    mensaje: "",
    destinatario: "",
    canal: "",
    programada: false,
    fechaProgramada: "",
  })

  const handleSendNotification = () => {
    if (!newNotification.titulo || !newNotification.mensaje || !newNotification.destinatario) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const notification = {
      id: Date.now(),
      ...newNotification,
      estado: newNotification.programada ? "Programado" : "Enviado",
      fecha: newNotification.programada
        ? newNotification.fechaProgramada
        : new Date().toISOString().slice(0, 16).replace("T", " "),
    }

    setNotifications((prev) => [notification, ...prev])
    setIsNewNotificationOpen(false)
    setNewNotification({
      tipo: "",
      titulo: "",
      mensaje: "",
      destinatario: "",
      canal: "",
      programada: false,
      fechaProgramada: "",
    })

    toast({
      title: "Notificación enviada",
      description: newNotification.programada
        ? "Notificación programada exitosamente"
        : "Notificación enviada exitosamente",
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Las configuraciones de notificación han sido actualizadas",
    })
    setIsSettingsOpen(false)
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Enviado":
        return "bg-green-500"
      case "Pendiente":
        return "bg-yellow-500"
      case "Programado":
        return "bg-blue-500"
      case "Error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "Paquete":
        return <Package className="w-4 h-4" />
      case "Factura":
        return <AlertCircle className="w-4 h-4" />
      case "Sistema":
        return <Settings className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Centro de Notificaciones</h1>
          <p className="text-slate-600 mt-2">Gestiona y envía notificaciones a tus clientes</p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuración
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Configuración de Notificaciones</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Canales de Notificación</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones por Email</Label>
                        <p className="text-sm text-gray-600">Enviar notificaciones por correo electrónico</p>
                      </div>
                      <Switch
                        checked={settings.emailEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones por SMS</Label>
                        <p className="text-sm text-gray-600">Enviar notificaciones por mensaje de texto</p>
                      </div>
                      <Switch
                        checked={settings.smsEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones Push</Label>
                        <p className="text-sm text-gray-600">Enviar notificaciones push a la aplicación</p>
                      </div>
                      <Switch
                        checked={settings.pushEnabled}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushEnabled: checked }))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Notificaciones Automáticas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificar llegada de paquetes</Label>
                        <p className="text-sm text-gray-600">Notificar automáticamente cuando lleguen paquetes</p>
                      </div>
                      <Switch
                        checked={settings.autoNotifyPackages}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoNotifyPackages: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificar facturas vencidas</Label>
                        <p className="text-sm text-gray-600">Notificar automáticamente facturas próximas a vencer</p>
                      </div>
                      <Switch
                        checked={settings.autoNotifyInvoices}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoNotifyInvoices: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones del sistema</Label>
                        <p className="text-sm text-gray-600">Notificar mantenimientos y actualizaciones</p>
                      </div>
                      <Switch
                        checked={settings.autoNotifySystem}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoNotifySystem: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveSettings}>Guardar Configuración</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewNotificationOpen} onOpenChange={setIsNewNotificationOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Nueva Notificación
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Enviar Nueva Notificación</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Notificación</Label>
                    <Select
                      value={newNotification.tipo}
                      onValueChange={(value) => setNewNotification((prev) => ({ ...prev, tipo: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paquete">Paquete</SelectItem>
                        <SelectItem value="Factura">Factura</SelectItem>
                        <SelectItem value="Sistema">Sistema</SelectItem>
                        <SelectItem value="Promoción">Promoción</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="canal">Canal de Envío</Label>
                    <Select
                      value={newNotification.canal}
                      onValueChange={(value) => setNewNotification((prev) => ({ ...prev, canal: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="SMS">SMS</SelectItem>
                        <SelectItem value="Push">Push</SelectItem>
                        <SelectItem value="Todos">Todos los canales</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={newNotification.titulo}
                    onChange={(e) => setNewNotification((prev) => ({ ...prev, titulo: e.target.value }))}
                    placeholder="Título de la notificación"
                  />
                </div>

                <div>
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    value={newNotification.mensaje}
                    onChange={(e) => setNewNotification((prev) => ({ ...prev, mensaje: e.target.value }))}
                    placeholder="Contenido del mensaje"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="destinatario">Destinatario</Label>
                  <Select
                    value={newNotification.destinatario}
                    onValueChange={(value) => setNewNotification((prev) => ({ ...prev, destinatario: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar destinatario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan@email.com">Juan Pérez - juan@email.com</SelectItem>
                      <SelectItem value="maria@empresa.com">María García - maria@empresa.com</SelectItem>
                      <SelectItem value="carlos@logistica.com">Carlos López - carlos@logistica.com</SelectItem>
                      <SelectItem value="Todos los usuarios">Todos los usuarios</SelectItem>
                      <SelectItem value="Clientes activos">Solo clientes activos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newNotification.programada}
                    onCheckedChange={(checked) => setNewNotification((prev) => ({ ...prev, programada: checked }))}
                  />
                  <Label>Programar envío</Label>
                </div>

                {newNotification.programada && (
                  <div>
                    <Label htmlFor="fechaProgramada">Fecha y Hora de Envío</Label>
                    <Input
                      id="fechaProgramada"
                      type="datetime-local"
                      value={newNotification.fechaProgramada}
                      onChange={(e) => setNewNotification((prev) => ({ ...prev, fechaProgramada: e.target.value }))}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewNotificationOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSendNotification}>
                  {newNotification.programada ? "Programar" : "Enviar"} Notificación
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Enviadas</p>
                <p className="text-3xl font-bold text-blue-600">
                  {notifications.filter((n) => n.estado === "Enviado").length}
                </p>
              </div>
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pendientes</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {notifications.filter((n) => n.estado === "Pendiente").length}
                </p>
              </div>
              <Bell className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Programadas</p>
                <p className="text-3xl font-bold text-purple-600">
                  {notifications.filter((n) => n.estado === "Programado").length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Tasa de Entrega</p>
                <p className="text-3xl font-bold text-green-600">98.5%</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg">
                      {getTypeIcon(notification.tipo)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-slate-800">{notification.titulo}</h3>
                        <Badge className={`${getStatusColor(notification.estado)} text-white`}>
                          {notification.estado}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-2">{notification.mensaje}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Para: {notification.destinatario}</span>
                        <span>Canal: {notification.canal}</span>
                        <span>{notification.fecha}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {notification.estado === "Pendiente" && (
                      <Button size="sm" variant="outline">
                        Reenviar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
