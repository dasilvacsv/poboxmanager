"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/lib/utils"
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Phone, 
  Package, 
  CreditCard, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Save,
  Volume2,
  Clock,
  Calendar,
  User,
  Building,
  Smartphone
} from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"

const mockNotificationSettings = {
  email: {
    enabled: true,
    address: "contact@miamilogistics.com",
    frequency: "immediate",
    categories: {
      packages: true,
      billing: true,
      system: false,
      marketing: false,
      security: true
    }
  },
  sms: {
    enabled: false,
    number: "+1 (305) 555-0123",
    frequency: "important",
    categories: {
      packages: true,
      billing: false,
      system: false,
      marketing: false,
      security: true
    }
  },
  push: {
    enabled: true,
    frequency: "immediate",
    categories: {
      packages: true,
      billing: true,
      system: true,
      marketing: false,
      security: true
    }
  },
  preferences: {
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00"
    },
    workDays: {
      enabled: false,
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    language: "es",
    timezone: "America/New_York"
  }
}

const mockRecentNotifications = [
  {
    id: 1,
    type: "package",
    title: "Paquete TRK001 entregado",
    message: "Tu paquete ha sido entregado exitosamente en Miami Central",
    timestamp: "2024-01-15 14:30",
    read: false,
    priority: "normal"
  },
  {
    id: 2,
    type: "billing",
    title: "Factura FAC-002 pendiente",
    message: "Tienes una factura pendiente por $89.75",
    timestamp: "2024-01-14 09:15",
    read: true,
    priority: "high"
  },
  {
    id: 3,
    type: "system",
    title: "Mantenimiento programado",
    message: "El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM",
    timestamp: "2024-01-13 16:45",
    read: true,
    priority: "low"
  },
  {
    id: 4,
    type: "security",
    title: "Nuevo inicio de sesión",
    message: "Se detectó un nuevo inicio de sesión desde Miami, FL",
    timestamp: "2024-01-12 11:20",
    read: false,
    priority: "high"
  }
]

