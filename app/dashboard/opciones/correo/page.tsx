"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Server, TestTube, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default function ConfiguracionCorreoPage() {
  const [smtpConfig, setSmtpConfig] = useState({
    servidor: "smtp.gmail.com",
    puerto: 587,
    usuario: "noreply@poboxmanager.com",
    password: "",
    seguridad: "TLS",
    autenticacion: true,
  })

  const [emailConfig, setEmailConfig] = useState({
    remitente: "PoboxManager",
    emailRemitente: "noreply@poboxmanager.com",
    emailRespuesta: "support@poboxmanager.com",
    firma: "Equipo PoboxManager\nwww.poboxmanager.com",
  })

  const [testEmail, setTestEmail] = useState("")

  const handleSmtpChange = (field: string, value: any) => {
    setSmtpConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEmailConfigChange = (field: string, value: string) => {
    setEmailConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTestEmail = () => {
    if (!testEmail) {
      alert("Por favor ingresa un email para la prueba")
      return
    }
    console.log("Enviando email de prueba a:", testEmail)
    alert(`Email de prueba enviado a ${testEmail}`)
  }

  const handleSave = () => {
    console.log("Guardando configuración SMTP:", smtpConfig)
    console.log("Guardando configuración email:", emailConfig)
    alert("Configuración guardada exitosamente")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Configuración de Correo
              </h1>
              <p className="text-lg text-gray-600 mt-2">Configura el servidor SMTP y opciones de email</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="smtp" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="smtp" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              SMTP
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Pruebas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smtp" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  Configuración SMTP
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="servidor">Servidor SMTP</Label>
                  <Input
                    id="servidor"
                    value={smtpConfig.servidor}
                    onChange={(e) => handleSmtpChange("servidor", e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="puerto">Puerto</Label>
                  <Input
                    id="puerto"
                    type="number"
                    value={smtpConfig.puerto}
                    onChange={(e) => handleSmtpChange("puerto", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="usuario">Usuario</Label>
                  <Input
                    id="usuario"
                    type="email"
                    value={smtpConfig.usuario}
                    onChange={(e) => handleSmtpChange("usuario", e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={smtpConfig.password}
                    onChange={(e) => handleSmtpChange("password", e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="seguridad">Seguridad</Label>
                  <Select value={smtpConfig.seguridad} onValueChange={(value) => handleSmtpChange("seguridad", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TLS">TLS</SelectItem>
                      <SelectItem value="SSL">SSL</SelectItem>
                      <SelectItem value="NONE">Sin cifrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch
                    id="autenticacion"
                    checked={smtpConfig.autenticacion}
                    onCheckedChange={(checked) => handleSmtpChange("autenticacion", checked)}
                  />
                  <Label htmlFor="autenticacion">Requiere autenticación</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Configuración de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="remitente">Nombre del Remitente</Label>
                  <Input
                    id="remitente"
                    value={emailConfig.remitente}
                    onChange={(e) => handleEmailConfigChange("remitente", e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email-remitente">Email del Remitente</Label>
                  <Input
                    id="email-remitente"
                    type="email"
                    value={emailConfig.emailRemitente}
                    onChange={(e) => handleEmailConfigChange("emailRemitente", e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email-respuesta">Email de Respuesta</Label>
                  <Input
                    id="email-respuesta"
                    type="email"
                    value={emailConfig.emailRespuesta}
                    onChange={(e) => handleEmailConfigChange("emailRespuesta", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <Label htmlFor="firma">Firma del Email</Label>
                  <textarea
                    id="firma"
                    value={emailConfig.firma}
                    onChange={(e) => handleEmailConfigChange("firma", e.target.value)}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none hover:border-gray-300 resize-none"
                    rows={4}
                    placeholder="Firma que aparecerá al final de todos los emails..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <TestTube className="w-5 h-5 text-white" />
                  </div>
                  Prueba de Configuración
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="test-email">Email de Prueba</Label>
                    <Input
                      id="test-email"
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="test@example.com"
                    />
                  </div>
                  <Button onClick={handleTestEmail} className="w-full">
                    <TestTube className="w-4 h-4 mr-2" />
                    Enviar Email de Prueba
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-bold text-lg mb-4 text-gray-900">Estado de la Configuración</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Servidor SMTP: Configurado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Autenticación: Habilitada</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-500" />
                      <span className="text-gray-700">Última prueba: No realizada</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}