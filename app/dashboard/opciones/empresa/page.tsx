"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, Phone, Mail, Globe, DollarSign, Scale, FileText } from "lucide-react"

export default function InformacionEmpresaPage() {
  const [formData, setFormData] = useState({
    nombreEmpresa: "PoboxManager Demo",
    identificacionFiscal: "12345678901",
    direccion: "1970 NW 82ND AVE",
    ciudad: "Miami",
    estado: "Florida",
    codigoPostal: "33126",
    pais: "Estados Unidos",
    telefono: "+1-305-123-4567",
    email: "info@poboxmanager.com",
    sitioWeb: "www.poboxmanager.com",
    moneda: "USD",
    unidadPeso: "lbs",
    terminosCondiciones: "Términos y condiciones generales de la empresa...",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando información de la empresa:", formData)
    alert("Información guardada exitosamente")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Información de la Empresa
              </h1>
              <p className="text-lg text-gray-600 mt-2">Configura los datos generales de tu empresa</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                Datos Básicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
                <Input
                  id="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={(e) => handleInputChange("nombreEmpresa", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="identificacionFiscal">Identificación Fiscal</Label>
                <Input
                  id="identificacionFiscal"
                  value={formData.identificacionFiscal}
                  onChange={(e) => handleInputChange("identificacionFiscal", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="telefono" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="sitioWeb" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Sitio Web
                </Label>
                <Input
                  id="sitioWeb"
                  value={formData.sitioWeb}
                  onChange={(e) => handleInputChange("sitioWeb", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                Dirección
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => handleInputChange("ciudad", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange("estado", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="codigoPostal">Código Postal</Label>
                <Input
                  id="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="pais">País</Label>
                <Input 
                  id="pais" 
                  value={formData.pais} 
                  onChange={(e) => handleInputChange("pais", e.target.value)} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                Configuración Regional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="moneda" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Moneda
                </Label>
                <Select value={formData.moneda} onValueChange={(value) => handleInputChange("moneda", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                    <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="unidadPeso" className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Unidad de Peso
                </Label>
                <Select value={formData.unidadPeso} onValueChange={(value) => handleInputChange("unidadPeso", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lbs">Libras (lbs)</SelectItem>
                    <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                Términos y Condiciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="terminosCondiciones">Términos y Condiciones Generales</Label>
                <Textarea
                  id="terminosCondiciones"
                  value={formData.terminosCondiciones}
                  onChange={(e) => handleInputChange("terminosCondiciones", e.target.value)}
                  rows={8}
                  placeholder="Ingrese los términos y condiciones generales de su empresa..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <Building2 className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}