export default function ClientNotifications() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [settings, setSettings] = useState(mockNotificationSettings)
  const [notifications, setNotifications] = useState(mockRecentNotifications)
  const [activeTab, setActiveTab] = useState('settings')

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

  const handleSettingChange = (channel: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  const handleCategoryChange = (channel: string, category: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel as keyof typeof prev],
        categories: {
          ...prev[channel as keyof typeof prev].categories,
          [category]: value
        }
      }
    }))
  }

  const handlePreferenceChange = (preference: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias de notificaciones han sido actualizadas.",
    })
  }

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    toast({
      title: "Notificaciones marcadas",
      description: "Todas las notificaciones han sido marcadas como leídas.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'package':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'billing':
        return <CreditCard className="w-5 h-5 text-green-600" />
      case 'system':
        return <Settings className="w-5 h-5 text-purple-600" />
      case 'security':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500 to-red-600'
      case 'normal':
        return 'from-blue-500 to-blue-600'
      case 'low':
        return 'from-gray-500 to-gray-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando notificaciones...</h3>
            <p className="text-slate-500">Preparando tu configuración</p>
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
                Notificaciones
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Gestiona cómo y cuándo recibir notificaciones
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                {notifications.filter(n => !n.read).length} Sin leer
              </Badge>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200/50 px-4 sm:px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuración
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Historial
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {activeTab === 'settings' ? (
            <>
              {/* Notification Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email Notifications */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-enabled">Activar Email</Label>
                      <Switch
                        id="email-enabled"
                        checked={settings.email.enabled}
                        onCheckedChange={(checked) => handleSettingChange('email', 'enabled', checked)}
                      />
                    </div>
                    
                    {settings.email.enabled && (
                      <>
                        <div>
                          <Label htmlFor="email-address">Dirección de Email</Label>
                          <Input
                            id="email-address"
                            type="email"
                            value={settings.email.address}
                            onChange={(e) => handleSettingChange('email', 'address', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email-frequency">Frecuencia</Label>
                          <Select 
                            value={settings.email.frequency}
                            onValueChange={(value) => handleSettingChange('email', 'frequency', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Inmediato</SelectItem>
                              <SelectItem value="hourly">Cada hora</SelectItem>
                              <SelectItem value="daily">Diario</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-3 block">Categorías</Label>
                          <div className="space-y-3">
                            {Object.entries(settings.email.categories).map(([category, enabled]) => (
                              <div key={category} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{category === 'packages' ? 'Paquetes' : category === 'billing' ? 'Facturación' : category === 'system' ? 'Sistema' : category === 'marketing' ? 'Marketing' : 'Seguridad'}</span>
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={(checked) => handleCategoryChange('email', category, checked)}
                                  size="sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* SMS Notifications */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-green-600" />
                      </div>
                      SMS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-enabled">Activar SMS</Label>
                      <Switch
                        id="sms-enabled"
                        checked={settings.sms.enabled}
                        onCheckedChange={(checked) => handleSettingChange('sms', 'enabled', checked)}
                      />
                    </div>
                    
                    {settings.sms.enabled && (
                      <>
                        <div>
                          <Label htmlFor="sms-number">Número de Teléfono</Label>
                          <Input
                            id="sms-number"
                            type="tel"
                            value={settings.sms.number}
                            onChange={(e) => handleSettingChange('sms', 'number', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="sms-frequency">Frecuencia</Label>
                          <Select 
                            value={settings.sms.frequency}
                            onValueChange={(value) => handleSettingChange('sms', 'frequency', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Inmediato</SelectItem>
                              <SelectItem value="important">Solo importantes</SelectItem>
                              <SelectItem value="daily">Resumen diario</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-3 block">Categorías</Label>
                          <div className="space-y-3">
                            {Object.entries(settings.sms.categories).map(([category, enabled]) => (
                              <div key={category} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{category === 'packages' ? 'Paquetes' : category === 'billing' ? 'Facturación' : category === 'system' ? 'Sistema' : category === 'marketing' ? 'Marketing' : 'Seguridad'}</span>
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={(checked) => handleCategoryChange('sms', category, checked)}
                                  size="sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Push Notifications */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Bell className="w-4 h-4 text-purple-600" />
                      </div>
                      Push
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-enabled">Activar Push</Label>
                      <Switch
                        id="push-enabled"
                        checked={settings.push.enabled}
                        onCheckedChange={(checked) => handleSettingChange('push', 'enabled', checked)}
                      />
                    </div>
                    
                    {settings.push.enabled && (
                      <>
                        <div>
                          <Label htmlFor="push-frequency">Frecuencia</Label>
                          <Select 
                            value={settings.push.frequency}
                            onValueChange={(value) => handleSettingChange('push', 'frequency', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Inmediato</SelectItem>
                              <SelectItem value="hourly">Cada hora</SelectItem>
                              <SelectItem value="daily">Diario</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-slate-700 mb-3 block">Categorías</Label>
                          <div className="space-y-3">
                            {Object.entries(settings.push.categories).map(([category, enabled]) => (
                              <div key={category} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{category === 'packages' ? 'Paquetes' : category === 'billing' ? 'Facturación' : category === 'system' ? 'Sistema' : category === 'marketing' ? 'Marketing' : 'Seguridad'}</span>
                                <Switch
                                  checked={enabled}
                                  onCheckedChange={(checked) => handleCategoryChange('push', category, checked)}
                                  size="sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preferences */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-orange-600" />
                    Preferencias Avanzadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quiet Hours */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-800">Horario Silencioso</h4>
                        <p className="text-sm text-slate-500">No recibir notificaciones durante estas horas</p>
                      </div>
                      <Switch
                        checked={settings.preferences.quietHours.enabled}
                        onCheckedChange={(checked) => handlePreferenceChange('quietHours', { ...settings.preferences.quietHours, enabled: checked })}
                      />
                    </div>
                    
                    {settings.preferences.quietHours.enabled && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-6">
                        <div>
                          <Label htmlFor="quiet-start">Hora de inicio</Label>
                          <Input
                            id="quiet-start"
                            type="time"
                            value={settings.preferences.quietHours.start}
                            onChange={(e) => handlePreferenceChange('quietHours', { ...settings.preferences.quietHours, start: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quiet-end">Hora de fin</Label>
                          <Input
                            id="quiet-end"
                            type="time"
                            value={settings.preferences.quietHours.end}
                            onChange={(e) => handlePreferenceChange('quietHours', { ...settings.preferences.quietHours, end: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Work Days */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-800">Solo Días Laborales</h4>
                        <p className="text-sm text-slate-500">Recibir notificaciones solo en días de trabajo</p>
                      </div>
                      <Switch
                        checked={settings.preferences.workDays.enabled}
                        onCheckedChange={(checked) => handlePreferenceChange('workDays', { ...settings.preferences.workDays, enabled: checked })}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Regional Settings */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Configuración Regional</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language">Idioma</Label>
                        <Select 
                          value={settings.preferences.language}
                          onValueChange={(value) => handlePreferenceChange('language', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timezone">Zona Horaria</Label>
                        <Select 
                          value={settings.preferences.timezone}
                          onValueChange={(value) => handlePreferenceChange('timezone', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Este (New York)</SelectItem>
                            <SelectItem value="America/Chicago">Central (Chicago)</SelectItem>
                            <SelectItem value="America/Denver">Montaña (Denver)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacífico (Los Angeles)</SelectItem>
                            <SelectItem value="America/Mexico_City">México (CDMX)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveSettings}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </>
          ) : (
            /* Notification History */
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-800">Historial de Notificaciones</h3>
                <Button 
                  onClick={markAllAsRead}
                  variant="outline"
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar todas como leídas
                </Button>
              </div>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 sm:p-6 hover:bg-slate-50/50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className={`font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-slate-600 mt-1">{notification.message}</p>
                                <p className="text-sm text-slate-400 mt-2">{notification.timestamp}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`bg-gradient-to-r ${getPriorityColor(notification.priority)} text-white shadow-lg`}>
                                  {notification.priority === 'high' ? 'Alta' : notification.priority === 'normal' ? 'Normal' : 'Baja'}
                                </Badge>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}