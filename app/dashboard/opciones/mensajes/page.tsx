"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Mail, Bell, Smartphone, MessageSquare, Zap, Settings } from "lucide-react"

export default function ConfiguracionMensajesPage() {
  const [emailConfig, setEmailConfig] = useState({
    bienvenida: {
      activo: true,
      asunto: "¡Bienvenido a PoboxManager!",
      mensaje: "Gracias por registrarte en nuestro servicio. Tu casillero ha sido asignado exitosamente.",
    },
    paqueteLlegada: {
      activo: true,
      asunto: "Nuevo paquete recibido - Casillero {casillero}",
      mensaje: "Hemos recibido un nuevo paquete para tu casillero {casillero}. Detalles: {detalles}",
    },
    facturaGenerada: {
      activo: true,
      asunto: "Nueva factura generada - {numero}",
      mensaje: "Se ha generado una nueva factura por ${monto}. Fecha de vencimiento: {fecha}",
    },
    recordatorioPago: {
      activo: true,
      asunto: "Recordatorio de pago - Factura {numero}",
      mensaje: "Te recordamos que tienes una factura pendiente de pago por ${monto}.",
    },
  })

  const [smsConfig, setSmsConfig] = useState({
    paqueteLlegada: {
      activo: false,
      mensaje: "Nuevo paquete en tu casillero {casillero}. Visita nuestro portal para más detalles.",
    },
    facturaVencida: {
      activo: false,
      mensaje: "Factura vencida por ${monto}. Paga ahora para evitar suspensión del servicio.",
    },
  })

  const [notificacionesWeb, setNotificacionesWeb] = useState({
    paquetes: true,
    facturas: true,
    promociones: false,
    mantenimiento: true,
  })

  const handleEmailConfigChange = (tipo: string, campo: string, valor: any) => {
    setEmailConfig((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo as keyof typeof prev],
        [campo]: valor,
      },
    }))
  }

  const handleSmsConfigChange = (tipo: string, campo: string, valor: any) => {
    setSmsConfig((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo as keyof typeof prev],
        [campo]: valor,
      },
    }))
  }

  const handleSave = () => {
    console.log("Guardando configuración de mensajes:", {
      email: emailConfig,
      sms: smsConfig,
      web: notificacionesWeb,
    })
    alert("Configuración guardada exitosamente")
  }

  const getConfigName = (key: string) => {
    const names: { [key: string]: string } = {
      bienvenida: "Mensaje de Bienvenida",
      paqueteLlegada: "Paquete Recibido",
      facturaGenerada: "Factura Generada",
      recordatorioPago: "Recordatorio de Pago",
      facturaVencida: "Factura Vencida"
    }
    return names[key] || key
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Configuración de Mensajes
              </h1>
              <p className="text-lg text-gray-600 mt-2">Configura los mensajes automáticos del sistema</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="email" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              SMS
            </TabsTrigger>
            <TabsTrigger value="web" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Web
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Configuración de Emails Automáticos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(emailConfig).map(([key, config]) => (
                  <Card key={key} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          {getConfigName(key)}
                        </CardTitle>
                        <Switch
                          checked={config.activo}
                          onCheckedChange={(checked) => handleEmailConfigChange(key, "activo", checked)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor={`${key}-asunto`}>Asunto</Label>
                        <Input
                          id={`${key}-asunto`}
                          value={config.asunto}
                          onChange={(e) => handleEmailConfigChange(key, "asunto", e.target.value)}
                          disabled={!config.activo}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor={`${key}-mensaje`}>Mensaje</Label>
                        <Textarea
                          id={`${key}-mensaje`}
                          value={config.mensaje}
                          onChange={(e) => handleEmailConfigChange(key, "mensaje", e.target.value)}
                          rows={4}
                          disabled={!config.activo}
                        />
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Variables disponibles:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{"{casillero}"}</Badge>
                          <Badge variant="outline">{"{detalles}"}</Badge>
                          <Badge variant="outline">{"{monto}"}</Badge>
                          <Badge variant="outline">{"{fecha}"}</Badge>
                          <Badge variant="outline">{"{numero}"}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  Configuración de SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(smsConfig).map(([key, config]) => (
                  <Card key={key} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                          {getConfigName(key)}
                        </CardTitle>
                        <Switch
                          checked={config.activo}
                          onCheckedChange={(checked) => handleSmsConfigChange(key, "activo", checked)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor={`sms-${key}-mensaje`}>Mensaje SMS</Label>
                        <Textarea
                          id={`sms-${key}-mensaje`}
                          value={config.mensaje}
                          onChange={(e) => handleSmsConfigChange(key, "mensaje", e.target.value)}
                          rows={3}
                          disabled={!config.activo}
                          maxLength={160}
                        />
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {config.mensaje.length}/160 caracteres
                          </div>
                          <Badge variant={config.mensaje.length > 160 ? "destructive" : "secondary"}>
                            {config.mensaje.length > 160 ? "Excede límite" : "Dentro del límite"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="web" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  Notificaciones Web
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            <Bell className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="notif-paquetes" className="text-base font-semibold">Notificaciones de Paquetes</Label>
                            <p className="text-sm text-gray-500">Notificar cuando lleguen nuevos paquetes</p>
                          </div>
                        </div>
                        <Switch
                          id="notif-paquetes"
                          checked={notificacionesWeb.paquetes}
                          onCheckedChange={(checked) => setNotificacionesWeb((prev) => ({ ...prev, paquetes: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="notif-facturas" className="text-base font-semibold">Notificaciones de Facturas</Label>
                            <p className="text-sm text-gray-500">Notificar sobre facturas y pagos</p>
                          </div>
                        </div>
                        <Switch
                          id="notif-facturas"
                          checked={notificacionesWeb.facturas}
                          onCheckedChange={(checked) => setNotificacionesWeb((prev) => ({ ...prev, facturas: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="notif-promociones" className="text-base font-semibold">Promociones</Label>
                            <p className="text-sm text-gray-500">Notificar sobre ofertas y promociones</p>
                          </div>
                        </div>
                        <Switch
                          id="notif-promociones"
                          checked={notificacionesWeb.promociones}
                          onCheckedChange={(checked) => setNotificacionesWeb((prev) => ({ ...prev, promociones: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="notif-mantenimiento" className="text-base font-semibold">Mantenimiento del Sistema</Label>
                            <p className="text-sm text-gray-500">Notificar sobre mantenimientos programados</p>
                          </div>
                        </div>
                        <Switch
                          id="notif-mantenimiento"
                          checked={notificacionesWeb.mantenimiento}
                          onCheckedChange={(checked) => setNotificacionesWeb((prev) => ({ ...prev, mantenimiento: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}