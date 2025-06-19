"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/lib/utils"
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar, 
  CreditCard, 
  Shield, 
  Edit,
  Save,
  X,
  Upload,
  Camera,
  User,
  DollarSign,
  BarChart3,
  FileText
} from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"

const mockCompanyData = {
  empresa: "Miami Logistics Corp",
  tipoEmpresa: "LLC",
  rfc: "RFC123456789",
  email: "contact@miamilogistics.com",
  telefono: "+1 (305) 555-0123",
  direccion: "1234 Brickell Avenue, Suite 500",
  ciudad: "Miami",
  estado: "Florida",
  codigoPostal: "33131",
  pais: "Estados Unidos",
  sitioWeb: "www.miamilogistics.com",
  descripcion: "Empresa líder en servicios de logística y gestión de paquetes en el área de Miami.",
  fechaRegistro: "2023-01-15",
  planActual: "Premium",
  facturacionAnual: 30000.00,
  contactoPrincipal: "Carlos Rodriguez",
  cargoContacto: "CEO",
  telefonoContacto: "+1 (305) 555-0124",
  emailContacto: "carlos@miamilogistics.com",
  configuracion: {
    notificacionesEmail: true,
    notificacionesSMS: false,
    facturacionElectronica: true,
    reportesAutomaticos: true,
    moneda: "USD",
    idioma: "es",
    zonaHoraria: "America/New_York"
  }
}

