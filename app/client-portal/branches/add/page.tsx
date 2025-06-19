"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MapPin, Building, Phone, Mail, Clock, DollarSign, User, ArrowLeft, Save } from "lucide-react"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function AddBranch() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    responsable: "",
    plan: "",
    costoExtra: 0,
    horarioAtencion: "",
    diasOperacion: [] as string[],
    notificacionesEmail: true,
    notificacionesSMS: false,
    serviciosAdicionales: [] as string[],
    notas: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      diasOperacion: prev.diasOperacion.includes(day)
        ? prev.diasOperacion.filter(d => d !== day)
        : [...prev.diasOperacion, day]
    }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviciosAdicionales: prev.serviciosAdicionales.includes(service)
        ? prev.serviciosAdicionales.filter(s => s !== service)
        : [...prev.serviciosAdicionales, service]
    }))
  }

  const generateCode = () => {
    const prefix = formData.ciudad.substring(0, 3).toUpperCase() || "SUC"
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const code = `${prefix}-${random}`
    setFormData(prev => ({ ...prev, codigo: code }))
  }

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.nombre || !formData.direccion || !formData.telefono || !formData.email || !formData.responsable) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Sucursal creada exitosamente",
      description: `${formData.nombre} ha sido agregada a tu red de sucursales`
    })

    setIsSubmitting(false)
    router.push('/client-portal/branches')
  }

  const diasSemana = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ]

  const serviciosDisponibles = [
    'Recepción de paquetes',
    'Almacenamiento extendido',
    'Consolidación de envíos',
    'Servicio de delivery',
    'Notificaciones SMS',
    'Seguro de paquetes'
  ]

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
            <h3 className="text-xl font-semibold text-slate-800">Agregar Sucursal</h3>
            <p className="text-slate-500">Cargando formulario...</p>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push('/client-portal/branches')}
                className="hover:bg-slate-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Agregar Nueva Sucursal
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Configura una nueva ubicación para tu red de sucursales
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Información Básica */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Sucursal *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Ej: Miami Central"
                  />
                </div>
                <div>
                  <Label htmlFor="codigo">Código de Sucursal</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="codigo"
                      value={formData.codigo}
                      onChange={(e) => handleInputChange('codigo', e.target.value)}
                      placeholder="MIA-001"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateCode}
                      className="whitespace-nowrap"
                    >
                      Generar
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección Completa *</Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Dirección completa de la sucursal"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                    placeholder="Miami"
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    value={formData.estado}
                    onChange={(e) => handleInputChange('estado', e.target.value)}
                    placeholder="FL"
                  />
                </div>
                <div>
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={(e) => handleInputChange('codigoPostal', e.target.value)}
                    placeholder="33131"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    placeholder="+1 305-555-0123"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="sucursal@empresa.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="responsable">Responsable de la Sucursal *</Label>
                <Input
                  id="responsable"
                  value={formData.responsable}
                  onChange={(e) => handleInputChange('responsable', e.target.value)}
                  placeholder="Nombre del responsable"
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuración Operativa */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Configuración Operativa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plan">Plan de Sucursal</Label>
                  <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basico">Básico</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="costoExtra">Costo Extra por Envío ($)</Label>
                  <Input
                    id="costoExtra"
                    type="number"
                    step="0.01"
                    value={formData.costoExtra}
                    onChange={(e) => handleInputChange('costoExtra', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="horario">Horario de Atención</Label>
                <Input
                  id="horario"
                  value={formData.horarioAtencion}
                  onChange={(e) => handleInputChange('horarioAtencion', e.target.value)}
                  placeholder="8:00 AM - 6:00 PM"
                />
              </div>

              <div>
                <Label>Días de Operación</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center space-x-2">
                      <Switch
                        checked={formData.diasOperacion.includes(dia)}
                        onCheckedChange={() => handleDayToggle(dia)}
                      />
                      <Label className="text-sm">{dia}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Servicios y Notificaciones */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Servicios y Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Servicios Adicionales</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {serviciosDisponibles.map((servicio) => (
                    <div key={servicio} className="flex items-center space-x-2">
                      <Switch
                        checked={formData.serviciosAdicionales.includes(servicio)}
                        onCheckedChange={() => handleServiceToggle(servicio)}
                      />
                      <Label className="text-sm">{servicio}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <Label htmlFor="emailNotif">Notificaciones por Email</Label>
                    <p className="text-sm text-slate-600">Recibir actualizaciones por correo</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={formData.notificacionesEmail}
                    onCheckedChange={(checked) => handleInputChange('notificacionesEmail', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <Label htmlFor="smsNotif">Notificaciones por SMS</Label>
                    <p className="text-sm text-slate-600">Recibir alertas por mensaje</p>
                  </div>
                  <Switch
                    id="smsNotif"
                    checked={formData.notificacionesSMS}
                    onCheckedChange={(checked) => handleInputChange('notificacionesSMS', checked)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notas">Notas Adicionales</Label>
                <Textarea
                  id="notas"
                  value={formData.notas}
                  onChange={(e) => handleInputChange('notas', e.target.value)}
                  placeholder="Información adicional sobre la sucursal..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4 pb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/client-portal/branches')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Crear Sucursal
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}