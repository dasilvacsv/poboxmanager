"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Database, Mail, Shield, Globe } from "lucide-react"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function SystemSettings() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [systemSettings, setSystemSettings] = useState({
    // Configuración General
    nombreSistema: "PoboxManager",
    descripcionSistema: "Sistema de gestión profesional de paquetes y logística",
    urlSistema: "https://poboxmanager.com",
    logoUrl: "/logo.png",
    
    // Configuración de Email
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@poboxmanager.com",
    smtpPassword: "••••••••",
    emailFrom: "PoboxManager <noreply@poboxmanager.com>",
    
    // Configuración de Seguridad
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    
    // Configuración de Base de Datos
    dbBackupEnabled: true,
    dbBackupFrequency: "daily",
    dbRetentionDays: 30,
    
    // Configuración de Notificaciones
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: false,
    pushNotificationsEnabled: true,
    
    // Configuración Regional
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    language: "es",
    
    // Configuración de API
    apiRateLimit: 1000,
    apiKeyExpiration: 365,
    webhooksEnabled: true,
    
    // Configuración de Mantenimiento
    maintenanceMode: false,
    maintenanceMessage: "El sistema está en mantenimiento. Volveremos pronto."
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

  const handleSaveSettings = () => {
    toast({
      title: "Configuración Guardada",
      description: "La configuración del sistema ha sido actualizada exitosamente.",
    })
  }

  const handleTestEmail = () => {
    toast({
      title: "Email de Prueba Enviado",
      description: "Se ha enviado un email de prueba a la dirección configurada.",
    })
  }

  const handleBackupNow = () => {
    toast({
      title: "Backup Iniciado",
      description: "El backup de la base de datos ha sido iniciado.",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Configuración del sistema</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Configuración del Sistema
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Configuración global y parámetros del sistema
              </p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-gradient-to-r from-green-600 to-emerald-600">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuración General */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Configuración General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nombreSistema">Nombre del Sistema</Label>
                  <Input
                    id="nombreSistema"
                    value={systemSettings.nombreSistema}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, nombreSistema: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="descripcionSistema">Descripción</Label>
                  <Textarea
                    id="descripcionSistema"
                    value={systemSettings.descripcionSistema}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, descripcionSistema: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="urlSistema">URL del Sistema</Label>
                  <Input
                    id="urlSistema"
                    value={systemSettings.urlSistema}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, urlSistema: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Zona Horaria</Label>
                    <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Moneda</Label>
                    <Select value={systemSettings.currency} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, currency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración de Email */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Configuración de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">Servidor SMTP</Label>
                    <Input
                      id="smtpHost"
                      value={systemSettings.smtpHost}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">Puerto SMTP</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={systemSettings.smtpPort}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="smtpUser">Usuario SMTP</Label>
                  <Input
                    id="smtpUser"
                    value={systemSettings.smtpUser}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="emailFrom">Email Remitente</Label>
                  <Input
                    id="emailFrom"
                    value={systemSettings.emailFrom}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, emailFrom: e.target.value }))}
                  />
                </div>
                <Button onClick={handleTestEmail} variant="outline" className="w-full">
                  Enviar Email de Prueba
                </Button>
              </CardContent>
            </Card>

            {/* Configuración de Seguridad */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Configuración de Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Timeout de Sesión (min)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">Máx. Intentos de Login</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={systemSettings.maxLoginAttempts}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">Longitud Mínima de Contraseña</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={systemSettings.passwordMinLength}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requireTwoFactor"
                    checked={systemSettings.requireTwoFactor}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, requireTwoFactor: checked }))}
                  />
                  <Label htmlFor="requireTwoFactor">Requerir Autenticación de Dos Factores</Label>
                </div>
              </CardContent>
            </Card>

            {/* Configuración de Base de Datos */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Configuración de Base de Datos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dbBackupEnabled"
                    checked={systemSettings.dbBackupEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, dbBackupEnabled: checked }))}
                  />
                  <Label htmlFor="dbBackupEnabled">Habilitar Backups Automáticos</Label>
                </div>
                <div>
                  <Label htmlFor="dbBackupFrequency">Frecuencia de Backup</Label>
                  <Select value={systemSettings.dbBackupFrequency} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, dbBackupFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Cada Hora</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dbRetentionDays">Días de Retención</Label>
                  <Input
                    id="dbRetentionDays"
                    type="number"
                    value={systemSettings.dbRetentionDays}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, dbRetentionDays: parseInt(e.target.value) }))}
                  />
                </div>
                <Button onClick={handleBackupNow} variant="outline" className="w-full">
                  Realizar Backup Ahora
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Configuración de Notificaciones */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotificationsEnabled"
                    checked={systemSettings.emailNotificationsEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, emailNotificationsEnabled: checked }))}
                  />
                  <Label htmlFor="emailNotificationsEnabled">Notificaciones por Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="smsNotificationsEnabled"
                    checked={systemSettings.smsNotificationsEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, smsNotificationsEnabled: checked }))}
                  />
                  <Label htmlFor="smsNotificationsEnabled">Notificaciones por SMS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pushNotificationsEnabled"
                    checked={systemSettings.pushNotificationsEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, pushNotificationsEnabled: checked }))}
                  />
                  <Label htmlFor="pushNotificationsEnabled">Notificaciones Push</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modo de Mantenimiento */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Modo de Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
                <Label htmlFor="maintenanceMode">Activar Modo de Mantenimiento</Label>
              </div>
              <div>
                <Label htmlFor="maintenanceMessage">Mensaje de Mantenimiento</Label>
                <Textarea
                  id="maintenanceMessage"
                  value={systemSettings.maintenanceMessage}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}