export default function ClientProfile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [companyData, setCompanyData] = useState(mockCompanyData)
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [tempData, setTempData] = useState(mockCompanyData)

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

  const handleEdit = (section: string) => {
    setEditingSection(section)
    setTempData({...companyData})
  }

  const handleSave = (section: string) => {
    setCompanyData({...tempData})
    setEditingSection(null)
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados exitosamente.",
    })
  }

  const handleCancel = () => {
    setTempData({...companyData})
    setEditingSection(null)
  }

  const handleConfigChange = (key: string, value: any) => {
    setTempData(prev => ({
      ...prev,
      configuracion: {
        ...prev.configuracion,
        [key]: value
      }
    }))
  }

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
            <h3 className="text-xl font-semibold text-slate-800">Cargando perfil...</h3>
            <p className="text-slate-500">Preparando información de la empresa</p>
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
                Perfil de Empresa
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Gestiona la información y configuración de tu empresa
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                Plan {companyData.planActual}
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                Verificado
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Company Header Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-4 left-4 sm:left-6 flex items-end gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                    <Building className="w-10 h-10 text-green-600" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <div className="pb-2">
                  <h3 className="text-2xl font-bold text-white">{companyData.empresa}</h3>
                  <p className="text-green-100">{companyData.tipoEmpresa} • Miembro desde {new Date(companyData.fechaRegistro).getFullYear()}</p>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="text-2xl font-bold text-green-600">${companyData.facturacionAnual.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Facturación Anual</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600">{companyData.planActual}</div>
                  <div className="text-sm text-blue-700">Plan Actual</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600">Activo</div>
                  <div className="text-sm text-purple-700">Estado</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-yellow-100">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.floor((new Date().getTime() - new Date(companyData.fechaRegistro).getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-yellow-700">Días con nosotros</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-600" />
                  Información de la Empresa
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editingSection === 'company' ? handleCancel() : handleEdit('company')}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  {editingSection === 'company' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === 'company' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="empresa">Nombre de Empresa</Label>
                        <Input
                          id="empresa"
                          value={tempData.empresa}
                          onChange={(e) => setTempData(prev => ({...prev, empresa: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="tipoEmpresa">Tipo de Empresa</Label>
                        <Select value={tempData.tipoEmpresa} onValueChange={(value) => setTempData(prev => ({...prev, tipoEmpresa: value}))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LLC">LLC</SelectItem>
                            <SelectItem value="Corp">Corporación</SelectItem>
                            <SelectItem value="SA">S.A.</SelectItem>
                            <SelectItem value="SRL">SRL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="rfc">RFC / Tax ID</Label>
                      <Input
                        id="rfc"
                        value={tempData.rfc}
                        onChange={(e) => setTempData(prev => ({...prev, rfc: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        value={tempData.descripcion}
                        onChange={(e) => setTempData(prev => ({...prev, descripcion: e.target.value}))}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleSave('company')} className="bg-gradient-to-r from-green-500 to-emerald-600">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-slate-500">Nombre</div>
                        <div className="text-lg font-semibold text-slate-800">{companyData.empresa}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-500">Tipo</div>
                        <div className="text-lg font-semibold text-slate-800">{companyData.tipoEmpresa}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">RFC / Tax ID</div>
                      <div className="text-lg font-semibold text-slate-800">{companyData.rfc}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Descripción</div>
                      <div className="text-slate-700">{companyData.descripcion}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Información de Contacto
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editingSection === 'contact' ? handleCancel() : handleEdit('contact')}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  {editingSection === 'contact' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingSection === 'contact' ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Principal</Label>
                      <Input
                        id="email"
                        type="email"
                        value={tempData.email}
                        onChange={(e) => setTempData(prev => ({...prev, email: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={tempData.telefono}
                        onChange={(e) => setTempData(prev => ({...prev, telefono: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sitioWeb">Sitio Web</Label>
                      <Input
                        id="sitioWeb"
                        value={tempData.sitioWeb}
                        onChange={(e) => setTempData(prev => ({...prev, sitioWeb: e.target.value}))}
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={() => handleSave('contact')} className="bg-gradient-to-r from-blue-500 to-blue-600">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-500">Email</div>
                        <div className="font-semibold text-slate-800">{companyData.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-500">Teléfono</div>
                        <div className="font-semibold text-slate-800">{companyData.telefono}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-500">Sitio Web</div>
                        <div className="font-semibold text-slate-800">{companyData.sitioWeb}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Address Information */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Dirección
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editingSection === 'address' ? handleCancel() : handleEdit('address')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                {editingSection === 'address' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              {editingSection === 'address' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={tempData.direccion}
                      onChange={(e) => setTempData(prev => ({...prev, direccion: e.target.value}))}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ciudad">Ciudad</Label>
                      <Input
                        id="ciudad"
                        value={tempData.ciudad}
                        onChange={(e) => setTempData(prev => ({...prev, ciudad: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        id="estado"
                        value={tempData.estado}
                        onChange={(e) => setTempData(prev => ({...prev, estado: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="codigoPostal">Código Postal</Label>
                      <Input
                        id="codigoPostal"
                        value={tempData.codigoPostal}
                        onChange={(e) => setTempData(prev => ({...prev, codigoPostal: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pais">País</Label>
                    <Select value={tempData.pais} onValueChange={(value) => setTempData(prev => ({...prev, pais: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                        <SelectItem value="México">México</SelectItem>
                        <SelectItem value="Canadá">Canadá</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleSave('address')} className="bg-gradient-to-r from-purple-500 to-purple-600">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="text-lg font-semibold text-slate-800 mb-2">{companyData.direccion}</div>
                  <div className="text-slate-600">
                    {companyData.ciudad}, {companyData.estado} {companyData.codigoPostal}
                  </div>
                  <div className="text-slate-600">{companyData.pais}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Person */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                Contacto Principal
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editingSection === 'contactPerson' ? handleCancel() : handleEdit('contactPerson')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                {editingSection === 'contactPerson' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              {editingSection === 'contactPerson' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactoPrincipal">Nombre</Label>
                      <Input
                        id="contactoPrincipal"
                        value={tempData.contactoPrincipal}
                        onChange={(e) => setTempData(prev => ({...prev, contactoPrincipal: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cargoContacto">Cargo</Label>
                      <Input
                        id="cargoContacto"
                        value={tempData.cargoContacto}
                        onChange={(e) => setTempData(prev => ({...prev, cargoContacto: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emailContacto">Email</Label>
                      <Input
                        id="emailContacto"
                        type="email"
                        value={tempData.emailContacto}
                        onChange={(e) => setTempData(prev => ({...prev, emailContacto: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefonoContacto">Teléfono</Label>
                      <Input
                        id="telefonoContacto"
                        value={tempData.telefonoContacto}
                        onChange={(e) => setTempData(prev => ({...prev, telefonoContacto: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleSave('contactPerson')} className="bg-gradient-to-r from-orange-500 to-orange-600">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{companyData.contactoPrincipal}</div>
                      <div className="text-orange-600 font-medium">{companyData.cargoContacto}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700">{companyData.emailContacto}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700">{companyData.telefonoContacto}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuration Settings */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Configuración de Cuenta
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editingSection === 'config' ? handleCancel() : handleEdit('config')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                {editingSection === 'config' ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              {editingSection === 'config' ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Notificaciones</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800">Notificaciones por Email</div>
                          <div className="text-sm text-slate-500">Recibir actualizaciones por correo</div>
                        </div>
                        <Switch
                          checked={tempData.configuracion.notificacionesEmail}
                          onCheckedChange={(checked) => handleConfigChange('notificacionesEmail', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800">Notificaciones SMS</div>
                          <div className="text-sm text-slate-500">Alertas por mensaje de texto</div>
                        </div>
                        <Switch
                          checked={tempData.configuracion.notificacionesSMS}
                          onCheckedChange={(checked) => handleConfigChange('notificacionesSMS', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800">Facturación Electrónica</div>
                          <div className="text-sm text-slate-500">Recibir facturas digitalmente</div>
                        </div>
                        <Switch
                          checked={tempData.configuracion.facturacionElectronica}
                          onCheckedChange={(checked) => handleConfigChange('facturacionElectronica', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium text-slate-800">Reportes Automáticos</div>
                          <div className="text-sm text-slate-500">Reportes mensuales automáticos</div>
                        </div>
                        <Switch
                          checked={tempData.configuracion.reportesAutomaticos}
                          onCheckedChange={(checked) => handleConfigChange('reportesAutomaticos', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-4">Preferencias Regionales</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="moneda">Moneda</Label>
                        <Select value={tempData.configuracion.moneda} onValueChange={(value) => handleConfigChange('moneda', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="MXN">MXN ($)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="idioma">Idioma</Label>
                        <Select value={tempData.configuracion.idioma} onValueChange={(value) => handleConfigChange('idioma', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zonaHoraria">Zona Horaria</Label>
                        <Select value={tempData.configuracion.zonaHoraria} onValueChange={(value) => handleConfigChange('zonaHoraria', value)}>
                          <SelectTrigger>
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

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleSave('config')} className="bg-gradient-to-r from-indigo-500 to-indigo-600">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Configuración
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Mail className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm font-medium text-slate-600">Email</div>
                      <div className="text-green-600 font-semibold">
                        {companyData.configuracion.notificacionesEmail ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-slate-600">SMS</div>
                      <div className="text-blue-600 font-semibold">
                        {companyData.configuracion.notificacionesSMS ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-sm font-medium text-slate-600">Facturación Digital</div>
                      <div className="text-purple-600 font-semibold">
                        {companyData.configuracion.facturacionElectronica ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-yellow-100">
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <BarChart3 className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="text-sm font-medium text-slate-600">Reportes Auto</div>
                      <div className="text-yellow-600 font-semibold">
                        {companyData.configuracion.reportesAutomaticos ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-sm font-medium text-slate-500 mb-1">Moneda</div>
                      <div className="font-semibold text-slate-800">{companyData.configuracion.moneda}</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-sm font-medium text-slate-500 mb-1">Idioma</div>
                      <div className="font-semibold text-slate-800">
                        {companyData.configuracion.idioma === 'es' ? 'Español' : 'English'}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-sm font-medium text-slate-500 mb-1">Zona Horaria</div>
                      <div className="font-semibold text-slate-800">{companyData.configuracion.zonaHoraria}</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}